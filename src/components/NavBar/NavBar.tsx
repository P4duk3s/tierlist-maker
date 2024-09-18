import { Link, Outlet } from "react-router-dom"
import "./NavBar.scss"


export const NavBar: React.FC = () => {

    return <>
        <Link to={"/"}>
            <div className="nav-bar">
                <div className="header-wrapper">
                    <img src="logo.png" alt="logo" />
                    <div className="fruktur">
                        Tier List Maker
                    </div>
                </div>
            </div>
        </Link>
        <div className="outlet-wrapper">
            <Outlet />
        </div>
    </>
}