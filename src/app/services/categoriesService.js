import axios from './interceptors';

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default {
    addCategory(category) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}categories/new`, category, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getCategories() {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}categories`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getCategoryById(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}categories/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    editCategory(id, category) {
        return new Promise((resolve, reject) => {
            axios
                .put(`${API_URL}categories/${id}`, category, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${API_URL}categories/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
};
