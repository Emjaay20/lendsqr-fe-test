'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import styles from './DashboardLayout.module.scss';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className={styles.layoutContainer}>
            <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />
            <div className={styles.mainContent}>
                <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
                <main className={styles.contentArea}>
                    {children}
                </main>
            </div>
        </div>
    );
}
