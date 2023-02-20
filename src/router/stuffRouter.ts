const expressStuff = require("express")
const auth = require("../middleware/authentification")
const stuffRouter = expressStuff.Router()
const stuffController = require("../controllers/stuffController")

stuffRouter.get("/", stuffController.findAll)
stuffRouter.get("/:id", stuffController.findOne)
stuffRouter.post("/", auth, stuffController.create)
stuffRouter.put("/:id", auth, stuffController.edit)
stuffRouter.delete("/:id", auth, stuffController.delete)

module.exports = stuffRouter
