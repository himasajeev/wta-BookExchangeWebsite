import axios from '../axiosConfig'

const addbook = async(book)=>{
    try{
            console.log(book)
            const bookData = new FormData();
            bookData.append('file',book.image);
            bookData.append('title',book.title)
            bookData.append('author',book.author)
            bookData.append('sub',book.subject)
            bookData.append('price',book.price)

            const res = await axios.post('/books',bookData,{
            })
            console.log(res);
            return res;
    
        

    }
    catch(err){
        
        console.log(err.res);}

}

const bookById = async(Bookid)=>{
    try{
        console.log(Bookid);
        const res = await axios.get('/books/'+Bookid);
        console.log(res);
        return res;

    }
    catch(err){
        
        console.log(err.res);}
}
const ownedbooks =  async (username)=>{
    //console.log("inside login");
    
    try{
        const res = await axios.get('/books/bookByOwner/'+username);
        console.log(res);
        return res;

    }
    catch(err){
        
        console.log(err.res);}
    }
    const favouritebooks =  async (username)=>{
        //console.log("inside login");
        
        try{
            const res = await axios.get('/cart/cartByOwner/'+username);
            console.log(res);
            return res;
    
        }
        catch(err){
            
            console.log(err.res);}
        }
    const bookBySubject = async(subject)=>{
        try{
            const res = await axios.get('/books/bookBySubject/'+subject);
            console.log(res);
            return res;
    
        }
        catch(err){
            
            console.log(err.res);}
    }
    const bookByAuthor = async(author)=>{
        try{
            const res = await axios.get('/books/bookByAuthor/'+author);
            console.log(res);
            return res;
    
        }
        catch(err){
            
            console.log(err.res);}
    }
    const bookByName = async(Name)=>{
        try{
            console.log(Name);
            const res = await axios.get('/books/bookByName/'+Name);
            console.log(res);
            return res;
    
        }
        catch(err){
            
            console.log(err.res);}
    }
    const getOwnerInfo = async(bookId)=>{
        try{
            console.log(bookId);
            const res = await axios.get('/books/getOwnerInfo/'+bookId);
            console.log(res);
            return res;
    
        }
        catch(err){
            
            console.log(err.res);}
    }
    const isBookofUser = async(bookId)=>{
        
      
        try{
            const res = await axios.get('/books/bookofuser/'+bookId);
            console.log(res);
            return res;

        }
        catch(err){
           
            console.log(err.res);}
    }
    const inCartofUser = async(bookId)=>{
        
      
        try{
            const res = await axios.get('/carts/incartofuser/'+bookId);
            console.log(res);
            return res;

        }
        catch(err){
           
            console.log(err.res);}
    }
export {addbook,ownedbooks,isBookofUser,favouritebooks,bookByName,bookByAuthor,bookBySubject,bookById,getOwnerInfo,inCartofUser};