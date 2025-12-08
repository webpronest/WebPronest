"use client";

import Link from "next/link";
import Logo from "@/public/WebProNest.png";
import Image from "next/image";
import AuthModal from "./AuthModal";
import { useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  return (
    <nav className="bg-white sticky top-0 z-50">
      <AuthModal open={open} setOpen={setOpen} />
      <div className="container mx-auto flex justify-between items-center py-1 px-6">
        <Link href="/" className="text-xl font-semibold text-cyan-500 flex items-center">
          <Image src={Logo} alt="Webpronest-logo" width={50} />
          <p>WebProNest</p>
        </Link>
        <div className="space-x-6 text-gray-700 font-medium">
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          ) : user ? (
            <div className="relative inline-flex items-center group">
              <img
              src={user.picture || ""}
              alt="avatar"
              className="w-10 h-10 rounded-full ring-2 ring-cyan-100 object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const name = user?.name ?? user?.given_name ?? "?";
                const firstInitial = user.given_name ? user.given_name.charAt(0).toUpperCase() : "";
                const lastInitial = user.family_name ? user.family_name.charAt(0).toUpperCase() : "";
                const letter = (firstInitial + lastInitial) || name.charAt(0).toUpperCase();
                const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'>
                <rect width='100%' height='100%' fill='#06b6d4'/>
                <text x='50%' y='50%' dy='0.35em' text-anchor='middle' font-family='Arial, Helvetica, sans-serif' font-size='64' fill='white'>${letter}</text>
                </svg>`;
                (e.currentTarget as HTMLImageElement).src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
              }}
              />
              <div className="ml-3 text-left">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-semibold text-gray-800">{user?.given_name ?? user?.name ?? "User"}</span>
              </div>
              </div>

              {/* dropdown: remove gap (no mt-2) and avoid translate-on-show to prevent hover loss */}
              <div className="absolute right-0 top-full mt-0 min-w-[140px] bg-white border rounded-md shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto transform transition-all duration-150 origin-top-right z-50">
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
              >
                Logout
              </button>
              </div>
            </div>
          ) : (
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded"
              onClick={() => setOpen(true)}
            >
              Login / Sign up
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;