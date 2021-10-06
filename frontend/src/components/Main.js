import React from "react";
import pencil from "./../images/pencil.png";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                    <img src={currentUser && currentUser.avatar} alt="Аватарка" className="profile__avatar" />
                    <div className="profile__avatar-overlay">
                        <img src={pencil} alt="Иконка" className="profile__avatar-icon" />
                    </div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title profile__title-text">{currentUser && currentUser.name}</h1>
                    <p className="profile__subtitle">{currentUser && currentUser.about}</p>
                    <button type="button" className="profile__edit profile__edit-button" id="ed2it" onClick={props.onEditProfile}></button>
                </div>
                <button type="button" className="profile__add-button" id="addButton" onClick={props.onAddPlace}></button>
            </section>
            <section className="gallery">
                <ul className="elements">
                    {props.cards.map((item) => (
                        <Card key={item._id} onCardClick={props.onCardClick} card={item} onCardDeleteClick={props.onCardDelete} onCardLike={props.onCardLike} />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
