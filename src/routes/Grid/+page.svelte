<script>
  import Item from '../Item/+page.svelte';
  // sample product IDs
  const productIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<div class="grid grid-cols-3 gap-6 p-4">
  {#each productIds as id}
    <Item productId={id} />
  {/each}
</div>