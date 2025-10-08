import { LayoutContainer } from "../layout-container";
import { Outlet } from "react-router"; 
// import { Navbar } from "../navbar/index";
export function DefaultLayout({ children }) {
    return (
        <>
            <LayoutContainer>
                <Outlet />
            </LayoutContainer>
        </>
        
    )
}