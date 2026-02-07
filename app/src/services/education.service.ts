import api from './api';

export const educationService = {
    getEducation() {
        return api.get('/education');
    },
    getCertifications() {
        return api.get('/certifications');
    }
};
