<script>
  import axios from 'axios';
  import { store } from '../../src/store.js';
  import AppPokemonFinder from './AppPokemonFinder.vue';
  import AppPokedexDisplay from './AppPokedexDisplay.vue';
  import AppInfoPokemon from './AppInfoPokemon.vue';
  import AppMyPokemon from './AppMyPokemon.vue';

    export default{
        name: 'AppPokedex',
        components: {
            AppPokemonFinder,
            AppPokedexDisplay,
            AppInfoPokemon,
            AppMyPokemon
        },
        data() {
            return {
                store,
                gif: 'back_default',
                intervalId: null,
                userInput: '',
                fetchError: 'No valid pokemon selected!'
            }
        },
        methods: {
            // Funzione che cerca il singolo pokemon tramite user input
            async getSinglePokemon(singlePokemonSearch){
                try {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${singlePokemonSearch.toLowerCase().trim()}/`);
                    const data = await response.data;
                    store.searchedPokemon = data;
                } catch (error) {
                    if (error.response || error.response.status === 404) {
                        store.searchedPokemon = null
                        this.fetchError = 'Can\'t find any pokemon with this name!'
                    }
                }
            },

            // Funzione che a intervalli di 1.5s alterna la gif mostrata e se è attivo un intervall pulisce l'id
            alternateGif(){
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }

                this.intervalId = setInterval(() => {
                    if(this.gif === 'back_default'){
                        this.gif = 'front_default'
                    }else if (this.gif === 'front_default'){
                        this.gif = 'back_default'
                    }
                }, 1500)
            },

            // Funzione che richiama le funzioni getSinglePokemon e alternateGif
            pokemonSearchHandler(userInput){
                this.getSinglePokemon(userInput),
                this.alternateGif()
            },

            // Funzione che "cattura" il pokemon scelto nell'array myPokemon e nel local storage
            catchPokemon(userInput){
                if(userInput.toLowerCase() === store.searchedPokemon.name) {
                    const storedPokemon = userInput[0].toUpperCase() + userInput.slice(1).toLowerCase();
                    store.myPokemon.push(storedPokemon)
                    localStorage.setItem('my-pokemon', JSON.stringify(store.myPokemon));
                }
            },

            // Funzione che "rilascia" il pokemon presente nell'array myPokemon e aggiorna il local storage 
            releasePokemon(userInput){
                const releasePokemon = userInput[0].toUpperCase() + userInput.slice(1).toLowerCase();

                store.myPokemon.forEach((pokemon, index) => {
                    if(releasePokemon === pokemon){
                        store.myPokemon.splice(index, 1);
                        localStorage.setItem('my-pokemon' , JSON.stringify(store.myPokemon));
                    }
                })
            },

            // Funzione che recupera i dati salvati nel local storage
            fetchMyPokemon(){
                const myPokemons = localStorage.getItem('my-pokemon');

                if(myPokemons){
                    store.myPokemon = JSON.parse(myPokemons);
                }
            }
        },
        mounted(){
            this.fetchMyPokemon()
        }
    }
</script>

<template>
    <section class="h-[90vh] grid grid-cols-1 lg:grid-cols-2 px-40 place-items-center">
        <div class="px-10 py-5 flex flex-col border-8 border-red-950 border-r-8 lg:border-r-4 justify-self-end h-4/5 lg:rounded-l-3xl rounded-3xl sm:rounded-3xl lg:rounded-none w-full lg:w-2/3 bg-red-700">
            <AppPokemonFinder 
                @releasePokemon="releasePokemon(userInput)" 
                @catchPokemon="catchPokemon(userInput)" 
                @searchPokemon="pokemonSearchHandler(userInput)"  
                v-model:userInput = userInput />
            <AppPokedexDisplay :gif = "gif" />
            <AppInfoPokemon :fetchError = fetchError />
        </div>
        <div class="invisible lg:visible border-8 grid place-items-center justify-self-start border-red-950 border-l-4 w-2/3 h-4/5 rounded-r-3xl bg-red-700">
            <AppMyPokemon @searchPokemon="pokemonSearchHandler" v-model:userInput = userInput />
        </div>
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