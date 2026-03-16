import api from './api';

export const blogService = {
    getBlogs() {
        return api.get('/blog');
    },

    getBlog(slug: string) {
        return api.get(`/blog/${slug}`);
    },

    createBlog(data: any) {
        return api.post('/blog', data);
    },
    
    updateBlog(id: string, data: any) {
        return api.patch(`/blog/${id}`, data);
    },

    deleteBlog(id: string) {
        return api.delete(`/blog/${id}`);
    }
};

export const blogCategoriesService = {
    getCategories() {
        return api.get('/blog-categories');
    },

    getCategory(id: string) {
        return api.get(`/blog-categories/${id}`);
    },

    createCategory(data: any) {
        return api.post('/blog-categories', data);
    },

    updateCategory(id: string, data: any) {
        return api.patch(`/blog-categories/${id}`, data);
    },

    deleteCategory(id: string) {
        return api.delete(`/blog-categories/${id}`);
    }
};
