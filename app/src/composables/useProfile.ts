import { ref, onMounted } from 'vue';
import { profileService } from '../services/profile.service';

export function useProfile() {
    const profile = ref<any>(null);
    const loading = ref(true);
    const error = ref<any>(null);

    const fetchProfile = async () => {
        loading.value = true;
        try {
            const res = await profileService.getProfile();
            profile.value = res.data;
        } catch (err) {
            error.value = err;
            console.error('Error fetching profile:', err);
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchProfile();
    });

    return {
        profile,
        loading,
        error,
        fetchProfile
    };
}
