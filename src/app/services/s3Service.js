
import axios from './interceptors';

export default {
    uploadFile(file, location) {
        const formData = new FormData();
        formData.append('file', file);
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .post(baseUrl + `s3/upload?location=${location}`, formData, {})
                .then(response => {
                    console.log(response);
                    const fileName = response.data.data.filename; // Aquí puedes acceder a la URL del archivo subido en el objeto de respuesta
                    resolve(fileName);
                })
                .catch(error => {
                    reject(error)
                });
        });
    },
    deleteFile(location, filename) {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .delete(baseUrl + `s3/delete?location=${location}&filename=${filename}`, {})
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.data)
                })
        });
    },
    createFolder(folderName) {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .post(baseUrl + 's3/folder/create', { folderName }, {})
                .then(response => resolve(response.data))
                .catch(error => {
                    reject(error)
                });
        });
    },
    getFolderImages(folderName) {
        return new Promise((resolve, reject) => {           
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
            axios
                .get(baseUrl + `s3/list/${folderName}`, {})
                .then(response => resolve(response.data))
                .catch(error => {
                    reject(error)
                });
        });
    },
};