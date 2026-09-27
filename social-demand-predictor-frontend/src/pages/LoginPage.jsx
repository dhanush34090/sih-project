import React, { useState } from 'react';
import { ChevronRight, Zap } from 'lucide-react';

export default function LoginPage({ onLogin, onSignup }) {
    const [role, setRole] = useState('admin');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const email = form.elements.email.value;
        const password = form.elements.password.value;

        setError('');
        setLoading(true);

        try {
            await onLogin(role, email, password);
        } catch (err) {
            setError(err.message || 'Incorrect email or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="login-page">
            <Brand />

            <AuthCard
                eyebrow="WELCOME BACK"
                title={
                    role === 'admin'
                        ? 'Manage demand with confidence.'
                        : 'See what customers want next.'
                }
                description={
                    role === 'admin'
                        ? 'Access your full retail intelligence workspace.'
                        : 'View demand forecasts and social trends for your store.'
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
                        Email address
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder={`${role}@demostore.com`}
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

                    {error && (
                        <div className="login-error" role="alert">
                            {error}
                        </div>
                    )}

                    <div className="login-options">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>

                        <button
                            type="button"
                            className="text-btn"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        className="primary-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? 'Signing in...'
                            : `Sign in as ${role}`}

                        {!loading && <ChevronRight size={16} />}
                    </button>
                </form>

                <button
                    className="auth-toggle"
                    onClick={onSignup}
                >
                    New here? Create a User account
                </button>
            </AuthCard>

            <Preview />
        </main>
    );
}

export function Brand() {
    return (
        <div className="login-brand">
            <div className="brand-mark">
                <Zap size={22} />
            </div>

            <div>
                <b>DemandIQ</b>
                <span>AI Commerce Intelligence</span>
            </div>
        </div>
    );
}

export function AuthCard({
    eyebrow,
    title,
    description,
    children
}) {
    return (
        <section className="login-card">
            <div className="eyebrow">
                <span />
                {eyebrow}
            </div>

            <h1>{title}</h1>

            <p>{description}</p>

            {children}
        </section>
    );
}

export function Preview() {
    return (
        <div className="login-preview">
            <span>DEMANDIQ WORKSPACE</span>

            <div className="login-preview-logo">
                <div className="brand-mark">
                    <Zap size={36} />
                </div>

                <strong>DemandIQ</strong>
            </div>

            <p>AI commerce intelligence for your store</p>
        </div>
    );
}