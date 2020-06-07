import axios from '../axiosConfig'

const addbook = async(BookData)=>{
    try{
            console.log(BookData)
            const res = await axios.post('/books',{
                title:BookData.title,
                author:BookData.author,
                subject:BookData.subject,
                image:BookData.image,
                price:BookData.price
            });
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
export {addbook,ownedbooks,favouritebooks,bookByName,bookByAuthor,bookBySubject,bookById,getOwnerInfo};