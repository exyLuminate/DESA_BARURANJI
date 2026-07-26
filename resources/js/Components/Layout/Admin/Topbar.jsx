import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Dropdown, Avatar, Button } from 'antd';
import { UserOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';

export default function Topbar({ onMenuToggle }) {
    const { auth } = usePage().props; 

    const userMenu = {
        items: [
            {
                key: 'profile',
                icon: <UserOutlined />,
                label: <Link href={route('profile.edit')}>Profil Saya</Link>,
            },
            {
                type: 'divider',
            },
            {
                key: 'logout',
                icon: <LogoutOutlined className="text-red-500" />,
                label: (
                    <Link href={route('logout')} method="post" as="button" className="text-red-500 w-full text-left font-medium block">
                        Keluar
                    </Link>
                ),
            },
        ],
    };

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md px-4 sm:px-6 shadow-[0_4px_30px_rgb(0,0,0,0.02)]">
            
            <div className="flex items-center gap-4">
                <Button 
                    type="text" 
                    icon={<MenuOutlined />} 
                    onClick={onMenuToggle} 
                    className="lg:hidden flex items-center justify-center h-10 w-10 text-gray-600 bg-gray-50 hover:bg-gray-100 border-none rounded-xl"
                />
                <h1 className="text-lg font-bold text-gray-800 hidden sm:block">
                    Dashboard Panel
                </h1>
            </div>

            <div>
                <Dropdown menu={userMenu} placement="bottomRight" trigger={['click']}>
                    <div className="flex items-center gap-3 cursor-pointer hover:bg-blue-50/50 p-1.5 pr-2 rounded-2xl transition-all border border-transparent hover:border-blue-100 group">
                        
                        {/* FIX: Menghapus "hidden sm:block" agar nama tampil di mode HP */}
                        <div className="text-right">
                            <p className="text-sm font-extrabold text-gray-800 leading-none group-hover:text-blue-600 transition-colors">
                                {auth?.user?.name || 'Administrator'}
                            </p>
                            <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-semibold">
                                Admin Desa
                            </p>
                        </div>

                        <Avatar 
                            size="large" 
                            className="bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-sm" 
                            icon={<UserOutlined />} 
                        >
                            {auth?.user?.name ? auth.user.name.charAt(0).toUpperCase() : <UserOutlined />}
                        </Avatar>
                        
                    </div>
                </Dropdown>
            </div>
        </header>
    );
}