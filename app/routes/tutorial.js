const {Router} = require( 'express');

const { createTutorial, getAllTutorial, deleteTutorial, updateTutorial, findOne } = require('../controllers/tutorial.controller')



const router = Router();

router.post('/', createTutorial)
router.get('/', getAllTutorial)
router.get('/:id', findOne)
router.put('/:id', updateTutorial)
router.delete('/:id', deleteTutorial)


module.exports = router;