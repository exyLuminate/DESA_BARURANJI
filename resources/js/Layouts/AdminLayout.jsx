import React, { useState } from 'react';
import Sidebar from '@/Components/Layout/Admin/Sidebar';
import Topbar from '@/Components/Layout/Admin/Topbar';

export default function AdminLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        // FIX 1: Ubah 'min-h-screen' menjadi 'h-screen' dan tambah 'overflow-hidden'
        // Ini akan mengunci layout seukuran layar monitor, tidak melar ke bawah.
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="flex flex-1 flex-col min-w-0">
                <Topbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

                {/* FIX 2: Tambahkan 'overflow-y-auto' di elemen main */}
                {/* Agar kalau kontennya panjang, yang muncul scrollbar cuma di area konten ini saja */}
                <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
            
        </div>
    );
}