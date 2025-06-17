<script lang="ts">
  import { theme, toggleTheme } from '$lib/stores/themeStore';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  // start with a safe default
  let currentTheme = 'dark';
  let mounted = false;

  const unsubscribe = theme.subscribe((value) => {
    // only react to store changes after we're mounted
    if (mounted) {
      currentTheme = value;
    }
  });

  onMount(() => {
    mounted = true;
    // read the saved theme before first render
    const saved = browser ? localStorage.getItem('theme') : null;
    currentTheme = saved || 'dark';
    // push it into the store so everything stays in sync
    theme.set(currentTheme);
    return () => unsubscribe();
  });

  $: iconSrc = currentTheme === 'dark'
    ? '/src/img/Icon/light_mode_40dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.svg'
    : '/src/img/Icon/dark_mode_40dp_000000_FILL0_wght400_GRAD0_opsz40.svg';

  $: highContrastSrc = currentTheme === 'dark'
    ? '/src/img/Icon/toggle_off_40dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.svg'
    : '/src/img/Icon/toggle_on_40dp_000000_FILL0_wght400_GRAD0_opsz40.svg';

  $: cartIconSrc = currentTheme === 'dark'
    ? '/src/img/Icon/shopping_cart_40dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.svg'
    : '/src/img/Icon/shopping_cart_40dp_000000_FILL0_wght400_GRAD0_opsz40.svg';

  $: accountIconSrc = currentTheme === 'dark'
    ? '/src/img/Icon/account_circle_40dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.svg'
    : '/src/img/Icon/account_circle_40dp_000000_FILL0_wght400_GRAD0_opsz40.svg';
</script>

{#if mounted}
  <div class="sticky flex flex-row place-content-around rounded-b-3xl text-white">
    <div class="border-1 h-10 rounded-bl-3xl basis-1/8 text-center flex items-center justify-center {currentTheme === 'dark' ? 'bg-black' : 'bg-white'} transition-colors duration-300">
      <button on:click={() => (window.location.href = '/')}><img src={highContrastSrc} alt="HighContrastToggle" class="h-8 w-8 inline-block" /></button>
    </div>
    <div class="border-1 h-10 basis-1/4 text-center flex items-center justify-center {currentTheme === 'dark' ? 'bg-black' : 'bg-white'} transition-colors duration-300">
      <button on:click={() => (window.location.href = '/Cart')}><img src={cartIconSrc} alt="Cart" class="h-8 w-8 inline-block" /></button>
    </div>
    <div class="border-1 h-25 rounded-b-3xl basis-1/4 bg-[url(img\silusins.png)] bg-contain bg-no-repeat bg-origin-border bg-center {currentTheme === 'dark' ? 'bg-black' : 'bg-white'} transition-colors duration-300"></div>
    <div class="border-1 h-10 basis-1/4 text-center flex items-center justify-center {currentTheme === 'dark' ? 'bg-black' : 'bg-white'} transition-colors duration-300">
      <button on:click={() => (window.location.href = '/account')}><img src={accountIconSrc} alt="Account profile" class="h-8 w-8 inline-block" /></button>
    </div>
    <div class="border-1 h-10 rounded-br-3xl basis-1/8 text-center flex items-center justify-center {currentTheme === 'dark' ? 'bg-black' : 'bg-white'} transition-colors duration-300">
      <button on:click={toggleTheme}><img src={iconSrc} alt="Toggle theme" class="h-8 w-8 inline-block" /></button>
    </div>
  </div>
{/if}