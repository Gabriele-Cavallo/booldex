<script>
import { store } from '../../src/store.js';

    export default{
        name: 'AppInfoPokemon',
        data(){
            return{
                store
            }
        },
        props: {
            fetchError: String
        }
    }
</script>

<template>
    <section class="mb-2 max-h-4/6 h-full border-2 p-4 border-black bg-green-600 rounded-md overflow-y-auto">
        <div v-if="store.searchedPokemon">
            <div>
                <strong>Name</strong>: {{ store.searchedPokemon.name }}
            </div>
            <div>
                <strong>Type</strong>: <span v-if="store.searchedPokemon.types">{{ store.searchedPokemon.types.map(type => type.type.name).join(', ') }}</span>
            </div>
            <div>
                <strong>Height</strong>: "{{ store.searchedPokemon.height }}""
            </div>
            <div>
                <strong>Weight</strong>: {{ store.searchedPokemon.weight }} lbs.
            </div>
            <div>
                <div><strong>Stats</strong>:</div> 
                <div class="flex items-center justify-between" v-for="stat in store.searchedPokemon.stats">
                    <span>{{ stat.stat.name }}</span>
                    <div class="h-full flex items-center w-1/2 border-2 border-black">
                        <progress class="w-full h-[10px] bg-transparent" max="255" :value="stat.base_stat"></progress>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>{{ fetchError }}</div>
    </section>
</template>

<style scoped>
progress::-webkit-progress-value {
    background-color: black; 
}

progress::-moz-progress-bar {
    background-color: black; 
}
</style>