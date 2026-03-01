// src/components/FilterDropdown.tsx
import styles from './FilterDropdown.module.scss';

export default function FilterDropdown() {
    return (
        <div className={styles.dropdownContainer}>
            <div className={styles.inputGroup}>
                <label>Organization</label>
                <select>
                    <option value="">Select</option>
                    <option value="lendsqr">Lendsqr</option>
                    <option value="lendstar">Lendstar</option>
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label>Username</label>
                <input type="text" placeholder="User" />
            </div>

            <div className={styles.inputGroup}>
                <label>Email</label>
                <input type="email" placeholder="Email" />
            </div>

            <div className={styles.inputGroup}>
                <label>Date</label>
                <input type="date" placeholder="Date" />
            </div>

            <div className={styles.inputGroup}>
                <label>Phone Number</label>
                <input type="tel" placeholder="Phone Number" />
            </div>

            <div className={styles.inputGroup}>
                <label>Status</label>
                <select>
                    <option value="">Select</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Blacklisted">Blacklisted</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <div className={styles.buttonGroup}>
                <button className={styles.resetBtn}>Reset</button>
                <button className={styles.filterBtn}>Filter</button>
            </div>
        </div>
    );
}
