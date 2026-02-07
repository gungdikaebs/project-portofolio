import api from './api';

export const skillsService = {
    getSkills() {
        return api.get('/skills');
    },
    getCategories() {
        return api.get('/skills/categories');
    }
};
