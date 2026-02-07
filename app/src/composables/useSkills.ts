import { ref, onMounted } from 'vue';
import { skillsService } from '../services/skills.service';

export function useSkills() {
    const skills = ref<any[]>([]);
    const categories = ref<any[]>([]);
    const loading = ref(true);
    const error = ref<any>(null);

    const fetchSkills = async () => {
        loading.value = true;
        try {
            // We can fetch skills list (which includes category relation) OR fetch categories with skills included.
            // Based on UI, usually we group by category.
            // Backend has findAllCategories which includes skills.
            const res = await skillsService.getCategories();
            categories.value = res.data;

            const skillsRes = await skillsService.getSkills();
            skills.value = skillsRes.data;
        } catch (err) {
            error.value = err;
            console.error('Error fetching skills:', err);
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchSkills();
    });

    return {
        skills,
        categories,
        loading,
        error,
        fetchSkills
    };
}
