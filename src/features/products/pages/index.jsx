import { useNavigate } from "react-router";
import { ProductList } from "../components/product-list";
import { appRoutes } from '../../../routes'
import { AuthComponentGuard } from "../../auth/guards/auth-guard";

const containerStyle = { display: 'flex', justifyContent: 'flex-end' }
const buttonStyle = { outline: 'none', border: 'none', padding: '10px', borderRadius: '8px' }

function ProductsPage() {
    const navigate = useNavigate();

    return (
        <>
            <div style={containerStyle}>
                <AuthComponentGuard>
                    <button 
                        style={buttonStyle} 
                        onClick={() => navigate(appRoutes.products.form)}
                    >
                        Create +
                    </button>
                </AuthComponentGuard>
            </div>
            <ProductList />
        </>
    )
}

export default ProductsPage;