import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [nameCard, setNameCard] = React.useState('');
    const [linkCard, setLinkCard] = React.useState('');

    const handleSubmitPlaceAdd = (e) => {
        e.preventDefault();
        props.onAddPlace(nameCard, linkCard);
    };

    const handleChangeNameCard = (e) => {
        setNameCard(e.target.value);
    }

    const handleChangeLinkCard = (e) => {
        setLinkCard(e.target.value);
    }

    React.useEffect(() => {
        setNameCard('');
        setLinkCard('');
    }, [props.isOpen])

    return (
        <PopupWithForm name="add-card" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmitPlaceAdd}>
            <>
                <input type="text" name="name" placeholder="Название" id="name-input" 
                className="popup__input popup__input_name_card" value={nameCard}
                minLength="2" maxLength="30" onChange={handleChangeNameCard} required />
                <span className="popup__input-error name-input-error"></span>
                <input type="url" name="link" placeholder="Ссылка на картинку" id="foto-input" 
                className="popup__input popup__input_foto_card" value={linkCard} onChange={handleChangeLinkCard} required />
                <span className="popup__input-error foto-input-error"></span>
            </>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
