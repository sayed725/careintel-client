"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/consultation" },
    { name: "Diagnostics", href: "/diagnostics" },
    { name: "Health Plans", href: "/health-plans" },
    { name: "NGOs", href: "/ngos" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
              <HeartPulse size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              CareIntel
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" className="rounded-full px-6">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="rounded-full px-6">
                <Link href="/consultation">Book Now</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b p-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2 duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium p-2 hover:bg-muted rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <Button asChild variant="outline" className="w-full rounded-xl py-6 text-lg">
                <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
              </Button>
              <Button asChild className="w-full rounded-xl py-6 text-lg">
                <Link href="/consultation" onClick={() => setIsOpen(false)}>Book Now</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
