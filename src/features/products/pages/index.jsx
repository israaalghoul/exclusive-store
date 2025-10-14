import { useNavigate } from "react-router-dom";
import { ProductList } from "../components/product-list";
import { appRoutes } from '../../../routes'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ProductsPage() {
    const navigate = useNavigate();

    return (
        <Box sx={{py:10 }}>
            <Typography sx={{fontSize: "2.4rem", fontWeight: "600", mb:3}}>All Products</Typography>
            <ProductList useGetAll={true} swiper={false} allListed={true} />
        </Box>
    )
}

export default ProductsPage;