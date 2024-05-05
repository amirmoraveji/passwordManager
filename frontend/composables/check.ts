export const inputErrors = ref<inputErrorsType>({
   title: false,
   description: false,
   startWith: false,
   password: false,
   username: false,
   twoFAPassword: false,
   secondPassword: false,
   email: false,
   phone: false,
   website: false,
})
// enable/disable state
export let checkStates = ref<checkState>({
   password: false,
   secondPassword: false,
   email: false,
   phone: false,
   twoFA: false,
   website: false,
})
export const checkPassword = () => {
   const passwordStore = usePasswordStore()
   if (checkStates.value.password) {
      inputErrors.value.password = false
      passwordStore.passwordInfo.password = ""
      passwordStore.updateInputs.password = ""
   }
}
export const checkSecondPassword = () => {
   const passwordStore = usePasswordStore()
   if (checkStates.value.secondPassword) {
      inputErrors.value.secondPassword = false
      passwordStore.passwordInfo.secondPassword = ""
      passwordStore.updateInputs.secondPassword = ""
   }
}
export const check2FA = () => {
   const passwordStore = usePasswordStore()
   if (checkStates.value.twoFA) {
      inputErrors.value.twoFAPassword = false
      passwordStore.passwordInfo.twoFAPassword = ""
      passwordStore.updateInputs.twoFAPassword = ""
   }
}
export const checkEmail = () => {
   const passwordStore = usePasswordStore()
   if (checkStates.value.email) {
      inputErrors.value.email = false
      passwordStore.passwordInfo.email = ""
      passwordStore.updateInputs.email = ""
   }
}
export const checkPhone = () => {
   const passwordStore = usePasswordStore()
   if (checkStates.value.phone) {
      inputErrors.value.phone = false
      passwordStore.passwordInfo.phone = ""
      passwordStore.updateInputs.phone = ""
   }
}
export const checkWebsite = () => {
   const passwordStore = usePasswordStore()
   if (checkStates.value.website) {
      inputErrors.value.website = false
      passwordStore.passwordInfo.website = ""
      passwordStore.updateInputs.website = ""
   }
}
