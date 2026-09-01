import NavDesktopMegaMenu from "./NavDesktopMegaMenu";
import { navbarItems } from "./navItems";

interface NavDesktopMegaMenusProps {
  openGroupKey: string | null;
  topOffset: number;
  onNavigate: (ruta: string) => void;
}

export default function NavDesktopMegaMenus({ openGroupKey, topOffset, onNavigate }: NavDesktopMegaMenusProps) {
  return (
    <>
      {navbarItems.map((item) => {
        if (!item.columnas) return null;
        return (
          <NavDesktopMegaMenu
            key={item.texto}
            item={item}
            open={openGroupKey === item.texto}
            topOffset={topOffset}
            onNavigate={onNavigate}
          />
        );
      })}
    </>
  );
}
