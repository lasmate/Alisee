<script>
  import {theme,toggleTheme} from '$lib/stores/themeStore';
  import { onMount } from 'svelte';
 
  let iconSrc = "";
  let altText = "";
  
  // Subscribe to theme changes to update icon and alt text
  const unsubscribe = theme.subscribe(currentTheme => {
    if (currentTheme === 'dark') {
      iconSrc = "src/img/Icon/dark_mode_40dp_000000_FILL0_wght400_GRAD0_opsz40.svg";
      altText = "Activate light mode";
    } else {
      iconSrc = "src/img/Icon/light_mode_40dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.svg";
      altText = "Activate dark mode";
    }
  });
  onMount(() => {
    // Clean up the subscription when the component is destroyed
    return () => unsubscribe();
  });
</script>

<div class="sticky flex flex-row place-content-around  rounded-b-3xl text-white">
  <div class="border-1 h-10 sticky rounded-bl-3xl basis-1/8 text-center flex items-center justify-center  dark:bg-black">
    <button on:click={() => window.location.href = '/'}><img src="src\img\Icon\toggle_off_40dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.svg" alt="Home" class="h-8 w-8 inline-block" /></button>
  </div>
  <div class="border-1 h-10 sticky  basis-1/4 text-center flex items-center justify-center dark:bg-black">
    <button on:click={() => window.location.href = '/cart'}><img src="src\img\Icon\shopping_cart_40dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.svg" alt="Cart" class="h-8 w-8 inline-block" /></button>
    </div>
  <div class="border-1 h-25 bticky rounded-b-3xl basis-1/3 bg-[url(img\silusins.png)] bg-contain bg-no-repeat bg-origin-border bg-center dark:bg-black"></div>
  <div class="border-1 h-10 sticky   basis-1/4 text-center flex items-center justify-center dark:bg-black">
    <button on:click={() => window.location.href = '/account'}><img src="src\img\Icon\account_circle_40dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.svg" alt="Account profile" class="h-8 w-8 inline-block" /></button>
  </div>
  <div class="border-1 h-10 sticky  rounded-br-3xl basis-1/8 text-center flex items-center justify-center dark:bg-black">
    <button on:click={toggleTheme}><img src={iconSrc} alt="Activate light mode" class="h-8 w-8 inline-block" /></button>
  </div>
</div>
