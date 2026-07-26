import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button, Image, Form, Select, notification, Tag } from 'antd';
import { 
    ArrowLeftOutlined, SaveOutlined, UserOutlined, 
    PhoneOutlined, ClockCircleOutlined, PaperClipOutlined 
} from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export default function Show({ complaint }) {
    const { data, setData, put, processing } = useForm({
        status: complaint.status,
    });

    const handleUpdateStatus = () => {
        put(route('admin.complaints.update', complaint.id), {
            onSuccess: () => {
                notification.success({ 
                    message: 'Status Diperbarui', 
                    description: 'Status laporan warga berhasil diubah! 🎉',
                    placement: 'bottomRight'
                });
            }
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending': return <Tag color="warning" className="m-0 rounded-full px-4 py-1 border-0 bg-orange-50 text-orange-600 font-bold text-sm">Menunggu</Tag>;
            case 'diproses': return <Tag color="processing" className="m-0 rounded-full px-4 py-1 border-0 bg-blue-50 text-blue-600 font-bold text-sm">Sedang Diproses</Tag>;
            case 'selesai': return <Tag color="success" className="m-0 rounded-full px-4 py-1 border-0 bg-green-50 text-green-600 font-bold text-sm">Selesai</Tag>;
            case 'ditolak': return <Tag color="error" className="m-0 rounded-full px-4 py-1 border-0 bg-red-50 text-red-600 font-bold text-sm">Ditolak / Spam</Tag>;
            default: return <Tag color="default" className="m-0 rounded-full px-4 py-1 text-sm">Unknown</Tag>;
        }
    };

    return (
        <AdminLayout>
            <Head title={`Laporan: ${complaint.title}`} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10 w-full overflow-hidden">
                
                {/* Header Soft UI Navigasi */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <Link 
                        href={route('admin.complaints.index')}
                        className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition-colors"
                    >
                        <ArrowLeftOutlined className="mr-2" /> Kembali ke Daftar Laporan
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm font-semibold">Status Saat Ini:</span>
                        {getStatusBadge(complaint.status)}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* KOLOM KIRI: Lembar Detail Laporan (Lebar 8/12) */}
                    <div className="lg:col-span-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-10 min-h-[500px]">
                        
                        <div className="mb-6">
                            <span className="inline-block bg-indigo-50 text-indigo-600 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-lg border border-indigo-100 mb-4">
                                Kategori: {complaint.type}
                            </span>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                                {complaint.title}
                            </h1>
                        </div>

                        {/* Konten Utama Laporan (Gaya Kertas Surat) */}
                        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base sm:text-lg bg-gray-50/50 p-6 rounded-2xl border border-gray-100 min-h-[200px]">
                            {complaint.body}
                        </div>

                        {/* Lampiran Bukti */}
                        {complaint.image && (
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <h4 className="text-gray-800 mb-4 font-bold text-sm flex items-center gap-2 uppercase tracking-wider">
                                    <PaperClipOutlined className="text-blue-500 text-lg" /> Lampiran Bukti Foto
                                </h4>
                                <div className="p-2 bg-gray-50 rounded-2xl border border-gray-200 inline-block">
                                    <Image
                                        width={280}
                                        src={`/storage/${complaint.image}`}
                                        className="rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer object-cover"
                                        fallback="/images/placeholder.png"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* KOLOM KANAN: Inspector & Tindak Lanjut (Lebar 4/12) */}
                    <div className="lg:col-span-4 sticky top-6 flex flex-col gap-6">
                        
                        {/* Profil Pengirim */}
                        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6">
                            <h3 className="text-gray-800 font-bold mb-5 pb-4 border-b border-gray-100">Informasi Pelapor</h3>
                            
                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 text-xl shrink-0">
                                        <UserOutlined />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Nama Lengkap</p>
                                        <p className="font-bold text-gray-800">{complaint.name}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-500 text-xl shrink-0">
                                        <PhoneOutlined />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Kontak / No. HP</p>
                                        <p className="font-bold text-gray-800">{complaint.contact || 'Tidak disertakan'}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 text-xl shrink-0">
                                        <ClockCircleOutlined />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Waktu Dikirim</p>
                                        <p className="font-bold text-gray-800">
                                            {dayjs(complaint.created_at).format('DD MMM YYYY, HH:mm')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tindak Lanjut Action */}
                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-6 border border-indigo-100 shadow-sm">
                            <h3 className="text-indigo-900 font-bold mb-4">Tindak Lanjut Laporan</h3>
                            <Form layout="vertical" onFinish={handleUpdateStatus}>
                                <Form.Item label={<span className="text-indigo-800 font-semibold">Ubah Status Laporan</span>} className="mb-4">
                                    <Select 
                                        size="large"
                                        value={data.status} 
                                        onChange={(value) => setData('status', value)}
                                        options={[
                                            { value: 'pending', label: 'Menunggu (Pending)' },
                                            { value: 'diproses', label: 'Sedang Diproses' },
                                            { value: 'selesai', label: 'Selesai / Ditangani' },
                                            { value: 'ditolak', label: 'Ditolak / Spam' },
                                        ]}
                                        className="w-full rounded-xl"
                                    />
                                </Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    size="large"
                                    icon={<SaveOutlined />} 
                                    loading={processing}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 border-none rounded-2xl h-14 font-bold shadow-md shadow-indigo-200"
                                >
                                    Update Status
                                </Button>
                            </Form>
                        </div>

                    </div>
                </div>
                
            </div>
        </AdminLayout>
    );
}