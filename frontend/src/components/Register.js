import React from "react";
import { Link, withRouter } from "react-router-dom";

function Register({ onRegister }) {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    const handleRegisterUser = (e) => {
        e.preventDefault();
        onRegister(email, password);
    };

    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);

    return (
        <>
            <div className="auth">
                <h2 className="popup__container-title _white">Регистрация</h2>
                <form name="register" className="form" onSubmit={handleRegisterUser}>
                    <input type="email" name="email" placeholder="Email" id="Email-input" value={email || ""} onChange={handleChangeEmail} className="popup__input _mp50 _black" minLength="2" maxLength="40" required />
                    <span className="popup__input-error fio-input-error"></span>
                    <input type="password" name="password" placeholder="Пароль" id="password-input" value={password || ""} onChange={handleChangePassword} className="popup__input _black" minLength="2" maxLength="200" required />
                    <span className="popup__input-error info-input-error"></span>
                    <button type="submit" className="popup__container-submit-button _auth-button">
                        Зарегистрироваться
                    </button>
                </form>
                <Link to="sign-in" className="auth__link">
                    Уже зарегистрированы? Войти
                </Link>
            </div>
        </>
    );
}

export default withRouter(Register);
