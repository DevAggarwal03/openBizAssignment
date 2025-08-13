const Navbar = () => (
    <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <LogoIcon />
                    </div>
                    <div className="ml-4">
                        <span className="text-white font-bold text-xl">SecureVerify</span>
                    </div>
                </div>
            </div>
        </div>
    </nav>
);

export default Navbar;

const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.789-2.756 9.352l-2.486-2.486A11.956 11.956 0 0112 11zm0 0c0-3.517 1.009-6.789 2.756-9.352l2.486 2.486A11.956 11.956 0 0012 11zm0 0v.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
  </svg>
);