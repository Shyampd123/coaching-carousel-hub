
import { useState, useEffect, useRef } from 'react';
import { LogIn, ChevronDown, ChevronUp, Menu, X } from 'lucide-react';

const subjects = [
  { title: 'Mathematics', courses: ['Calculus', 'Algebra', 'Geometry', 'Statistics'] },
  { title: 'Physics', courses: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Quantum Physics'] },
  { title: 'Chemistry', courses: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Biochemistry'] },
  { title: 'Biology', courses: ['Cell Biology', 'Genetics', 'Ecology', 'Human Anatomy'] }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowCourses(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-primary">Coaching Hub</h1>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:justify-between flex-1 pl-8">
            <div className="flex items-center space-x-8">
              <a href="#" className="nav-link">Home</a>
              <div className="relative" ref={menuRef}>
                <button 
                  className="nav-link flex items-center gap-1"
                  onClick={() => setShowCourses(!showCourses)}
                >
                  Courses
                  {showCourses ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {showCourses && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
                    {subjects.map((subject, index) => (
                      <div key={index} className="px-4 py-2 hover:bg-gray-50">
                        <div className="font-semibold text-primary">{subject.title}</div>
                        <div className="mt-1 space-y-1">
                          {subject.courses.map((course, courseIndex) => (
                            <a
                              key={courseIndex}
                              href="#"
                              className="block text-sm text-gray-600 hover:text-primary pl-2"
                            >
                              {course}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <a href="#" className="nav-link">About</a>
              <a href="#" className="nav-link">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
                Login
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2 whitespace-nowrap">
                <LogIn className="w-4 h-4" />
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary rounded-md">Home</a>
            <div>
              <button
                onClick={() => setShowCourses(!showCourses)}
                className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-primary rounded-md"
              >
                Courses
                {showCourses ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {showCourses && (
                <div className="pl-4 space-y-2">
                  {subjects.map((subject, index) => (
                    <div key={index} className="py-2">
                      <div className="font-semibold text-primary px-3">{subject.title}</div>
                      <div className="mt-1 space-y-1">
                        {subject.courses.map((course, courseIndex) => (
                          <a
                            key={courseIndex}
                            href="#"
                            className="block text-sm text-gray-600 hover:text-primary px-3 py-1"
                          >
                            {course}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary rounded-md">About</a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary rounded-md">Contact</a>
            <div className="pt-4 pb-2 border-t border-gray-200">
              <button className="w-full px-3 py-2 text-gray-700 hover:text-gray-900 rounded-md text-left">
                Login
              </button>
              <button className="w-full mt-2 px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
