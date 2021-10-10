class Api {
    constructor(options) {
        this._options = options;
    }

    _answerForServer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getProfileInfo() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: "GET",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => this._answerForServer(res));
    }

    postProfileInfo(name, about) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: "PATCH",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        }).then((res) => this._answerForServer(res));
    }

    postProfileAvatar(avatar) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: avatar,
            }),
        }).then((res) => this._answerForServer(res));
    }

    postCard(nameCard, linkCard) {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: "POST",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nameCard,
                link: linkCard,
            }),
        }).then((res) => this._answerForServer(res));
    }

    changeLikeCardStatus(id, isLiked) {
        const methodParametr = isLiked ? "DELETE" : "PUT";
        return fetch(`${this._options.baseUrl}/cards/${id}/likes/`, {
            method: methodParametr,
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => this._answerForServer(res));
    }

    getInitialCards() {
        return fetch(`${this._options.baseUrl}/cards`, {
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => this._answerForServer(res));
    }

    deleteCard(id) {
        return fetch(`${this._options.baseUrl}/cards/${id}`, {
            method: "DELETE",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => this._answerForServer(res));
    }

    login(userEmail, userPassword) {
        return fetch(`${this._options.baseUrl}/signin`, {
            method: "POST",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: userPassword,
                email: userEmail,
            }),
        }).then((res) => this._answerForServer(res));
    }

    logout() {
        return fetch(`${this._options.baseUrl}/logout`, {
            method: "POST",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => this._answerForServer(res));
    }

    register(userEmail, userPassword) {
        return fetch(`${this._options.baseUrl}/signup`, {
            method: "POST",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: userPassword,
                email: userEmail,
            }),
        }).then((res) => this._answerForServer(res));
    }

    checkToken() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: "GET",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => this._answerForServer(res));
    }
}

const apiOptions = {
    baseUrl: 'https://ravil377.nomoredomains.monster',
};

// const apiOptions = {
//     baseUrl: 'http://localhost:3000',
//     authUrl: "http://localhost:3000"
// };


const api = new Api(apiOptions);

export default api;
