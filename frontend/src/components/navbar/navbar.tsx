import { useLayoutEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import dropMinimalist from "../../assets/drop-minimalist.svg";
import NavDesktopLinks from "./NavDesktopLinks";
import NavDesktopMegaMenus from "./NavDesktopMegaMenus";
import NavMobileDrawer from "./NavMobileDrawer";
import { useNavbarMenus } from "./useNavbarMenus";

function Navbar() {
  const {
    mobileOpen,
    toggleDrawer,
    openMobileGroups,
    toggleMobileGroup,
    openGroupKey,
    toggleGroupMenu,
    closeGroupMenu,
    navigateMobile,
    navigateDesktop,
  } = useNavbarMenus();

  const appBarRef = useRef<HTMLDivElement>(null);
  const [menuTopOffset, setMenuTopOffset] = useState(0);

  useLayoutEffect(() => {
    const appBarEl = appBarRef.current;
    if (!appBarEl) return;

    const updateOffset = () => setMenuTopOffset(appBarEl.getBoundingClientRect().bottom);

    updateOffset();
    window.addEventListener("resize", updateOffset);
    const resizeObserver = new ResizeObserver(updateOffset);
    resizeObserver.observe(appBarEl);

    return () => {
      window.removeEventListener("resize", updateOffset);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <ClickAwayListener onClickAway={closeGroupMenu}>
      <Box>
        <AppBar
          ref={appBarRef}
          component="nav"
          elevation={0}
          sx={{ backgroundColor: "primary.light", color: "primary.contrastText", width: { xs: "90%", md: "70%" } }}
        >
          <Toolbar>
            {/*Hamburger button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2, display: { xs: "block", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            {/*Hamburger button */}

            {/*IMAGOTIPO*/}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                gap: "8px",
                alignItems: "center",
                justifyContent: { xs: "center", md: "start" },
                color: "primary.contrastText",
                // Compensamos el IconButton de menú a la izquierda en móvil para centrar geométricamente
                mr: { xs: "40px", md: 0 },
              }}
            >
              <Box component="img" src={dropMinimalist} sx={{ display: "block" }} />

              <Typography variant="h6" sx={{ color: "primary.contrastText" }}>
                SOAPAP
              </Typography>
            </Box>
            {/*IMAGOTIPO*/}

            {/*LINKS*/}
            <NavDesktopLinks
              openGroupKey={openGroupKey}
              onToggleGroup={toggleGroupMenu}
            />
            {/*LINKS*/}
          </Toolbar>

          <NavMobileDrawer
            open={mobileOpen}
            onClose={toggleDrawer}
            openMobileGroups={openMobileGroups}
            onToggleGroup={toggleMobileGroup}
            onNavigate={navigateMobile}
          />
        </AppBar>

        <NavDesktopMegaMenus
          openGroupKey={openGroupKey}
          topOffset={menuTopOffset}
          onNavigate={navigateDesktop}
        />
      </Box>
    </ClickAwayListener>
  );
}

export default Navbar;
