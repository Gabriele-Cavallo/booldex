import { reactive } from "vue";
import { pokemons } from "./pokemons";

export const store = reactive({
    pokedex: [],
    myPokemon: [],
    searchedPokemon: null,
    pokemons
});