<script lang="ts" setup>
const checked = ref(false)
// Pinia
const globalStore = useGlobalRefStore()

watch(checked, () => {
   if (useColorMode().preference == 'light') {
      useColorMode().preference = 'dark'
   } else {
      useColorMode().preference = 'light'
   }
})
</script>
<template>
   <div class="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-200 flex justify-between">
      <MainMenu />
      <main :class="globalStore.backgroundContent" class="w-full"><slot /></main>
   </div>
</template>

<style></style>
