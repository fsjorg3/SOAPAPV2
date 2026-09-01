import { useState } from "react";
import { useNavigate } from "react-router";

export function useNavbarMenus() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileGroups, setOpenMobileGroups] = useState<Record<string, boolean>>({});
  const [openGroupKey, setOpenGroupKey] = useState<string | null>(null);

  const navigate = useNavigate();

  const toggleDrawer = () => {
    if (mobileOpen) {
      setOpenMobileGroups({});
    }
    setMobileOpen(!mobileOpen);
  };

  const toggleMobileGroup = (groupTexto: string) => {
    setOpenMobileGroups((prev) => ({ ...prev, [groupTexto]: !prev[groupTexto] }));
  };

  const toggleGroupMenu = (groupTexto: string) => {
    setOpenGroupKey((current) => (current === groupTexto ? null : groupTexto));
  };

  const closeGroupMenu = () => {
    setOpenGroupKey(null);
  };

  const navigateMobile = (ruta: string) => {
    navigate(ruta);
    setMobileOpen(false);
    setOpenMobileGroups({});
  };

  const navigateDesktop = (ruta: string) => {
    closeGroupMenu();
    navigate(ruta);
  };

  return {
    mobileOpen,
    toggleDrawer,
    openMobileGroups,
    toggleMobileGroup,
    openGroupKey,
    toggleGroupMenu,
    closeGroupMenu,
    navigateMobile,
    navigateDesktop,
  };
}
