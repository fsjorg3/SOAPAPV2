import type { RefObject } from "react";

import NavDesktopMegaMenu from "./NavDesktopMegaMenu";
import { navbarItems, type MegaMenuAnchor } from "./navItems";

interface NavDesktopMegaMenusProps {
  openGroupKey: string | null;
  anchor: MegaMenuAnchor;
  panelRef: RefObject<HTMLDivElement | null>;
  onItemClick: () => void;
}

export default function NavDesktopMegaMenus({ openGroupKey, anchor, panelRef, onItemClick }: NavDesktopMegaMenusProps) {
  return (
    <>
      {navbarItems.map((item) => {
        if (!item.columnas) return null;
        const open = openGroupKey === item.texto;
        return (
          <NavDesktopMegaMenu
            key={item.texto}
            item={item}
            open={open}
            anchor={anchor}
            // Solo el menú abierto recibe el ref: es el que delimita el clic "dentro".
            panelRef={open ? panelRef : undefined}
            onItemClick={onItemClick}
          />
        );
      })}
    </>
  );
}
