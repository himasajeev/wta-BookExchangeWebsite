import React,{useState} from 'react'
import Book from "../Components/Book"
import '../../src/Style.css'
const TableBox= (props)=>{
    const Books = props.Books;
   //var uniqueBooks = [...new Set(Books)]
 function onlyUnique(value, index, self) { 
     console.log(value,index,self.indexOf(value))
    return self.indexOf(value) === index;
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