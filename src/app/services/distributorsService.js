import axios from './interceptors';

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default {
    addDistributor(distributor) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}distributors/new`, distributor, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getDistributors() {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}distributors`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getDistributorById(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}distributors/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    editDistributor(id, distributor) {
        return new Promise((resolve, reject) => {
            axios
                .put(`${API_URL}distributors/${id}`, distributor, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    deleteDistributor(id) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${API_URL}distributors/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
};
