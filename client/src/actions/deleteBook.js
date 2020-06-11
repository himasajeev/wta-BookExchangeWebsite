import {deletebook} from "../Api-requests/bookRequests"
const deleteBook = (bookid)=>{
    console.log(bookid)
    deletebook(bookid).then((res)=>{
        
        if(res.status===200)
        {
            alert("Book removed  succesfully")
        }
        else
        {
            alert("Couldnt remove book! Try again later")
        }
    })
}
export default deleteBook;