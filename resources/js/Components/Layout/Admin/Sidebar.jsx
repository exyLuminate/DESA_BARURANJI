import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    const { url } = usePage();

    const menus = [
        { label: 'Dashboard', href: route('admin.dashboard'), path: '/admin/dashboard' },
        { label: 'Banner', href: route('admin.banners.index'), path: '/admin/banners' },
        { label: 'Profil Desa', href: route('admin.village-profile.edit'), path: '/admin/village-profile' },
        { label: 'Statistik', href: route('admin.village-statistics.index'), path: '/admin/village-statistics' },
        { label: 'Perangkat Desa', href: route('admin.officials.index'), path: '/admin/officials' },
        { label: 'Dusun', href: route('admin.hamlets.index'), path: '/admin/hamlets' },
        { label: 'Potensi', href: route('admin.potentials.index'), path: '/admin/potentials' },
        { label: 'Fasilitas', href: route('admin.facilities.index'), path: '/admin/facilities' },       
        { label: 'Berita', href: '#', path: '/admin/news' },
        { label: 'Galeri', href: '#', path: '/admin/galleries' },
        { label: 'Feedback', href: '#', path: '/admin/feedbacks' },
        { label: 'Settings', href: '#', path: '/admin/settings' },
        { label: 'Activity Log', href: '#', path: '/admin/activity-logs' },
    ];

    return (
        <aside className="hidden min-h-screen w-64 border-r bg-white lg:block">
            <div className="border-b p-6 text-xl font-bold text-gray-800">
                CMS Desa
            </div>

            <div className="flex flex-col p-3 space-y-1">
                {menus.map((menu) => {
                    const isActive = url.startsWith(menu.path);
                    return (
                        <Link
                            key={menu.label}
                            href={menu.href}
                            className={`rounded-lg px-4 py-3 transition font-medium text-sm ${
                                isActive 
                                    ? 'bg-gray-100 text-gray-900 font-semibold' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            {menu.label}
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}