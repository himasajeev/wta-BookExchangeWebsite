import React,{Fragment} from 'react'
import Book from "../Components/Book"
import '../../src/Style.css'
const TableBox= (props)=>{
    const Books = props.Books;
    return (<div>
        {Books.map((book,id)=>{
       return <Book key={id}  title={book.bookname} author={book.author} price={book.price} img={book.imagepath}/>
        })}
    </div>)
}
export default TableBox;