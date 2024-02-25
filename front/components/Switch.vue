<script lang="ts" setup>
// const props = defineProps(["title"])

function generateRandomString(length: number) {
    let result = ""
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}
let randomId = generateRandomString(20)
</script>
<template>
    <div class="flex w-[200px]">
        <input class="hidden" type="checkbox" id="check" />
        <label for="check" class="switch"></label>
    </div>
</template>

<style scoped></style>
