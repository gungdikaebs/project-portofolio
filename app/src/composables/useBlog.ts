import { ref } from 'vue';
import { blogService, blogCategoriesService } from '../services/blog.service';

export function useBlog() {
    const blogs = ref<any[]>([]);
    const featuredBlogs = ref<any[]>([]);
    const blog = ref<any>(null);
    const categories = ref<any[]>([]);
    
    const loading = ref(true);
    const error = ref<any>(null);

    const fetchBlogs = async () => {
        loading.value = true;
        try {
            const res = await blogService.getBlogs();
            const allBlogs = res.data;
            
            // For public facing UI, only show published
            blogs.value = allBlogs.filter((b: any) => b.status === 'PUBLISHED');
            featuredBlogs.value = blogs.value.filter((b: any) => b.featured);
            
            // If no featured blogs, just pick the latest 3
            if (featuredBlogs.value.length === 0) {
                featuredBlogs.value = blogs.value.slice(0, 3);
            }
        } catch (err) {
            error.value = err;
            console.error('Error fetching blogs:', err);
        } finally {
            loading.value = false;
        }
    };

    const fetchBlogBySlug = async (slug: string) => {
        loading.value = true;
        try {
            const res = await blogService.getBlog(slug);
            blog.value = res.data;
        } catch (err) {
            error.value = err;
            console.error('Error fetching blog:', err);
        } finally {
            loading.value = false;
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await blogCategoriesService.getCategories();
            categories.value = res.data;
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    return {
        blogs,
        featuredBlogs,
        blog,
        categories,
        loading,
        error,
        fetchBlogs,
        fetchBlogBySlug,
        fetchCategories
    };
}
