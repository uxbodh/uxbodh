export default function Footer() {
  const navItems = ["Benefits", "UX Audit", "Designs", "About", "Blog", "Contact"];

  return (
    <footer className="bg-[#f7f4ef]  shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-8 py-6">
        <nav className="flex items-center gap-8 text-[13px] font-medium text-neutral-900">
          {navItems.map((item) => (
            <a key={item} href="#" className="hover:text-neutral-700">
              {item}
            </a>
          ))}
        </nav>
        <p className="text-[13px] text-neutral-900">
          Copyright \u00a9 2025 Uxbodh.com, All rights reserved
        </p>
      </div>
    </footer>
  );
}
