<script lang="ts" setup>
const { $setColorTheme } = useNuxtApp()
</script>
<template>
    <div class="h-screen w-full bg-gray-100 dark:bg-[#070707] transition-colors duration-200">
        <NuxtPage />
    </div>
</template>
