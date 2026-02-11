import { useState } from 'react';
import './auth.css';
import { useAuth } from '../../utils/context';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/auth/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mail: email, password: password })
        }).then(res => res.json());

        if (response.token) {
            login(response.token);
            navigate("/");
        } else {
            setError(response.message);
        }

    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Sign Up to KART</h1>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label className="input-label">E-mail</label>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="kiwi@kiwi.com"
                                className="input-field"
                                required
                            />
                            <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M3 4h14c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#999" strokeWidth="1.5" fill="none" />
                                <path d="M1 6l9 6 9-6" stroke="#999" strokeWidth="1.5" fill="none" />
                            </svg>
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <div className="input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="input-field"
                                required
                            />
                            <button
                                type="button"
                                className="input-icon-button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    {showPassword ? (
                                        <>
                                            <path d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z" stroke="#999" strokeWidth="1.5" fill="none" />
                                            <circle cx="10" cy="10" r="3" stroke="#999" strokeWidth="1.5" fill="none" />
                                        </>
                                    ) : (
                                        <>
                                            <path d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z" stroke="#999" strokeWidth="1.5" fill="none" />
                                            <circle cx="10" cy="10" r="3" stroke="#999" strokeWidth="1.5" fill="none" />
                                            <line x1="2" y1="2" x2="18" y2="18" stroke="#999" strokeWidth="1.5" />
                                        </>
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                    {error && <div className="bg-red-500 opacity-60   text-white p-2 rounded-md text-sm mt-2">{error}</div>}
                    <button type="submit" className="submit-button">
                        Sign Up
                    </button>
                </form>

                <div className="login-link">
                    <span>Vous n'avez pas de compte ? </span>
                    <a href="/register" className="login-link-text">Créer un compte</a>
                </div>
            </div>
        </div>
    );
}
