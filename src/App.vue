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
    methods: {
      getAllPokemon(){
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit=151')
        .then(response => this.store.pokedex = response.data.results)
      }
    },
    mounted(){
      this.getAllPokemon();
    },
  }
</script>

<template>
  <AppHeader />
  <main>
    <AppPokedex />
  </main>
</template>

<style scoped>

</style>
