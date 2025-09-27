import axios from './interceptors';

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default {
    addTask(task) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}tasks/new`, task, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getTasks() {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}tasks`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getTaskById(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}tasks/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    editTask(id, task) {
        return new Promise((resolve, reject) => {
            axios
                .put(`${API_URL}tasks/${id}`, task, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${API_URL}tasks/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
};
