import React,{useState} from 'react'
import Book from "../Components/Book"
import '../../src/Style.css'
const TableBox= (props)=>{
    const Books = props.Books;
    var ids = []
   //var uniqueBooks = [...new Set(Books)]
 function onlyUnique(value, index, self) { 
     
     var status = true;
    ids.forEach(id => {
        if(id === value.id)
        status= false;
    });
    if(status)
    ids.push(value.id)
    return status;
}
var uniqueBooks = Books.filter( onlyUnique );
    console.log(uniqueBooks)
    //console.log("dd")
    return (<div className="tableBox">
        {uniqueBooks.map((book)=>{
       return <Book key={book.id}  id={book.id} title={book.bookname} author={book.author} price={book.price} imagepath={book.imagepath}/>
        })}
    </div>)
}
export default TableBox;