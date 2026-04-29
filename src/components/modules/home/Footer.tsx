import Link from "next/link";
import { HeartPulse, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-primary p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
                <HeartPulse size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                CareIntel
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Empowering healthcare through intelligence. We provide world-class medical consultation and diagnostic services at your fingertips.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-primary transition-colors">Find a Doctor</Link>
              </li>
              <li>
                <Link href="/diagnostics" className="hover:text-primary transition-colors">Diagnostics</Link>
              </li>
              <li>
                <Link href="/health-plans" className="hover:text-primary transition-colors">Health Plans</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Online Consultation</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Laboratory Tests</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Health Insurance</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">NGO Support</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Emergency Care</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={20} />
                </div>
                <span>123 Medical Plaza, Central Park, New York, NY 10001</span>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-primary shrink-0">
                  <Phone size={20} />
                </div>
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-primary shrink-0">
                  <Mail size={20} />
                </div>
                <span>contact@careintel.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} CareIntel. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
