import axios from './interceptors';

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default {
    newPayment(paymentInfo) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}payments/create-preference`, paymentInfo, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getPayments() {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}payments`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getById(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}payments/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
};
