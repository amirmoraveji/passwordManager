<script setup>
const errorMessage = ref({ main: "", detail: "" })
onMounted(() => {
    errorMessage.value.main = "404 page not found"
    errorMessage.value.detail = "Sorry about that. That's all we know"
    useGsap("mainErrorWrapper", { opacity: 0, delay: 0, translateY: -100, duration: 1, ease: "back" }, "from")
    useGsap("detailErrorWrapper", { opacity: 0, delay: 0.5, translateY: 100, duration: 1, ease: "back" }, "from")
})
</script>
<template>
    <div class="h-screen w-full bg-gray-100 dark:bg-[#070707] transition-colors duration-200">
        <NuxtLayout>
            <div class="absolute top-0 w-full dark:text-white h-screen transition-colors duration-200 flex justify-center items-center">
                <div class="text-center space-y-3">
                    <h1 class="mainErrorWrapper text-5xl font-black">{{ errorMessage.main }}</h1>
                    <p class="detailErrorWrapper text-gray-600">{{ errorMessage.detail }}</p>
                    <!-- <p>Sorry about that. That's all we know</p> -->
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>
