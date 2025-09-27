import axios from './interceptors';

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default {
    addOffice(office) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}office/new`, office, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getOffices() {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}office`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getOfficeById(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}office/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    editOffice(id, office) {
        return new Promise((resolve, reject) => {
            axios
                .put(`${API_URL}office/${id}`, office, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${API_URL}office/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
};
