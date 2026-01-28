export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-white/60 flex flex-col md:flex-row justify-between gap-4">
        <p>
          © {new Date().getFullYear()} Talentmasters. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="/policy" className="hover:text-white">
            Privacy
          </a>
          <a   href="https://wa.me/35797678927?text=Hi%20I%27d%20like%20to%20request%20a%20conversation"
  target="_blank"
  rel="noopener noreferrer" className="hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}