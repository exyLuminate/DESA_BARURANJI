import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    ArrowLeftOutlined, UserOutlined, DatabaseOutlined, 
    ClockCircleOutlined, GlobalOutlined, CodeOutlined,
    PlusCircleOutlined, EditOutlined, DeleteOutlined, 
    HistoryOutlined, LoginOutlined, LogoutOutlined, SafetyCertificateOutlined,
    SwapRightOutlined, ControlOutlined
} from '@ant-design/icons';
import { Tag } from 'antd';
import AdminLayout from '@/Layouts/AdminLayout';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export default function ActivityLogShow({ log }) {
    const properties = log.properties || {};
    const oldData = properties.old || null;
    const newData = properties.attributes || null;

    // Helper untuk Event Micro-Badges (Sama dengan Index)
    const getEventBadge = (event) => {
        const events = {
            created: { color: 'success', icon: <PlusCircleOutlined />, text: 'DIBUAT', bg: 'bg-green-50 text-green-600' },
            updated: { color: 'processing', icon: <EditOutlined />, text: 'DIUBAH', bg: 'bg-blue-50 text-blue-600' },
            deleted: { color: 'error', icon: <DeleteOutlined />, text: 'DIHAPUS', bg: 'bg-red-50 text-red-600' },
            restored: { color: 'purple', icon: <HistoryOutlined />, text: 'DIPULIHKAN', bg: 'bg-purple-50 text-purple-600' },
            login: { color: 'cyan', icon: <LoginOutlined />, text: 'LOGIN', bg: 'bg-cyan-50 text-cyan-600' },
            logout: { color: 'default', icon: <LogoutOutlined />, text: 'LOGOUT', bg: 'bg-gray-100 text-gray-600' }
        };
        const config = events[event] || { color: 'default', icon: <SafetyCertificateOutlined />, text: event.toUpperCase(), bg: 'bg-gray-100 text-gray-600' };
        
        return (
            <Tag icon={config.icon} color={config.color} className={`rounded-full px-3 py-1 border-0 font-bold m-0 shadow-sm ${config.bg} text-xs`}>
                {config.text}
            </Tag>
        );
    };

    // Helper Renderer JSON dengan Dark Mode ala VS Code
    const renderJson = (data, type) => {
        if (!data) return (
            <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-gray-800 text-gray-500 italic flex items-center justify-center">
                Tidak ada data terekam
            </div>
        );

        const isOld = type === 'old';
        const borderColor = isOld ? 'border-red-900/50' : 'border-green-900/50';
        const headerColor = isOld ? 'bg-red-950/40 text-red-400' : 'bg-green-950/40 text-green-400';
        const textColor = isOld ? 'text-red-200' : 'text-green-200';

        return (
            <div className={`rounded-2xl overflow-hidden bg-[#1e1e1e] border ${borderColor} shadow-2xl`}>
                <div className={`px-4 py-2.5 text-[11px] font-mono font-bold flex justify-between items-center ${headerColor} border-b border-black/50`}>
                    <span className="flex items-center gap-2">
                        <CodeOutlined /> {isOld ? '[-] OLD_DATA.json' : '[+] NEW_DATA.json'}
                    </span>
                    <span className="opacity-50 font-normal">Read-only</span>
                </div>
                <pre className={`p-5 text-sm font-mono ${textColor} overflow-x-auto custom-scrollbar leading-relaxed`}>
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        );
    };

    return (
        <AdminLayout>
            <Head title="Detail Forensik Log" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10 w-full overflow-hidden">
                
                {/* Sticky Action Header */}
                <div className="sticky top-0 z-40 bg-slate-50/90 backdrop-blur-md pb-4 pt-2 mb-6 border-b border-gray-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <Link 
                            href={route('admin.activity-logs.index')}
                            className="inline-flex items-center text-gray-500 hover:text-indigo-600 font-medium transition-colors mb-2"
                        >
                            <ArrowLeftOutlined className="mr-2" /> Kembali ke Daftar Log
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <ControlOutlined className="text-indigo-500" /> Detail Forensik Aktivitas
                        </h1>
                    </div>
                    <div>
                        {getEventBadge(log.event)}
                    </div>
                </div>

                {/* Split-Pane Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                    
                    {/* PANEL KIRI: Metadata Forensik (Lebar 4/12 di Desktop besar, menempel) */}
                    <div className="xl:col-span-4 sticky top-28 flex flex-col gap-6">
                        
                        {/* Timeline / Alur Aktivitas */}
                        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-8">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Alur (Chain of Event)</h3>
                            
                            <div className="relative border-l-2 border-indigo-100 pl-6 space-y-8 ml-3">
                                {/* Causer (Pelaku) */}
                                <div className="relative">
                                    <div className="absolute -left-[35px] top-1 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 ring-4 ring-white">
                                        <UserOutlined />
                                    </div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase">Pelaku / Pengguna</p>
                                    <p className="text-lg font-bold text-slate-800 line-clamp-1">
                                        {log.causer ? log.causer.name : <span className="text-gray-400 italic">Sistem / Guest</span>}
                                    </p>
                                </div>
                                
                                {/* Action (Aksi) */}
                                <div className="relative">
                                    <div className="absolute -left-[35px] top-1 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 ring-4 ring-white">
                                        <SwapRightOutlined />
                                    </div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase">Melakukan Tindakan</p>
                                    <p className="text-base text-slate-700 mt-1">{log.description}</p>
                                </div>

                                {/* Subject (Target Modul) */}
                                <div className="relative">
                                    <div className="absolute -left-[35px] top-1 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 ring-4 ring-white">
                                        <DatabaseOutlined />
                                    </div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase">Pada Modul / Data</p>
                                    <p className="text-lg font-bold text-slate-800 capitalize">
                                        {log.subject_type ? log.subject_type.split('\\').pop() : '-'} 
                                    </p>
                                    {log.subject_id && (
                                        <Tag className="mt-2 rounded bg-gray-50 border-gray-200">Record ID: {log.subject_id}</Tag>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Network & Time Info */}
                        <div className="bg-slate-800 rounded-3xl shadow-lg border border-slate-700 p-6 sm:p-8 text-white relative overflow-hidden">
                            <div className="absolute -right-4 -bottom-4 opacity-5">
                                <GlobalOutlined className="text-9xl" />
                            </div>
                            
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Jejak Digital</h3>
                            
                            <div className="space-y-5 relative z-10">
                                <div>
                                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                                        <GlobalOutlined /> IP Address
                                    </p>
                                    <div className="inline-block border border-slate-600 bg-slate-900/50 rounded-lg px-3 py-1 font-mono text-sm text-cyan-400 font-bold">
                                        {properties.ip || 'Tidak Terdeteksi'}
                                    </div>
                                </div>
                                
                                <div>
                                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                                        <ClockCircleOutlined /> Timestamp Server
                                    </p>
                                    <p className="text-base font-medium text-slate-200">
                                        {dayjs(log.created_at).format('DD MMMM YYYY')} <br />
                                        <span className="text-xl font-bold font-mono text-white mt-1 block">
                                            {dayjs(log.created_at).format('HH:mm:ss')} WIB
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* PANEL KANAN: Payload JSON Viewer (Lebar 8/12 di Desktop) */}
                    <div className="xl:col-span-8 flex flex-col gap-6">
                        
                        {!oldData && !newData ? (
                            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                                <DatabaseOutlined className="text-6xl text-gray-200 mb-4" />
                                <h2 className="text-xl font-bold text-gray-400">Tidak Ada Perubahan Data Spesifik</h2>
                                <p className="text-gray-400 mt-2">Aktivitas ini tidak mencatat manipulasi kolom data (kemungkinan event Read/Login/Logout).</p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-8">
                                <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center border-b border-gray-100 pb-4">
                                    <span className="bg-slate-800 text-white w-8 h-8 flex items-center justify-center rounded-xl mr-3 text-sm shadow-md">
                                        {'{ }'}
                                    </span> 
                                    Payload Data Forensik
                                </h2>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                                    {/* Kolom Kiri: Data Lama (Jika ada) */}
                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center">
                                            <span className="w-2 h-2 rounded-full bg-red-500 mr-2 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span> 
                                            Data Lama (Old)
                                        </h3>
                                        {renderJson(oldData, 'old')}
                                    </div>

                                    {/* Kolom Kanan: Data Baru */}
                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center">
                                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span> 
                                            Data Baru (New)
                                        </h3>
                                        {renderJson(newData, 'new')}
                                    </div>
                                </div>
                            </div>
                        )}
                        
                    </div>
                </div>
                
            </div>
        </AdminLayout>
    );
}