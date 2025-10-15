import { Box} from "@mui/material";
import { alpha,useTheme } from "@mui/material/styles";
import { ProductList } from "../../../products/components/product-list";
import {HeaderSection} from "../../../../shared/components/header-section";


export default function BestSale() {
  const theme = useTheme();
  return (
    <Box
    id="best-sale"
      sx={
        (theme) => ({
          display: "flex",
          flexDirection: "column",
          gap: "4.0rem",
          
        })
      }
    >
      <HeaderSection
          title="Best Selling Products"
          subtitle="This Month"
          showTimer = {false}
          marginTop ="7.0rem"
          showButton ={true}
      />
      <ProductList
        limit={4}
        offset={9}
        showOffer={false}
        offerColor="custom.btnPrimary.main"
        discount={50}
        swiper={false}
        useSelected = {false}
        allListed = {false}

      />
    </Box>
  );
}
