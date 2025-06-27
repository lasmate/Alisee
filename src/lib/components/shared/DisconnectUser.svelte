<script lang="ts">
    import { userStore } from '$lib/stores/userStore';

    function handleLogout() {
        userStore.logout();
    }
</script>

<div class="flex flex-col items-center justify-center p-4">
    <button 
        on:click={handleLogout}
        class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
    >
        Se déconnecter
    </button>
</div>