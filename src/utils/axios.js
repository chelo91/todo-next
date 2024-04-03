import axios from 'axios';
const urlApi = process.env.URL_API;

// Función genérica para realizar solicitudes GET
export const axiosGet = async (endPoint, cookie) => {
    try {
        const options = {
            headers: {
                Cookie: cookie,
            },
            withCredentials: true, // Habilita el envío de cookies
        };
        // Realiza la solicitud GET con Axios y pasa las opciones
        const response = await axios.get(urlApi + endPoint, options);
        // Retorna los datos obtenidos de la API
        return response.data;
    } catch (error) {
        // Maneja el error en caso de que ocurra
        throw error;
    }
}

// Función genérica para realizar solicitudes POST
export const axiosPost = async (endPoint, cookie, postDataJson) => {
    try {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
            withCredentials: true, // Habilita el envío de cookies
        };
        // Realiza la solicitud POST con Axios y pasa las opciones y los datos
        const response = await axios.post(urlApi + endPoint, postDataJson, options);
        // Retorna los datos obtenidos de la API
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Maneja el error en caso de que ocurra
        throw error;
    }
}

// Función genérica para realizar solicitudes PUT
export const axiosPut = async (endPoint, cookie, postDataJson) => {
    try {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
            withCredentials: true, // Habilita el envío de cookies
        };
        // Realiza la solicitud PUT con Axios y pasa las opciones y los datos
        const response = await axios.put(urlApi + endPoint, postDataJson, options);
        // Retorna los datos obtenidos de la API
        //console.log(response.data);
        return response.data;
    } catch (error) {
        // Maneja el error en caso de que ocurra
        throw error;
    }
}

// Función genérica para realizar solicitudes DELETE
export const axiosDelete = async (endPoint, cookie) => {
    try {
        const options = {
            headers: {
                Cookie: cookie,
            },
            withCredentials: true, // Habilita el envío de cookies
        };
        // Realiza la solicitud DELETE con Axios y pasa las opciones
        const response = await axios.delete(urlApi + endPoint, options);
        // Retorna los datos obtenidos de la API
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Maneja el error en caso de que ocurra
        throw error;
    }
}