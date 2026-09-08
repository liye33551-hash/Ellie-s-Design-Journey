import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-inner">
        <p>© 2026 {profile.name.toUpperCase()}</p>
        <p>DESIGNED &amp; BUILT WITH INTENTION</p>
      </div>
    </footer>
  );
}
