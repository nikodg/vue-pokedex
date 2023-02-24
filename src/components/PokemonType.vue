<template>
  <div v-for="{ type } in types"
    :key="type.url"
    :class="['type-wrap', type.name]"
  >
    {{ type.name }}
  </div>
</template>

<script setup>
  defineProps({
    types: {
      type:Array,
      required: true,
    }
  });
</script>

<style lang="scss" scoped>
@import "../scss/variables";

@mixin typeColor($color){
  background: $color;
  border: solid 1px darken($color, 15%);
}

.type-wrap {
  display: inline-block;
  color: var(--pkm-white);
  text-shadow: 0px 0px 1px #000;
  text-transform: uppercase;
  font-size: .7em;
  padding: 2px 8px;
  background: #A8A878;
  letter-spacing: 2px;
  border-radius: 5px;
  margin: 15px 10px;
  min-width: 86px;

  &.normal { @include typeColor($normal) }  
  &.fire { @include typeColor($fire) }  
  &.fighting { @include typeColor($fighting) }  
  &.water { @include typeColor($water) }  
  &.flying { @include typeColor($flying) }  
  &.grass { @include typeColor($grass) }  
  &.poison { @include typeColor($poison) }  
  &.electric { @include typeColor($electric) }  
  &.ground { @include typeColor($ground) }  
  &.psychic { @include typeColor($psychic) }  
  &.rock { @include typeColor($rock) }  
  &.ice { @include typeColor($ice) }  
  &.bug { @include typeColor($bug) }  
  &.dragon { @include typeColor($dragon) }  
  &.ghost { @include typeColor($ghost) }  
  &.dark { @include typeColor($dark) }  
  &.steel { @include typeColor($steel) }  
  &.fairy { @include typeColor($fairy) }
}
</style>