import Image from 'next/image';
import { FiSearch, FiBell } from 'react-icons/fi';
import { IoMdArrowDropdown } from 'react-icons/io';
import styles from './Navbar.module.scss';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.leftSection}>
                <div className={styles.logo}>
                    <Image src="/logo.svg" alt="Lendsqr Logo" width={140} height={30} priority />
                </div>
                <div className={styles.searchBox}>
                    <input type="text" placeholder="Search for anything" />
                    <button type="button">
                        <FiSearch size={16} />
                    </button>
                </div>
            </div>

            <div className={styles.rightSection}>
                <a href="#" className={styles.docsLink}>Docs</a>
                <FiBell size={24} color="#213F7D" />
                <div className={styles.profile}>
                    <Image src="/avatar.png" alt="Adedeji" width={40} height={40} />
                    <span>Adedeji</span>
                    <IoMdArrowDropdown size={20} color="#213F7D" />
                </div>
            </div>
        </nav>
    );
}
