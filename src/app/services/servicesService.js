import axios from './interceptors';

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default {
    addService(service) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}service/new`, service, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getServices() {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}service`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getServiceById(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}service/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    editService(id, service) {
        return new Promise((resolve, reject) => {
            axios
                .put(`${API_URL}service/${id}`, service, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${API_URL}service/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
};
