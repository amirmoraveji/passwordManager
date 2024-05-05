// import { QueryResult, returnedData } from "../../types/type"
export default defineEventHandler(async (event): Promise<QueryResult> => {
   let res = (await $fetch("http://backend:4000/api/favorite")
      .then((d) => d)
      .catch((e) => e)) as QueryResult
   return res
})
