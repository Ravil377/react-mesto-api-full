import React from "react";

function ImagePopup(props) {
    const handlePopupClose = (e) => {
        if (e.target === e.currentTarget) props.onClose();
    };

    React.useEffect(() => {
        const handleClosePopupOnEsc = (e) => {
            if (e.code === "Escape") props.onClose();
        };
        if (props.card) {
            document.addEventListener("keyup", handleClosePopupOnEsc);
        }
        return () => document.removeEventListener("keyup", handleClosePopupOnEsc);
    });

    return (
        <div className={`popup popup_gallery ${props.card && "popup_opened"}`} onClick={handlePopupClose}>
            <div className="full-image">
                <button type="button" className="popup__button-close" onClick={props.onClose}></button>
                <figure className="full-image__container">
                    <img src={props.card?.link} alt={props.card?.name} className="full-image__image" />
                    <figcaption className="full-image__caption">{props.card?.name}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;
