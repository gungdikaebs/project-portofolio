import api from './api';

export const experienceService = {
    getExperience() {
        return api.get('/experience');
    }
};
