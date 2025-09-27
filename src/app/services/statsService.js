import axios from './interceptors';

export default {
    getStats(from, to) {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .get(baseUrl + `stats?from=${from}&to=${to}`, {})
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.data)
                })
        });
    },
    getStatsByProfessional(from, to, professionalId) {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .get(baseUrl + `stats/professional/${professionalId}?from=${from}&to=${to}`, {})
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.data)
                })
        });
    },
    getViews(from, to) {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .get(baseUrl + `visits/visit-stats/?from=${from}&to=${to}`, {})
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.data)
                })
        });
    },
    addVisit(page) {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .post(baseUrl + 'visits', page, {})
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.data)
                })
        });
    },
    getUsersStats(from, to) {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            
            const params = new URLSearchParams();
            params.append('from', from);
            params.append('to', to);
            
            axios
                .get(`${baseUrl}user/stats/created-users?${params.toString()}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error('Error al obtener estadísticas de usuarios:', error);
                    reject(error.response?.data || error.message);
                });
        });
    }
};
