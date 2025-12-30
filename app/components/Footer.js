export default function Footer() {
  const navItems = ["Benefits", "UX Audit", "Designs", "About", "Blog", "Contact"];

  return (
    <footer className="bg-[#f7f4ef] shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:px-8">
        <nav className="flex flex-wrap items-center justify-center gap-4 text-[13px] font-medium text-neutral-900 sm:justify-start sm:gap-6">
          {navItems.map((item) => (
            <a key={item} href="#" className="hover:text-neutral-700">
              {item}
            </a>
          ))}
        </nav>
        <p className="text-center text-[12px] text-neutral-800 sm:text-right sm:text-[13px]">
          Copyright 2025 Uxbodh.com, All rights reserved
        </p>
      </div>
    </footer>
  );
}
