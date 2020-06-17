import React,{useEffect,useState} from 'react'
import {favouritebooks} from "../Api-requests/bookRequests"
import TableBox from "../Components/TableBox"
import getUser from '../actions/getUser'
import InnerNavbar from '../Components/InnerNavbar'
import {bookByName,bookByAuthor,bookBySubject} from "../Api-requests/bookRequests"


const Recommendations = ()=>{
    const [CartBooks,setBooks] = useState([]);
    const [Recommended,setRecommended] = useState([]);
    const getRecommendtions = async ()=>{
        const username =  getUser();
        await favouritebooks(username).then((res)=>{
            if(res.status===200 && res.data)
            {     
    
                  setBooks(()=>{
                    return [...res.data]
                    });
                    (res.data).map((book)=>{
                         bookByAuthor(book.author).then((res)=>{
                            if(res.status===200)
                            {//console.log(res.data)
                            setRecommended((prev)=>{
                            return [...prev, ...res.data]
                            })}
                        })
                             bookByName(book.title).then((res)=>{
                                if(res.status===200)
                                {
                                    setRecommended((prev)=>{
                                        return [...prev, ...res.data]
                                        } )
                            } })

                     bookBySubject(book.subject).then((res)=>{
                    if(res.status===200)
                    {//console.log(res.data)
                        setRecommended((prev)=>{
                            return [...prev, ...res.data]
                            } )
                }
                })

                    })
            
           
    }})};
    useEffect(()=>{
     getRecommendtions();
     
        },[]);

        return (<div>
        <InnerNavbar/>
        {CartBooks.length===0?
            <h3>Add books to cart to get recommendations</h3>:
            <TableBox Books={Recommended} />
            }
        </div>
        )

    
}
export default Recommendations;