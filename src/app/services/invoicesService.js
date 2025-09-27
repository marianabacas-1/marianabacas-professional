import axios from './interceptors';

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default {
    addInvoice(invoice) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}invoices/new`, invoice, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getInvoices() {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}invoices`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getInvoiceById(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}invoices/${id}`, {})    
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    editInvoice(id, invoice) {
        return new Promise((resolve, reject) => {
            axios
                .put(`${API_URL}invoices/${id}`, invoice, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${API_URL}invoices/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
};
