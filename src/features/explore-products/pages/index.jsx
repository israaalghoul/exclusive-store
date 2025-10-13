import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { ProductList } from "../../products/components/product-list";
import { HeaderSection } from "../../../shared/components/header-section";
import { useState } from "react";
import {Btn} from "../../../shared/components/btn"
import { useNavigate } from "react-router";
import { appRoutes } from "../../../routes";

export default function ExploreProductsPage() {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const totalItems = 8;

  const handleNext = () =>
    setSelectedIndex((i) => Math.min(i + 1, totalItems - 1));
  const handlePrev = () => setSelectedIndex((i) => Math.max(i - 1, 0));
    const navigate = useNavigate();

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        gap: "4.0rem",
        
      })}
    >
      <HeaderSection
        title="Explore Our Products"
        subtitle="Our Products"
        showTimer={false}
        marginTop="7.0rem"
        onNext={handleNext}
        onPrev={handlePrev}
        disableNext={selectedIndex >= totalItems - 1}
        disablePrev={selectedIndex <= 0}
      />
      <ProductList
        limit={totalItems}
        offset={13}
        showOffer={true}
        offerColor="custom.btnSecondary.main"
        discount="New"
        swiper={false}
        allListed={true}
        selectedIndex={selectedIndex}
        onSelectIndex={setSelectedIndex}
      />
      <Box sx={{display:"flex",justifyContent:"center", marginTop:"2.0rem",marginBottom:"7.0rem"}}>
              <Btn
                btnName="View All Products"
                variantColor="btnPrimary"
                px="0rem"
                py="0rem"
                width="23.4rem"
                height="5.6rem"
                onClick={() => navigate(appRoutes.products.all)}

            
              />
            </Box>
    </Box>
  );
}
