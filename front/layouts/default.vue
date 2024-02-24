<template>
    <div class="flex flex-col justify-between min-h-screen">
        <header class="dark:text-white flex justify-between p-2 z-10">
            <div class="space-x-4">
                <NuxtLink to="/home">Home</NuxtLink>
                <NuxtLink to="/home">About</NuxtLink>
                <NuxtLink to="/home">Shop</NuxtLink>
                <NuxtLink to="/home">Search</NuxtLink>
            </div>
            <div class="space-x-4">
                <ClientOnly>
                    <button
                        class="dark:text-white transition-colors duration-200"
                        @click="useColorMode().preference == 'dark' ? (useColorMode().preference = 'light') : (useColorMode().preference = 'dark')">
                        {{ useColorMode().preference }}
                    </button>
                </ClientOnly>
            </div>
        </header>
        <main>
            <slot />
        </main>
        <!-- <footer class="bg-gray-200 dark:bg-[#303030] flex items-center flex-col transition-colors duration-200">
            <div class="topSection flex space-x-3 w-full justify-around dark:text-white transition-colors duration-200">
                <div class="flex flex-col">
                    <span>link 1</span>
                    <span>link 1</span>
                    <span>link 1</span>
                    <span>link 1</span>
                </div>
                <div class="flex flex-col">
                    <span>link 1</span>
                    <span>link 1</span>
                    <span>link 1</span>
                    <span>link 1</span>
                </div>
                <div class="flex flex-col">
                    <span>link 1</span>
                    <span>link 1</span>
                    <span>link 1</span>
                    <span>link 1</span>
                </div>
                <div class="flex flex-col">
                    <span>link 1</span>
                    <span>link 1</span>
                    <span>link 1</span>
                    <span>link 1</span>
                </div>
                <div class="flex flex-col">
                    <span>link 1</span>
                    <span>link 1</span>
                    <span>link 1</span>
                    <span>link 1</span>
                </div>
            </div>
            <div class="bottomSection bg-gray-300 dark:bg-[#252525] w-full text-center p-1 transition-colors duration-200">
                <span class="dark:text-white transition-colors duration-200">All right received 2024</span>
            </div>
        </footer> -->
    </div>
</template>

<script lang="ts" setup></script>

<style></style>
