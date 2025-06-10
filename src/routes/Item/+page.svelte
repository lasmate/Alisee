<script>
  import { Motion, useMotionTemplate, useMotionValue } from "svelte-motion";
  import { onMount } from 'svelte';
  export let productId;
  
  let item = { id: 0, name: '', description: '', size: '', price: 0 };

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  let background = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(51, 51, 51, 0.4), transparent 80%)`;
  
  onMount(async () => {
    const res = await fetch(`/Item?productId=${productId}`);
    if (res.ok) {
      item = await res.json();
    }
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:mousemove={(e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();

    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }}
  class="group relative max-w-[350px] w-full overflow-hidden rounded-xl bg-neutral-950"
>
  <div
    class="absolute right-5 top-0 h-px w-80 bg-gradient-to-l from-transparent via-white/30 via-10% to-transparent"
  ></div>
  <Motion
    style={{
      background,
    }}
    let:motion
  >
    <div
      use:motion
      class="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
    ></div>
  </Motion>
  <div
    class="relative flex flex-col gap-3 rounded-xl border border-white/10 px-4 py-5"
  >
    <div class="space-y-2">
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img
        src={`src/img/Produits/${productId}.jpg`}
        alt="Product ${productId} image"
        height={10}
        width={10}
        class="rounded-xl h-52 w-full object-cover opacity-75"
      />
      <div class="flex flex-row items-center justify-between pt-2">
        <h3 class="text-xl font-semibold text-neutral-200">{item.name}</h3>
        <p class="text-[13px] text-neutral-300 select-none">${item.price.toFixed(2)}</p>
      </div>
      <p class="text-sm leading-[1.5] text-neutral-400 pb-3">{item.description}</p>
      {#if item.size}
        <p class="text-sm text-neutral-400">Size: {item.size}</p>
      {/if}
      
        <button
          class="w-full rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
          on:click={() => alert(`Added ${item.name} to cart!`)}
        >
          Acheter
      </button>
      <button
        class="w-full rounded-lg bg-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
        on:click={() => alert(`Details for ${item.name}`)}>
        Customiser
      </button>
    </div>
  </div>
</div>
