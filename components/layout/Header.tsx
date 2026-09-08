import Image from "next/image";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "WORKS", href: "#works" },
  { label: "CONTACT", href: "#contact" },
] as const;

export function Header() {
  return (
    <header className="figma-hero-header">
      <nav className="figma-header-frame" aria-label="Primary navigation" data-figma-node="25:8605">
        {navItems.map((item) => (
          <a className="figma-nav-link" href={item.href} key={item.label}>
            <span>{item.label}</span>
          </a>
        ))}
        <a className="figma-avatar-placeholder" href="#profile" aria-label="跳转到 Ellie 个人信息卡片">
          <Image src="/images/figma-home/header-avatar.png" alt="Ellie" fill sizes="80px" priority />
        </a>
      </nav>
    </header>
  );
}
