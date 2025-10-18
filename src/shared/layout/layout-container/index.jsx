import { SearchPopup } from "../../../features/search/components/search-popup";
import { MyContainer } from "../../../shared/components/container";
import { Footer } from "../footer";
import { Navbar } from "../navbar";
import { useNavbarStore } from "../navbarStore";
import { AccountMenu } from "../../../features/account-menu/component";
import TopIcon from "../../../shared/components/up-icon";
import { Box } from "@mui/material";
import { ScrollToTop } from "../../components/scroll-to-top";
export function LayoutContainer({ children }) {
  // expose store so pages/components can set hideIcons
  const setHideIcons = useNavbarStore((s) => s.setHideIcons);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <SearchPopup />
      <AccountMenu />
      <main>
        <MyContainer maxWidth={false} disableGutters>
          {children}
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
        </MyContainer>
      </main>

      <Footer />
    </>
  );
}
