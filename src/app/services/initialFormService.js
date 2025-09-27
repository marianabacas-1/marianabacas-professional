import axios from './interceptors';

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default {
    addForm(form) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}initial-form/new`, form, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getForms() {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}initial-form`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getFormById(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}initial-form/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    editForm(id, form) {
        return new Promise((resolve, reject) => {
            axios
                .put(`${API_URL}initial-form/${id}`, form, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${API_URL}initial-form/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
};
