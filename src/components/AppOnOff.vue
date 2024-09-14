<script>
    export default{
        name: 'AppOnOff',
        props: {
            onOff: Boolean
        }
    }
</script>

<template>
    <button @click="() => {$emit('update:onOff', !onOff); $emit('turnOnOff')}" class="absolute top-4 right-4 border-2 border-red-950 rounded-[50%] p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-red-950">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
        </svg>
    </button>
</template>