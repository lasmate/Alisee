<script>
  let darkMode = false;
  let icon = "src/img/Icon/light_mode_40dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.svg";

  function toggleDarkMode() {
    darkMode = !darkMode;
    if (darkMode) {
      icon = "src/img/Icon/dark_mode_40dp_000000_FILL0_wght400_GRAD0_opsz40.svg";
      document.documentElement.classList.add('dark');
    } else {
      icon = "src/img/Icon/light_mode_40dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.svg";
      document.documentElement.classList.remove('dark');
    }
  }
</script>

<div class="sticky flex flex-row place-content-around border-2 rounded-b-3xl bg-gradient-to-b from-neutral-950 to-neutral-800 text-white">
  <div class="border-1 h-15 sticky rounded-3xl basis-1/8 text-center">
    <a href="/"><img src="src\img\Icon\home_40dp_000000_FILL0_wght400_GRAD0_opsz40.svg" alt="Home" class="h-8 w-8 inline-block" /></a>
  </div>
  <div class="border-1 h-15 sticky rounded-3xl basis-1/4 text-center">
    <a href="/cart"><img src="src\img\Icon\shopping_cart_40dp_000000_FILL0_wght400_GRAD0_opsz40.svg" alt="Cart" class="h-8 w-8 inline-block" /></a>
    </div>
  <div class="border-1 h-15 bticky rounded-3xl basis-1/3 bg-[url(img\silusins.png)] bg-contain bg-no-repeat bg-origin-border bg-center"></div>
  <div class="border-1 h-15 sticky  rounded-3xl basis-1/4 text-center">
    <a href="/account"><img src="src\img\Icon\account_circle_40dp_000000_FILL0_wght400_GRAD0_opsz40.svg" alt="Account profile" class="h-8 w-8 inline-block" /></a>
  </div>
  <div class="border-1 h-15 sticky  rounded-3xl basis-1/8 text-center">
    <button on:click={toggleDarkMode}><img src={icon} alt="Activate light mode" class="h-8 w-8 inline-block" /></button>
  </div>
</div>


