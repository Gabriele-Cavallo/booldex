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
            userInput: String,
            onOff: Boolean
        }
    }
</script>

<template>
    <section class="border-2 py-8 px-3 bg-white border-red-950 w-4/5 h-4/5 max-h-4/5 overflow-y-auto">
        <div v-if="onOff">
            <h2 class="font-bold text-xl mb-4 px-2">My Pokemons</h2>
            <div 
                @click="() => { $emit('update:userInput', pokemon); $emit('searchPokemon', pokemon) }" 
                class="hover:font-bold cursor-pointer hover:bg-gray-400 px-2" 
                v-for="pokemon in store.myPokemon" 
                :key="pokemon.id"
                >
                {{pokemon}}
            </div>
        </div>
    </section>
</template>