import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { AuthCard, Brand, Preview } from './LoginPage';
import { signupUser } from '../utils/auth';

export default function SignupPage({ onSignup, onLogin }) {
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;

        const name = form.elements.name.value.trim();
        const email = form.elements.email.value.trim();
        const password = form.elements.password.value;
        const confirmPassword = form.elements.confirmPassword.value;
        const selectedRole = role.toUpperCase();

        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);

        try {
            await signupUser(
                name,
                email,
                password,
                selectedRole
            );

            await onSignup(email, password, selectedRole);

        } catch (err) {
            setError(
                err.message || 'Registration failed.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="login-page">
            <Brand />

            <AuthCard
                eyebrow="JOIN THE WORKSPACE"
                title="Build a clearer view of demand."
                description={
                    role === 'admin'
                        ? 'Create your admin account and manage the full retail intelligence workspace.'
                        : 'Create your user account and start exploring customer demand signals.'
                }
            >
                <div className="role-switch">
                    <button
                        type="button"
                        className={role === 'admin' ? 'selected' : ''}
                        onClick={() => {
                            setRole('admin');
                            setError('');
                        }}
                    >
                        Admin
                    </button>

                    <button
                        type="button"
                        className={role === 'user' ? 'selected' : ''}
                        onClick={() => {
                            setRole('user');
                            setError('');
                        }}
                    >
                        User
                    </button>
                </div>

                <form onSubmit={submit}>
                    <label>
                        Full name
                        <input
                            name="name"
                            required
                            placeholder="Your name"
                        />
                    </label>

                    <label>
                        Email address
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="you@demostore.com"
                        />
                    </label>

                    <label>
                        Password
                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="Enter your password"
                        />
                    </label>

                    <label>
                        Confirm password
                        <input
                            name="confirmPassword"
                            type="password"
                            required
                            placeholder="Repeat your password"
                        />
                    </label>

                    {error && (
                        <div className="login-error" role="alert">
                            {error}
                        </div>
                    )}

                    <button
                        className="primary-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? 'Creating account...'
                            : `Create ${role} account`}

                        {!loading && <ChevronRight size={16} />}
                    </button>
                </form>

                <button
                    className="auth-toggle"
                    onClick={onLogin}
                >
                    Already have an account? Sign in
                </button>
            </AuthCard>

            <Preview />
        </main>
    );
}