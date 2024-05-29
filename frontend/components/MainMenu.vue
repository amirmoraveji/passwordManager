<script lang="ts" setup>
import NewPassword from "./Password/NewPassword.vue"
import { checkStates } from "~/composables/check"
const tagSore = useTagStore()
const filterFolder = ref("")
const tableInfoModal = ref(false)
const currentTagId = ref<null | string>(null)
// Pinia
const passwordStore = usePasswordStore()
const globalStore = useGlobalRefStore()

// to show notification
const toast = useToast()

// This will change the theme
const theme = () => {
   if (useColorMode().preference == "light") {
      useColorMode().preference = "dark"
   } else {
      useColorMode().preference = "light"
   }
}
// this prevent the default modal close behavior when press Escape
watch(tableInfoModal, () => {
   if (!tableInfoModal.value) {
      if (tagSore.tags)
         for (let i = 0; i < tagSore.tags.length; i++) {
            if (tagSore.tags[i].edit) {
               toast.add({
                  severity: "error",
                  summary: "Opes! Un saved changes ",
                  detail: `It Looks you have some unsaved changes, please save them before quit `,
                  life: 5000,
               })
               tableInfoModal.value = true
               return
            }
         }
   }
})
// This will make the search folder happen by filtering based on filterFolder ref
watch(filterFolder, () => {
   if (tagSore.tags)
      tagSore.mainMenuTag = tagSore.tags.filter((obj) =>
         obj.tagName.toLowerCase().includes(filterFolder.value.toLowerCase())
      )
})
const setActive = (menuName: menuNamesTypes): void => {
   for (let i = 0; i < menu.value[0].menus.length; i++) {
      if (menu.value[0].menus[i].name == menuName) {
         menu.value[0].menus[i].isActive = true
         continue
      } else {
         menu.value[0].menus[i].isActive = false
      }
   }
}
// Menu Data
const menu = ref<menuType[]>([
   {
      title: "Actions",
      menus: [
         {
            name: "All",
            icon: "mdiBorderAll",
            class: "text-orange-500 text-[20px] !h-[21px] !w-[22px]",
            isActive: true,
            link: "/",
            command: () => {
               navigateTo("/")
               setActive("All")
            },
         },
         {
            name: "Favorite",
            icon: "mdiHeart",
            class: "text-red-500 text-[20px] !h-[21px] !w-[22px]",
            isActive: false,
            link: "favorite",
            command: () => {
               navigateTo("/favorites")
               setActive("Favorite")
            },
         },
         {
            name: "Trash",
            icon: "mdiDelete",
            class: "text-blue-500 text-[20px] !h-[21px] !w-[22px]",
            isActive: false,
            link: "trash",
            command: () => {
               navigateTo("/trash")
               setActive("Trash")
            },
         },
         {
            name: "Duplicate Passwords",
            icon: "mdiContentDuplicate",
            class: "text-yellow-600 dark:text-yellow-300 text-[20px] !h-[21px] !w-[22px]",
            isActive: false,
            link: "trash",
            command: () => {
               navigateTo("/duplicatePasswords")
               setActive("Duplicate Passwords")
            },
         },
      ],
   },
   {
      title: "Types",
      menus: [
         {
            name: "Login",
            icon: "mdiLogin",
            class: "!h-[21px] !w-[22px]",
            isActive: false,
            command() {
               globalStore.LoginTypeModal = true
               checkStates.value = {
                  password: false,
                  email: false,
                  phone: false,
                  secondPassword: false,
                  twoFA: false,
                  website: false,
               }
            },
         },
         {
            name: "Identity",
            icon: "mdiFingerprint",
            class: "!h-[21px] !w-[22px]",
            isActive: false,
         },
         {
            name: "Credit Cards",
            icon: "mdiCreditCard",
            class: "!h-[21px] !w-[22px]",
            isActive: false,
         },
      ],
   },
   {
      title: "Info",
      menus: [
         {
            name: `Tag's Table`,
            icon: "mdiTable",
            class: "!h-[21px] !w-[22px]",
            isActive: false,
            command() {
               if (tagSore.mainMenuTag)
                  for (let i = 0; i < tagSore.mainMenuTag.length; i++) {
                     if (tagSore.mainMenuTag[i].edit) {
                        toast.add({
                           severity: "info",
                           summary: "Opes!",
                           detail: `Please save or cancel the changes in main menu`,
                           life: 3000,
                        })
                        return
                     }
                  }
               tableInfoModal.value = true
            },
         },
      ],
   },
])
const sendOrCancelByEnter = (event: KeyboardEvent, id: string, currentText: string, recoverText: string) => {
   if (event.key === "Enter") saveEditRow(id, currentText, recoverText)
   if (event.key === "Escape") cancelEditRow(id)
}
const saveEditRow = (id: string, currentText: string, recoverText: string) => {
   // check safety
   currentText = currentText.trim()
   if (currentText.length < 1) {
      toast.add({
         severity: "error",
         summary: "Duplicates",
         detail: "Text field is empty",
         life: 3000,
      })
      return
   }
   if (tagSore.tags) {
      for (let i = 0; i < tagSore.tags.length; i++) {
         if (
            tagSore.tags[i].tagNameRecover.toLowerCase().replace(/\s+/g, "") ===
            currentText.toLowerCase().replace(/\s+/g, "")
         ) {
            if (
               tagSore.tags[i].id == id &&
               tagSore.tags[i].tagNameRecover.toLowerCase().replace(/\s+/g, "") ===
                  currentText.toLowerCase().replace(/\s+/g, "")
            ) {
               tagSore.tags[i].edit = false
               return
            }
            toast.add({
               severity: "error",
               summary: "Error",
               detail: `Category name ${currentText} is already exist`,
               life: 3000,
            })
            return
         }
      }
      for (let i = 0; i < tagSore.tags.length; i++) {
         if (tagSore.tags[i].id == id) {
            tagSore.tags[i].tagNameRecover = tagSore.tags[i].tagName
            tagSore.tags[i].edit = false
            toast.add({
               severity: "success",
               summary: "Updated",
               detail: "your category name was updated successfully",
               life: 3000,
            })
         }
      }
      passwordStore.updateLoginPasswordsTags(currentText, recoverText)
   }
}
const cancelEditRow = (id: string) => {
   if (tagSore.tags)
      for (let i = 0; i < tagSore.tags.length; i++) {
         if (tagSore.tags[i].id == id) {
            tagSore.tags[i].tagName = tagSore.tags[i].tagNameRecover
            tagSore.tags[i].edit = false
         }
      }
}
const editRow = (id: string) => {
   if (tagSore.tags)
      for (let i = 0; i < tagSore.tags.length; i++) {
         if (tagSore.tags[i].id == id) tagSore.tags[i].edit = true
      }
}
const enableEditIcon = (id: string) => {
   if (tagSore.tags)
      for (let i = 0; i < tagSore.tags.length; i++) {
         if (tagSore.tags[i].id == id) tagSore.tags[i].editIcon = true
      }
}
const disableEditIcon = (id: string) => {
   if (tagSore.tags)
      for (let i = 0; i < tagSore.tags.length; i++) {
         if (tagSore.tags[i].id == id) tagSore.tags[i].editIcon = false
      }
}
const filterPasswordsByTag = (id: string, tagName: string) => {
   // console.log(passwordStore.allPasswordsBackup)
   // console.log(passwordStore.allPasswords)

   // we need this to know when a tag is selected or deselected. if currentSelectedTag has amount, it means a tag has been selected if it hasn't it means no tag has been selected
   passwordStore.currentSelectedTag = tagName
   // this will do the select and deselect functionally
   currentTagId.value = currentTagId.value === id ? null : id
   // this for will filter all password blocks by given tagName
   for (let i = 0; i < passwordStore.allPasswords.length; i++) {
      passwordStore.allPasswordsBackup = [
         ...passwordStore.allPasswords.filter((obj) => obj.tags?.includes(tagName)),
      ]
   }
   // if currentTagId is null it means user deselect the tag, therefore all filtered passwords should come back
   if (currentTagId.value == null) {
      passwordStore.allPasswordsBackup = [...passwordStore.allPasswords]
      passwordStore.currentSelectedTag = null
   }
}
</script>
<template>
   <!-- different types of modals -->

   <!-- tag table -->
   <Sidebar v-model:visible="tableInfoModal" position="full">
      <Tag :button-size="'w-30 m-2 !me-0 !h-7'" :input-size="'w-60 h-9 '" />
      <TagTable v-if="tagSore.tags && tagSore.tags.length >= 1" />
      <div v-else class="h-1/2 flex items-center justify-center">
         <p class="font-bold text-2xl capitalize">There are no tags to display</p>
      </div>
   </Sidebar>
   <!-- addTag -->
   <Dialog
      v-model:visible="tagSore.tagModal"
      modal
      :draggable="false"
      header="Create New Tag"
      class="w-1/3"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
   >
      <Tag button-size="w-[30%] m-2" input-size="w-[70%]  h-9" />
   </Dialog>
   <!-- login type password -->
   <Dialog
      v-model:visible="globalStore.LoginTypeModal"
      modal
      :draggable="false"
      class="w-full sm:w-[90%] md:w-[85%] lg:w-[750px]"
      header="Create New Login Type Password"
   >
      <div class="flex">
         <NewPassword class="border dark:border-gray-700 rounded-lg p-4" />
         <PasswordGenerator class="border ms-2 dark:border-gray-700 rounded-lg p-4" />
         <!-- <Divider :layout="'vertical'" class="!mx-1" /> -->
      </div>
   </Dialog>

   <!-- Main Menu -->
   <div class="flex flex-col justify-between darkLight w-full md:w-[17rem] h-screen fixed">
      <ScrollPanel class="h-screen">
         <!-- Top section -->
         <!-- Header -->
         <div class="text-center my-2">
            <span class="text-2xl darkLight"
               >Password <span class="text-primary-400 font-bold">Manager</span></span
            >
         </div>
         <!-- Body -->
         <div class="flex flex-col space-y-4">
            <!-- Tag Search -->
            <div>
               <span class="px-4 text-primary-500 dark:text-primary-400 font-bold leading-none"
                  >Password Search</span
               >
               <div class="flex py-2 items-center justify-between px-4 smooth">
                  <span class="relative">
                     <MdiIcon
                        icon="mdiMagnify"
                        class="absolute top-2/4 -mt-[10px] left-2 text-surface-400 dark:text-surface-600 !w-[22px] !h-[22px]"
                     />
                     <InputText placeholder="Search" class="pl-8 w-[230px]" />
                  </span>
                  <!-- Options -->
               </div>
               <div v-for="chunk in menu" class="mt-4 px-3 flex flex-col darkLight">
                  <span class="text-primary-500 dark:text-primary-400 font-bold leading-none">{{
                     chunk.title
                  }}</span>
                  <div
                     v-for="item in chunk.menus"
                     @click="item.command"
                     :class="item.isActive ? 'active' : ''"
                     class="flex justify-between mt-1 items-center p-1 rounded-md cursor-pointer defaultHover"
                  >
                     <div class="flex">
                        <MdiIcon viewBox="0 0 24 24" :icon="item.icon" :class="item.class" />
                        <!-- <NuxtLink :to="item.link">{{ item.name }}</NuxtLink> -->
                        <span class="ms-2">{{ item.name }}</span>
                     </div>
                     <Badge
                        class="!bg-yellow-500 dark:bg-yellow-300"
                        v-if="
                           item.name == 'Duplicate Passwords' && passwordStore.duplicatePasswords.length >= 2
                        "
                        :value="passwordStore.duplicatePasswords.length"
                     ></Badge>
                  </div>
               </div>
            </div>
            <!-- Tags -->
            <div>
               <div class="flex justify-between px-4">
                  <span class="text-primary-500 dark:text-primary-400 font-bold leading-none">Tags</span>
                  <MdiIcon
                     @click="tagSore.tagModal = true"
                     icon="mdiPlusCircle"
                     class="!h-[25px] !w-[23px] text-gray-400 hover:text-primary-400 cursor-pointer"
                  />
               </div>
               <InputText v-model="filterFolder" class="w-56 mx-4 my-2" placeholder="Filter Tags by name" />
               <!-- tag wrapper -->
               <div v-if="tagSore.tags" class="dark:text-white px-3 pr-5 flex flex-col">
                  <div
                     v-for="(row, index) in tagSore.mainMenuTag"
                     class="mt-1 p-1 justify-between items-center rounded-md defaultHover flex"
                     :class="{ active: currentTagId == row.id }"
                     @mouseenter="enableEditIcon(row.id)"
                     @mouseleave="disableEditIcon(row.id)"
                  >
                     <div class="flex">
                        <MdiIcon
                           @click="filterPasswordsByTag(row.id, row.tagName)"
                           icon="mdiTag"
                           class="!h-[22px] !w-[22px]"
                        />
                        <span v-if="!row.edit" class="ms-2 max-w-44 overflow-auto">{{ row.tagName }}</span>
                        <InputText
                           v-else
                           @keyup="sendOrCancelByEnter($event, row.id, row.tagName, row.tagNameRecover)"
                           class="ms-2 w-[150px] h-7"
                           v-model.trim="row.tagName"
                           placeholder="Type your tag name"
                        />
                     </div>
                     <div class="flex space-x-1">
                        <MdiIcon
                           @click="editRow(row.id)"
                           v-if="row.editIcon && !row.edit"
                           icon="mdiPen"
                           class="!h-[21px] !w-[22px] me-1 text-yellow-500 cursor-pointer"
                        />
                        <MdiIcon
                           @click="saveEditRow(row.id, row.tagName, row.tagNameRecover)"
                           v-if="row.edit"
                           icon="mdiCheckCircle"
                           class="!h-[23px] !w-[22px] text-green-500 hover:text-green-600 cursor-pointer"
                        />
                        <MdiIcon
                           @click="cancelEditRow(row.id)"
                           v-if="row.edit"
                           icon="mdiCloseCircle"
                           class="!h-[23px] !w-[22px] text-red-500 hover:text-red-600 cursor-pointer"
                        />
                     </div>
                  </div>
               </div>
               <!-- Menu -->
            </div>

            <div>
               <span class="px-4 text-primary-500 dark:text-primary-400 font-bold leading-none">Display</span>
               <!-- Menu -->
               <div @click="theme" class="flex py-2 defaultHover items-center justify-between px-4">
                  <div class="flex items-center">
                     <MdiIcon icon="mdiSwapHorizontal" class="!h-[25px] !w-[25px]" />
                     <span class="text-gray-600 dark:text-white ms-2">Toggle To Dark</span>
                  </div>
                  <!-- short cut -->
                  <div class="flex bg-gray-200 dark:bg-gray-700 p-1 rounded-md">⌘+I</div>
               </div>
            </div>
         </div>
         <!-- Footer -->
         <div></div>
      </ScrollPanel>
   </div>
</template>

<style scoped>
.active {
   @apply bg-primary-400 dark:bg-primary-600 text-white hover:dark:bg-primary-600 hover:bg-primary-400;
}
</style>
import type { menuNamesTypes, menuType } from "~/types/type";
