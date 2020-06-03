import React from 'react'
const Book = (props)=>{
    return( <div class="result">
    <p id="title"><b>{props.title}</b><img src="bookdisp.jpg" alt="book"/></p>
    <div class="detail">
        <p>{props.Author}</p>
        <p>{props.Price}</p>
    </div>
</div>)
}
export default Book;