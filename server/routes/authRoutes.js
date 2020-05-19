import express from 'express'
import authCtrl from '../controllers/authcontroller'

const router = express.Router()


router.route('/login')
    .post(authCtrl.signin)
router.route('/logout')
    .get(authCtrl.signout);

export default router;