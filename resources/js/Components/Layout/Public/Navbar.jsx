import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { url } = usePage(); // Mengambil URL saat ini untuk mendeteksi menu aktif
    const [isOpen, setIsOpen] = useState(false); // State untuk menu mobile (hamburger)

    // Menggunakan route() helper agar dinamis mengikuti penamaan di web.php
    const menus = [
        { name: 'Beranda', href: route('home'), path: '/' },
        { name: 'Profil Desa', href: route('public.profile'), path: '/profil' }, // Sesuai dengan perubahan route sebelumnya
        { name: 'Data Desa', href: route('village-data'), path: '/data-desa' },
        { name: 'Berita', href: route('news'), path: '/berita' },
        { name: 'Galeri', href: route('gallery'), path: '/galeri' },
        { name: 'Kontak', href: route('contact'), path: '/kontak' },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo / Judul Web */}
                <Link href={route('home')} className="text-xl font-bold text-gray-900">
                    Desa Baru Ranji
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6">
                    {menus.map((menu) => {
                        const isActive = url === menu.path || (menu.path !== '/' && url.startsWith(menu.path));
                        return (
                            <Link
                                key={menu.name}
                                href={menu.href}
                                className={`transition font-medium ${
                                    isActive 
                                        ? 'text-indigo-600' // Warna aktif
                                        : 'text-gray-600 hover:text-indigo-600' // Warna tidak aktif
                                }`}
                            >
                                {menu.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Menu Button (Hamburger) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden flex items-center p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
                    aria-label="Toggle menu"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isOpen ? (
                            // Ikon X saat menu terbuka
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            // Ikon Hamburger saat menu tertutup
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        {menus.map((menu) => {
                            const isActive = url === menu.path || (menu.path !== '/' && url.startsWith(menu.path));
                            return (
                                <Link
                                    key={menu.name}
                                    href={menu.href}
                                    onClick={() => setIsOpen(false)} // Otomatis tutup menu saat link diklik
                                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                        isActive
                                            ? 'bg-indigo-50 text-indigo-600'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                                    }`}
                                >
                                    {menu.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
}