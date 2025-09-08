import { Outlet, useParams } from "react-router";

function Layout() {
    // const location = useParams();
    // const isMainPage = location.

    return (
        <>
            Header
            <Outlet />
            Footer
        </>
    );
};

export default Layout;
