import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"

const Layout = ({ children }) => {
    return (
        <main>
            <NavBar />
            {children}
            <Outlet />
        </main>
    );
}

export default Layout