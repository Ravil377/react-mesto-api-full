import React from "react";
import success from "./../images/success.svg";
import error from "./../images/error.svg";

function InfoTooltip(props) {
    const handlePopupClose = (e) => {
        if (e.target === e.currentTarget) props.onClose();
    };

    React.useEffect(() => {
        const handleClosePopupOnEsc = (e) => {
            if (e.code === "Escape") props.onClose();
        };

        if (props.isOpen) {
            document.addEventListener("keyup", handleClosePopupOnEsc);
        }

        return () => {
            document.removeEventListener("keyup", handleClosePopupOnEsc);
        };
    }, [props, props.isOpen]);

    return (
        <>
            <div className={`popup ${props.isOpen && "popup_opened"}`} onClick={handlePopupClose}>
                <div className="popup__container popup__container_tooltip">
                    <button type="button" className="popup__button-close" onClick={props.onClose}></button>
                    <img src={props.isSuccess ? success : error} alt="Картинка" className="popup__container-image"></img>
                    <h2 className="popup__container-title popup__container-title_mb-reset">{props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}</h2>
                </div>
            </div>
        </>
    );
}

export default InfoTooltip;
