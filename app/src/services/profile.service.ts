import api from './api';

export const profileService = {
    getProfile() {
        return api.get('/profile');
    },
    updateProfile(data: any) {
        return api.patch('/profile', data);
    }
};
