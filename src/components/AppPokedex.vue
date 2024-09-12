<script>
    export default{
        name: 'AppPokedex',
        data() {
            return {

            }
        }
    }
</script>

<template>
    <section class="h-[90vh] grid grid-cols-2 px-40 place-items-center">
        <div class="border-8 border-red-950 w-full border-r-4  h-4/5 rounded-l-3xl bg-red-700">
           <div class="px-10 py-5 flex flex-col h-full">
                <div class="mb-4 h-[40px]">
                    <input class="w-1/3 h-full ps-1 outline-none border-2 border-r-0 rounded-s-sm border-red-950" type="text">
                    <button class="bg-white border-2 h-full rounded-r-sm border-red-950 border-l-0 hover:rounded-sm hover:outline hover:outline-white hover:border-blue-700 hover:border-l-2 hover:outline-1 px-3">🔍</button>
                </div>
                <div class="h-1/3 grid place-items-center mb-4">
                    <div class="bg-slate-400 w-4/5 grid place-items-center h-full">
                        <div class="border-2 grid place-items-center border-black bg-white h-4/5 w-4/5">
                            hello
                        </div>
                    </div>
                </div>
                <div class="mb-2 h-4/6 border-2 p-4 border-black bg-green-600 rounded-md">
                    hello
                </div>
           </div>
        </div>
        <div class="border-8 grid place-items-center border-red-950 border-l-4 w-full h-4/5 rounded-r-3xl bg-red-700">
            <div class="border-2 py-8 px-5 bg-white border-red-950 w-4/5 h-4/5 ">
                my pokemon
            </div>
        </div>
    </section>
</template>