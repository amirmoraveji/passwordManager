export const usePasswordStore = defineStore("password", () => {
   const passwordInfo = ref<passwordInfoType>({
      id: "",
      title: "",
      description: "",
      startWith: "",
      password: "",
      twoFAPassword: "",
      username: "",
      date: 0,
      tags: [],
      fullTag: [],
      favorite: false,
      email: "",
      phone: "",
      secondPassword: "",
      website: "",
   })
   // const loginPasswords = ref<passwordInfoType[]>([])
   const trashPasswords = ref<passwordInfoType[]>([])
   const allPasswords = ref<passwordInfoType[]>([])
   const allPasswordsBackup = ref<passwordInfoType[]>([])
   const dups = ref<passwordInfoType[]>([])

   const favoritePasswords = ref<passwordInfoType[]>([])
   const duplicatePasswords = ref<passwordInfoType[]>([])
   const currentSelectedTag = ref<string | null>(null)
   const selectedSort = ref({ name: "Sort by title" })
   // send password info to the api here ...
   const sendPasswordData = async (pass: object) => {
      const { data } = await useFetch("/api/sendPassword", {
         method: "post",
         body: JSON.stringify(pass),
      })
      return console.log(data.value)
   }
   // this function will add current password into password list
   const addToPasswordLoginList = () => {
      const tagSore = useTagStore()
      passwordInfo.value.id = simpleId()
      passwordInfo.value.date = new Date().valueOf()
      passwordInfo.value.fullTag = tagSore.selectedTag
      allPasswords.value.push({ ...passwordInfo.value })
      // all passwords only come back if user, deselect the selected tag
      if (currentSelectedTag.value == null) {
         allPasswordsBackup.value = [...allPasswords.value]
      }
      sortPasswordBlocks()

      sendPasswordData(passwordInfo.value) //this will send the password data to the Backend API
      // This will reset all current amounts
      passwordInfo.value = {
         id: "",
         title: "",
         description: "",
         startWith: "",
         password: "",
         twoFAPassword: "",
         username: "",
         date: 0,
         tags: [],
         fullTag: [],
         favorite: false,
         email: "",
         phone: "",
         secondPassword: "",
         website: "",
      }
      tagSore.selectedTag = []
   }
   const updateLoginPasswordsTags = (newTagName: string, currentTagName: string) => {
      for (let i = 0; i < allPasswords.value.length; i++) {
         const tags = allPasswords.value[i].tags ?? []
         const index = tags.indexOf(currentTagName)
         if (index !== -1) {
            tags[index] = newTagName
         }
      }
      for (let i = 0; i < favoritePasswords.value.length; i++) {
         const tags = favoritePasswords.value[i].tags ?? []
         const index = tags.indexOf(currentTagName)
         if (index !== -1) {
            tags[index] = newTagName
         }
      }
      for (let i = 0; i < trashPasswords.value.length; i++) {
         const tags = trashPasswords.value[i].tags ?? []
         const index = tags.indexOf(currentTagName)
         if (index !== -1) {
            tags[index] = newTagName
         }
      }
   }
   const deleteLoginPasswordsTags = (tagName: string, rowId: string) => {
      const tagSore = useTagStore()
      passwordInfo.value.fullTag = []

      if (tagSore.tags) {
         tagSore.tags = tagSore.tags.filter((row) => row.id != rowId)
         tagSore.mainMenuTag = tagSore.tags.filter((row) => row.id != rowId)
      }
      for (let i = 0; i < allPasswords.value.length; i++) {
         allPasswords.value[i].tags = allPasswords.value[i].tags?.filter((obj) => obj != tagName)
         allPasswords.value[i].fullTag = allPasswords.value[i].fullTag?.filter((obj) => obj.id != rowId)
      }
      for (let i = 0; i < favoritePasswords.value.length; i++) {
         favoritePasswords.value[i].tags = favoritePasswords.value[i].tags?.filter((obj) => obj != tagName)
         favoritePasswords.value[i].fullTag = favoritePasswords.value[i].fullTag?.filter((obj) => obj.id != rowId)
      }
      for (let i = 0; i < duplicatePasswords.value.length; i++) {
         duplicatePasswords.value[i].tags = duplicatePasswords.value[i].tags?.filter((obj) => obj != tagName)
         duplicatePasswords.value[i].fullTag = duplicatePasswords.value[i].fullTag?.filter((obj) => obj.id != rowId)
      }
      for (let i = 0; i < trashPasswords.value.length; i++) {
         trashPasswords.value[i].tags = trashPasswords.value[i].tags?.filter((obj) => obj != tagName)
         trashPasswords.value[i].fullTag = trashPasswords.value[i].fullTag?.filter((obj) => obj.id != rowId)
      }
   }
   const checkDups = (): void => {
      dups.value = []
      for (let i = 0; i < allPasswords.value.length; i++) {
         for (let j = i + 1; j < allPasswords.value.length; j++) {
            if (allPasswords.value[i].id != allPasswords.value[j].id)
               if (
                  allPasswords.value[i].password.length >= 1 &&
                  allPasswords.value[i].password === allPasswords.value[j].password
               ) {
                  if (!dups.value.includes(allPasswords.value[i])) dups.value.push(allPasswords.value[i])
                  if (!dups.value.includes(allPasswords.value[j])) dups.value.push(allPasswords.value[j])
               }
         }
      }
      duplicatePasswords.value = [...dups.value]
   }
   const updateInputs = ref<passwordInfoType>({
      id: "",
      title: "",
      description: "",
      startWith: "",
      password: "",
      twoFAPassword: "",
      username: "",
      date: 0,
      tags: [],
      fullTag: [],
      favorite: false,
      email: "",
      phone: "",
      secondPassword: "",
      website: "",
   })
   const pageTitle = ref<string>("All")

   const sortByTitle = (): void => {
      allPasswords.value = allPasswords.value.sort((a, b) => a.title.localeCompare(b.title))
      favoritePasswords.value = favoritePasswords.value.sort((a, b) => a.title.localeCompare(b.title))
      if (currentSelectedTag.value == null) {
         allPasswordsBackup.value = [...allPasswords.value]
      }
   }
   const sortByDate = (): void => {
      allPasswords.value = allPasswords.value.sort((a, b) => a.date - b.date)
      favoritePasswords.value = favoritePasswords.value.sort((a, b) => a.date - b.date)
      if (currentSelectedTag.value == null) {
         allPasswordsBackup.value = [...allPasswords.value]
      }
   }
   const sortPasswordBlocks = (): void => {
      if (selectedSort.value.name == "Sort by title") {
         sortByTitle()
      }
      if (selectedSort.value.name == "Sort by date") {
         sortByDate()
      }
   }
   const sortOptions = ref([{ name: "Sort by title" }, { name: "Sort by date" }])
   watch(selectedSort, () => {
      if (selectedSort.value.name == "Sort by title") {
         sortByTitle()
      }
      if (selectedSort.value.name == "Sort by date") {
         sortByDate()
      }
   })
   return {
      passwordInfo,
      favoritePasswords,
      updateInputs,
      trashPasswords,
      pageTitle,
      allPasswords,
      allPasswordsBackup,
      duplicatePasswords,
      currentSelectedTag,
      dups,
      selectedSort,
      sortOptions,
      addToPasswordLoginList,
      updateLoginPasswordsTags,
      deleteLoginPasswordsTags,
      checkDups,
      sortPasswordBlocks,
   }
})
