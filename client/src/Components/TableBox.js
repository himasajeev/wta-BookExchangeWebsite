import React,{Fragment} from 'react'
import Book from "../Components/Book"
import '../../src/Style.css'
const TableBox= (props)=>{
    const Books = props.Books;
    console.log(Books)
    console.log("dd")
    return (<div>
        {Books.map((book)=>{
       return <Book key={book.id} id={book.id} title={book.bookname} author={book.author} price={book.price} img={book.imagepath}/>
        })}
    </div>)
}
export default TableBox;