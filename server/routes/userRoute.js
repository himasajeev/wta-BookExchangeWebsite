import express from 'express'
import userCtrl from '../controllers/usercontroller'
import authCtrl from '../controllers/authcontroller'
import isAuthenticated from '../../config/middleware/isAuthenticated'
const router = express.Router()


router.route("/")
.post(userCtrl.create);

router.route("/:userid")
.get(isAuthenticated, userCtrl.read)
.patch(isAuthenticated,authCtrl.hasAuthorization)//do patching

export default router;



