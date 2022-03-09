import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { FaBan } from 'react-icons/fa';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface AppProps {
  children: ReactNode;
}

export function App({ children }: AppProps) {
  const router = useRouter();
  const [session] = useSession();

  if (session) {
    return (
      <div>
        {children}
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>Not Auth | Controle de Vendas</title>
        </Head>
        <FaBan />
        <Link href="/" passHref>
          <button>Fazer Login na Plataforma</button>
        </Link>
      </div>
    );
  }
}