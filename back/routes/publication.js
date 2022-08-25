const express = require('express');
const multer = require('../middleware/multer-config');
const publiCtrl = require('../controllers/publication.js');
const auth =  require('../middleware/auth')
const router = express.Router();



router.post('/', auth, multer, publiCtrl.newPublication)
router.post('/:id/like', auth, publiCtrl.likeHandler)


router.get('/', auth, publiCtrl.getAll)
router.get('/:id', auth, publiCtrl.getOne)


router.put('/:id', auth, multer, publiCtrl.modifyOne)


router.delete('/:id', auth, publiCtrl.deleteOne)


module.exports = router