// src/app/dashboard/layout.tsx
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import styles from './DashboardLayout.module.scss';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.layoutContainer}>
            <Navbar />
            <div className={styles.mainContent}>
                <Sidebar />
                <main className={styles.contentArea}>
                    {children}
                </main>
            </div>
        </div>
    );
}
