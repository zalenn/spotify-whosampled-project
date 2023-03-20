import { Link } from "react-router-dom"
import './index.scss'


const Home = () => {
    return (
        <div className="container home-page">
            <div className = "text-zone">
                <h1>Zalen Nelson</h1>
                <h2>Graduate Student at Fordham University | Greater New York Area</h2>
                <Link to = "/about" className="flat-button">Learn More</Link>
            </div>
            <div class = "profile-img">
              <img src = {Headshot} alt = "Zalen Headshot"/>
            </div>
        </div>
    ) 
}

export default Home