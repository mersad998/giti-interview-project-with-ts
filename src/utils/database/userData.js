import { AsyncStorage } from 'react-native';
const txtErrSaveDB = 'خطایی در ذخیره اطلاعات';
const txtErrGetDB = 'خطایی در دسترسی به اطلاعات';

export async function saveUser(user) {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
        throw txtErrSaveDB;
    }
}

export async function getUser() {
    try {
        const user = await AsyncStorage.getItem('user');
        return JSON.parse(user);
    } catch (error) {
        throw txtErrGetDB;
    }
}

export async function removeUser() {
    console.log('async storage remove data called');

    try {
        await AsyncStorage.removeItem('user');
    } catch (error) {
        throw error;
    }
}
