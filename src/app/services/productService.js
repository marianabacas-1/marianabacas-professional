import axios from './interceptors';

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default {
    addProduct(product) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}product/new`, product, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getProducts() {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}product`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getProductById(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}product/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    importProducts(file) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", file);
            axios
                .post(`${API_URL}product/import`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })                
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    editProduct(id, product) {
        return new Promise((resolve, reject) => {
            axios
                .put(`${API_URL}product/${id}`, product, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${API_URL}product/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
};
