//* Components
//* Main menu
type menuType = {
   title: string
   menus: {
      name: string
      //for some weird reason i have to first add the icon name here, then use it in dynamic situations
      icon: "mdiHeart" | "mdiContentDuplicate" | "mdiBorderAll" | "mdiDelete" | "mdiLogin" | "mdiFingerprint" | "mdiCreditCard" | "mdiTable"
      class?: string
      isActive: true | false
      link?: string
      command?: () => void
      hoverCommand?: () => void
   }[]
}
type menuNamesTypes = "All" | "Favorite" | "Trash" | "Duplicate Passwords"
//* New Password
type inputErrorsType = {
   title: true | false
   description: true | false
   startWith: true | false
   password: true | false
   username: true | false
   twoFAPassword: true | false
   secondPassword: true | false
   email: true | false
   phone: true | false
   website: true | false
}
//* Pinia
//? passwordStore
type passwordInfoType = {
   id: string
   title: string
   description: string
   startWith: string
   password: string
   secondPassword: string
   email: string
   phone: string
   twoFAPassword: string
   username: string
   date: number
   tags?: string[]
   fullTag?: tagInterface[]
   favorite: true | false
   website: string
}
//? tagStore
interface tagInterface {
   id: string
   tagName: string
   tagNameRecover: string
   edit: boolean
   date: number
   editIcon?: boolean
}
//? check file
type checkState = {
   password: true | false
   secondPassword: true | false
   twoFA: true | false
   email: true | false
   phone: true | false
   website: true | false
}
type returnedData<fieldsStructure> = {
   data?: fieldsStructure
}
type fieldsStructure = {
   id?: number
   title?: string
   description?: string
   username?: string
   second_password?: string
   email?: string
   website?: string
   isFavorite?: boolean
   twoFA?: string
   timestamp?: string
   tags?: string
}
type QueryResult = {
   success: true | false
   response?: object[]
   error?: unknown
   message?: string
}
