import { query as q } from 'faunadb';

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { fauna } from '../../../config/faunadb';

type Client = {
  ref: {
    id: string;
  }
}

const addClient = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, address } = req.body;
    const session = await getSession({ req });

    await fauna.query(
      q.Create(
        q.Collection('clients'),
        {
          data: {
            email: session.user.email,
            name: name,
            address: address
          }
        }
      ),
    );

    return res.status(200).json({ message: 'Cliente criado.' });
  }

  if (req.method === 'GET') {
    const session = await getSession({ req });

    if (session) {
      const clients = await fauna.query(
        q.Map(
          q.Paginate(
            q.Match(q.Index("clients_by_email"), session.user?.email)
          ),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      );

      return res.status(200).json(clients);
    } else {
      return;
    }
  }

  if (req.method === 'DELETE') {
    const { params } = req.query;

    const name = params[0];

    const client: any = await fauna.query(
      q.Get(
        q.Match(
          q.Index('client_by_name'),
          name
        )
      )
    );

    await fauna.query(
      q.Delete(
        q.Ref(q.Collection("clients"), client.ref.id)
      )
    );

    return res.status(200).json({ message: 'Cliente deletado.' });
  }

  return true;
}

export default addClient;