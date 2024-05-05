<script lang="ts" setup>
const tagInput = ref<string>("")
const tagValue = ref<string>("")
const tagInputEdit = ref<string>("")
const tagError = ref<"error" | "warning" | "">()
const toast = useToast()
interface Props {
   buttonSize: string
   inputSize: string
}
const props = defineProps<Props>()

// Pinia Storage
const tagSore = useTagStore()

// interface tagInterface {
//   id: string
//   tagName: string
//   tagNameRecover: string
//   edit: boolean
//   date: number
// }
// const tags = ref<tagInterface[]>([])

const addTag = () => {
   const trimmedTagInput = tagInput.value.trim().replace(/\s+/g, " ")
   if (trimmedTagInput.length < 1) {
      tagError.value = "error"
      toast.add({
         severity: "error",
         summary: "Field is empty",
         detail: "Tag field cannot be empty",
         life: 3000,
      })
      return
   }
   if (tagSore.tags) {
      const lowerCaseTagInput = trimmedTagInput.toLowerCase()
      const duplicateTag = tagSore.tags.find((tag) => tag.tagName.toLowerCase().replace(/\s+/g, " ") === lowerCaseTagInput)
      if (duplicateTag) {
         toast.add({
            severity: "error",
            summary: "Duplicates",
            detail: "Duplicating Tags is not allowed",
            life: 3000,
         })
         return
      }
      tagSore.tagModal = false
      const tag = {
         id: simpleId(),
         tagName: trimmedTagInput,
         tagNameRecover: trimmedTagInput,
         edit: false,
         date: new Date().valueOf(),
      }
      tagSore.tags.unshift(tag)
      console.log(tag)

      tagSore.mainMenuTag = tagSore.tags
      tagInput.value = ""
      toast.add({
         severity: "success",
         detail: "Tag was successfully added",
         life: 3000,
      })
   }
}
const dropAllow = ref(false)
</script>
:
<template>
   <div class="flex space-x-2 items-center">
      <InputText :class="props.inputSize" placeholder="Type your tag name" v-model="tagInput" />
      <Button @click="addTag" :class="props.buttonSize">Add Tag</Button>
   </div>

   <!-- <Toast /> -->
</template>

<style scoped></style>
