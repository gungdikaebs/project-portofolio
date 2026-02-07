import { ref, onMounted } from 'vue';
import { educationService } from '../services/education.service';

export function useEducation() {
    const education = ref<any[]>([]);
    const certifications = ref<any[]>([]);
    const loading = ref(true);
    const error = ref<any>(null);

    const fetchData = async () => {
        loading.value = true;
        try {
            const [eduRes, certRes] = await Promise.all([
                educationService.getEducation(),
                educationService.getCertifications()
            ]);

            education.value = eduRes.data;
            certifications.value = certRes.data;
        } catch (err) {
            error.value = err;
            console.error('Error fetching education/certs:', err);
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchData();
    });

    return {
        education,
        certifications,
        loading,
        error,
        fetchData
    };
}
