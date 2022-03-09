import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import { FaHome, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';

import styles from './styles.module.scss';

export function Navbar() {
  const [session] = useSession();
  const router = useRouter();

  const toHome = () => router.push('/');

  return (
    <nav className={styles.navbar}>
      <img src={session.user.image} alt="Imagem de Perfil" />

      <div className={styles.link}>
        <Link href="/Home">
          <a>
            <FaHome />
          </a>
        </Link>

        <Link href="/Add">
          <a>
            <FaUserPlus />
          </a>
        </Link>
      </div>

      <button
        type="button"
        onClick={() => { signOut() }}
      >
        <FaSignOutAlt />
      </button>
    </nav>
  )
}