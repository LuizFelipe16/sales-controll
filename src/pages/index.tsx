import Head from 'next/head';
import { signIn } from 'next-auth/client';
import { FaGoogle, FaGithub, FaFacebook, FaDiscord, FaLinkedin } from 'react-icons/fa';

import styles from '../styles/pages/Login.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Login | Controle de Vendas</title>
      </Head>

      <div className={styles.container}>
        {/* <img src="pizza.jpg" alt="Bem vindo" className={styles.wallpaper} /> */}

        <div className={styles.wallpaper}>
          <h1>Bem Vindo</h1>
          <p>Ao seu controle de vendas.</p>
        </div>

        <div className={styles.form}>
          <form>
            <h1>Para <strong>acessar</strong>, faça login com um dos serviços disponíveis</h1>

            {/* <hr /> */}

            <button className={styles.google} type="button" onClick={() => signIn("google")}>
              <FaGoogle /> Entrar com Google
            </button>

            <button className={styles.github} type="button" onClick={() => signIn("github")}>
              <FaGithub /> Entrar com Github
            </button>

            <button className={styles.discord} type="button" onClick={() => signIn("discord")}>
              <FaDiscord /> Entrar com Discord
            </button>

            <button className={styles.linkedin} disabled>
              <FaLinkedin /> Entrar com LinkedIn
            </button>

            <button className={styles.facebook} disabled>
              <FaFacebook /> Entrar com Facebook
            </button>
          </form>
        </div>
      </div>
    </>
  );
}