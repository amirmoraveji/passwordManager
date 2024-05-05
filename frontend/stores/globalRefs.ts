// This file is useful to change binary stages globally like opening and closing a modal
export const useGlobalRefStore = defineStore("globalRef", () => {
   // this variable will change both in mainMenu and newPassword component
   const LoginTypeModal = ref<true | false>(false)
   return { LoginTypeModal }
})
