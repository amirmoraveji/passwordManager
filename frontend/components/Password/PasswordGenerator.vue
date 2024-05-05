<script lang="ts" setup>
let generatedRandomPassword = ref("")
let passwordLength = ref<number>(5)
let switchValues = ref([])
const passwordStore = usePasswordStore()
const clipBoardStack = ref(false)
const toast = useToast()
const generatePassword = () => {
   if (passwordLength.value > 100) {
      toast.add({
         severity: "error",
         summary: "Password Length is more the 100",
         detail: "Dude that will be a long password :) use less then 100 long",
         life: 3000,
      })
      return
   }
   let passwordStructure: string = ""
   if (switchValues.value.length < 1) {
      toast.add({
         severity: "error",
         // summary: "Please enable at least one option",
         detail: "Please enable at least one option",
         life: 3000,
      })
      return
   }
   for (let i = 0; i < switchValues.value.length; i++) {
      if (switchValues.value[i] == "number") {
         passwordStructure += "1234567890"
      }
      if (switchValues.value[i] == "word") {
         passwordStructure += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      }
      if (switchValues.value[i] == "special") {
         passwordStructure += "!@#$%^&=[-*()_{+}>]<?/:;"
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
   passwordStore.passwordInfo.password = passwordStore.passwordInfo.startWith + generateRandomString(passwordLength.value, passwordStructure)
   generatedRandomPassword.value = passwordStore.passwordInfo.password
}
watch(clipBoardStack, () => {
   if (clipBoardStack.value) {
      setTimeout(() => {
         clipBoardStack.value = false
      }, 2000)
   }
})
const copyClipBoard = () => {
   if (!clipBoardStack.value) {
      navigator.clipboard.writeText(passwordStore.passwordInfo.password)
      clipBoardStack.value = true
      toast.add({
         group: "tl",
         life: 2000,
         styleClass: "!rounded-full !w-fit !mt-1 !p-0 !m-0 dark:text-white bg-gray-200 dark:bg-black/50 backdrop-blur-[11px]",
         closable: false,
         contentStyleClass: "!p-2 !mx-3 !m-0",
      })
   }
}
const decreaseNumber = () => {
   if (passwordLength.value <= 5) {
      return
   }
   passwordLength.value--
}
</script>
<template>
   <div class="p-1 flex flex-col justify-between">
      <div>
         <label class="dark:text-white transition-colors duration-200 font-medium">Password</label>

         <div class="flex mt-1">
            <div class="flex w-full items-center justify-between">
               <label class="dark:text-white max-w-[170px] text-nowrap scrollable overflow-x-auto transition-colors duration-200">{{
                  generatedRandomPassword
               }}</label>

               <svg
                  @click="copyClipBoard"
                  class="transition-colors duration-100 cursor-pointer text-gray-400 active:text-green-500"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24">
                  <path
                     fill="currentColor"
                     d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm-4 4q-.825 0-1.412-.587T3 20V6h2v14h11v2z" />
               </svg>
            </div>
         </div>
         <Toast position="top-center" group="tl">
            <template #message="slotProps">
               <div class="flex items-center">
                  <svg class="text-green-500" width="18" height="18" viewBox="0 0 20 20">
                     <path
                        fill="currentColor"
                        d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10S4.477 0 10 0m4.922 6.583a.682.682 0 0 0-.963.053l-4.412 4.932l-2.832-3.03a.682.682 0 1 0-.996.931l3.34 3.575a.682.682 0 0 0 1.007-.01l4.91-5.489a.682.682 0 0 0-.054-.962" />
                  </svg>
                  <span class="ms-2">Password Coped to your clipboard</span>
               </div>
            </template>
         </Toast>
      </div>
      <Divider class="!mt-1" type="dashed" />
      <div class="flex space-x-2 dark:text-white transition-colors duration-200">
         <div class="flex flex-col">
            <label for="">Length</label>
            <!-- custom input number -->
            <div class="flex items-center">
               <input
                  type="number"
                  v-model="passwordLength"
                  placeholder="number"
                  class="w-12 numberInputButtonRemove border-[1.93px] border-gray-300 dark:border-gray-700 outline-none pl-3 p-[5px] text-sm rounded-bl-md rounded-tl-md focus:border-primary-600 focus:dark:border-primary-600 text-surface-900 dark:text-surface-0 placeholder:text-surface-400 dark:placeholder:text-surface-500 bg-surface-0 dark:bg-surface-900" />
               <div class="flex flex-col">
                  <button
                     @click="passwordLength++"
                     class="border-b-[0.1px] border-gray-400 bg-gray-200 outline-none dark:bg-gray-700 dark:text-white hover:dark:bg-gray-900 rounded-tr-md transition-colors duration-100 hover:bg-gray-300 p-[3px] w-[30px] flex items-center justify-center">
                     <svg width="10" height="10" viewBox="0 0 20 20">
                        <path
                           fill="currentColor"
                           d="M10 0c.423 0 .766.343.766.766v8.467h8.468a.766.766 0 1 1 0 1.533h-8.468v8.468a.766.766 0 1 1-1.532 0l-.001-8.468H.766a.766.766 0 0 1 0-1.532l8.467-.001V.766A.768.768 0 0 1 10 0" />
                     </svg>
                  </button>
                  <button
                     @click="decreaseNumber"
                     class="bg-gray-200 dark:ring-surface-700 ring-offset-0 outline-none dark:bg-gray-700 dark:text-white hover:dark:bg-gray-900 rounded-br-md transition-colors duration-100 hover:bg-gray-300 p-[3px] w-[30px] flex items-center justify-center">
                     <svg width="10" height="10" viewBox="0 0 20 20">
                        <path fill="currentColor" d="M.7 10.4A.7.7 0 0 1 .7 9h18.606a.7.7 0 0 1 0 1.4z" />
                     </svg>
                  </button>
               </div>
            </div>
         </div>
         <div class="flex flex-col">
            <label for="">Start with</label>
            <input-text class="w-full" v-model="passwordStore.passwordInfo.startWith" />
         </div>
      </div>

      <div class="flex justify-between space-x-2 mt-2">
         <div class="space-y-2 justify-center flex flex-col dark:text-white transition-colors duration-200">
            <label class="text-sm">Numbers</label>
            <label class="text-sm">Special Characters</label>
            <label class="text-sm">Words</label>
         </div>
         <div class="space-y-1">
            <div class="flex">
               <input class="hidden" type="checkbox" value="number" id="1" v-model="switchValues" />
               <label for="1" class="switch bg-gray-200 dark:bg-gray-700" @click=""></label>
            </div>
            <div class="flex" @click="">
               <input class="hidden" type="checkbox" value="special" id="2" v-model="switchValues" />
               <label for="2" class="switch bg-gray-200 dark:bg-gray-700"></label>
            </div>
            <div class="flex" @click="">
               <input class="hidden" type="checkbox" value="word" id="3" v-model="switchValues" />
               <label for="3" class="switch bg-gray-200 dark:bg-gray-700"></label>
            </div>
         </div>
      </div>
      <Button outlined severity="orange" class="mt-3" @click="generatePassword">Generate Password</Button>
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
.scrollable::-webkit-scrollbar {
   height: 10px; /* Height of the scrollbar */
   background: #f1f1f1; /* Color of the track */
   border-radius: 10px;
}
/* scroll handle */
.scrollable::-webkit-scrollbar-thumb {
   background: #888; /* Color of the thumb */
   border-radius: 6px; /* Roundness of the thumb */
   cursor: pointer;
}
html.dark .scrollable::-webkit-scrollbar {
   height: 10px; /* Height of the scrollbar */
   background: #312d46; /* Color of the track */
   border-radius: 10px;
}
html.dark .scrollable::-webkit-scrollbar-thumb {
   background: #949494; /* Color of the thumb */
   border-radius: 6px; /* Roundness of the thumb */
   cursor: pointer;
}
.numberInputButtonRemove[type="number"]::-webkit-inner-spin-button {
   -webkit-appearance: none;
}
</style>
