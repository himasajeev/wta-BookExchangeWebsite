import express from 'express'
import authCtrl from '../controllers/authcontroller'
import bookCtrl from '../controllers/bookcontroller'
import isAuthenticated from '../../config/middleware/isAuthenticated'
import multercntrl from "../controllers/multercontroller"
const router = express.Router();

router.route("/")
    .get(isAuthenticated,bookCtrl.list)
    .post(isAuthenticated,multercntrl.Upload,bookCtrl.addBook)
router.route("/bookBySubject/:sub")
    .get(isAuthenticated,bookCtrl.FindBookBySub)
router.route("/bookByName/:bookname")
    .get(isAuthenticated,bookCtrl.FindBookByName)
router.route("/bookByAuthor/:author")
    .get(isAuthenticated,bookCtrl.FindBookByAuthor)
router.route("/bookByOwner/:userid")
    .get(isAuthenticated,authCtrl.hasAuthorization,bookCtrl.BooksOfUser)
router.route("/getOwnerInfo/:bookid")
    .get(isAuthenticated,bookCtrl.ownerInfo)
router.route('/bookofUser')
    .get(isAuthenticated,bookCtrl.isBookofUser)
router.route('/:bookid')
    .get(isAuthenticated,bookCtrl.read) 
    .delete(isAuthenticated,bookCtrl.isOwner,bookCtrl.Delete)
    .patch(isAuthenticated,bookCtrl.isOwner,bookCtrl.update)

router.param('bookid',bookCtrl.bookById);
export default router;

