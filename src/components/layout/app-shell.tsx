"use client";

import { useState, type ReactNode } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

/**
 * Khung cho trang đã đăng nhập: sidebar cố định bên trái, header phía trên.
 * Dưới bề rộng md, sidebar thành ngăn kéo mở bằng nút menu ở header.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <Sidebar onNavigate={closeMenu} />
          <button
            type="button"
            aria-label="Đóng menu"
            onClick={closeMenu}
            className="flex-1 bg-primary-text/40"
          />
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-margin">
          {children}
        </main>
      </div>
    </div>
  );
}
