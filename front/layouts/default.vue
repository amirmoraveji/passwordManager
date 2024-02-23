<template>
    <div class="flex flex-col justify-between min-h-screen">
        <header class="dark:text-white flex justify-between p-2">
            <div class="space-x-4">
                <span class="hover:text-green-500 cursor-pointer transition-colors duration-200">Home</span>
                <span class="hover:text-green-500 cursor-pointer transition-colors duration-200">About</span>
                <span class="hover:text-green-500 cursor-pointer transition-colors duration-200">Blog</span>
                <span class="hover:text-green-500 cursor-pointer transition-colors duration-200">Shop</span>
            </div>
            <div class="space-x-4">
                <button class="dark:text-white transition-colors duration-200" @click="setColorTheme(useColorMode().preference == 'dark' ? 'light' : 'dark')">
                    {{ useColorMode().preference == "dark" ? "light" : "dark" }}
                </button>
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
