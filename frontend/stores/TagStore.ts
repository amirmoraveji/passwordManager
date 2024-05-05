export const useTagStore = defineStore("tagStore", () => {
   const tags = ref<tagInterface[]>()
   const mainMenuTag = ref<tagInterface[]>()
   tags.value = []
   const selectedTag = ref()
   const tagModal = ref(false)
   return { tags, selectedTag, mainMenuTag, tagModal }
})
