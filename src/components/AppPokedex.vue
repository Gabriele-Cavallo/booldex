<script>
  import axios from 'axios';
  import { store } from '../../src/store.js';
  import AppPokemonFinder from './AppPokemonFinder.vue';
  import AppPokedexDisplay from './AppPokedexDisplay.vue';
  import AppInfoPokemon from './AppInfoPokemon.vue';
  import AppMyPokemon from './AppMyPokemon.vue';
  import AppListPokedex from './AppListPokedex.vue';

    export default{
        name: 'AppPokedex',
        components: {
            AppPokemonFinder,
            AppPokedexDisplay,
            AppInfoPokemon,
            AppMyPokemon,
            AppListPokedex
        },
        data() {
            return {
                store,
                gif: 'back_default',
                intervalId: null,
                userInput: '',
                fetchError: ''
            }
        },
        methods: {
            // Function that resets searchedPokemon and fetchError when the input field is empty and clear interval if it exist
            resetResearch(){
                if(this.userInput.trim() === ''){
                    store.searchedPokemon = null;
                    this.fetchError = ''
                }
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
            },

            // Function that reproduces a string in audio
            stringToAudio(text) {
                if (!('speechSynthesis' in window)) {
                console.error('Web Speech API non supportata.');
                return;
                }

                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'it-IT'; 
                const voices = window.speechSynthesis.getVoices();
                utterance.voice = voices.find(voice => voice.name === ' Microsoft Elsa Desktop - Italian (Italy)');
                utterance.volume = 0.8;
                window.speechSynthesis.speak(utterance);
            },

            // Function that searches for the single pokemon via user input and starts the alternateGif function
            async getSinglePokemon(singlePokemonSearch){
               if(singlePokemonSearch !== ''){
                    try {
                        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${singlePokemonSearch.toLowerCase().trim()}/`);
                        const data = await response.data;

                        if(data){
                            this.fetchError = ''
                            store.searchedPokemon = data;
                            this.alternateGif();

                            const pokemon = store.pokemons.find(p => p.name.toLowerCase() === singlePokemonSearch.toLowerCase());
                            if (pokemon && pokemon.description) {
                                this.stringToAudio(pokemon.description);
                            }
                        }

                    } catch (error) {
                        if (error.response || error.response.status === 404) {
                            store.searchedPokemon = null
                            this.fetchError = 'Can\'t find any pokemon with this name!'
                        }
                    }
               }
            },

            // Function that alternates the gif shown at intervals of 1.5s and if an interval is active it cleans the id
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

            // Function that "captures" the chosen Pokemon in the myPokemon array and in local storage
            catchPokemon(userInput){
                if(userInput.toLowerCase() === store.searchedPokemon.name) {
                    const storedPokemon = userInput[0].toUpperCase() + userInput.slice(1).toLowerCase();
                    store.myPokemon.push(storedPokemon)
                    localStorage.setItem('my-pokemon', JSON.stringify(store.myPokemon));
                }
            },

            // Function that "releases" the Pokemon present in the myPokemon array and updates the local storage 
            releasePokemon(userInput){
                const releasePokemon = userInput[0].toUpperCase() + userInput.slice(1).toLowerCase();

                store.myPokemon.forEach((pokemon, index) => {
                    if(releasePokemon === pokemon){
                        store.myPokemon.splice(index, 1);
                        localStorage.setItem('my-pokemon' , JSON.stringify(store.myPokemon));
                    }
                })
            },

            // Function that recovers data saved in local storage
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
        <div class="px-10 py-5 flex flex-col border-8 border-red-950 border-r-8 lg:border-r-4 justify-self-end h-4/5  max-h-[80vh] lg:rounded-l-3xl rounded-3xl sm:rounded-3xl lg:rounded-none w-full lg:w-2/3 bg-red-700">
            <AppPokemonFinder 
                @releasePokemon="releasePokemon(userInput)" 
                @catchPokemon="catchPokemon(userInput)" 
                @searchPokemon="getSinglePokemon(userInput)"  
                @resetResearch="resetResearch()"
                v-model:userInput = userInput
                />
            <AppPokedexDisplay :gif = "gif" />
            <AppInfoPokemon v-if="store.searchedPokemon !== null || fetchError !== ''" :fetchError = fetchError />
            <AppListPokedex 
                @searchPokemon="getSinglePokemon"
                v-model:userInput = userInput
                v-else-if="(store.searchedPokemon === null && userInput === '') || userInput !== ''"
            />
        </div>
        <div class="invisible lg:visible border-8 grid place-items-center justify-self-start border-red-950 border-l-4 w-2/3 h-4/5 rounded-r-3xl bg-red-700">
            <AppMyPokemon @searchPokemon="getSinglePokemon" v-model:userInput = userInput />
        </div>
    </section>
</template>