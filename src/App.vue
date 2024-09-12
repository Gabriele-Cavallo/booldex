<script>
  import axios from 'axios';
  import { store } from './store.js';
  import AppHeader from './components/AppHeader.vue';
  import AppPokedex from './components/AppPokedex.vue';

  export default{
    components: {
      AppHeader,
      AppPokedex
    },
    data(){
      return{
        store,
      }
    },
    // methods: {
    //   getAllPokemon(){
    //     axios.get('https://pokeapi.co/api/v2/pokemon/?limit=151')
    //     .then(response => this.store.pokedex = response.data.results)
    //   }
    // },
    // mounted(){
    //   this.getAllPokemon();
    // },
  }
</script>

<template>
  <AppHeader />
  <AppPokedex />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
