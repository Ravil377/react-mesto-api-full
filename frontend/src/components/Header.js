import React from "react";
import logo from "./../images/logo.svg";
import { Link } from "react-router-dom";
import burger from "./../images/burger.svg";
import close from "./../images/close.svg";

function Header({ isLoggedIn, isEmail, onExit }) {
    const [isOpenBurger, setIsOpenBurger] = React.useState(false);

    const handleClickExit = () => {
        setIsOpenBurger(false);
        onExit();
    };

    return (
        <>     
            <ul className={`header__burger-auth ${isOpenBurger && "header__auth_open"}`}>
                <li className="auth__link auth__link_fontsize">{isEmail}</li>
                <li className="auth__link auth__link_fontsize auth__link_color auth__link_bm18" onClick={handleClickExit}>Выйти</li>
            </ul>       
            <header className="header">

                <img src={logo} alt="Лого" className="header__logo" />
                {isLoggedIn ? (
                    <ul className={`header__auth header__auth_none`}>
                        <li className="auth__link auth__link_fontsize">{isEmail}</li>
                        <li className="auth__link auth__link_fontsize auth__link_color" onClick={handleClickExit}>
                            Выйти
                        </li>
                    </ul>
                ) : (
                    <ul className={`header__auth ${isLoggedIn && "header__auth_none"}`}>
                        {window.location.pathname === "/sign-up" ? (
                            <Link to="sign-in" className="auth__link auth__link_fontsize">
                                Войти
                            </Link>
                        ) : (
                            <Link to="sign-up" className="auth__link auth__link_fontsize">
                                Регистрация
                            </Link>
                        )}
                    </ul>
                )}
                {isLoggedIn && 
                    <img src={isOpenBurger ? close : burger} alt="Бургер" className="header__burger" onClick={() => setIsOpenBurger(state => !state)}/>
                }
            </header>
        </>
    );
}

export default Header;
