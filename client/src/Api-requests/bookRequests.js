import axios from '../axiosConfig'


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
export {ownedbooks,favouritebooks};