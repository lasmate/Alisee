<script lang="ts">
    import type { PageData } from './$types';

    interface Item {
        name: string;
        // Add other properties as needed
    }

    interface GridPageData {
        items: Item[];
    }

    let { data }: { data: GridPageData } = $props();
</script>


<div class="grid grid-cols-3 gap-4 background-grey-100">
    {#each data.items as item}
        <div>
            <!-- Content for each item goes here -->
            {item.name}
        </div>
    {/each}
</div>