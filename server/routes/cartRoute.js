import express from 'express'
import userCtrl from '../controllers/usercontroller'
import authCtrl from '../controllers/authcontroller'
import cartCtrl from '../controllers/cartcontroller'
import isAuthenticated from '../../config/middleware/isAuthenticated'
const router = express.Router()


router.route("/")
    .get(isAuthenticated,cartCtrl.list)
    .post(isAuthenticated,cartCtrl.addBook)
router.route("/incartofuser/:bookid")
    .get(isAuthenticated,cartCtrl.BookPresent)
router.route("/cartByOwner/:userid")
    .get(isAuthenticated,authCtrl.hasAuthorization,cartCtrl.BooksOfUser)
router.route("/deletefromcart/:bookid")
    .delete(isAuthenticated,cartCtrl.Delete)
export default router;