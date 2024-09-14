<script>
import { store } from '../store';

    export default{
        name: 'AppPokemonFinder',
        data(){
            return{
                store,
                visible: 'visible',
                invisible: 'invisible',
            }
        },
        props:{
            userInput: String,
            onOff: Boolean
        }
    }
</script>

<template>
    <section class="mb-4 h-[40px] flex">
        <!-- Search input field -->
        <input 
            :placeholder="onOff ? 'pokemon name' : ''" 
            :value="userInput" 
            @input="(event) => {$emit('update:userInput', event.target.value); $emit('resetResearch')}"  
            class="w-1/3 h-full min-h-[34px] ps-1 outline-none border-2 border-r-0 rounded-s-sm border-red-950 text-sm" 
            type="text"
        >

        <!-- Start search button -->
        <button 
            @click="$emit('searchPokemon')" 
            class="bg-white border-2 h-full rounded-r-sm border-red-950 border-l-0 hover:rounded-sm hover:outline hover:outline-white hover:border-blue-700 hover:border-l-2 hover:outline-1 px-3"
        >
            <span :class="[onOff ? visible : invisible]">🔍</span>
        </button>

        <!-- Pokemon catch/release button -->
        <div v-if="store.searchedPokemon" class="flex grow justify-end">
            <button 
                v-if="!store.myPokemon.includes(userInput[0].toUpperCase() + userInput.slice(1).toLowerCase()) &&
                userInput.toLowerCase() === store.searchedPokemon.name" 
                class="bg-slate-300 border-2 border-red-950 px-5" 
                @click="$emit('catchPokemon')">Catch!
            </button>
            <button 
                v-else-if="store.myPokemon.includes(userInput[0].toUpperCase() + userInput.slice(1).toLowerCase()) && 
                userInput.toLowerCase() === store.searchedPokemon.name" 
                class="bg-slate-300 border-2 border-red-950 px-5" 
                @click="$emit('releasePokemon')">Release!
            </button>
        </div>
    </section>
</template>