'use client'; // ensuring client-side execution for nav state interactions

import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.scss';

// isolated configuration structure for flexible sidebar routing
const sidebarConfig = [
    {
        title: 'CUSTOMERS',
        items: [
            { label: 'Users', icon: 'user-friends 1.svg', path: '/dashboard', active: true },
            { label: 'Guarantors', icon: 'users 1.svg', path: '#' },
            { label: 'Loans', icon: 'sack 1.svg', path: '#' },
            { label: 'Decision Models', icon: 'handshake-regular 1.svg', path: '#' },
            { label: 'Savings', icon: 'piggy-bank 1.svg', path: '#' },
            { label: 'Loan Requests', icon: 'Group 104.svg', path: '#' },
            { label: 'Whitelist', icon: 'user-check 1.svg', path: '#' },
            { label: 'Karma', icon: 'user-times 1.svg', path: '#' },
        ],
    },
    {
        title: 'BUSINESSES',
        items: [
            { label: 'Organization', icon: 'briefcase 1.svg', path: '#' },
            { label: 'Loan Products', icon: 'Group 105.svg', path: '#' },
            { label: 'Savings Products', icon: 'np_bank_148501_000000 1.svg', path: '#' },
            { label: 'Fees and Charges', icon: 'coins-solid 1.svg', path: '#' },
            { label: 'Transactions', icon: 'icon.svg', path: '#' },
            { label: 'Services', icon: 'galaxy 1.svg', path: '#' },
            { label: 'Service Account', icon: 'user-cog 1.svg', path: '#' },
            { label: 'Settlements', icon: 'scroll 1.svg', path: '#' },
            { label: 'Reports', icon: 'chart-bar 2.svg', path: '#' },
        ],
    },
    {
        title: 'SETTINGS',
        items: [
            { label: 'Preferences', icon: 'sliders-h 1.svg', path: '#' },
            { label: 'Fees and Pricing', icon: 'badge-percent 1.svg', path: '#' },
            { label: 'Audit Logs', icon: 'clipboard-list 1.svg', path: '#' },
            { label: 'System Messages', icon: 'tire 1.svg', path: '#' },
        ],
    },
];

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>

            {/* primary organization links */}
            <div className={styles.topSection}>
                <Link href="#" className={styles.navItem}>
                    <div className={styles.icon}>
                        <Image src="/icons/briefcase 1.svg" alt="Organization" width={16} height={16} />
                    </div>
                    <span style={{ color: '#213F7D', whiteSpace: 'nowrap' }}>Switch Organization</span>
                    <Image src="/icons/np_next_2236826_000000 2.svg" alt="Dropdown" width={14} height={14} style={{ marginLeft: 'auto' }} />
                </Link>

                <Link href="/dashboard" className={styles.navItem}>
                    <div className={styles.icon}>
                        <Image src="/icons/home 1.svg" alt="Dashboard" width={16} height={16} />
                    </div>
                    <span>Dashboard</span>
                </Link>
            </div>

            {/* dynamically rendered navigation groups */}
            {sidebarConfig.map((section, index) => (
                <div key={index}>
                    <p className={styles.categoryTitle}>{section.title}</p>
                    {section.items.map((item, itemIndex) => (
                        <Link
                            href={item.path}
                            key={itemIndex}
                            className={`${styles.navItem} ${item.active ? styles.active : ''}`}
                        >
                            <div className={styles.icon}>
                                <Image
                                    src={`/icons/${item.icon}`}
                                    alt={item.label}
                                    width={16}
                                    height={16}
                                />
                            </div>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            ))}

            {/* system actions & footer */}
            <div className={styles.logoutSection}>
                <Link href="/" className={styles.navItem}>
                    <div className={styles.icon}>
                        <Image src="/icons/sign-out 1.svg" alt="Logout" width={16} height={16} />
                    </div>
                    <span>Logout</span>
                </Link>
                <p className={styles.version}>v1.2.0</p>
            </div>

        </aside>
    );
}
