import React from "react";

function PopupWithForm(props) {
    const handlePopupClose = (e) => {
        if (e.target === e.currentTarget) props.onClose();
    }

    React.useEffect(() => {
        const handleClosePopupOnEsc = (e) => {
            if (e.code === "Escape") props.onClose();
        }
        if (props.isOpen) {
            document.addEventListener('keyup', handleClosePopupOnEsc);
        } 
        return () => {
            document.removeEventListener('keyup', handleClosePopupOnEsc);
        }
    }, [props, props.isOpen]);

    return (
        <>
            <div className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`} onClick={handlePopupClose}>
                <div className="popup__container">
                    <button type="button" className="popup__button-close" onClick={props.onClose}></button>
                    <h2 className="popup__container-title">{props.title}</h2>
                    <form name={props.name} className={`form ${props.name}`} onSubmit={props.onSubmit}>
                        {props.children}
                    <button type="submit" 
                        className="popup__container-submit-button popup__container-submit-button_edit-button">
                        Сохранить
                    </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PopupWithForm;