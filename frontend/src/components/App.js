import React from "react";
import { Route, Switch, Redirect, useHistory, withRouter } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupConfirmationDelete from "./PopupConfirmationDelete";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isConfirmationDelete, setIsConfirmationDelete] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isMessagePopupOpen, setIsMessagePopupOpen] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [selectedCard, setSelectedCard] = React.useState();
    const [selectedCardForDelete, setSelectedCardForDelete] = React.useState([]);
    const [cards, setCards] = React.useState([]);
    const [isEmail, setIsEmail] = React.useState(null);
    const history = useHistory();

    React.useEffect(() => {
        api.checkToken()
            .then((res) => {
                setLoggedIn(true);
                history.push("/main");
                setIsEmail(res.email);
            })
            .catch((err) => console.log(err));
    }, [history]);

    React.useEffect(() => {
        api.getProfileInfo()
            .then((res) => setCurrentUser(res))
            .catch((err) => console.log(err));
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards(res);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleDeleteCard = () => {
        api.deleteCard(selectedCardForDelete._id)
            .then((res) => {
                setCards(() => cards.filter((card) => card._id !== selectedCardForDelete._id));
                setIsConfirmationDelete(false);
            })
            .catch((err) => console.log(err));
    };

    const handleDeleteClick = (card) => {
        setSelectedCardForDelete(card);
        setIsConfirmationDelete(true);
    };

    const handleCardLike = (props) => {
        const isLiked = props.likes.some((i) => i === currentUser._id);
        api.changeLikeCardStatus(props._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((card) => (card._id === props._id ? newCard : card)));
            })
            .catch((err) => console.log(err));
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen((state) => !state);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen((state) => !state);
    };

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen((state) => !state);
    };

    const handleCardClick = (elem) => setSelectedCard(elem);

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmationDelete(false);
        setSelectedCard(null);
        setSelectedCardForDelete(null);
        setIsMessagePopupOpen(false);
    };

    const handleUpdateUser = (name, about) => {
        api.postProfileInfo(name, about)
            .then((res) => {
                setCurrentUser(res);
                setIsEditProfilePopupOpen(false);
            })
            .catch((err) => console.log(err));
    };

    const handleRegisterUser = (email, password) => {
        api.register(email, password)
            .then((res) => {
                if (res) {
                    history.push("/sign-in");
                    setIsSuccess(true);
                    setIsMessagePopupOpen(true);
                } else {
                    setIsSuccess(false);
                    setIsMessagePopupOpen(true);
                }
            })
            .catch((err) => {
                setIsSuccess(false);
                setIsMessagePopupOpen(true);
            });
    };

    const handleClickExit = () => {
        api.logout()
            .then((res) => {
                setIsEmail(null);
                setLoggedIn(false);
                history.push("/sign-in");
            })
            .catch((err) => console.log(err));
    };

    const handleLoginUser = (email, password) => {
        api.login(email, password)
            .then((res) => {
                if (res.message === "Пользователь залогинен") {
                    setLoggedIn(true);
                    setIsEmail(res.email);
                    history.push("/main");
                }
            })
            .catch((err) => {
                setIsSuccess(false);
                setIsMessagePopupOpen(true);
            });
    };

    const handleUpdateAvatar = (avatar) => {
        api.postProfileAvatar(avatar)
            .then((res) => {
                setCurrentUser(res);
                setIsEditAvatarPopupOpen(false);
            })
            .catch((err) => console.log(err));
    };

    const handleAddPlaceSubmit = (nameCard, linkCard) => {
        api.postCard(nameCard, linkCard)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                setIsAddPlacePopupOpen(false);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    <Header isLoggedIn={loggedIn} isEmail={isEmail} onExit={handleClickExit} />
                    <Switch>
                        <ProtectedRoute
                            path="/main"
                            loggedIn={loggedIn}
                            component={Main}
                            onEditAvatar={handleEditAvatarClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditProfile={handleEditProfileClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleDeleteClick}
                        />
                        <Route path="/sign-up">
                            <Register onRegister={handleRegisterUser} />
                        </Route>

                        <Route path="/sign-in">
                            <Login onLogin={handleLoginUser} />
                        </Route>

                        <Route exact path="/">
                            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-up" />}
                        </Route>
                    </Switch>

                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                    <PopupConfirmationDelete isOpen={isConfirmationDelete} onClose={closeAllPopups} onYes={handleDeleteCard} />
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                    <InfoTooltip onClose={closeAllPopups} isOpen={isMessagePopupOpen} isSuccess={isSuccess} />
                    <Footer />
                </div>
            </CurrentUserContext.Provider>
        </>
    );
}

export default withRouter(App);
