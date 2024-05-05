<script lang="ts" setup>
interface propsType {
   passwordType: "login" | "card" | "identity"
}
const props = defineProps<propsType>()
</script>
<template>
   <div class="justify-between transition-colors duration-200 h-[480px] rounded-lg bg-white shadow-md dark:bg-gray-900 dark:text-gray-300 w-[530px]">
      <div class="p-2">
         <!-- Title -->
         <div class="flex flex-col justify-between h-[470px]">
            <div class="">
               <div class="flex justify-between">
                  <slot name="title" />
               </div>
               <!-- Description -->
               <div class="mt-2 items-center">
                  <slot name="date" />
               </div>
            </div>
            <!-- Password Info -->
            <div class="">
               <div>
                  <slot name="info" />
               </div>
               <div class="py-2 flex justify-between items-end">
                  <slot name="footer" />
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<style></style>
