import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button, Image, Form, Select, message } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, UserOutlined, PhoneOutlined, ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export default function Show({ complaint }) {
    const { data, setData, put, processing } = useForm({
        status: complaint.status,
    });

    const handleUpdateStatus = () => {
        put(route('admin.complaints.update', complaint.id), {
            onSuccess: () => message.success('Status laporan berhasil diperbarui! 🎉'),
        });
    };

    const getStatusStyle = (status) => {
        const styles = {
            pending: 'bg-orange-100 text-orange-600',
            diproses: 'bg-blue-100 text-blue-600',
            selesai: 'bg-green-100 text-green-600',
            ditolak: 'bg-red-100 text-red-600',
        };
        const labels = { pending: 'Menunggu', diproses: 'Diproses', selesai: 'Selesai', ditolak: 'Ditolak' };
        
        return { 
            className: styles[status] || 'bg-gray-100 text-gray-600', 
            label: labels[status] || status 
        };
    };

    const currentStatus = getStatusStyle(complaint.status);

    return (
        <AdminLayout>
            <Head title={`Laporan: ${complaint.title}`} />
            
            {/* Header navigasi */}
            <div className="mb-6 flex items-center justify-between">
                <Link href={route('admin.complaints.index')} className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                        <ArrowLeftOutlined />
                    </div>
                    <span className="font-medium">Kembali</span>
                </Link>
                <div className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide ${currentStatus.className}`}>
                    Status: {currentStatus.label}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Kolom Kiri: Detail Laporan */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-8">
                        <span className="text-indigo-500 font-semibold text-sm uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-md">
                            {complaint.type}
                        </span>
                        
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
                            {complaint.title}
                        </h1>

                        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                            {complaint.body}
                        </div>

                        {complaint.image && (
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <h4 className="text-gray-500 mb-4 font-medium text-sm flex items-center gap-2">
                                    📎 LAMPIRAN BUKTI
                                </h4>
                                <Image
                                    width={250}
                                    src={`/storage/${complaint.image}`}
                                    className="rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                    fallback="/images/placeholder.png"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Kolom Kanan: Info Pengirim & Action */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Profil Pengirim */}
                    <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-6">
                        <h3 className="text-gray-900 font-bold mb-4">Informasi Pelapor</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <UserOutlined />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Nama Lengkap</p>
                                    <p className="font-semibold text-gray-800">{complaint.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <PhoneOutlined />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Kontak</p>
                                    <p className="font-semibold text-gray-800">{complaint.contact || 'Tidak disertakan'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <ClockCircleOutlined />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Waktu Dikirim</p>
                                    <p className="font-semibold text-gray-800">
                                        {dayjs(complaint.created_at).format('DD MMM YYYY, HH:mm')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tindak Lanjut Action */}
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
                        <h3 className="text-indigo-900 font-bold mb-4">Tindak Lanjut</h3>
                        <Form layout="vertical" onFinish={handleUpdateStatus}>
                            <Form.Item label={<span className="text-indigo-800 font-medium">Ubah Status Laporan</span>}>
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
                                    className="w-full"
                                />
                            </Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                size="large"
                                icon={<SaveOutlined />} 
                                loading={processing}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 border-none rounded-xl h-12"
                            >
                                Simpan Status
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}