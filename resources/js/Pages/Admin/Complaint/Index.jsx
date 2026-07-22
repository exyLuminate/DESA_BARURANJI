import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { EyeOutlined, DeleteOutlined, InboxOutlined, SyncOutlined, CheckCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export default function Index({ complaints }) {
    const handleDelete = (id) => {
        router.delete(route('admin.complaints.destroy', id), {
            onSuccess: () => message.success('Laporan berhasil dihapus'),
        });
    };

    // Desain Tag Custom Tailwind (Soft UI / Pastel)
    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-orange-100 text-orange-600',
            diproses: 'bg-blue-100 text-blue-600',
            selesai: 'bg-green-100 text-green-600',
            ditolak: 'bg-red-100 text-red-600',
        };
        const labels = {
            pending: 'Menunggu',
            diproses: 'Diproses',
            selesai: 'Selesai',
            ditolak: 'Ditolak',
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
                {labels[status] || status}
            </span>
        );
    };

    // Menghitung ringkasan untuk Widget
    const totalComplaints = complaints.length;
    const pendingComplaints = complaints.filter(c => c.status === 'pending').length;
    const resolvedComplaints = complaints.filter(c => c.status === 'selesai').length;

    const columns = [
        {
            title: 'Tanggal',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => (
                <div className="text-gray-500 text-sm">
                    {dayjs(text).format('DD MMM YYYY')} <br/>
                    <span className="text-xs">{dayjs(text).format('HH:mm')} WIB</span>
                </div>
            ),
        },
        {
            title: 'Pengirim',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div>
                    <span className="font-semibold text-gray-800">{text}</span>
                    <br/>
                    <span className="text-xs text-indigo-500 capitalize">{record.type}</span>
                </div>
            )
        },
        {
            title: 'Judul Laporan',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <span className="text-gray-700">{text}</span>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => getStatusBadge(status),
        },
        {
            title: 'Aksi',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link href={route('admin.complaints.show', record.id)}>
                        {/* Tombol dengan style soft */}
                        <button className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-105 transition-all flex items-center justify-center">
                            <EyeOutlined />
                        </button>
                    </Link>
                    <Popconfirm
                        title="Hapus Laporan?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Hapus"
                        cancelText="Batal"
                        okButtonProps={{ danger: true }}
                    >
                        <button className="h-8 w-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:scale-105 transition-all flex items-center justify-center">
                            <DeleteOutlined />
                        </button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <AdminLayout>
            <Head title="Manajemen Laporan Warga" />
            
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Pusat Laporan Warga 📣</h2>
                <p className="text-gray-500">Kelola dan tindaklanjuti aspirasi serta keluhan dari masyarakat.</p>
            </div>

            {/* Widgets / Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 text-xl">
                        <InboxOutlined />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Laporan Masuk</p>
                        <h3 className="text-2xl font-bold text-gray-800">{totalComplaints}</h3>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-xl">
                        <SyncOutlined />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Menunggu Tindakan</p>
                        <h3 className="text-2xl font-bold text-gray-800">{pendingComplaints}</h3>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-green-500 text-xl">
                        <CheckCircleOutlined />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Laporan Selesai</p>
                        <h3 className="text-2xl font-bold text-gray-800">{resolvedComplaints}</h3>
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden p-2">
                <Table 
                    columns={columns} 
                    dataSource={complaints} 
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </div>
        </AdminLayout>
    );
}