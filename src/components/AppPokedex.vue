<script>
  import axios from 'axios';
  import { store } from '../store.js';

    export default{
        name: 'AppPokedex',
        data() {
            return {
                store,
                userInput: '',
                searchedPokemon: null,
                gif: 'back_default',
                intervalId: null
            }
        },
        methods: {
            // Funzione che cerca il singolo pokemon tramite user input
            getSinglePokemon(singlePokemonSearch){
                axios.get(`https://pokeapi.co/api/v2/pokemon/${singlePokemonSearch.toLowerCase().trim()}/`)
                .then(response => this.searchedPokemon = response.data)
            },

            // Funzione che a intervalli di 1.5s alterna la gif mostrata e se è attivo un intervall pulisce l'id
            alternateGif(){{
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
            }},

            // Funzione che richiama le funzioni getSinglePokemon e alternateGif
            pokemonSearchHandler(userInput){
                this.getSinglePokemon(userInput),
                this.alternateGif()
            },

            // Funzione che "cattura" il pokemon scelto nell'array myPokemon e nel local storage
            catchPokemon(userInput){
                const storedPokemon = userInput[0].toUpperCase() + userInput.slice(1).toLowerCase();
                store.myPokemon.push(storedPokemon)
                localStorage.setItem('my-pokemon', JSON.stringify(store.myPokemon));
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
    <section class="h-[90vh] grid grid-cols-2 px-40 place-items-center">
        <div class="border-8 border-red-950 w-full border-r-4  h-4/5 rounded-l-3xl bg-red-700">
           <div class="px-10 py-5 flex flex-col h-full">
                <div class="mb-4 h-[40px] flex">
                    <input v-model="userInput" class="w-1/3 h-full ps-1 outline-none border-2 border-r-0 rounded-s-sm border-red-950" type="text">
                    <button @click="pokemonSearchHandler(userInput)" class="bg-white border-2 h-full rounded-r-sm border-red-950 border-l-0 hover:rounded-sm hover:outline hover:outline-white hover:border-blue-700 hover:border-l-2 hover:outline-1 px-3">🔍</button>
                    <div v-if="searchedPokemon" class="flex grow justify-end">
                        <button v-if="!store.myPokemon.includes(userInput[0].toUpperCase() + userInput.slice(1).toLowerCase())" class="bg-slate-300 border-2 border-black px-5" @click="catchPokemon(userInput)">Catch!</button>
                        <button v-else class="bg-slate-300 border-2 border-black px-5" @click="releasePokemon(userInput)">Release!</button>
                    </div>
                </div>
                <div class="h-1/3 grid place-items-center mb-4">
                    <div class="bg-slate-400 w-4/5 grid place-items-center h-full">
                        <div class="border-2 grid place-items-center border-black bg-white h-4/5 w-4/5 relative">
                            <img v-if="searchedPokemon" :src="searchedPokemon.sprites.other.showdown[gif]" alt="pokemon-gif">
                            <div v-else class="absolute inset-1 bg-[url('../../public/img/pokeball.png')] bg-center bg-contain bg-no-repeat"></div>
                        </div>
                    </div>
                </div>
                <div class="mb-2 h-4/6 border-2 p-4 border-black bg-green-600 rounded-md">
                    <div v-if="searchedPokemon">
                        <div>
                            <strong>Name</strong>: {{ searchedPokemon.name }}
                        </div>
                        <div>
                            <strong>Type</strong>: <span v-if="searchedPokemon.types">{{ searchedPokemon.types.map(type => type.type.name).join(', ') }}</span>
                        </div>
                        <div>
                            <strong>Height</strong>: "{{ searchedPokemon.height }}""
                        </div>
                        <div>
                            <strong>Weight</strong>: {{ searchedPokemon.weight }} lbs.
                        </div>
                        <div>
                            <div><strong>Stats</strong>:</div> 
                            <div class="flex items-center justify-between" v-for="stat in searchedPokemon.stats">
                                <span>{{ stat.stat.name }}</span>
                                <div class="h-full flex items-center w-1/2 border-2 border-black">
                                    <progress class="w-full h-[10px] bg-transparent" max="100" :value="stat.base_stat"></progress>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>No valid pokemon selected!</div>
                </div>
           </div>
        </div>
        <div class="border-8 grid place-items-center border-red-950 border-l-4 w-full h-4/5 rounded-r-3xl bg-red-700">
            <div class="border-2 py-8 px-5 bg-white border-red-950 w-4/5 h-4/5 overflow-y-hidden">
                <h2 class="font-bold text-xl mb-4">My Pokemons</h2>
                <div v-for="pokemon in store.myPokemon">{{pokemon}}</div>
            </div>
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