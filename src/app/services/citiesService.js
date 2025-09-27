import axios from './interceptors';

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default {
    addCity(city) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}cities/new`, city, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getCities() {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}cities`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getCityById(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}cities/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    editCity(id, city) {
        return new Promise((resolve, reject) => {
            axios
                .put(`${API_URL}cities/${id}`, city, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${API_URL}cities/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
};
