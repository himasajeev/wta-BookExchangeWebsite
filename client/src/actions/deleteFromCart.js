import {deletefromcart} from "../Api-requests/bookRequests"
const deleteFromCart = (bookid)=>{
    console.log(bookid)
    deletefromcart(bookid).then((res)=>{
        
        if(res.status===200)
        {
            alert("Book removed from cart succesfully")
        }
        else
        {
            alert("Couldnt remove book! Try again later")
        }
    })
}
export default deleteFromCart;