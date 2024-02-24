<script lang="ts" setup>
import { useNuxtApp } from "#app"

const { $gsap } = useNuxtApp()
</script>
<template>
    <div class="h-screen w-full bg-gray-100 dark:bg-[#070707] transition-colors duration-200">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
