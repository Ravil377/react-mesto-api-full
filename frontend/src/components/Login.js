import React from "react";
import { withRouter } from "react-router-dom";

function Login({ onLogin }) {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    const handleLoginUser = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);

    return (
        <>
            <div className="auth">
                <h2 className="popup__container-title _white">Вход</h2>
                <form name="login" className="form" onSubmit={handleLoginUser}>
                    <input type="email" name="email" placeholder="Email" id="Email-input" value={email || ""} onChange={handleChangeEmail} className="popup__input _mp50 _black" minLength="2" maxLength="40" required />
                    <span className="popup__input-error fio-input-error"></span>
                    <input type="password" name="password" placeholder="Пароль" id="password-input" value={password || ""} onChange={handleChangePassword} className="popup__input _black" minLength="2" maxLength="200" required />
                    <span className="popup__input-error info-input-error"></span>
                    <button type="submit" className="popup__container-submit-button _auth-button">
                        Войти
                    </button>
                </form>
            </div>
        </>
    );
}

export default withRouter(Login);
