import api from './api';

export const projectsService = {
    getProjects() {
        return api.get('/projects');
    },

    getProject(id: string) {
        return api.get(`/projects/${id}`);
    },

    createProject(data: FormData) {
        return api.post('/projects', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
};
