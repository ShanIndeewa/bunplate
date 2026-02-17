import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Facebook,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Twitter,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800 relative overflow-hidden">
        {/* Background pattern with lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, 0.1) 10px,
              rgba(255, 255, 255, 0.1) 20px
            )`,
          }}></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, 0.05) 10px,
              rgba(255, 255, 255, 0.05) 20px
            )`,
          }}></div>
        </div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Find Your Next Career Opportunity
            </h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter and never miss out on exclusive job
              opportunities and career tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="bg-green-600 hover:bg-green-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white font-heading">Ejobs</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted career companion for finding the perfect job.
              Discover amazing opportunities around the world.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Facebook size={16} />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Twitter size={16} />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Instagram size={16} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-white">Quick Links</h5>
            <ul className="space-y-2">
              {[
                { label: "Search Jobs", href: "/search" },
                { label: "Search Companies", href: "/deals" },
                { label: "Career Resources", href: "/destinations" },
                { label: "Job Guide", href: "/guide" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-white">Support</h5>
            <ul className="space-y-2">
              {[
                { label: "Help Center", href: "/help" },
                { label: "Contact Us", href: "/contact" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-white">Contact</h5>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-[#003580]" />
                <span className="text-gray-400 text-sm">
                  123 Street, City, Country
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-[#003580]" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-[#003580]" />
                <span className="text-gray-400 text-sm">support@ejobs.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 EJobs. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
