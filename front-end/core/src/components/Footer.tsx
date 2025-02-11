import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-zinc-900/80 backdrop-blur-sm border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Logo */}
          <Link href="/" className="relative group">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center">
              <span className="text-[var(--accent)] group-hover:text-white transition-all duration-300">
                &lt;/
              </span>
              <span className="group-hover:text-[var(--accent)] transition-all duration-300">
                PH
              </span>
              <span className="text-[var(--accent)] group-hover:text-white transition-all duration-300">
                &gt;
              </span>
            </h1>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
          </Link>

          {/* Copyright */}
          <div className="text-zinc-400 text-sm text-center">
            © 2025 Pedro Henrique Faria. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/PhTheDev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-all duration-300 hover:scale-110"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/pedro-henrique-faria-6b22932a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-all duration-300 hover:scale-110"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
