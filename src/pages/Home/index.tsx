import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Head from "next/head";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

import { App } from "../../components/App";
import { Navbar } from "../../components/Navbar";
import { api } from "../../services/api";

import styles from './styles.module.scss';

interface Client {
  ref: {
    id: string;
  },
  data: {
    name: string;
    address: string;
  }
}

export default function Home() {
  const [session] = useSession();

  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);

  async function getClientsFromDbAndFormateArray() {
    const response = await api.get('/clients/list');
    const clients = response.data.data as Client[];

    setClients(clients);
    setLoading(false);
  }

  async function handleDeleteClient(name: string) {
    try {
      await api.delete(`/clients/${name}`).then(response => toast.error(response.data.message));
    } catch {
      toast.info('Não foi possível deletar o cliente.');
    }

    await getClientsFromDbAndFormateArray();
  }

  useEffect(() => {
    try {
      setLoading(true);
    } catch {
      setLoading(true);
    }

    getClientsFromDbAndFormateArray();
  }, []);

  if (loading === true) {
    return (
      <App>
        <div className={styles.loading}>
          <Head>
            <title>Home | Controle de Vendas</title>
          </Head>
          <h2>Carregando...</h2>
        </div>
      </App>
    )
  } else {
    return (
      <App>
        <Head>
          <title>Home | Controle de Vendas</title>
        </Head>

        <div className={styles.container}>
          <Navbar />

          <span>{session?.user?.name}</span>

          <main className={styles.main}>
            <h1>Cadastros</h1>

            <Table variant="striped" colorScheme="red">
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Endereço</Th>
                  <Th>Opções</Th>
                </Tr>
              </Thead>
              <Tbody>
                {clients.map(client => {
                  return (
                    <Tr key={client.data.name}>
                      <Td>{client.data.name}</Td>
                      <Td>{client.data.address}</Td>
                      <Td>
                        <button
                          onClick={() => handleDeleteClient(client.data.name)}
                          className={styles.trash}
                        >
                          <FaTrash />
                        </button>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </main>
        </div>
      </App>
    );
  }
}