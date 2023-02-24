<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="green-screen-wrap">
        <div 
          ref="greenScreen"
          class="green-screen normal-text" 
          v-html="state.greenScreenText"
        />
      </div>
    </div>

    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <button 
        v-for="(_, key) in state.details"
        :key="key"
        :class="`blue-button ${key}`"
        @click="updateGreenScreen(key)"
      >
        {{ key }}
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import { fetchData } from "@/utils";

  const props = defineProps({
    pokemon: {
      type: Object,
      required: true,
    },
    species: {
      type: Object,
      required: true,
    },
  });

  const greenScreen = ref(null);
  const state = reactive({
    greenScreenText: '',
    details: {},
  });

  function setDetail(data, detail) {
    const ddKey = detail === 'Strengths' ? 'to' : 'from';
    const hndKey = detail === 'Strengths' ? 'from' : 'to';
    const texts = [];

    for (const key in data){
      const dd = data[key][`double_damage_${ddKey}`].map(item => item.name.toUpperCase());
      const hd = data[key][`half_damage_${hndKey}`].map(item => item.name.toUpperCase());
      const nd = data[key][`no_damage_${hndKey}`].map(item => item.name.toUpperCase());

      let text = `${key.toUpperCase()} ${detail} <br>---<br> `;
      if (dd.length) text += `Double damage ${ddKey}: <br>${dd.join(", ")}<br><br> `;
      if (hd.length) text += `Half damage ${hndKey}: <br>${hd.join(", ")}<br><br> `;
      if (nd.length) text += `No damage ${hndKey}: <br>${nd.join(", ")}<br><br> `;
      texts.push(text);
    }

    return texts.join("<br>");
  }

  const data = {}
  for (const type of props.pokemon.types){
    const response = await fetchData(type.type.url);
    if (response) data[type.type.name] = response.damage_relations;
  }

  state.details.str = setDetail(data, 'Strengths');
  state.details.weak = setDetail(data, 'Weaknesses');

  const abilities = props.pokemon.abilities.map(data => data.ability.name);
  state.details.abl = `Abilities:<br>${abilities.join(", ")}`;

  let inches = props.pokemon.height * 3.93701;
  const ft = Math.floor(inches / 12);
  inches = Math.floor(inches % 12);
  state.details.ht = `Height:<br>${ft}'${inches}"`;

  const lbs = props.pokemon.weight * 0.22046226;
  state.details.wt = `Weight:<br>${lbs.toFixed(2)} lbs`;

  state.details.stat = "";
  props.pokemon.stats.forEach(stat => {
    state.details.stat += `${stat.stat.name}: ${stat.base_stat} <br>`;
  });

  const moves = props.pokemon.moves.map(move => move.move.name);
  state.details.mov = `Moves:<br>${moves.join(", ")}`;

  const entry = props.species.flavor_text_entries.find(entry => {
    return entry.language.name === "en"
  });

  state.details.det = entry.flavor_text;
  state.greenScreenText = entry.flavor_text;

  const normalTextKeys = ['det', 'wt', 'str', 'weak'];

  function updateGreenScreen(key) {
    state.greenScreenText = state.details[key];
    normalTextKeys.includes(key)
      ? greenScreen.value.classList.add('normal-text')
      : greenScreen.value.classList.remove('normal-text');
  }
</script>

<style lang="scss" scoped>
.green-screen-wrap {
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 20px;
}

.green-screen {
  background: #74E647;
  padding: 15px 20px;
  border: solid 1px #eee;
  border-radius: 10px;
  box-shadow: inset 0px 0px 10px #666;
  height: 200px;
  text-transform: capitalize;
  overflow: auto;

  &.normal-text {
    text-transform: initial;
  }

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: none;
    -webkit-box-shadow: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.25);
    border-radius: 16px;
    outline: none;
  }
}

.blue-button {
  display: inline-block;
  width: calc(25% - 2px);
  padding: 8px 0;
  background: var(--pkm-blue);
  color: var(--pkm-white);
  overflow: hidden;
  box-shadow: none;
  border: solid 1px #222;
  border-radius: 2px;
  margin: 1px;
  text-transform: uppercase;

  &:hover {
    background-color: var(--pkm-dark-blue);
  }
}
</style>