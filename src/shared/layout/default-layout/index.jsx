import { LayoutContainer } from "../layout-container";
import { Outlet } from "react-router-dom"; 
// import { Navbar } from "../navbar/index";
export function DefaultLayout() {
    return (
            <LayoutContainer>
                <Outlet />
            </LayoutContainer>
        
    )
}