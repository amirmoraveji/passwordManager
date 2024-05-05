<script lang="ts" setup>
import PHolder from "../components/Password/PHolder.vue"

const passwordStore = usePasswordStore()
const tagSore = useTagStore()

const lastBlockId = ref<string>()
// open/close modal states
const showTwoFAModal = ref<true | false>(false)
const showEditModal = ref<true | false>(false)
const twoFASecret = ref<string>()

passwordStore.checkDups()

const remove = (id: string) => {
   // this will send the password block to the trash object
   for (let i = 0; i < passwordStore.duplicatePasswords.length; i++) {
      if (passwordStore.duplicatePasswords[i].id === id) {
         // this will first add it to trash folder
         passwordStore.trashPasswords.push(passwordStore.duplicatePasswords[i])
         passwordStore.allPasswords = passwordStore.allPasswords.filter((e) => e.id != id)
         passwordStore.duplicatePasswords = passwordStore.duplicatePasswords.filter((e) => e.id != id)
      }
   }
   // this will remove the password block form the main object
   passwordStore.allPasswords = passwordStore.allPasswords.filter((e) => e.id != id)
   passwordStore.favoritePasswords = passwordStore.favoritePasswords.filter((e) => e.id != id)
   passwordStore.checkDups()
   passwordStore.allPasswordsBackup = [...passwordStore.allPasswords]
}
const show2FA = (id: string) => {
   lastBlockId.value = id

   for (let i = 0; i < passwordStore.duplicatePasswords.length; i++) {
      if (passwordStore.duplicatePasswords[i].id == id) twoFASecret.value = passwordStore.duplicatePasswords[i].twoFAPassword
   }
   showTwoFAModal.value = true
}
const editModal = (id: string) => {
   lastBlockId.value = id

   for (let i = 0; i < passwordStore.duplicatePasswords.length; i++) {
      if (passwordStore.duplicatePasswords[i].id === id) {
         passwordStore.updateInputs = { ...passwordStore.duplicatePasswords[i] }
      }
   }

   //check if the are optional info exists it will check the checkbox if not it will uncheck
   if (passwordStore.updateInputs.email) {
      checkStates.value.email = true
   } else {
      checkStates.value.email = false
   }
   if (passwordStore.updateInputs.phone) {
      checkStates.value.phone = true
   } else {
      checkStates.value.phone = false
   }
   if (passwordStore.updateInputs.secondPassword) {
      checkStates.value.secondPassword = true
   } else {
      checkStates.value.secondPassword = false
   }
   if (passwordStore.updateInputs.website) {
      checkStates.value.website = true
   } else {
      checkStates.value.website = false
   }
   // this will enable/disable checkbox if 2FA exist
   if (passwordStore.updateInputs.twoFAPassword) {
      checkStates.value.twoFA = true
   } else {
      checkStates.value.twoFA = false
   }

   showEditModal.value = true
}
const saveNewInfo = () => {
   passwordStore.updateInputs.tags = []
   if (passwordStore.updateInputs.fullTag)
      for (let i = 0; i < passwordStore.updateInputs.fullTag.length; i++) {
         if (passwordStore.updateInputs.tags) passwordStore.updateInputs.tags.push(passwordStore.updateInputs.fullTag[i].tagName)
      }
   for (let i = 0; i < passwordStore.allPasswords.length; i++) {
      if (passwordStore.allPasswords[i].id === lastBlockId.value) {
         passwordStore.allPasswords[i] = { ...passwordStore.updateInputs }
      }
   }
   for (let i = 0; i < passwordStore.allPasswordsBackup.length; i++) {
      if (passwordStore.allPasswordsBackup[i].id === lastBlockId.value) {
         passwordStore.allPasswordsBackup[i] = { ...passwordStore.updateInputs }
      }
   }
   for (let i = 0; i < passwordStore.duplicatePasswords.length; i++) {
      if (passwordStore.duplicatePasswords[i].id === lastBlockId.value) {
         passwordStore.duplicatePasswords[i] = { ...passwordStore.updateInputs }
      }
   }
   for (let i = 0; i < passwordStore.favoritePasswords.length; i++) {
      if (passwordStore.favoritePasswords[i].id === lastBlockId.value) {
         passwordStore.favoritePasswords[i] = { ...passwordStore.updateInputs }
      }
   }
   showEditModal.value = false
   checkStates.value = {
      password: false,
      email: false,
      phone: false,
      secondPassword: false,
      twoFA: false,
      website: false,
   }
   passwordStore.checkDups()
   // passwordStore.allPasswordsBackup = [...passwordStore.allPasswords]
}
const favorite = (id: string) => {
   for (let i = 0; i < passwordStore.allPasswords.length; i++) {
      if (passwordStore.allPasswords[i].id === id) {
         passwordStore.allPasswords[i].favorite = passwordStore.allPasswords[i].favorite ? false : true
         if (passwordStore.allPasswords[i].favorite) {
            passwordStore.favoritePasswords.push({ ...passwordStore.allPasswords[i] })
         } else {
            passwordStore.favoritePasswords = passwordStore.favoritePasswords.filter((e) => e.id != id)
         }
      }
   }
}
</script>

