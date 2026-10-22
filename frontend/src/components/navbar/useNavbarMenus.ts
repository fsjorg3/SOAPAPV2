import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

// Atributo que marca los botones que abren un mega-menú; se usa para excluirlos del "clic fuera"
// (su propio onClick ya alterna el grupo) y para devolverles el foco al cerrar con Escape.
export const MEGA_MENU_TRIGGER_ATTR = "data-mega-menu-trigger";

export function useNavbarMenus() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileGroups, setOpenMobileGroups] = useState<Record<string, boolean>>({});
  const [openGroupKey, setOpenGroupKey] = useState<string | null>(null);

  // Panel visible del mega-menú abierto; delimita qué cuenta como clic "dentro".
  const panelRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();

  // Ajuste de estado durante el render (patrón recomendado por React en vez de useEffect+setState):
  // cualquier cambio de ruta (links directos, logo, atrás/adelante, footer) cierra el mega-menú.
  const [rutaPrevia, setRutaPrevia] = useState(pathname);
  if (pathname !== rutaPrevia) {
    setRutaPrevia(pathname);
    setOpenGroupKey(null);
  }

  useEffect(() => {
    if (openGroupKey === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenGroupKey(null);
      document.querySelector<HTMLElement>(`[${MEGA_MENU_TRIGGER_ATTR}="${openGroupKey}"]`)?.focus();
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (target.closest(`[${MEGA_MENU_TRIGGER_ATTR}]`)) return;
      setOpenGroupKey(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [openGroupKey]);

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

  // Los items son links reales (la navegación la hace el link); esto solo cierra el drawer.
  const closeMobileDrawer = () => {
    setMobileOpen(false);
    setOpenMobileGroups({});
  };

  return {
    mobileOpen,
    toggleDrawer,
    closeMobileDrawer,
    openMobileGroups,
    toggleMobileGroup,
    openGroupKey,
    toggleGroupMenu,
    closeGroupMenu,
    panelRef,
  };
}
