import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = React.useState();
    const [about, setAbout] = React.useState();
    const currentUser = React.useContext(CurrentUserContext);

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeDescription = (e) => {
        setAbout(e.target.value);
    }

    function handleSubmitProfile(e) {
        e.preventDefault();
        props.onUpdateUser(name, about);
    } 

    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
      }, [currentUser, props.isOpen]); 

    return (
            <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmitProfile}>
        <>
            <input type="text" name="name" 
                placeholder="Имя" id="fio-input" 
                className="popup__input popup__input_type_name" 
                minLength="2" maxLength="40" value={name || ''} onChange={handleChangeName} 
                required />
            <span className="popup__input-error fio-input-error"></span>
            <input type="text" name="about" placeholder="О себе" 
                id="info-input" className="popup__input popup__input_type_info" 
                minLength="2" maxLength="200" value={about || ''} onChange={handleChangeDescription}
                required />
            <span className="popup__input-error info-input-error"></span>
        </>
    </PopupWithForm>
    )
}

export default EditProfilePopup;