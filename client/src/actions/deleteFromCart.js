import {deletefromcart} from "../Api-requests/bookRequests"
import refresh from "./RefreshPage"
const deleteFromCart = (bookid)=>{
    console.log(bookid)
    deletefromcart(bookid).then((res)=>{
        
        if(res.status===200)
        {
            alert("Book removed from cart succesfully")
            // refresh();
        }
        else
        {
            alert("Couldnt remove book from cart! Try again later")
        }
    })
}
export default deleteFromCart;