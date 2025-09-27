import axios from './interceptors';

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default {
    addProfession(professionData) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}profession/new`, professionData, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getProfessions() {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}profession`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getById(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}profession/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    editProfession(id, professionData) {
        return new Promise((resolve, reject) => {
            axios
                .put(`${API_URL}profession/${id}`, professionData, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${API_URL}profession/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
};
