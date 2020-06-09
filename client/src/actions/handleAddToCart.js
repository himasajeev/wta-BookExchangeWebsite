import { addtocart } from "../Api-requests/userRequests"
const addToCart = (bookid)=>{
    console.log(bookid)
    addtocart(bookid).then((res)=>{
        
        if(res.status===200)
        {
            alert("Book added to cart succesfully")
        }
        else
        {
            alert("Couldnt add book! Try again later")
        }
    })
}
export default addToCart;