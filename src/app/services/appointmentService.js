import axios from './interceptors';

const API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default {
    create(appointmentData) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}appointments/new`, appointmentData, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data));
        });
    },
    getAll() {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}appointments`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getById(id) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}appointments/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    update(id, appointmentData) {
        return new Promise((resolve, reject) => {
            axios
                .put(`${API_URL}appointments/${id}`, appointmentData, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data));
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${API_URL}appointments/${id}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getByDateRangeAndProfessional(startDate, endDate, professionalId) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}appointments/range/${professionalId}?startDate=${startDate}&endDate=${endDate}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getByProfessional(professionalId) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}appointments/professional/${professionalId}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getByPatient(patientId) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}appointments/patient/${patientId}`, {})
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getByDateRange(startDate, endDate) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}appointments/range`, {
                    params: { startDate, endDate },
                    headers: {}
                })
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getByDayAndProfessional(date, professionalId) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}appointments/day/${professionalId}`, {
                    params: { date },
                    headers: {}
                })
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
    getByDay(date) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${API_URL}appointments/day`, {
                    params: { date },
                    headers: {}
                })
                .then(response => resolve(response.data))
                .catch(error => reject(error.data));
        });
    },
};
