import {
  Bell,
  LayoutDashboard,
  Mail,
  Menu,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

export type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

function icon(Component: LucideIcon) {
  return <Component className="size-5 shrink-0" aria-hidden="true" />;
}

export const MenuIcon = () => icon(Menu);
export const BellIcon = () => icon(Bell);

/** Mục điều hướng cấp ứng dụng. Điều hướng trong một nhóm sẽ thêm ở layout của nhóm. */
export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: icon(LayoutDashboard) },
  { href: "/groups", label: "Nhóm của tôi", icon: icon(Users) },
  { href: "/invitations", label: "Lời mời", icon: icon(Mail) },
  { href: "/profile", label: "Thông tin cá nhân", icon: icon(User) },
];
