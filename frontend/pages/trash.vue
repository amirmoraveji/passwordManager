<script lang="ts" setup>
import PHolder from '../components/Password/PHolder.vue'

// vue prime
const toast = useToast()
const confirm = useConfirm()
// Pinia
const passwordStore = usePasswordStore()
const recover = (id: string) => {
   for (let i = 0; i < passwordStore.trashPasswords.length; i++) {
      if (passwordStore.trashPasswords[i].id === id) {
         passwordStore.allPasswords.push(passwordStore.trashPasswords[i])
         passwordStore.allPasswordsBackup = { ...passwordStore.allPasswords }
         if (passwordStore.trashPasswords[i].favorite)
            passwordStore.favoritePasswords.push(passwordStore.trashPasswords[i])
      }
   }
   passwordStore.trashPasswords = passwordStore.trashPasswords.filter((e) => e.id != id)
   passwordStore.checkDups()
   passwordStore.sortPasswordBlocks()
}
const remove = (id: string) => {
   // this will remove the password block form the main object
   passwordStore.trashPasswords = passwordStore.trashPasswords.filter((e) => e.id != id)
}
const removePermanently = (id: string) => {
   confirm.require({
      group: 'headless',
      header: 'Are you sure you want to delete?',
      message: 'Please confirm to proceed.',
      accept: () => {
         toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'The password block has been removed',
            life: 3000,
         })
         remove(id)
      },
      reject: () => {
         toast.add({
            severity: 'error',
            summary: 'Cancelled',
            detail: 'Deleting password block has been cancelled',
            life: 3000,
         })
      },
   })
}
</script>
<template>
   <div class="flex flex-col">
      <ConfirmDialog group="headless">
         <template #container="{ message, acceptCallback, rejectCallback }">
            <div class="flex flex-col items-center p-5 bg-surface-0 dark:bg-surface-700 rounded-md">
               <span class="font-bold text-2xl block mb-2 mt-4 dark:text-gray-200">{{ message.header }}</span>
               <p class="mb-0 dark:text-gray-400">{{ message.message }}</p>
               <div class="flex items-center gap-2 mt-4">
                  <Button label="Yes" @click="acceptCallback"></Button>
                  <Button label="No" outlined @click="rejectCallback"></Button>
               </div>
            </div>
         </template>
      </ConfirmDialog>
      <!-- show empty massage -->
      <div v-if="passwordStore.trashPasswords.length < 1" class="flex items-center justify-center w-full h-screen">
         <div class="flex flex-col items-center space-y-4">
            <MdiIcon icon="mdiTrashCan" viewBox="3 3 18 18" class="!w-[90px] !h-[90px] text-gray-500" />
            <span class="text-3xl font-bold text-gray-500">Trash is Empty</span>
         </div>
      </div>
      <div v-else>
         <div
            class="flex justify-between items-center p-3 mt-2 mx-2 rounded-lg font-medium shadow-sm bg-white smooth dark:text-gray-300 text-gray-800 dark:bg-gray-900"
         >
            <div>
               <span>Trash</span>
            </div>
            <div>
               <Button severity="danger" text outlined>
                  <MdiIcon icon="mdiTrashCan" class="custom-style" />
                  Empty trash
               </Button>
            </div>
         </div>
         <div class="grid grid-cols-1 gap-2 xl:grid-cols-2 p-2">
            <PHolder password-type="login" v-for="block in passwordStore.trashPasswords">
               <template #title>
                  <!-- title -->
                  <div class="text-3xl font-medium my-3">
                     {{ block.title }}
                  </div>
                  <!-- right section -->

                  <div class="space-x-1">
                     <Button severity="secondary" text outlined @click="recover(block.id)">Recover</Button>
                     <Button severity="danger" text outlined @click="removePermanently(block.id)"
                        >Delete Permanently</Button
                     >
                  </div>
               </template>
               <template #date>
                  <ScrollPanel style="height: 80px">
                     <div>
                        <p class="text-gray-500">{{ block.description }}</p>
                     </div>
                  </ScrollPanel>
                  <div class="flex justify-between items-center"></div>
               </template>
               <template #info>
                  <!-- password info wrapper -->
                  <div class="flex border rounded-md dark:border-gray-700">
                     <!-- titles -->
                     <div class="flex rounded-md dark:border-gray-700 w-[35%] flex-col bottom-line">
                        <div>
                           <MdiIcon viewBox="0 0 25 25" icon="mdiAccount" class="custom-style" />
                           <span class="font-bold">username</span>
                        </div>
                        <div>
                           <MdiIcon viewBox="0 0 25 25" icon="mdiKey" class="custom-style" />
                           <span class="font-bold">password</span>
                        </div>
                        <div>
                           <MdiIcon viewBox="0 0 25 25" icon="mdiKeyChange" class="custom-style" />
                           <span class="font-bold">second password</span>
                        </div>
                        <div>
                           <MdiIcon viewBox="0 0 25 25" icon="mdiEmail" class="custom-style" />
                           <span class="font-bold">Email</span>
                        </div>
                        <div>
                           <MdiIcon viewBox="0 0 25 25" icon="mdiPhone" class="custom-style" />
                           <span class="font-bold">phone ppp</span>
                        </div>
                        <div>
                           <MdiIcon viewBox="0 0 25 25" icon="mdiWeb" class="custom-style" />
                           <span class="font-bold">website</span>
                        </div>
                     </div>
                     <div class="flex w-[65%] flex-col bottom-line">
                        <!-- data -->
                        <div>
                           <span class="text-gray-400">{{ block.username }}</span>
                        </div>
                        <div>
                           <span class="text-gray-400"> {{ block.password }}</span>
                        </div>
                        <div>
                           <span v-if="block.secondPassword">{{ block.secondPassword }}</span>
                           <MdiIcon
                              v-else
                              viewBox="0 0 25 25"
                              icon="mdiWindowMinimize"
                              class="custom-style text-gray-700"
                           />
                        </div>
                        <div>
                           <span v-if="block.email">{{ block.email }}</span>
                           <MdiIcon
                              v-else
                              viewBox="0 0 25 25"
                              icon="mdiWindowMinimize"
                              class="custom-style text-gray-700"
                           />
                        </div>
                        <div>
                           <span v-if="block.phone">{{ block.phone }}</span>
                           <MdiIcon
                              v-else
                              viewBox="0 0 25 25"
                              icon="mdiWindowMinimize"
                              class="custom-style text-gray-700"
                           />
                        </div>
                        <div>
                           <span v-if="block.website">{{ block.website }}</span>
                           <MdiIcon
                              v-else
                              viewBox="0 0 25 25"
                              icon="mdiWindowMinimize"
                              class="custom-style text-gray-700"
                           />
                        </div>
                     </div>
                  </div>
               </template>
               <template #footer>
                  <div class="">
                     <div class="flex space-x-1 items-center">
                        <div
                           v-for="tag in block.tags"
                           class="flex dark:bg-gray-700 bg-gray-200 smooth w-fit rounded-md px-2 p-1"
                        >
                           <span>{{ tag }}</span>
                        </div>
                     </div>
                  </div>
                  <!-- date and time -->
                  <div class="flex space-x-2 smooth items-center">
                     <span>{{ humanDate(block.date) }}</span>
                     <Divider layout="vertical" />
                     <div class="w-[26px]">
                        <MdiIcon
                           v-if="block.favorite"
                           icon="mdiHeart"
                           class="redHeart !w-[22px] !h-[22px] text-red-600"
                        />
                        <MdiIcon v-else icon="mdiHeartOutline" class="outlineHeart !w-[22px] !h-[22px]" />
                     </div>
                  </div>
               </template>
            </PHolder>
         </div>
      </div>
   </div>
</template>

<style></style>
