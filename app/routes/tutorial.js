const {Router} = require( 'express');

const { createTutorial, getAllTutorial, deleteTutorial, updateTutorial, findOne } = require('../controllers/tutorial.controller')
const {auth} = require("../middlewares/auth")
const {upload} = require('../middlewares/mutler')


const router = Router();

router.post('/', upload.single("image"), createTutorial)
router.get('/', auth, getAllTutorial)
router.get('/:id', findOne)
router.put('/:id', updateTutorial)
router.delete('/:id', deleteTutorial)


module.exports = router;