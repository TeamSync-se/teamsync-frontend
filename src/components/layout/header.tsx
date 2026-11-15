import { BellIcon, MenuIcon } from "./nav-items";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface px-4">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Mở menu"
        className="rounded-md p-2 text-secondary-text hover:bg-background md:hidden"
      >
        <MenuIcon />
      </button>
      <div className="ml-auto flex items-center gap-2">
        {/* TODO: nối thông báo và thông tin người dùng khi có API */}
        <button
          type="button"
          aria-label="Thông báo"
          className="rounded-md p-2 text-secondary-text hover:bg-background"
        >
          <BellIcon />
        </button>
        <div
          aria-hidden="true"
          className="flex size-8 items-center justify-center rounded-full bg-primary-subtle text-label-sm text-primary-container"
        >
          TS
        </div>
      </div>
    </header>
  );
}
