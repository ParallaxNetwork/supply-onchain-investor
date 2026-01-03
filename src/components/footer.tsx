import Link from "next/link";

export default function FooterDashboard() {
  return (
    <footer className="border-t border-neutral-100 bg-white py-10 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-neutral-500">
        
        {/* Copyright Section */}
        <div>
          © 2024 APLX Platform. All rights reserved.
        </div>

        {/* Links Section */}
        <div className="flex gap-8">
          <Link 
            href="#" 
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            href="#" 
            className="hover:text-primary transition-colors"
          >
            Terms of Use
          </Link>
          <Link 
            href="#" 
            className="hover:text-primary transition-colors"
          >
            Support
          </Link>
        </div>
        
      </div>
    </footer>
  );
}