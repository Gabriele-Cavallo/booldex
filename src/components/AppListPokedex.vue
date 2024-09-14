<script>
import { store } from '../store';

    export default{
        name: 'AppListPokedex',
        data(){
            return{
                store
            }
        }
    }
</script>

<template>
    <section class="overflow-y-auto h-4/6 max-h-4/6 border-2 p-4 border-black bg-green-600 rounded-md  ">
        <ol>
            <li v-for="pokemon in store.pokedex">{{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}</li>
        </ol>
    </section>
</template>