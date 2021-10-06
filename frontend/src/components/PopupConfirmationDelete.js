import React from "react";

function PopupConfirmationDelete(props) {
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
        <div className={`popup popup_imageDelete ${props.isOpen && "popup_opened"}`} onClick={handlePopupClose}>
            <div className="popup__container">
                <button type="button" className="popup__button-close" onClick={props.onClose}></button>
                <h2 className="popup__container-title popup__container-title_mb">Вы уверены?</h2>
                <button type="button" className="popup__container-submit-button popup__container-submit-button_delete-button" onClick={props.onYes}>
                    Да
                </button>
            </div>
        </div>
    );
}

export default PopupConfirmationDelete;
