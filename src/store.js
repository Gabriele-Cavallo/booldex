import { reactive } from "vue";

export const store = reactive({
    pokedex: [],
    myPokemon: [],
    searchedPokemon: null,
});