import axios from './interceptors';
import { jwtDecode }  from "jwt-decode";

export default {
    login(userData) {
        return new Promise((resolve, reject) => {         
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .post(baseUrl + 'user/login', userData, {})
                .then((response) => {
                    var token = response.data.accessToken;
                    var decoded = jwtDecode(token);
                    localStorage.setItem('userInfo', JSON.stringify(decoded));
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.data)
                })
        });
    },
    register(accountData, notLogin) {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .post(baseUrl + 'user/register', accountData, {})
                .then((response) => {
                    if(!notLogin) {
                        var token = response.data.accessToken;
                        var decoded = jwtDecode(token);
                        localStorage.setItem('userInfo', JSON.stringify(decoded));
                    }
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.data)
                })
        });
    },
    getUsers() {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .get(baseUrl + 'user', {})
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.data)
                })
        });
    },
    getUser(userId) {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .get(baseUrl + `user/${userId}`, {})
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.data)
                })
        });
    },
    getByEmail(email) {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .get(baseUrl + `user/getByEmail/${email}`, {})
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.data)
                })
        });
    },
    updateUser(userId, userData) {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .put(baseUrl + `user/${userId}`, userData, {})
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.data)
                })
        });
    },
    deleteUser(userId) {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .delete(baseUrl + `user/${userId}`, {})
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.data)
                })
        });
    },
    auth(accountData, isWebUser) {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .post(baseUrl + `user/auth?webUser=${isWebUser || false}`, accountData, {})
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.data)
                })
        });
    },
    resetPass(email, isWebUser) {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .post(baseUrl + `user/reset-password?webUser=${isWebUser || false}`, {email}, {})
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.data)
                })
        });
    },
    changePass(accountData, isWebUser) {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .put(baseUrl + `user/change-pass?webUser=${isWebUser || false}`, accountData, {})
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.data)
                })
        });
    }
};

