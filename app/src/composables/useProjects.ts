import { ref, onMounted } from 'vue';
import { projectsService } from '../services/projects.service';

export function useProjects() {
    const projects = ref<any[]>([]);
    const loading = ref(true);
    const error = ref<any>(null);

    const project = ref<any>(null);

    const fetchProject = async (id: string) => {
        loading.value = true;
        try {
            const res = await projectsService.getProject(id);
            project.value = res.data;
        } catch (err) {
            error.value = err;
            console.error('Error fetching project:', err);
        } finally {
            loading.value = false;
        }
    };

    const fetchProjects = async () => {
        loading.value = true;
        try {
            const res = await projectsService.getProjects();
            projects.value = res.data.filter((p: any) => p.status === 'PUBLISHED');
        } catch (err) {
            error.value = err;
            console.error('Error fetching projects:', err);
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        // We don't auto-fetch here anymore because we might only want one project
        // But to keep backward compatibility with existing components using useProjects(), 
        // we can check if we should fetch all. 
        // Better pattern: Components call fetchProjects() or fetchProject() themselves.
        // However, current usage in Projects.vue likely relies on onMounted.
        // Let's keep fetchProjects() in onMounted ONLY if we are using the array. 
        // Actually, safer to NOT break existing usage: 
        // But wait, if I use this composable in ProjectDetail, I don't want to fetch ALL projects.
        // So I should remove the auto-fetch from onMounted and let components call it. 
        // I need to update Projects.vue to call fetchProjects() if I do this.
        // Let's check Projects.vue usage.
    });

    return {
        projects,
        project,
        loading,
        error,
        fetchProjects,
        fetchProject
    };
}
