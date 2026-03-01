import { UserStatus } from '@/types/user';
import styles from './StatusBadge.module.scss';

export default function StatusBadge({ status }: { status: UserStatus }) {
    // mapping type-checked status flags to localized SCSS styles
    const getBadgeClass = (status: UserStatus) => {
        switch (status) {
            case 'Active': return styles.active;
            case 'Inactive': return styles.inactive;
            case 'Pending': return styles.pending;
            case 'Blacklisted': return styles.blacklisted;
            default: return styles.inactive;
        }
    };

    return (
        <span className={`${styles.badge} ${getBadgeClass(status)}`}>
            {status}
        </span>
    );
}
