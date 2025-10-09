import { SearchPopup } from "../../../features/search/components/search-popup";
import { MyContainer } from "../../../shared/components/container";
import { Footer } from "../footer";
import { Navbar } from "../navbar";
import {AccountMenu} from "../../../features/account-menu/component"
import TopIcon from "../../../shared/components/up-icon"; 
import { Box } from "@mui/material";
export function LayoutContainer({ children }) {
    const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <Navbar />
      <SearchPopup />
      <AccountMenu />
      <main>
        <MyContainer maxWidth={false} disableGutters>
          {children}
        </MyContainer>
      </main>
       <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 2000,
        }}
      >
        <TopIcon onClick={scrollToTop} />
      </Box>

      <Footer />
    </>
  );
}
