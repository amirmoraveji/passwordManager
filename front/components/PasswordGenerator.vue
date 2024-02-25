<script lang="ts" setup>
let randomPassword = ref("")
let passwordLength = ref("")
let passwordStart = ref("")
let switchValues = ref([])
const generatePassword = () => {
    let passwordStructure: string = ""
    for (let i = 0; i < switchValues.value.length; i++) {
        if (switchValues.value[i] == "number") {
            passwordStructure += "1234567890"
        }
        if (switchValues.value[i] == "word") {
            passwordStructure += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        }
        if (switchValues.value[i] == "special") {
            passwordStructure += "!@#$%^&*()_+{}><?/:;"
        }
    }

    function generateRandomString(length: number, passwordStructure: string) {
        let result = ""
        const characters = passwordStructure
        const charactersLength = characters.length
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }
    randomPassword.value = generateRandomString(parseInt(passwordLength.value), passwordStructure)
}
</script>
<template>
    <div class="w-fit flex flex-col">
        <div class="border-2 border-gray-300 p-2 rounded-lg">
            <label class="dark:text-white transition-colors duration-200">Password</label>
            <div class="flex">
                <span class="dark:text-white transition-colors duration-200">{{ randomPassword }}</span>
                <svg class="transition-colors duration-100 cursor-pointer text-gray-400 active:text-green-500" width="28" height="28" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm-4 4q-.825 0-1.412-.587T3 20V6h2v14h11v2z" />
                </svg>
            </div>
        </div>
        <div class="flex space-x-2 dark:text-white transition-colors duration-200">
            <div class="flex flex-col">
                <label for="">Length</label>
                <input class="transition-colors duration-200 dark:bg-gray-800 my-1 p-2 rounded-lg outline-none w-14" type="number" v-model="passwordLength" />
            </div>
            <div class="flex flex-col">
                <label for="">Start with</label>
                <input class="transition-colors duration-200 dark:bg-gray-800 my-1 p-2 rounded-lg outline-none w-[170px]" type="text" v-model="passwordStart" />
            </div>
        </div>

        <div class="flex space-x-2">
            <div class="space-y-2 flex flex-col dark:text-white transition-colors duration-200">
                <span>Add Numbers</span>
                <span>Add Special Characters</span>
                <span>Add Words</span>
            </div>
            <div class="space-y-2">
                <div class="flex">
                    <input class="hidden" type="checkbox" value="number" id="1" v-model="switchValues" />
                    <label for="1" class="switch bg-gray-200 dark:bg-gray-800" @click=""></label>
                </div>
                <div class="flex" @click="">
                    <input class="hidden" type="checkbox" value="special" id="2" v-model="switchValues" />
                    <label for="2" class="switch bg-gray-200 dark:bg-gray-800"></label>
                </div>
                <div class="flex" @click="">
                    <input class="hidden" type="checkbox" value="word" id="3" v-model="switchValues" />
                    <label for="3" class="switch bg-gray-200 dark:bg-gray-800"></label>
                </div>
            </div>
        </div>
        <button @click="generatePassword" class="mt-1 p-2 rounded-lg hover:bg-blue-600 bg-blue-500 dark:bg-blue-900 dark:hover:bg-blue-950 transition-colors duration-200 text-white">
            Generate random password
        </button>
    </div>
</template>

<style scoped>
.switch {
    position: relative;
    width: 60px;
    height: 27px;
    border-radius: 200px;
    transition: 0.2s;
    cursor: pointer;
    box-shadow: inset 0px 0px 2px 2px rgba(0, 0, 0, 0.089);
}
.switch::before {
    position: absolute;
    background-color: white;
    width: 20px;
    height: 20px;
    border-radius: 200px;
    margin: 3.5px;
    content: "";
    transition: 0.2s;
}
input:checked + .switch {
    background-color: rgb(81, 209, 81);
    box-shadow: inset 0px 0px 4px 4px rgba(0, 0, 0, 0.089);
}
input:checked + .switch::before {
    background-color: rgb(238, 238, 238);
    transform: translateX(32px);
    box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.089);
}
</style>
