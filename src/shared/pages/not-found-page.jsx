import { useNavigate } from "react-router";
import { appRoutes } from "../../routes";

const style = { display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '50vh', width: '100%' }
const titleStyle = { fontSize: '4rem', color: '#fff' };
const buttonStyle = { padding: '10px', borderRadius: '8px' }

function NotFoundPage() {
    const navigate = useNavigate()
    return (
        <div style={style}>
            <h1 style={titleStyle}>Oops (: 404 Page not found.</h1>
            <button style={buttonStyle} onClick={() => navigate(appRoutes.home)}>Back to home</button>
        </div>
    )
}

export default NotFoundPage;