import { useState } from "react";
import bgImage from "../assets/background.png";
import nsdlLogo from "../assets/nsdl_bank_logo.png";
import styles from "../styles/loginpage.module.css";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <div className={styles.page}>
            <img src={bgImage} alt="" className={styles.bgImage} />
            <div className={styles.card}>
                <div className={styles.logoRow}>
                    <img src={nsdlLogo} alt="NSDL" width={200} />
                </div>

                <h2 className={styles.title}>Login to your Account</h2>

                <div className={styles.field}>
                    <label className={styles.label}>Username</label>
                    <input className={styles.input} type="text" placeholder="Enter your Username"
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Password</label>
                    <div className={styles.passwordWrapper}>
                        <input
                            className={styles.input}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className={styles.eyeIcon}
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <button className={styles.loginBtn}>Login</button>

                <div className={styles.row}>
                    <label className={styles.rememberLabel}>
                        <input type="checkbox" checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)} style={{ marginRight: 6 }} />
                        Remember Me
                    </label>
                    <a href="#" className={styles.forgotLink}>Forgot Password?</a>
                </div>
            </div>

            <div className={styles.footer}>
                <a href="#" className={styles.footerLink}>Terms and Conditions</a>
                <a href="#" className={styles.footerLink}>Privacy Policy</a>
                <a  className={styles.footerLinkca}>CA Privacy Notice</a>
            </div>
        </div>
    );
};

export default Login;