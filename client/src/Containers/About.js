import React from 'react'
import OuterNavbar from '../Components/OuterNavbar'
import '../../src/Style.css'
import image from "../../src/assets/images/bookswap.jpg"
const About = ()=>{
 
return (
    
    <div className="about">
       
          <OuterNavbar/>
          <h1 >ABOUT</h1>
       
        <div className="content">
            <article>
             <p>
             Finding the right books for each semester have always been a problem for NITK students.
             Students buy books for reference or for semester exams and do not have a use for the books after a certain time duration.
             Unnecessary logistics and expenditure is involved in the returning of books to a vendor and the vendor earning a commission 
             on selling the same books back to the junior students.<br />
             We intend to eliminate the intermediary processes viz. the middleman and make it easier to transfer books directly from
             owner to recipient.<br />
            <br />This is the Book Exchange website for NITK  to facilitate the transfer of books between seniors and juniors.
            </p>
            </article>
            <section>
            
                <img src={image} alt="img" />
            </section>
        </div>
        <div>
            <ul className="team">
                <li><ul className="member">
                    <li>Nithya Manoj</li>
                    <li>nithyamanoj.ms@gmail.com</li>
                </ul></li>
                <li><ul className="member">
                    <li>Hima Sajeev</li>
                    <li>himasajeev0801@gmail.com</li>
                </ul></li>
                <li><ul className="member">
                    <li>Krishna Poojitha V</li>
                    <li>krishnapoojitha2001@gmail.com</li>
                </ul></li>
            </ul>
        </div>
    </div>
)

}
export default About;