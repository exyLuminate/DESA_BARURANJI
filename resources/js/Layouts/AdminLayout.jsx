import React, { useState } from 'react';
import Sidebar from '@/Components/Layout/Admin/Sidebar';
import Topbar from '@/Components/Layout/Admin/Topbar';

export default function AdminLayout({ children }) {
    // State pengontrol buka/tutup Sidebar untuk versi Mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* 
              Kirim state (isOpen) dan fungsi menutup (onClose) ke Sidebar.
              Ini yang membuat layar gelap (overlay) bisa menutup Sidebar saat diklik. 
            */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="flex flex-1 flex-col min-w-0">
                {/* 
                  Kirim fungsi onMenuToggle ke Topbar.
                  Ini yang membuat ikon Hamburger bisa berfungsi! 
                */}
                <Topbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

                {/* Padding saya sesuaikan sedikit agar di HP tidak terlalu sempit */}
                <main className="flex-1 p-4 sm:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}