<template>
   <!-- 2FA secret modal -->
   <Dialog v-model:visible="showTwoFAModal" modal :draggable="false" class="w-full sm:w-[90%] md:w-[80%] lg:w-[700px]" header="2FA Secret">
      <div class="flex items-center space-x-2">
         <MdiIcon viewBox="0 0 25 25" class="custom-style" icon="mdiContentCopy" />
         <span class="text-[15px]">{{ twoFASecret }}</span>
      </div>
   </Dialog>
   <!-- Edit Modal -->
   <Dialog v-model:visible="showEditModal" modal :draggable="false" class="w-full sm:w-[90%] md:w-[80%] lg:w-[500px]" header="Update Password Info">
      <div class="p-1 space-y-1 dark:text-white">
         <!-- Title -->
         <label class="font-medium">Title</label>
         <InputText placeholder="Enter your password title" v-model="passwordStore.updateInputs.title" :invalid="inputErrors.title" class="w-full" />
         <!-- Discretion -->
         <label class="font-medium">Discretion</label>
         <Textarea class="resize-none !h-20 w-full" v-model="passwordStore.updateInputs.description" :invalid="inputErrors?.description" />
         <div class="flex flex-col space-x-1 space-y-2 mb-2">
            <div class="flex space-x-2">
               <!-- Username -->
               <div class="flex flex-col w-1/2">
                  <label>Username</label>
                  <InputText :invalid="inputErrors.username" v-model="passwordStore.updateInputs.username" class="" placeholder="Username" />
               </div>
               <!-- Custom Password -->
               <div class="flex flex-col w-1/2">
                  <div class="flex items-center">
                     <label>Password</label>
                  </div>
                  <Password placeholder="Password" :invalid="inputErrors?.password" v-model="passwordStore.updateInputs.password" toggleMask />
               </div>
            </div>
            <!--2FA Input-->
            <div class="flex space-x-2">
               <div class="flex flex-col w-full">
                  <div class="flex items-center">
                     <label class="hover:text-primary-400 transition-colors duration-200 cursor-pointer" for="secondPassword">Second Password</label>
                     <Checkbox
                        class="ms-2"
                        @click="checkSecondPassword"
                        inputId="secondPassword"
                        v-model="checkStates.secondPassword"
                        :binary="true" />
                  </div>
                  <Password
                     :disabled="!checkStates.secondPassword"
                     :invalid="inputErrors?.secondPassword"
                     v-model="passwordStore.updateInputs.secondPassword"
                     toggleMask />
               </div>
               <div class="flex flex-col w-full">
                  <div class="flex items-center">
                     <label class="hover:text-primary-400 transition-colors duration-200 cursor-pointer" for="2FAPassword">2FA Secret</label>
                     <Checkbox class="ms-2" @click="check2FA" inputId="2FAPassword" v-model="checkStates.twoFA" :binary="true" />
                  </div>
                  <InputText
                     :disabled="!checkStates.twoFA"
                     :invalid="inputErrors?.twoFAPassword"
                     v-model="passwordStore.updateInputs.twoFAPassword"
                     toggleMask />
               </div>
            </div>
            <!--phone and email-->
            <div class="flex space-x-2">
               <div class="flex flex-col w-full">
                  <div class="flex items-center">
                     <label class="hover:text-primary-400 transition-colors duration-200 cursor-pointer" for="phone">Phone</label>
                     <Checkbox class="ms-2" @click="checkPhone" inputId="phone" v-model="checkStates.phone" :binary="true" />
                  </div>
                  <InputText :disabled="!checkStates.phone" :invalid="inputErrors?.phone" v-model="passwordStore.updateInputs.phone" toggleMask />
               </div>
               <div class="flex flex-col w-full">
                  <div class="flex items-center">
                     <label class="hover:text-primary-400 transition-colors duration-200 cursor-pointer" for="email">Email</label>
                     <Checkbox class="ms-2" @click="checkEmail" inputId="email" v-model="checkStates.email" :binary="true" />
                  </div>
                  <InputText :disabled="!checkStates.email" :invalid="inputErrors?.email" v-model="passwordStore.updateInputs.email" toggleMask />
               </div>
            </div>
            <div class="flex">
               <!-- Assign to folder -->
               <div class="flex flex-col w-full">
                  <label class="font-medium">Add to Tag</label>
                  <MultiSelect
                     v-model="passwordStore.updateInputs.fullTag"
                     display="chip"
                     :options="tagSore.tags"
                     optionLabel="tagName"
                     placeholder="Select Tag"
                     :maxSelectedLabels="5"
                     class="" />
               </div>
               <div class="flex flex-col w-full">
                  <div class="flex items-center">
                     <label class="hover:text-primary-400 transition-colors duration-200 cursor-pointer" for="website">Website</label>
                     <Checkbox class="ms-2" @click="checkWebsite" inputId="website" v-model="checkStates.website" :binary="true" />
                  </div>
                  <InputText
                     :disabled="!checkStates.website"
                     :invalid="inputErrors?.website"
                     v-model="passwordStore.updateInputs.website"
                     toggleMask />
               </div>
            </div>
            <div class="space-x-2 flex">
               <Button class="w-full" @click="showEditModal = false" outlined label="Cancel" severity="info" />
               <Button @click="saveNewInfo" class="w-full" label="Save New Changes" severity="success" />
            </div>
         </div>
      </div>
   </Dialog>

   <div class="">
      <!-- show empty massage -->
      <div v-if="passwordStore.duplicatePasswords.length < 1" class="flex items-center justify-center w-full h-screen">
         <div class="flex flex-col items-center space-y-2">
            <MdiIcon icon="mdiEmoticonHappyOutline" viewBox="1 1 23 23" class="!w-[100px] !h-[100px] text-gray-500" />
            <span class="text-3xl font-bold text-gray-500">There is no Duplicate passwords</span>
         </div>
      </div>
      <div class="pt-2" v-else>
         <div
            class="flex justify-between items-center p-3 mx-2 rounded-lg font-medium shadow-sm bg-white smooth dark:text-gray-300 text-gray-800 dark:bg-gray-900">
            <div>
               <span>Duplicate passwords</span>
            </div>
         </div>
         <div class="grid grid-cols-1 gap-2 xl:grid-cols-2 p-2">
            <PHolder password-type="login" v-for="block in passwordStore.duplicatePasswords">
               <template #title>
                  <!-- title -->
                  <div class="text-3xl font-medium my-3">
                     {{ block.title }}
                  </div>
                  <!-- right section -->
                  <div class="space-x-1">
                     <Button v-if="block.twoFAPassword" severity="secondary" text outlined @click="show2FA(block.id)">Show 2FA Secret</Button>
                     <Button severity="warning" text outlined @click="editModal(block.id)">Edit</Button>
                     <Button severity="danger" text outlined @click="remove(block.id)">Delete</Button>
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
                           <span class="font-bold">phone</span>
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
                           <MdiIcon v-else viewBox="0 0 25 25" icon="mdiWindowMinimize" class="custom-style text-gray-700" />
                        </div>
                        <div>
                           <span v-if="block.email">{{ block.email }}</span>
                           <MdiIcon v-else viewBox="0 0 25 25" icon="mdiWindowMinimize" class="custom-style text-gray-700" />
                        </div>
                        <div>
                           <span v-if="block.phone">{{ block.phone }}</span>
                           <MdiIcon v-else viewBox="0 0 25 25" icon="mdiWindowMinimize" class="custom-style text-gray-700" />
                        </div>
                        <div>
                           <span v-if="block.website">{{ block.website }}</span>
                           <MdiIcon v-else viewBox="0 0 25 25" icon="mdiWindowMinimize" class="custom-style text-gray-700" />
                        </div>
                     </div>
                  </div>
               </template>
               <template #footer>
                  <div class="">
                     <div class="flex space-x-1 items-center">
                        <div v-for="tag in block.tags" class="flex dark:bg-gray-700 bg-gray-200 smooth w-fit rounded-md px-2 p-1">
                           <span>{{ tag }}</span>
                        </div>
                     </div>
                  </div>
                  <!-- date and time -->
                  <div class="flex space-x-2 smooth items-center">
                     <span>{{ humanDate(block.date) }}</span>
                     <Divider layout="vertical" />
                     <div class="w-[26px]">
                        <MdiIcon v-if="block.favorite" icon="mdiHeart" class="redHeart !w-[22px] !h-[22px] text-red-600" />
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
