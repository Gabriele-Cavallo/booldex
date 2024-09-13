<script>
import { store } from '../store';

    export default{
        name: 'AppPokemonFinder',
        data(){
            return{
                store,
            }
        },
        props:{
            userInput: String
        }
    }
</script>

<template>
    <section class="mb-4 h-[40px] flex">
        <input placeholder="pokemon name" :value="userInput" @input="$emit('update:userInput', $event.target.value)"  class="w-1/3 h-full ps-1 outline-none border-2 border-r-0 rounded-s-sm border-red-950" type="text">
        <button @click="$emit('searchPokemon')" class="bg-white border-2 h-full rounded-r-sm border-red-950 border-l-0 hover:rounded-sm hover:outline hover:outline-white hover:border-blue-700 hover:border-l-2 hover:outline-1 px-3">🔍</button>
        <div v-if="store.searchedPokemon" class="flex grow justify-end">
            <button v-if="!store.myPokemon.includes(userInput[0].toUpperCase() + userInput.slice(1).toLowerCase()) && userInput === store.searchedPokemon.name" class="bg-slate-300 border-2 border-black px-5" @click="$emit('catchPokemon')">Catch!</button>
            <button v-else-if="store.myPokemon.includes(userInput[0].toUpperCase() + userInput.slice(1).toLowerCase()) && userInput === store.searchedPokemon.name" class="bg-slate-300 border-2 border-black px-5" @click="$emit('releasePokemon')">Release!</button>
        </div>
    </section>
</template>