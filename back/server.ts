import express from "express"

const port: number = 4000
const app = express()

app.get("/", (req, res) => {
    res.json("Hello world 123")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
