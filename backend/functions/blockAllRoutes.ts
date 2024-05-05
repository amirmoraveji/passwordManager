// blockRoutes.js
import express from "express"
const app = express()

const blockRoutes = <T>(block: true | false) => {
   if (block) {
      app.all("*", (req, res) => {
         res.json("all routes are disabled well be right back soon :)")
      })
   }
   return app
}

export default blockRoutes
