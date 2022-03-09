import { useSession } from "next-auth/client";
import Head from "next/head";
import { toast } from 'react-toastify';
import { FormEvent, useState } from "react";

import { App } from "../../components/App";
import { Navbar } from "../../components/Navbar";
import { api } from "../../services/api";

import styles from './styles.module.scss';

export default function Add() {
  const [session] = useSession();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  async function handleSubmitAddSale(e: FormEvent) {
    e.preventDefault();

    await api.post('/clients/post', {
      name,
      address
    }).then((response) => {
      toast.error(response.data.message);

      setName('');
      setAddress('');
    });
  }

  return (
    <App>
      <Head>
        <title>Adicionar | Controle de Vendas</title>
      </Head>

      <div className={styles.container}>
        <Navbar />

        <span>{session?.user?.name}</span>

        <main className={styles.main}>
          <h1>Adicionar</h1>

          <form onSubmit={handleSubmitAddSale}>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Endereço"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <button type="submit">
              Salvar
            </button>
          </form>
        </main>
      </div>
    </App>
  );
}