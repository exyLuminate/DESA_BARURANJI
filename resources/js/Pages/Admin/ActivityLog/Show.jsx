import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import AdminLayout from '@/Layouts/AdminLayout'; // Sesuaikan dengan path layout admin Anda

export default function ActivityLogShow({ log }) {
    // Spatie Activity Log biasanya menyimpan data perubahan di dalam kolom properties
    const properties = log.properties || {};
    const oldData = properties.old || null;
    const newData = properties.attributes || null;

    const eventColorMap = {
        created: 'green',
        updated: 'blue',
        deleted: 'red',
        restored: 'purple',
        login: 'cyan',
        logout: 'default'
    };

    // Helper untuk render JSON agar rapi
    const renderJson = (data) => {
        if (!data) return <p className="text-gray-400 italic">Tidak ada data</p>;
        return (
            <pre className="bg-gray-50/80 p-5 rounded-2xl text-sm text-gray-700 overflow-x-auto border border-gray-100 shadow-inner custom-scrollbar">
                {JSON.stringify(data, null, 2)}
            </pre>
        );
    };

    return (
        <AdminLayout>
            <Head title="Detail Activity Log" />

            <div className="max-w-5xl mx-auto pb-10">
                {/* Header & Back Button */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <Link 
                            href={route('admin.activity-logs.index')}
                            className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition-colors mb-2"
                        >
                            <ArrowLeftOutlined className="mr-2" /> Kembali ke Daftar Log
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Detail Aktivitas</h1>
                    </div>
                </div>

                {/* Info Card (Glassmorphism lite) */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Kolom Kiri: Informasi Utama */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Pengguna (Causer)</h3>
                                <p className="text-lg font-medium text-gray-800">
                                    {log.causer ? log.causer.name : <span className="text-gray-400 italic">Sistem / Guest</span>}
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Modul (Subject)</h3>
                                <p className="text-lg font-medium text-gray-800 capitalize">
                                    {log.subject_type ? log.subject_type.split('\\').pop() : '-'} 
                                    {log.subject_id && <span className="text-gray-500 text-sm ml-2">(ID: {log.subject_id})</span>}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Deskripsi</h3>
                                <p className="text-gray-700">{log.description}</p>
                            </div>
                        </div>

                        {/* Kolom Kanan: Meta Data */}
                        <div className="space-y-6 md:border-l md:border-gray-100 md:pl-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Jenis Aktivitas</h3>
                                <Tag color={eventColorMap[log.event] || 'default'} className="rounded-full px-4 py-1 text-sm border-0 font-medium">
                                    {log.event.toUpperCase()}
                                </Tag>
                            </div>
                            
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Waktu Kejadian</h3>
                                <p className="text-gray-700">{new Date(log.created_at).toLocaleString('id-ID', {
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                })}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">IP Address</h3>
                                <p className="text-gray-700 font-mono text-sm bg-gray-50 px-3 py-1 rounded-lg inline-block border border-gray-200">
                                    {properties.ip || 'Tidak tercatat'}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Perubahan Data (Changes) Section */}
                {(oldData || newData) && (
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <span className="bg-blue-100 text-blue-600 w-8 h-8 flex items-center justify-center rounded-xl mr-3 text-sm">JSON</span> 
                            Riwayat Perubahan Data
                        </h2>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Data Lama */}
                            <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                                <h3 className="text-red-600 font-semibold mb-3 flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span> Data Sebelumnya (Old)
                                </h3>
                                {renderJson(oldData)}
                            </div>

                            {/* Data Baru */}
                            <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                                <h3 className="text-green-600 font-semibold mb-3 flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Data Baru (Attributes)
                                </h3>
                                {renderJson(newData)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}