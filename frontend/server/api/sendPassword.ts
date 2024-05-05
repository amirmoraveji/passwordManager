// import { QueryResult, returnedData } from "../../types/type"
export default defineEventHandler(async (event) => {
   const data = await readBody(event)

   let res = await $fetch("http://backend:4000/api/set", {
      method: "POST",
      body: data,
   })
      .then((d) => d)
      .catch((e) => e)
   return data
})
