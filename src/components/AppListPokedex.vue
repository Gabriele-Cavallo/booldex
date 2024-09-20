<script>
import { store } from '../store';

    export default{
        name: 'AppListPokedex',
        data(){
            return{
                store,
                showScrollUp: false,
                showScrollDown: true
            }
        },
        props:{
            onOff: Boolean
        },
        methods: {
            // Function that scrolls the list up
            scrollUp() {
                this.$refs.scrollContainer.scrollTop -= 32;
                this.updateScrollButtons();
            },

            // Function that scrolls the list down
            scrollDown() {
                this.$refs.scrollContainer.scrollTop += 32;
                this.updateScrollButtons();
            },

            // Function that uses ref to calculate the height of the container containing the element to be scrolled,
            // the height of the element to be scrolled and the states for displaying or hiding the buttons
            updateScrollButtons() {
                const container = this.$refs.scrollContainer;
                const list = this.$refs.listHeight;

                if(container && list){
                    const scrollTop = container.scrollTop;
                    const scrollHeight = list.scrollHeight;
                    const clientHeight = container.clientHeight;

                    this.showScrollUp = scrollTop > 0;
                    this.showScrollDown = scrollTop < (scrollHeight - clientHeight);
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                if (this.onOff && this.$refs.scrollContainer) {
                    this.updateScrollButtons();
                    this.$refs.scrollContainer.addEventListener('scroll', this.updateScrollButtons);
                }
            });
        },
        watch: {
            onOff(newVal) {
                this.$nextTick(() => {
                    if (newVal && this.$refs.scrollContainer && this.$refs.listHeight) {
                        this.updateScrollButtons();
                        this.$refs.scrollContainer.addEventListener('scroll', this.updateScrollButtons);
                    } else if (this.$refs.scrollContainer) {
                        this.$refs.scrollContainer.removeEventListener('scroll', this.updateScrollButtons);
                    }
                });
            }
        },
        beforeDestroy() {
            if (this.$refs.scrollContainer) {
                this.$refs.scrollContainer.removeEventListener('scroll', this.updateScrollButtons);
            }
        }
    }
</script>

<template>
    <section class="overflow-hidden h-4/6 max-h-4/6 border-2 p-2 border-black bg-green-600 rounded-md relative">
        <button 
            v-if="showScrollUp" 
            @click="scrollUp" 
            class="absolute top-[5px] left-1/2 transform -translate-x-1/2 bg-transparent text-gray-800 text-2xl px-1"
        >
            ▲
        </button>
        <button 
            v-if="showScrollDown && onOff" 
            @click="scrollDown" 
            class="absolute bottom-[5px] left-1/2 transform -translate-x-1/2 bg-transparent text-gray-800 text-2xl px-1"
        >
            ▼
        </button>
        <div v-if="onOff" ref="scrollContainer" class="overflow-auto h-full">
            <ol ref="listHeight"class="list-none p-0 m-0">
                <li 
                    class="px-2 py-1 cursor-pointer hover:bg-green-800" 
                    @click="() => {$emit('searchPokemon', pokemon.name); $emit('update:userInput', pokemon.name)}" 
                    v-for="pokemon in store.pokedex"
                    :key="pokemon.name"
                >
                    {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
                </li>
            </ol>
        </div>
    </section>
</template>

<style scoped>
.overflow-auto::-webkit-scrollbar {
    display: none;
}

.overflow-auto {
    scrollbar-width: none;
}
</style>