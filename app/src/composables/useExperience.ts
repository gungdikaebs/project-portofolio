import { ref, onMounted } from 'vue';
import { experienceService } from '../services/experience.service';

export function useExperience() {
    const experience = ref<any[]>([]);
    const loading = ref(true);
    const error = ref<any>(null);

    const fetchExperience = async () => {
        loading.value = true;
        try {
            const res = await experienceService.getExperience();
            // Sort in frontend if needed, but backend already does sortOrder asc.
            // User requirement: "Sort by start_date DESC".
            // Let's re-sort here just in case.
            experience.value = res.data.sort((a: any, b: any) =>
                new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
            );
        } catch (err) {
            error.value = err;
            console.error('Error fetching experience:', err);
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchExperience();
    });

    return {
        experience,
        loading,
        error,
        fetchExperience
    };
}
