import React from 'react'
import OuterNavbar from '../Components/OuterNavbar'
import '../../src/Style.css'
const Home = ()=>{
    return (<div>
        <header>
            <OuterNavbar />
            <div className="title">
                <h1>BOOK EXCHANGE</h1>
                <p>You are not done with a book until you pass it to another reader..</p>
            </div>
        </header>
        <section>
            <article>
            </article>
        </section>
        <footer>

        </footer>
    </div>)
}
export default Home;
