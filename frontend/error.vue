<script setup>
defineProps(["error"])

const errorMessage = ref({ main: "", detail: "" })
onMounted(() => {
    errorMessage.value.main = "404 Page Not Found"
    errorMessage.value.detail = "Sorry about that. That's all we know"
    useGsap("mainErrorWrapper", { opacity: 0, delay: 0, translateX: 100, duration: 1, ease: "back" }, "from")
    useGsap("detailErrorWrapper", { opacity: 0, delay: 0.4, translateX: 100, duration: 1, ease: "back" }, "from")
})
</script>
<template>
    <div class="bg-gray-100 dark:bg-[#070707] transition-colors duration-200 h-screen">
        <header class="dark:text-white flex justify-between p-2">
            <div class="space-x-4 z-30">
                <NuxtLink to="/">Home</NuxtLink>
                <NuxtLink to="/xyz">About</NuxtLink>
                <NuxtLink to="/home">Shop</NuxtLink>
                <NuxtLink to="/home">Search</NuxtLink>
            </div>
            <div class="space-x-4 z-30">
                <ClientOnly>
                    <button
                        class="dark:text-white transition-colors duration-200"
                        @click="useColorMode().preference == 'dark' ? (useColorMode().preference = 'light') : (useColorMode().preference = 'dark')">
                        {{ useColorMode().preference }}
                    </button>
                </ClientOnly>
            </div>
        </header>
        <div class="dark:text-white transition-colors duration-200 h-screen absolute top-0 w-full flex justify-center items-center">
            <div class="text-center space-y-3">
                <h1 class="mainErrorWrapper text-5xl font-black">{{ errorMessage.main }}</h1>
                <p class="detailErrorWrapper text-gray-600">{{ errorMessage.detail }}</p>
                <!-- <p>Sorry about that. That's all we know</p> -->
            </div>
        </div>
    </div>
</template>
<style scoped></style>
