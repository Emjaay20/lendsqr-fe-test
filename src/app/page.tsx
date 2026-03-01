'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Login.module.scss';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // auth validation logic to be integrated here
    // temporarily bypassing auth for demo purposes
    router.push('/dashboard');
  };

  return (
    <main className={styles.container}>
      {/* left panel: core branding */}
      <section className={styles.leftSide}>
        <div className={styles.logo}>
          <Image src="/logo.svg" alt="Lendsqr Logo" width={174} height={36} priority />
        </div>
        <div className={styles.illustration}>
          <Image
            src="/pablo-sign-in.svg"
            alt="Sign in illustration"
            width={600}
            height={400}
            priority
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </section>

      {/* right panel: authentication form */}
      <section className={styles.rightSide}>
        <div className={styles.formContainer}>
          <h1 className={styles.heading}>Welcome!</h1>
          <p className={styles.subheading}>Enter details to login.</p>

          <form onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <button
                type="button"
                className={styles.showPasswordBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <span className={styles.forgotPassword}>Forgot PASSWORD?</span>

            <button type="submit" className={styles.submitBtn}>
              Log in
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
