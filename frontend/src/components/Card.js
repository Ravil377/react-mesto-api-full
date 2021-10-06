import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
    ); 

    const cardLikeButtonClassName = (
        `element__like-button ${isLiked && 'element__like-button_active'}`
    );
    
    const handleDeleteClick = () => {
        props.onCardDeleteClick(props.card)
    }

    const handleClick = (e) => {
        props.onCardClick(props.card);
    }

    const handleLikeClick = () => {
        props.onCardLike(props.card);
    }

    return (
        <>
        <li className="element">
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <img src={props.card.link} className="element__image" alt={props.card.name} onClick={handleClick} />
            <div className="element__down-sector">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="element__like-count">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
        </>
    );
}

export default Card;
