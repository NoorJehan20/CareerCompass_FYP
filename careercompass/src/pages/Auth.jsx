import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./Auth.css";

const AuthPage = ({ appId }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [authMode, setAuthMode] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const mode = params.get("mode");
        if (mode === "login" || mode === "create") {
            setAuthMode(mode);
        }
    }, [location.search]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) console.log("Logged in:", user.email);
        });
        return () => unsubscribe();
    }, []);

    const toggleMode = () => {
        setAuthMode(authMode === "login" ? "create" : "login");
        setMessage({ type: "", text: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            let userCredential;

            if (authMode === "create") {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);

                const userDoc = doc(
                    db,
                    `artifacts/${appId}/users/${userCredential.user.uid}/profile/metadata`
                );

                await setDoc(userDoc, {
                    email,
                    firstName,
                    lastName,
                    createdAt: new Date().toISOString(),
                });

                setMessage({ type: "success", text: "Account created successfully!" });
                navigate("/");
            } else {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
                setMessage({ type: "success", text: "Logged in successfully!" });
                navigate("/");
            }
        } catch (err) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setMessage({ type: "success", text: "Logged out successfully" });
        } catch {
            setMessage({ type: "error", text: "Logout failed" });
        }
    };

    return (
        <div className="auth-overlay">
            <div className="auth-card">
                <button className="auth-close-btn" onClick={() => navigate(-1)}>
                    ✕
                </button>

                <h1 className="auth-title">
                    {authMode === "login" ? "Login" : "Create Account"}
                </h1>

                <p className="auth-toggle-text">
                    {authMode === "login"
                        ? "Don't have an account?"
                        : "Already have an account?"}
                    <button className="toggle-link" onClick={toggleMode}>
                        {authMode === "login" ? "Create Account" : "Login"}
                    </button>
                </p>

                {message.text && (
                    <div className={`message-box ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {authMode === "create" && (
                        <div className="name-fields">
                            <input
                                className="auth_input"  // <--- Added Class
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <input
                                className="auth_input"  // <--- Added Class
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <input
                        className="auth_input"  
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        className="auth_input"  
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading
                            ? authMode === "login"
                                ? "Logging in..."
                                : "Creating..."
                            : authMode === "login"
                                ? "Login"
                                : "Create Account"}
                    </button>
                </form>

                <button className="logout-btn" onClick={handleSignOut}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AuthPage;
