'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { User } from '@/types/user';
import { getUsers } from '@/services/userService';
import DataTable from '@/components/DataTable';
import styles from './Dashboard.module.scss';

export default function DashboardPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // initialize data fetching on client mount
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await getUsers();
            setUsers(data);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    // deriving dashboard metrics from fetched user pool
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === 'Active').length;
    const usersWithLoans = users.filter((u) => u.educationAndEmployment.loanRepayment !== '₦0').length;
    // simulated mock calculation for savings segment
    const usersWithSavings = users.length > 50 ? users.length - 50 : 0;

    // localized number formatting utility
    const formatNumber = (num: number) => num.toLocaleString();

    const cardData = [
        {
            title: 'USERS',
            value: formatNumber(totalUsers),
            icon: 'icon-users.svg', // mapping specific asset filenames to icons
            bgColor: 'rgba(223, 24, 255, 0.1)', // thematic color token override
        },
        {
            title: 'ACTIVE USERS',
            value: formatNumber(activeUsers),
            icon: 'icon-active-users.svg',
            bgColor: 'rgba(87, 24, 255, 0.1)', // thematic color token
        },
        {
            title: 'USERS WITH LOANS',
            value: formatNumber(usersWithLoans),
            icon: 'icon-loans.svg',
            bgColor: 'rgba(245, 95, 68, 0.1)', // thematic color token
        },
        {
            title: 'USERS WITH SAVINGS',
            value: formatNumber(usersWithSavings),
            icon: 'icon-savings.svg',
            bgColor: 'rgba(255, 51, 102, 0.1)', // thematic color token
        },
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Users</h1>

            {/* high-level metrics view */}
            <div className={styles.cardsGrid}>
                {cardData.map((card, index) => (
                    <div className={styles.card} key={index}>
                        <div
                            className={styles.iconWrapper}
                            style={{ backgroundColor: card.bgColor }}
                        >
                            <Image
                                src={`/icons/${card.icon}`}
                                alt={card.title}
                                width={20}
                                height={20}
                            />
                        </div>
                        <p className={styles.cardTitle}>{card.title}</p>
                        <h2 className={styles.cardValue}>
                            {isLoading ? '...' : card.value}
                        </h2>
                    </div>
                ))}
            </div>

            {/* primary data table view */}
            {isLoading ? (
                <p>Loading user data...</p>
            ) : (
                <DataTable users={users} />
            )}
        </div>
    );
}
