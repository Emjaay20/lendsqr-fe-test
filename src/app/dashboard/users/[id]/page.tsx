// src/app/dashboard/users/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from '@/types/user';
import { getUserById } from '@/services/userService';
import styles from './UserDetails.module.scss';

export default function UserDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // localized state representing the selected information category
    const [activeTab, setActiveTab] = useState('General Details');

    useEffect(() => {
        const fetchUser = async () => {
            if (typeof params.id === 'string') {
                const data = await getUserById(params.id);
                if (data) {
                    setUser(data);
                } else {
                    // redirect gracefully if the requested user record is invalid or missing
                    router.push('/dashboard');
                }
            }
            setIsLoading(false);
        };
        fetchUser();
    }, [params.id, router]);

    if (isLoading) return <div className={styles.container}><p>Loading user details...</p></div>;
    if (!user) return null;

    return (
        <div className={styles.container}>
            {/* page header & primary navigation */}
            <Link href="/dashboard" className={styles.backBtn}>
                ← Back to Users
            </Link>

            <div className={styles.headerRow}>
                <h1 className={styles.title}>User Details</h1>
                <div className={styles.actions}>
                    <button className={styles.blacklistBtn}>Blacklist User</button>
                    <button className={styles.activateBtn}>Activate User</button>
                </div>
            </div>

            {/* primary profile summary metrics */}
            <div className={styles.profileCard}>
                <div className={styles.profileTop}>
                    <div className={styles.avatar}>
                        {/* generic placeholder graphic pending actual asset integration */}
                        <span style={{ fontSize: '40px' }}>👤</span>
                    </div>

                    <div className={styles.primaryInfo}>
                        <h2>{user.profile.firstName} {user.profile.lastName}</h2>
                        <p>{user.id}</p>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.tierInfo}>
                        <p>User's Tier</p>
                        <div className={styles.stars}>
                            ★ ★ ☆
                        </div>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.walletInfo}>
                        <h2>{user.personalIncome}</h2>
                        <p>9912345678/Providus Bank</p>
                    </div>
                </div>

                {/* category navigation controls */}
                <div className={styles.tabs}>
                    {['General Details', 'Documents', 'Bank Details', 'Loans', 'Savings', 'App and System'].map((tab) => (
                        <div
                            key={tab}
                            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {/* comprehensive attribute sections */}
            <div className={styles.detailsCard}>

                {/* personal information segment */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Personal Information</h3>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Full Name</span>
                            <span className={styles.value}>{user.profile.firstName} {user.profile.lastName}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Phone Number</span>
                            <span className={styles.value}>{user.phoneNumber}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Email Address</span>
                            <span className={styles.value}>{user.email}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>BVN</span>
                            <span className={styles.value}>{user.profile.bvn}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Gender</span>
                            <span className={styles.value}>{user.profile.gender}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Marital Status</span>
                            <span className={styles.value}>{user.profile.maritalStatus}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Children</span>
                            <span className={styles.value}>{user.profile.children}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Type of Residence</span>
                            <span className={styles.value}>{user.profile.typeOfResidence}</span>
                        </div>
                    </div>
                </div>

                {/* education & employment segment */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Education and Employment</h3>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Level of Education</span>
                            <span className={styles.value}>{user.educationAndEmployment.level}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Employment Status</span>
                            <span className={styles.value}>{user.educationAndEmployment.employmentStatus}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Sector of Employment</span>
                            <span className={styles.value}>{user.educationAndEmployment.sector}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Duration of Employment</span>
                            <span className={styles.value}>{user.educationAndEmployment.duration}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Office Email</span>
                            <span className={styles.value}>{user.educationAndEmployment.officeEmail}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Monthly Income</span>
                            <span className={styles.value}>{user.educationAndEmployment.monthlyIncome[0]} - {user.educationAndEmployment.monthlyIncome[1]}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Loan Repayment</span>
                            <span className={styles.value}>{user.educationAndEmployment.loanRepayment}</span>
                        </div>
                    </div>
                </div>

                {/* social profiles segment */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Socials</h3>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Twitter</span>
                            <span className={styles.value}>{user.socials.twitter}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Facebook</span>
                            <span className={styles.value}>{user.socials.facebook}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Instagram</span>
                            <span className={styles.value}>{user.socials.instagram}</span>
                        </div>
                    </div>
                </div>

                {/* guarantor details segment */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Guarantor</h3>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Full Name</span>
                            <span className={styles.value}>{user.guarantor.firstName} {user.guarantor.lastName}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Phone Number</span>
                            <span className={styles.value}>{user.guarantor.phoneNumber}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Email Address</span>
                            <span className={styles.value}>{user.guarantor.email}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Relationship</span>
                            <span className={styles.value}>{user.guarantor.relationship}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
