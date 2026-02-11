import { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/context";
import UserInfo from "../../components/userInfo.";

export default function Register() {
    const [pseudo, setPseudo] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log(e);
        e.preventDefault();

        if (!passwordRegex.test(password)) {
            alert(
                "Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et un symbole."
            );
            return;
        }

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas 🥝");
            return;
        }

        const response = await fetch(`http://localhost:3000/auth/register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pseudo: pseudo, mail: mail, password: password })
        }).then(res => res.json());

        if (response.token) {
            UserInfo(response.token);
            login(response.token);
            navigate("/");
        }

        console.log(response);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Créer un compte KIWI</h1>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label className="input-label">Nom d'utilisateur</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                value={pseudo}
                                onChange={e => setPseudo(e.target.value)}
                                placeholder="kiwi"
                                className="input-field"
                                required
                            />
                            <svg
                                className="input-icon"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <path
                                    d="M10 10a4 4 0 100-8 4 4 0 000 8zM3 18a7 7 0 0114 0"
                                    stroke="#999"
                                    strokeWidth="1.5"
                                    fill="none"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">E-mail</label>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                value={mail}
                                onChange={e => setMail(e.target.value)}
                                placeholder="kiwi@kiwi.com"
                                className="input-field"
                                required
                            />
                            <svg
                                className="input-icon"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <path
                                    d="M3 4h14c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                                    stroke="#999"
                                    strokeWidth="1.5"
                                    fill="none"
                                />
                                <path
                                    d="M1 6l9 6 9-6"
                                    stroke="#999"
                                    strokeWidth="1.5"
                                    fill="none"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Mot de passe</label>
                        <div className="input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Mot de passe"
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
                                            <path
                                                d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z"
                                                stroke="#999"
                                                strokeWidth="1.5"
                                                fill="none"
                                            />
                                            <circle
                                                cx="10"
                                                cy="10"
                                                r="3"
                                                stroke="#999"
                                                strokeWidth="1.5"
                                                fill="none"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <path
                                                d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z"
                                                stroke="#999"
                                                strokeWidth="1.5"
                                                fill="none"
                                            />
                                            <circle
                                                cx="10"
                                                cy="10"
                                                r="3"
                                                stroke="#999"
                                                strokeWidth="1.5"
                                                fill="none"
                                            />
                                            <line
                                                x1="2"
                                                y1="2"
                                                x2="18"
                                                y2="18"
                                                stroke="#999"
                                                strokeWidth="1.5"
                                            />
                                        </>
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Confirmer le mot de passe</label>
                        <div className="input-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="Confirmez votre mot de passe"
                                className="input-field"
                                required
                            />
                            <button
                                type="button"
                                className="input-icon-button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    {showConfirmPassword ? (
                                        <>
                                            <path
                                                d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z"
                                                stroke="#999"
                                                strokeWidth="1.5"
                                                fill="none"
                                            />
                                            <circle
                                                cx="10"
                                                cy="10"
                                                r="3"
                                                stroke="#999"
                                                strokeWidth="1.5"
                                                fill="none"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <path
                                                d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z"
                                                stroke="#999"
                                                strokeWidth="1.5"
                                                fill="none"
                                            />
                                            <circle
                                                cx="10"
                                                cy="10"
                                                r="3"
                                                stroke="#999"
                                                strokeWidth="1.5"
                                                fill="none"
                                            />
                                            <line
                                                x1="2"
                                                y1="2"
                                                x2="18"
                                                y2="18"
                                                stroke="#999"
                                                strokeWidth="1.5"
                                            />
                                        </>
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="submit-button">
                        S'inscrire 🥝
                    </button>
                </form>

                <div className="login-link">
                    <span>Vous avez déjà un compte ? </span>
                    <a href="/login" className="login-link-text">
                        Se connecter
                    </a>
                </div>
            </div>
        </div>
    );
}
