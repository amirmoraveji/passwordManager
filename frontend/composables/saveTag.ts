export const addPassword = () => {
   type inputErrorsType = {
      title?: true | false
      description?: true | false
      startWith?: true | false
      customPassword?: true | false
      twoFAPassword?: true | false
   }
   const passwordStore = usePasswordStore()
   const toast = useToast()
   const inputErrors = ref<inputErrorsType>({
      title: false,
      description: false,
      startWith: false,
      customPassword: false,
   })
   const customPassword = ref(false)
   const tagSore = useTagStore()
   if (passwordStore.passwordInfo.title.length < 1) {
      inputErrors.value.title = true
      toast.add({
         severity: "error",
         summary: "Fields Are Empty",
         detail: "please write at least one character",
         life: 2000,
      })
      return
   }

   if (passwordStore.passwordInfo.description.length < 1) {
      inputErrors.value.description = true
      toast.add({
         severity: "error",
         summary: "Fields Are Empty",
         detail: "please write at least one character",
         life: 2000,
      })
      return
   }
   if (customPassword.value) {
      if (passwordStore.passwordInfo.customPassword && passwordStore.passwordInfo.customPassword.length < 1) {
         inputErrors.value.customPassword = true
         toast.add({
            severity: "error",
            summary: "Fields Are Empty",
            detail: "please write at least one character",
            life: 2000,
         })
         return
      }
   }

   if (passwordStore.passwordInfo.randomPassword.length < 1) {
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
   passwordStore.passwordInfo.id = simpleId()
   passwordStore.passwordInfo.date = new Date().valueOf()
   passwordStore.addToPasswordLoginList()
   console.log(passwordStore.loginPasswords)
}
