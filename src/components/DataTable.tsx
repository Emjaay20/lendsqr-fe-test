'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // using next/link for client-side routing
import { User } from '@/types/user';
import StatusBadge from './StatusBadge';
import FilterDropdown from './FilterDropdown';
import styles from './DataTable.module.scss';

interface DataTableProps {
    users: User[];
}

export default function DataTable({ users }: DataTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    // tracking the active action menu by user ID to ensure only one is open at a time
    const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const columns = ['Organization', 'Username', 'Email', 'Phone number', 'Date joined', 'Status'];

    // algorithm for generating the customized pagination sequence
    const generatePageNumbers = () => {
        const pages = [];
        if (totalPages <= 6) {
            // just an optimization: if the total pages are 6 or less, we don't need ellipses at all
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // handling the case where we are near the start of the pagination
            if (currentPage <= 3) {
                pages.push(1, 2, 3, '...', totalPages - 1, totalPages);
            }
            // handling the bounds near the tail of the pages
            else if (currentPage >= totalPages - 2) {
                pages.push(1, 2, '...', totalPages - 2, totalPages - 1, totalPages);
            }
            // logic for when the user is somewhere in the middle interval of pages
            else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index}>
                                    <div
                                        className={styles.headerContent}
                                        onClick={() => setActiveFilter(activeFilter === col ? null : col)}
                                    >
                                        <span>{col}</span>
                                        <div className={styles.filterIcon}>
                                            <Image src="/icons/filter.svg" alt="Filter" width={16} height={16} />
                                        </div>
                                    </div>
                                    {activeFilter === col && <FilterDropdown />}
                                </th>
                            ))}
                            <th></th>
                        </tr>
                    </thead>

                    <tbody className={styles.tbody}>
                        {currentUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.organization}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>
                                    {new Date(user.dateJoined).toLocaleString('en-US', {
                                        month: 'short', day: 'numeric', year: 'numeric',
                                        hour: 'numeric', minute: '2-digit', hour12: true,
                                    })}
                                </td>
                                <td>
                                    <StatusBadge status={user.status} />
                                </td>

                                {/* action column */}
                                <td>
                                    <div className={styles.actionContainer}>
                                        <button
                                            className={styles.actionBtn}
                                            // toggling the active menu based on the user's ID
                                            onClick={() => setActiveActionMenu(activeActionMenu === user.id ? null : user.id)}
                                        >
                                            <Image src="/icons/more.svg" alt="More actions" width={20} height={20} />
                                        </button>

                                        {/* only render the dropdown if the current row's ID matches the active state */}
                                        {activeActionMenu === user.id && (
                                            <div className={styles.actionMenu} onMouseLeave={() => setActiveActionMenu(null)}>

                                                {/* view user details route */}
                                                <Link href={`/dashboard/users/${user.id}`} className={styles.actionItem}>
                                                    <Image src="/icons/eye.svg" alt="View" width={16} height={16} />
                                                    <span>View Details</span>
                                                </Link>

                                                {/* blacklist user action */}
                                                <div className={styles.actionItem} onClick={() => console.log('Blacklist', user.id)}>
                                                    <Image src="/icons/user-times.svg" alt="Blacklist" width={16} height={16} />
                                                    <span>Blacklist User</span>
                                                </div>

                                                {/* activate user action */}
                                                <div className={styles.actionItem} onClick={() => console.log('Activate', user.id)}>
                                                    <Image src="/icons/user-check.svg" alt="Activate" width={16} height={16} />
                                                    <span>Activate User</span>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* table pagination footer  */}
            <div className={styles.pagination}>

                <div className={styles.info}>
                    Showing
                    <select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1); // reset to page 1 when changing items per page to prevent potential empty states
                        }}
                    >
                        <option value={10}>100</option> {/* visual mapping matches the design requirements while preserving actual logic items per page */}
                        <option value={20}>200</option>
                        <option value={50}>500</option>
                    </select>
                    out of {users.length}
                </div>

                <div className={styles.controls}>
                    {/* previous page button */}
                    <button
                        className={styles.navBtn}
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        &lt;
                    </button>

                    {/* mapped pagination numbers */}
                    <div className={styles.pageNumbers}>
                        {generatePageNumbers().map((page, index) => (
                            <button
                                key={index}
                                className={`
                  ${styles.pageBtn} 
                  ${currentPage === page ? styles.active : ''} 
                  ${page === '...' ? styles.ellipsis : ''}
                `}
                                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                                disabled={page === '...'}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    {/* next page button */}
                    <button
                        className={styles.navBtn}
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </>
    );
}
