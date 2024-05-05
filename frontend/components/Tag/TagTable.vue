<script lang="ts" setup>
// Prime Vue
const toast = useToast()
const confirm = useConfirm()
// Pinia
const tagSore = useTagStore()
const passwordStore = usePasswordStore()

const editRow = (id: string) => {
   if (tagSore.tags)
      for (let i = 0; i < tagSore.tags.length; i++) {
         if (tagSore.tags[i].id == id) tagSore.tags[i].edit = true
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
const saveEditRow = (id: string, currentText: string, recoverText: string) => {
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
         if (tagSore.tags[i].tagNameRecover.toLowerCase().replace(/\s+/g, "") === currentText.toLowerCase().replace(/\s+/g, "")) {
            if (
               tagSore.tags[i].id == id &&
               tagSore.tags[i].tagNameRecover.toLowerCase().replace(/\s+/g, "") === currentText.toLowerCase().replace(/\s+/g, "")
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
const sendOrCancelByEnter = (event: KeyboardEvent, id: string, currentText: string, recoverText: string) => {
   if (event.key === "Enter") saveEditRow(id, currentText, recoverText)
   if (event.key === "Escape") cancelEditRow(id)
}
const confirmDelete = (event: Event, rowId: string, tagName: string) => {
   if (!(event.currentTarget instanceof HTMLElement)) {
      return
   }
   confirm.require({
      target: event.currentTarget,
      message: "Are you sure you want to delete this tag?",
      acceptClass:
         "!bg-red-400 dark:!bg-red-400 !border-red-500 dark:!border-red-400 !ring-red-500 dark:!ring-red-400 hover:!bg-red-600 dark:hover:!bg-red-300 hover:!border-red-600 dark:hover:!border-red-300 focus:!ring-red-400/50 dark:!focus:ring-red-300/50",
      accept: () => {
         passwordStore.deleteLoginPasswordsTags(tagName, rowId)
         toast.add({ severity: "info", summary: "Confirmed", detail: "Tag deleted", life: 3000 })
      },
   })
}
// DELETE TAGS FROM THE PASSWORD BLOCKS WHEN DELETE THE TAG IT SELF
</script>
<template>
   <label class="font-medium dark:text-white">Tags Table</label>
   <div
      class="mt-2 dark:text-white relative overflow-x-auto shadow-md sm:rounded-lg border transition-colors duration-100 border-gray-300 dark:border dark:border-gray-800">
      <table class="table w-full text-sm text-left rtl:text-right">
         <thead class="text-xs dark:bg-gray-950">
            <tr>
               <th scope="col" class="px-6 py-3 w-[240px]">Category</th>
               <th scope="col" class="px-6 py-3">Date Created</th>
               <th scope="col" class="px-6 py-3">Action</th>
            </tr>
         </thead>
         <tbody>
            <TransitionGroup name="list">
               <tr
                  v-for="row in tagSore.tags"
                  :key="row.id"
                  class="transition-colors duration-100 odd:bg-white odd:dark:bg-gray-800 even:dark:bg-gray-900 hover">
                  <th v-if="!row.edit" scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                     {{ row.tagName }}
                  </th>
                  <th v-else scope="row">
                     <InputText
                        class="ms-3"
                        @keyup="sendOrCancelByEnter($event, row.id, row.tagName, row.tagNameRecover)"
                        v-model.trim="row.tagName"
                        placeholder="Type your tag name" />
                  </th>
                  <td class="px-6 py-4">{{ humanDate(row.date) }}</td>
                  <td class="px-6 py-4 space-x-2">
                     <Button v-if="!row.edit" @click="editRow(row.id)" label="Edit" severity="warning" text />
                     <Button v-else @click="cancelEditRow(row.id)" label="Cancel" severity="secondary" text />
                     <Button v-if="!row.edit" @click="confirmDelete($event, row.id, row.tagName)" label="Delete" severity="danger" text />
                     <Button v-else @click="saveEditRow(row.id, row.tagName, row.tagNameRecover)" label="Save" severity="success" text />
                  </td>
               </tr>
            </TransitionGroup>
         </tbody>
      </table>
   </div>
</template>

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
   transition: all 0.5s ease;
}

.list-enter-from {
   transform: translateX(-30px);
}
.list-leave-to {
   opacity: 0;
   transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
   position: absolute;
}
</style>
