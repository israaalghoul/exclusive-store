import { SearchPopup } from "../../../features/search/components/search-popup";
import { MyContainer } from "../../../shared/components/container";
import { Footer } from "../footer";
import { Navbar } from "../navbar";
import {AccountMenu} from "../../../features/account-menu/component"
export function LayoutContainer({ children }) {
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
      <Footer />
    </>
  );
}
