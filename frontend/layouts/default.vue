<script lang="ts" setup>
const checked = ref(false)

watch(checked, () => {
   if (useColorMode().preference == "light") {
      useColorMode().preference = "dark"
   } else {
      useColorMode().preference = "light"
   }
})
</script>
<template>
   <div class="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-200">
      <header>
         <MainMenu />
      </header>
      <main class="ms-[17rem]"><slot /></main>
      <!-- <footer><h1>footer</h1></footer> -->
   </div>
</template>

<style></style>
