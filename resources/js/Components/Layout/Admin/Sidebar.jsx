import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Button } from 'antd';
import { 
    AppstoreOutlined, PictureOutlined, BankOutlined, 
    BarChartOutlined, TeamOutlined, EnvironmentOutlined, 
    StarOutlined, BuildOutlined, ReadOutlined, 
    CameraOutlined, MessageOutlined, SettingOutlined, 
    HistoryOutlined, CloseOutlined 
} from '@ant-design/icons';

export default function Sidebar({ isOpen, onClose }) {
    const { url } = usePage();

    const menus = [
        { label: 'Dashboard', icon: <AppstoreOutlined />, href: route('admin.dashboard'), path: '/admin/dashboard' },
        { label: 'Banner', icon: <PictureOutlined />, href: route('admin.banners.index'), path: '/admin/banners' },
        { label: 'Profil Desa', icon: <BankOutlined />, href: route('admin.village-profile.edit'), path: '/admin/village-profile' },
        { label: 'Statistik', icon: <BarChartOutlined />, href: route('admin.village-statistics.index'), path: '/admin/village-statistics' },
        { label: 'Perangkat Desa', icon: <TeamOutlined />, href: route('admin.officials.index'), path: '/admin/officials' },
        { label: 'Dusun', icon: <EnvironmentOutlined />, href: route('admin.hamlets.index'), path: '/admin/hamlets' },
        { label: 'Potensi', icon: <StarOutlined />, href: route('admin.potentials.index'), path: '/admin/potentials' },
        { label: 'Fasilitas', icon: <BuildOutlined />, href: route('admin.facilities.index'), path: '/admin/facilities' },       
        { label: 'Berita', icon: <ReadOutlined />, href: route('admin.news.index'), path: '/admin/news', aliases: ['/admin/news-categories'] },
        { label: 'Galeri', icon: <CameraOutlined />, href: route('admin.galleries.index'), path: '/admin/galleries', aliases: ['/admin/gallery-categories'] },
        { label: 'Feedback', icon: <MessageOutlined />, href: route('admin.complaints.index'), path: '/admin/complaints', aliases: [] },
        { label: 'Settings', icon: <SettingOutlined />, href: route('admin.settings'), path: '/admin/settings' },
        { label: 'Activity Log', icon: <HistoryOutlined />, href: route('admin.activity-logs.index'), path: '/admin/activity-logs' },
    ];

    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* FIX: Mengubah lg:static menjadi lg:sticky lg:top-0 agar menempel */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 shadow-2xl lg:shadow-none lg:sticky lg:top-0 lg:block transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col h-screen overflow-hidden`}>
                
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100 shrink-0 bg-white">
                    <div className="text-xl font-black text-gray-800 tracking-tight">
                        <span className="text-blue-600">CMS</span> Baru Ranji 
                    </div>
                    <Button 
                        type="text" 
                        icon={<CloseOutlined />} 
                        onClick={onClose}
                        className="lg:hidden flex items-center justify-center h-8 w-8 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-lg border-none"
                    />
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-1 bg-white">
                    {menus.map((menu) => {
                        const isActive = url.startsWith(menu.path) || (menu.aliases && menu.aliases.some(alias => url.startsWith(alias)));
                        
                        return (
                            <Link
                                key={menu.label}
                                href={menu.href}
                                onClick={() => { if(window.innerWidth < 1024) onClose(); }} 
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all font-medium text-sm border ${
                                    isActive 
                                        ? 'bg-blue-50 text-blue-700 shadow-sm border-blue-100' 
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent'
                                }`}
                            >
                                <span className={`text-lg transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                                    {menu.icon}
                                </span>
                                {menu.label}
                            </Link>
                        );
                    })}
                </div>
                
            </aside>
        </>
    );
}