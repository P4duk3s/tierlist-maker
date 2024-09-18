import { Link } from "react-router-dom"
import "./HomePage.scss"

export const HomePage: React.FC = () => {

    return <div className="wrapper">
        <div className="button-container">
            <div className="column">
                <Link to={"/create"}>
                    <button >Create New Template</button>
                </Link>
                <div className="row">
                    <Link to={"/carbrands"}>
                        <button>Car Brands</button>
                    </Link>
                    <Link to={"/f1teams"}>
                        <button>F1 Teams</button>
                    </Link>
                </div>
            </div>
        </div>
        {/* <div className="user-tierlist-container">
            <h1>Your tierlists</h1>
        </div> */}
    </div>
}