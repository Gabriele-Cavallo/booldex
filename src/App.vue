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
      // Function that recovers all the first 151 pokemon
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
  <main class="bg-[url(../public/img/bg.jpg)] bg-cover bg-no-repeat">
    <AppPokedex />
  </main>
</template>