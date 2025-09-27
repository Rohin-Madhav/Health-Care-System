import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    {/* Logo and brand name */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold text-blue-600">HealthCare</span>
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
                        <Link to="/services" className="text-gray-600 hover:text-blue-600">Services</Link>
                        <Link to="/doctors" className="text-gray-600 hover:text-blue-600">Doctors</Link>
                        <Link to="/appointments" className="text-gray-600 hover:text-blue-600">Appointments</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
                        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Login
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-blue-600 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <Link to="/" className="block py-2 text-gray-600 hover:text-blue-600">Home</Link>
                        <Link to="/services" className="block py-2 text-gray-600 hover:text-blue-600">Services</Link>
                        <Link to="/doctors" className="block py-2 text-gray-600 hover:text-blue-600">Doctors</Link>
                        <Link to="/appointments" className="block py-2 text-gray-600 hover:text-blue-600">Appointments</Link>
                        <Link to="/contact" className="block py-2 text-gray-600 hover:text-blue-600">Contact</Link>
                        <Link to="/login" className="block py-2 text-gray-600 hover:text-blue-600">Login</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;