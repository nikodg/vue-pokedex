<template>
  <footer class="pokedex-footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a>, 
          <a href="https://www.flaticon.com/authors/darius-dan" title="Darius Dan">Darius Dan</a> and 
          <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from 
          <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.pokedex-footer {
  background: var(--pkm-red);
  padding: 15px 0;
  padding-bottom: max(15px, env(safe-area-inset-bottom));
  color: var(--pkm-white);
  border-top: solid var(--pkm-border-thickness) var(--pkm-dark-red);
  text-shadow: 0px 1px 1px #444;
  text-align: center;

  a, a:visited {
    color: var(--pkm-yellow);
  }
}
</style>

