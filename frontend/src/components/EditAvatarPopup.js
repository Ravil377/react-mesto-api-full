import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const [avatar, setAvatar] = React.useState('');

    const handleSubmitAvatar = (e) => {
        e.preventDefault();
        props.onUpdateAvatar(avatar);
    };

    const handleChangeAvatar = (e) => {
        setAvatar(e.target.value);
    }

    React.useEffect(() => {
        setAvatar('');
    }, [props.isOpen])

    return (
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmitAvatar}>
            <>
                <input type="url" name="avatar" value={avatar} placeholder="Ссылка на картинку"
                onChange={handleChangeAvatar} 
                id="avatar-input" className="popup__input popup__input_avatar" required />
                <span className="popup__input-error avatar-input-error"></span>
            </>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
