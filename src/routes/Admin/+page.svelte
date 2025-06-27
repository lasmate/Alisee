<script lang="ts">
  import { theme } from '$lib/stores/themeStore';
  import Navbar from '$lib/components/shared/Navbar.svelte';
  import ProductsManagement from '$lib/components/admin/ProductsManagement.svelte';
  import UsersManagement from '$lib/components/admin/UsersManagement.svelte';
  import OrdersManagement from '$lib/components/admin/OrdersManagement.svelte';
  import { fly } from 'svelte/transition';

  import { Motion } from 'svelte-motion';

  let currentTheme: string;
  theme.subscribe(value => currentTheme = value);

  let left = 0;
  let width = 0;
  let opacity = 0;
  let ref: any;
  let navs: { name: string; key: 'products' | 'orders' | 'users' }[] = [
    {
      name: "Produit",
      key: 'products',
    },
    {
      name: "Commandes",
      key: 'orders',
    },
    {
      name: "Utilisateurs",
      key: 'users',
    },
  ];
  let positionMotion = (node: HTMLElement) => {
    let refNode = () => {
      let mint = node.getBoundingClientRect();
      left = node.offsetLeft;
      width = mint.width;
      opacity = 1;
    };
    node.addEventListener("mouseenter", refNode);
    return {
      destroy() {
        node.removeEventListener("mouseenter", refNode);
      },
    };
  };

  // State for which management modal is open
  let openModal: 'products' | 'orders' | 'users' | null = null;
</script>

<div
    class="h-[100vh] transition-colors duration-300 {currentTheme === 'dark' ? 'bg-black' : 'bg-white'}"
    style="background-image: url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Cg fill=\'%23e19b17\' fill-opacity=\'0.45\'%3E%3Cpolygon fill-rule=\'evenodd\' points=\'8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4\'/%3E%3C/g%3E%3C/svg%3E');"
>
    <Navbar />
    <!--Animated tabs-->
    <div class="py-2 w-full">
    <ul
      on:mouseleave={() => {
        width = width;
        left = left;
        opacity = 0;
      }}
      class="relative mx-auto flex w-fit rounded-full border-1 {currentTheme === 'dark' ? 'border-white text-white'  : 'border-black text-black'} p-1"
    >
      {#each navs as item}
        <button
          use:positionMotion
          class="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
          on:click={() => openModal = item.key}
          on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && (openModal = item.key)}
          type="button"
        >
        {item.name}
        </button>
      {/each}
      <Motion
        animate={{
          left: left,
          width: width,
          opacity: opacity,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
  
        }}
        let:motion
      >
        <li
          use:motion
          class="absolute z-0 h-7 rounded-full {currentTheme === 'light' ? 'bg-black' : 'bg-white'} md:h-12"
        ></li>
      </Motion>
    </ul>
  </div>

    <!-- Management Modals -->
    {#if openModal === 'products'}
      <ProductsManagement
        currentTheme={currentTheme}
        on:close={() => openModal = null}
      />
    {:else if openModal === 'orders'}
      <OrdersManagement
        currentTheme={currentTheme}
        on:close={() => openModal = null}
      />
    {:else if openModal === 'users'}
      <UsersManagement
        currentTheme={currentTheme}
        on:close={() => openModal = null}
      />
    {/if}

</div>