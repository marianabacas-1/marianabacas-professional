import axios from './interceptors';

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default {
    addOrder(order) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}orders/new`, order, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getOrders() {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}orders`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getOrderById(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}orders/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    editOrder(id, order) {
        return new Promise((resolve, reject) => {
            axios
                .put(`${API_URL}orders/${id}`, order, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${API_URL}orders/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getOrdersByStatus(from, to) {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            
            const params = new URLSearchParams();
            params.append('from', from);
            params.append('to', to);
            
            axios
                .get(`${baseUrl}orders/stats/orders-by-status?${params.toString()}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error('Error al obtener estadísticas de pedidos:', error);
                    reject(error.response?.data || error.message);
                });
        });
    }
};
