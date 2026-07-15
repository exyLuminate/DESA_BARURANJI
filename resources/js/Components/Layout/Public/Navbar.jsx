import { Link } from '@inertiajs/react';

export default function Navbar() {
    const menus = [
        { name: 'Beranda', href: '/' },
        { name: 'Profil Desa', href: '/profil' },
        { name: 'Data Desa', href: '/data-desa' },
        { name: 'Berita', href: '/berita' },
        { name: 'Galeri', href: '/galeri' },
        { name: 'Kontak', href: '/kontak' },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link href="/" className="text-xl font-bold">
                    Desa Baru Ranji
                </Link>

                <div className="hidden gap-6 md:flex">
                    {menus.map((menu) => (
                        <Link
                            key={menu.name}
                            href={menu.href}
                            className="text-gray-700 transition hover:text-blue-600"
                        >
                            {menu.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}