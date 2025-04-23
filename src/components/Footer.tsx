import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/70 font-press-start-2p text-xs">
            © {new Date().getFullYear()} Pokémon Team Builder
          </div>
          <div className="flex gap-6">
            <Link 
              href="#" 
              className="text-white/70 hover:text-white/90 font-press-start-2p text-xs transition-colors duration-200"
            >
              À propos
            </Link>
            <Link 
              href="#" 
              className="text-white/70 hover:text-white/90 font-press-start-2p text-xs transition-colors duration-200"
            >
              Contact
            </Link>
           
          </div>
        </div>
      </div>
    </footer>
  );
} 