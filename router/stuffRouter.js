const express = require("express")
const auth = require("../middleware/authentification")
const router = express.Router()
const stuffController = require("../controllers/stuffController")

router.get('/', stuffController.findAll)
router.get('/:id', stuffController.findOne)
router.post('/', auth, stuffController.create)
router.put('/:id', auth, stuffController.edit)
router.delete('/:id', auth, stuffController.delete)

module.exports = router