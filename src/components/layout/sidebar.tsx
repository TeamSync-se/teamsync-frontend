"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./nav-items";

type SidebarProps = {
  /** Gọi khi người dùng bấm một mục, để đóng ngăn kéo trên điện thoại. */
  onNavigate?: () => void;
};

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 flex-col border-r border-border bg-surface">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="text-headline-sm text-primary-container"
        >
          TeamSync
        </Link>
      </div>
      <nav aria-label="Điều hướng chính" className="flex-1 overflow-y-auto p-2">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-label-md transition-colors ${
                    active
                      ? "bg-primary-subtle text-primary-container"
                      : "text-secondary-text hover:bg-background hover:text-primary-text"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
