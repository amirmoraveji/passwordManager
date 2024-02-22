<script lang="ts" setup>
// if(process.client){

//     import { gsap } from "gsap"
// }
import { setColorTheme } from "~/composables/dark-light"

const info = ref("Hello world")
const setInfo = (): void => {
    info.value = "Niiiiiiiiiiiice"
    // this will only import and use GSAP library on client side
    import("gsap").then((gsapModule) => {
        const gsap = gsapModule.gsap // Access gsap from the module
        gsap.to(".xxx", { duration: 1, x: 100 })
    })
}
</script>
<template>
    <h1 class="xxx w-fit text-3xl text-cyan-400 font-bold underline">{{ info }}</h1>
    <NuxtLayout name="navbar" title="I am a custom layout">
        <div>
            <button class="bg-green-600 text-white p-2 rounded-lg" @click="setInfo">Click me</button>
        </div>
        <button @click="setColorTheme(useColorMode().preference == 'dark' ? 'light' : 'dark')">Dark or light</button>
    </NuxtLayout>
</template>

<style></style>
