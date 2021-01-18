import api from '../../../../app/ApiConfig';
import { Apis } from '../../../../config';
import { NotificationManager } from 'react-notifications';

const getAllCategoryList = async (slug) => {
    try {
        let result = await api.get(Apis.GetAllCategoryList+slug);
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

const getFilterByCategory = async (data) => {
    try {
        let result = await api.get(Apis.GetFilterByCategory+`/${data.slug}/${data.id}`);
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


export default {
    getAllCategoryList,
    getFilterByCategory,
};