import api from '../../../../app/ApiConfig';
import { Apis } from '../../../../config';
import Cookies from 'js-cookie';
import { NotificationManager } from 'react-notifications';

const getUserLogin = async (data) => {
    try {
        let result = await api.post(Apis.GetUserLogin, data, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'
            }
        });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUserRegister = async (data) => {
    try {
        let result = await api.post(Apis.GetUserRegsiter, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const authenticate = async (data, email) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem('_sid', data)
        sessionStorage.setItem('email', email)
        setTimeout(
            function () {
                window.location.reload();
            },
            1000
        );
    }
};

const getCustomerDetail = async (email) => {
    try {
        let result = await api.get(Apis.GetCustomerDetails + email);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getCustomerUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetCustomerUpdateDetails,{data});
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const authenticateByCart = async (token, email) => {
    if (typeof window !== "undefined") {
       sessionStorage.setItem('_sid', token)
       sessionStorage.setItem('email', email)
        setTimeout(
            function () {
                window.location.href = "/checkout";
            },
            1000
        );
    } else {
        NotificationManager.error("Please check your login", "Input Error");
    }
};

const logout = (next) => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem('_sid');
        sessionStorage.removeItem('email');
        window.location.href = "/";
        // next();
    }
};

const isAuthenticate = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    return sessionStorage.getItem('_sid');
};

export default {
    getUserLogin,
    authenticate,
    isAuthenticate,
    authenticateByCart,
    getUserRegister,
    getCustomerDetail,
    getCustomerUpdate,
    logout,
};