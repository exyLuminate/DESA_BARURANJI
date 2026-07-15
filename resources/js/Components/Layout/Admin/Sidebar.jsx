import { Link } from '@inertiajs/react';

const menus = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Banner', href: '/admin/banners' },
    { label: 'Profil Desa', href: '/admin/profile' },
    { label: 'Statistik', href: '/admin/statistics' },
    { label: 'Perangkat Desa', href: '/admin/officials' },
    { label: 'Dusun', href: '/admin/hamlets' },
    { label: 'Potensi', href: '/admin/potentials' },
    { label: 'Fasilitas', href: '/admin/facilities' },
    { label: 'Berita', href: '/admin/news' },
    { label: 'Galeri', href: '/admin/galleries' },
    { label: 'Feedback', href: '/admin/feedbacks' },
    { label: 'Settings', href: '/admin/settings' },
    { label: 'Activity Log', href: '/admin/activity-logs' },
];

export default function Sidebar() {
    return (
        <aside className="hidden min-h-screen w-64 border-r bg-white lg:block">
            <div className="border-b p-6 text-xl font-bold">
                CMS Desa
            </div>

            <div className="flex flex-col p-3">
                {menus.map((menu) => (
                    <Link
                        key={menu.label}
                        href={menu.href}
                        className="rounded-lg px-4 py-3 transition hover:bg-gray-100"
                    >
                        {menu.label}
                    </Link>
                ))}
            </div>
        </aside>
    );
}