"use client";

import axios from "axios";
import { CheckSquare, LogOut, Menu, UserCircle, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface UserData {
  username: string;
  email: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUserData(null);
    router.push("/");
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled || isOpen
          ? "bg-gray-900/95 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center py-4 px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative group">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center">
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/todos"
            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-all duration-300"
          >
            <CheckSquare className="w-5 h-5" />
            <span>To Do List</span>
          </Link>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group"
            >
              <div className="relative">
                <UserCircle className="w-8 h-8 text-[var(--accent)] group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900" />
              </div>
              <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                {userData?.username || "Carregando..."}
              </span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-gray-900/95 backdrop-blur-xl border border-gray-800/50 shadow-2xl transform transition-all duration-300 scale-100 origin-top">
                <div className="p-6 border-b border-gray-800/50">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <UserCircle className="w-14 h-14 text-[var(--accent)]" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">
                        {userData?.username}
                      </h3>
                      <p className="text-sm text-gray-400">{userData?.email}</p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-gray-800/50 rounded-lg transition-all duration-300 group"
                  >
                    <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Sair da conta</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`w-full md:hidden transition-all duration-500 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
        >
          <div className="py-4 space-y-4">
            <Link
              href="/todos"
              className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              <CheckSquare className="w-5 h-5" />
              <span>To Do List</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-gray-800/50 rounded-lg transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair da conta</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
