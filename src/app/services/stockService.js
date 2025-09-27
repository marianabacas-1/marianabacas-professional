import axios from './interceptors';

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default {
    addStock(productStock) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}product-stock/new`, productStock, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getStock() {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}product-stock`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getStockById(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}product-stock/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    editStock(id, productStock) {
        return new Promise((resolve, reject) => {
            axios
                .put(`${API_URL}product-stock/${id}`, productStock, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${API_URL}product-stock/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
};
