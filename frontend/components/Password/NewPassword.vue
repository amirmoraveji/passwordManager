<script lang="ts" setup>
import {
   checkPassword,
   inputErrors,
   check2FA,
   checkEmail,
   checkPhone,
   checkSecondPassword,
   checkStates,
} from "~/composables/check"

const tagSore = useTagStore()
const toast = useToast()
const globalStore = useGlobalRefStore()

const passwordStore = usePasswordStore()

watch(passwordStore, () => {
   if (passwordStore.passwordInfo.title)
      if (passwordStore.passwordInfo.title.length >= 1) {
         inputErrors.value.title = false
      }
   if (passwordStore.passwordInfo.description)
      if (passwordStore.passwordInfo.description.length >= 1) {
         inputErrors.value.description = false
      }
   if (passwordStore.passwordInfo.username)
      if (passwordStore.passwordInfo.username.length >= 1) {
         inputErrors.value.username = false
      }
   if (checkStates.value.password) {
      if (passwordStore.passwordInfo.password && passwordStore.passwordInfo.password.length >= 1) {
         inputErrors.value.password = false
      }
   }
   if (checkStates.value.twoFA) {
      if (passwordStore.passwordInfo.twoFAPassword && passwordStore.passwordInfo.twoFAPassword.length >= 1) {
         inputErrors.value.twoFAPassword = false
      }
   }
})
const addPassword = () => {
   if (passwordStore.passwordInfo.title.length < 1) {
      inputErrors.value.title = true
      toast.add({
         severity: "error",
         summary: "Fields Are Empty",
         detail: "Please type title",
         life: 2000,
      })
      return
   }
   if (passwordStore.passwordInfo.description.length < 1) {
      inputErrors.value.description = true
      toast.add({
         severity: "error",
         summary: "Fields Are Empty",
         detail: "Please type description",
         life: 2000,
      })
      return
   }
   if (checkStates.value.password)
      if (passwordStore.passwordInfo.password.length < 1) {
         inputErrors.value.password = true
         toast.add({
            severity: "error",
            summary: "Fields Are Empty",
            detail: "please write at least one character",
            life: 2000,
         })
         return
      }
   if (passwordStore.passwordInfo.username.length < 1) {
      inputErrors.value.username = true
      toast.add({
         severity: "error",
         summary: "Field is Empty",
         detail: "Username field is empty",
         life: 2000,
      })
      return
   }
   if (checkStates.value.twoFA)
      if (passwordStore.passwordInfo.twoFAPassword.length < 1) {
         inputErrors.value.twoFAPassword = true
         toast.add({
            severity: "error",
            summary: "Field is Empty",
            detail: "Please type your 2FA secret",
            life: 2000,
         })
         return
      }
   if (!checkStates.value.password)
      if (passwordStore.passwordInfo.password.length < 1) {
         toast.add({
            severity: "error",
            summary: "Password Not Created",
            detail: "There is no password, please Generate password or use custom password",
            life: 4000,
         })
         return
      }
   if (tagSore.selectedTag) {
      for (let i = 0; i < tagSore.selectedTag.length; i++) {
         passwordStore.passwordInfo.tags?.push(tagSore.selectedTag[i].tagName)
      }
   }
   passwordStore.addToPasswordLoginList()
   globalStore.LoginTypeModal = false
   passwordStore.checkDups()
}
</script>
<template>
   <div class="p-1 space-y-1 dark:text-white">
      <!-- Title -->
      <div class="flex items-center">
         <MdiIcon icon="mdiFormatTitle" viewBox="0 0 23 23" class="!w-[22px] !h-[20px] me-1" />

         <label class="font-medium">Title</label>
      </div>
      <InputText v-model="passwordStore.passwordInfo.title" :invalid="inputErrors.title" class="w-full" />
      <!-- Discretion -->
      <div class="flex items-center">
         <MdiIcon icon="mdiTextBoxEditOutline" viewBox="0 0 23 23" class="!w-[22px] !h-[20px] me-1" />

         <label class="font-medium">Discretion</label>
      </div>
      <Textarea
         class="resize-none !h-20 w-full"
         v-model="passwordStore.passwordInfo.description"
         :invalid="inputErrors?.description"
      />

      <div class="grid grid-cols-2 gap-1">
         <!-- Username -->
         <div class="flex flex-col">
            <div class="flex items-center">
               <MdiIcon icon="mdiAccount" viewBox="0 0 23 23" class="!w-[22px] !h-[20px] me-1" />
               <label>Username</label>
            </div>
            <InputText
               :invalid="inputErrors.username"
               v-model="passwordStore.passwordInfo.username"
               class=""
            />
         </div>
         <!-- Custom Password -->
         <div class="flex flex-col">
            <div class="flex justify-between items-center">
               <div class="flex items-center">
                  <MdiIcon icon="mdiLock" viewBox="0 0 23 23" class="!w-[22px] !h-[20px] me-1" />
                  <label
                     class="hover:text-primary-400 transition-colors duration-200 cursor-pointer"
                     for="cusPassword"
                  >
                     Custom Password
                  </label>
               </div>

               <Checkbox
                  class="ms-2"
                  @click="checkPassword"
                  inputId="cusPassword"
                  v-model="checkStates.password"
                  :binary="true"
               />
            </div>
            <Password
               :disabled="!checkStates.password"
               :invalid="inputErrors?.password"
               v-model="passwordStore.passwordInfo.password"
               toggleMask
            />
         </div>
         <!-- second password -->
         <div class="flex flex-col">
            <div class="flex justify-between items-center">
               <div class="flex items-center">
                  <MdiIcon icon="mdiLockCheck" viewBox="0 0 23 23" class="!w-[22px] !h-[20px] me-1" />
                  <label
                     class="hover:text-primary-400 transition-colors duration-200 cursor-pointer"
                     for="secondPassword"
                  >
                     Second Password
                  </label>
               </div>
               <Checkbox
                  class="ms-2"
                  @click="checkSecondPassword"
                  inputId="secondPassword"
                  v-model="checkStates.secondPassword"
                  :binary="true"
               />
            </div>
            <InputText
               class="w-full"
               :disabled="!checkStates.secondPassword"
               :invalid="inputErrors?.secondPassword"
               v-model="passwordStore.passwordInfo.secondPassword"
               toggleMask
            />
         </div>
         <!-- 2FA Secret -->
         <div class="flex flex-col">
            <div class="flex justify-between items-center">
               <div class="flex items-center">
                  <MdiIcon
                     icon="mdiTwoFactorAuthentication"
                     viewBox="0 0 23 23"
                     class="!w-[22px] !h-[20px] me-1"
                  />
                  <label
                     class="hover:text-primary-400 transition-colors duration-200 cursor-pointer"
                     for="2FAPassword"
                  >
                     2FA Secret
                  </label>
               </div>
               <Checkbox
                  class="ms-2"
                  @click="check2FA"
                  inputId="2FAPassword"
                  v-model="checkStates.twoFA"
                  :binary="true"
               />
            </div>
            <InputText
               class="w-full"
               :disabled="!checkStates.twoFA"
               :invalid="inputErrors?.twoFAPassword"
               v-model="passwordStore.passwordInfo.twoFAPassword"
               toggleMask
            />
         </div>
         <!-- phone -->
         <div class="flex flex-col">
            <div class="flex justify-between items-end">
               <div class="flex items-center">
                  <MdiIcon icon="mdiPhone" viewBox="0 0 23 23" class="!w-[22px] !h-[20px] me-1" />
                  <label
                     class="hover:text-primary-400 transition-colors duration-200 cursor-pointer"
                     for="phone"
                  >
                     Phone
                  </label>
               </div>
               <Checkbox
                  class="ms-2"
                  @click="checkPhone"
                  inputId="phone"
                  v-model="checkStates.phone"
                  :binary="true"
               />
            </div>
            <InputText
               class="w-full"
               :disabled="!checkStates.phone"
               :invalid="inputErrors?.phone"
               v-model="passwordStore.passwordInfo.phone"
               toggleMask
            />
         </div>
         <!-- email -->
         <div class="flex flex-col">
            <div class="flex justify-between items-center">
               <div class="flex items-center">
                  <MdiIcon icon="mdiEmail" viewBox="0 0 23 23" class="!w-[22px] !h-[20px] me-1" />
                  <label
                     class="hover:text-primary-400 transition-colors duration-200 cursor-pointer"
                     for="email"
                  >
                     Email
                  </label>
               </div>
               <Checkbox
                  class="ms-2"
                  @click="checkEmail"
                  inputId="email"
                  v-model="checkStates.email"
                  :binary="true"
               />
            </div>
            <InputText
               class="w-full"
               :disabled="!checkStates.email"
               :invalid="inputErrors?.email"
               v-model="passwordStore.passwordInfo.email"
               toggleMask
            />
         </div>
         <!-- tag -->
         <div class="flex flex-col w-full">
            <div class="flex items-center">
               <MdiIcon icon="mdiTag" viewBox="0 0 23 23" class="!w-[22px] !h-[20px] me-1" />
               <label class="font-medium">Add to Tag</label>
            </div>
            <MultiSelect
               v-model="tagSore.selectedTag"
               display="chip"
               :options="tagSore.tags"
               optionLabel="tagName"
               placeholder="Select Tag"
               :maxSelectedLabels="5"
               class=""
            />
         </div>
         <!-- website -->
         <div class="flex flex-col w-full">
            <div class="flex justify-between items-center">
               <div class="flex items-center">
                  <MdiIcon icon="mdiWeb" viewBox="0 0 23 23" class="!w-[22px] !h-[20px] me-1" />
                  <label
                     class="hover:text-primary-400 transition-colors duration-200 cursor-pointer"
                     for="website"
                  >
                     Website
                  </label>
               </div>
               <Checkbox
                  class="ms-2"
                  @click="checkWebsite"
                  inputId="website"
                  v-model="checkStates.website"
                  :binary="true"
               />
            </div>
            <InputText
               class="w-full"
               :disabled="!checkStates.website"
               :invalid="inputErrors?.website"
               v-model="passwordStore.passwordInfo.website"
               toggleMask
            />
         </div>
      </div>
      <Button class="w-full rounded-sm h-[30px] mt-2!" @click="addPassword">Add Password Info</Button>
   </div>
</template>

<style scoped></style>
