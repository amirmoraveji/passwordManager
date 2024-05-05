export const humanDate = (input: number) => {
   const date = new Date(input)
   const year = date.getFullYear()
   const month = date.getMonth() + 1 // Month is zero-based, so add 1
   const day = date.getDate()
   const hours = date.getHours()
   const minutes = date.getMinutes()
   const seconds = date.getSeconds()

   // Determine AM or PM
   const period = hours >= 12 ? "PM" : "AM"
   // Convert to 12-hour format
   const hours12 = hours % 12 || 12

   return `${day}/${month}/${year} | ${hours12}:${minutes} ${period}`
}
