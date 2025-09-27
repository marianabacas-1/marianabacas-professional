import axios from './interceptors';

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default {
    addPaymentFile(paymentFile) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}payment-file/new`, paymentFile, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getPaymentFiles(patientId) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}payment-file/${patientId}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getByPatientId(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}payment-file/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    editPaymentFiles(id, paymentFiles) {
        return new Promise((resolve, reject) => {
            axios
                .put(`${API_URL}payment-file/${id}`, paymentFiles, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${API_URL}payment-file/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
};
