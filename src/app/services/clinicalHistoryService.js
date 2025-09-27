import axios from './interceptors';

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default {
    addClinicalHistory(clinicalHistory) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}clinical-history/new`, clinicalHistory, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getClinicalHistories() {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}clinical-history`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getByPatientId(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}clinical-history/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    editClinicalHistory(id, clinicalHistory) {
        return new Promise((resolve, reject) => {
            axios
                .put(`${API_URL}clinical-history/${id}`, clinicalHistory, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${API_URL}clinicalHistory/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
};
