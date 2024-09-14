<script>
import { store } from '../../src/store.js';

    export default{
        name: 'AppMyPokemon',
        data(){
            return{
                store
            }
        },
        props:{
            userInput: String
        }
    }
</script>

<template>
    <section class="border-2 py-8 px-5 bg-white border-red-950 w-4/5 h-4/5 max-h-[80vh] overflow-y-auto">
        <h2 class="font-bold text-xl mb-4">My Pokemons</h2>
        <div @click="() => { $emit('update:userInput', pokemon); $emit('searchPokemon', pokemon) }" class="hover:font-bold cursor-pointer" v-for="pokemon in store.myPokemon" :key="pokemon.id">{{pokemon}}</div>
    </section>
</template>