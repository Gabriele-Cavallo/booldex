
<script>
import { store } from '../../src/store.js';

    export default{
        name: 'AppPokedexDisplay',
        data(){
            return{
                store,
                
            }
        },
        props:{
            gif: String
        },
    }
</script>

<template>
    <section class="h-1/3 grid place-items-center mb-4">
        <div class="bg-slate-400 w-4/5 grid place-items-center h-full">
            <div class="border-2 grid place-items-center border-black bg-white h-4/5 w-4/5 relative">
                <img class="h-1/2" v-if="store.searchedPokemon" :src="store.searchedPokemon.sprites.other.showdown[gif]" alt="pokemon-gif">
                <div v-else class="absolute inset-1 bg-[url('../../public/img/pokeball.png')] bg-center bg-contain bg-no-repeat"></div>
            </div>
        </div>
    </section>
</template>