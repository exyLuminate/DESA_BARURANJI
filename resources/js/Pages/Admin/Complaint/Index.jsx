import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Table, Button, Space, Popconfirm, notification, Tag } from 'antd';
import { 
    EyeOutlined, DeleteOutlined, InboxOutlined, 
    SyncOutlined, CheckCircleOutlined, NotificationOutlined 
} from '@ant-design/icons'; // <-- Tambahkan NotificationOutlined
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export default function Index({ complaints }) {
    const handleDelete = (id) => {
        router.delete(route('admin.complaints.destroy', id), {
            preserveScroll: true,
            onSuccess: () => {
                notification.success({ 
                    message: 'Terhapus', 
                    description: 'Laporan warga berhasil dihapus.',
                    placement: 'bottomRight'
                });
            },
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <Tag color="warning" className="m-0 rounded-full px-3 py-0.5 border-0 bg-orange-50 text-orange-600 font-bold">Menunggu</Tag>;
            case 'diproses':
                return <Tag color="processing" className="m-0 rounded-full px-3 py-0.5 border-0 bg-blue-50 text-blue-600 font-bold">Diproses</Tag>;
            case 'selesai':
                return <Tag color="success" className="m-0 rounded-full px-3 py-0.5 border-0 bg-green-50 text-green-600 font-bold">Selesai</Tag>;
            case 'ditolak':
                return <Tag color="error" className="m-0 rounded-full px-3 py-0.5 border-0 bg-red-50 text-red-600 font-bold">Ditolak</Tag>;
            default:
                return <Tag color="default" className="m-0 rounded-full px-3 py-0.5">Unknown</Tag>;
        }
    };

    const totalComplaints = complaints.length;
    const pendingComplaints = complaints.filter(c => c.status === 'pending').length;
    const resolvedComplaints = complaints.filter(c => c.status === 'selesai').length;

    const columns = [
        {
            title: 'Waktu Laporan',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 140,
            render: (text) => (
                <div className="text-gray-500 text-sm flex flex-col">
                    <span className="font-semibold text-gray-700">{dayjs(text).format('DD MMM YYYY')}</span>
                    <span className="text-xs">{dayjs(text).format('HH:mm')} WIB</span>
                </div>
            ),
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
        },
        {
            title: 'Pengirim',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div className="min-w-[150px]">
                    <span className="font-bold text-gray-800 block">{text}</span>
                    <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">
                        {record.type}
                    </span>
                </div>
            )
        },
        {
            title: 'Topik Laporan',
            dataIndex: 'title',
            key: 'title',
            render: (text) => (
                <span className="text-gray-700 font-medium line-clamp-2 min-w-[200px]">
                    {text}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 120,
            render: (status) => getStatusBadge(status),
            sorter: (a, b) => a.status.localeCompare(b.status),
        },
        {
            title: 'Aksi',
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 120,
            render: (_, record) => (
                <Space size="small">
                    <Link href={route('admin.complaints.show', record.id)}>
                        <Button type="text" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg" icon={<EyeOutlined />} />
                    </Link>
                    <Popconfirm
                        title="Hapus Laporan?"
                        description="Data laporan tidak dapat dipulihkan."
                        onConfirm={() => handleDelete(record.id)}
                        okText="Hapus"
                        cancelText="Batal"
                        okButtonProps={{ danger: true }}
                        placement="topLeft"
                    >
                        <Button type="text" danger className="hover:bg-red-50 rounded-lg" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <AdminLayout>
            <Head title="Pusat Laporan Warga" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10 w-full overflow-hidden">
                
                {/* Header Soft UI dengan Icon Ant Design */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                            Pusat Laporan Warga <NotificationOutlined className="text-indigo-500" />
                        </h1>
                        <p className="text-gray-500 text-xs sm:text-sm">Pantau dan tindaklanjuti aspirasi, kritik, serta keluhan dari masyarakat.</p>
                    </div>
                </div>

                {/* Widgets / Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-5 transition-transform hover:-translate-y-1 duration-300">
                        <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 text-2xl shadow-inner">
                            <InboxOutlined />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Masuk</p>
                            <h3 className="text-3xl font-extrabold text-gray-800 leading-none">{totalComplaints}</h3>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-5 transition-transform hover:-translate-y-1 duration-300">
                        <div className="h-14 w-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 text-2xl shadow-inner">
                            <SyncOutlined />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Menunggu</p>
                            <h3 className="text-3xl font-extrabold text-gray-800 leading-none">{pendingComplaints}</h3>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-5 transition-transform hover:-translate-y-1 duration-300">
                        <div className="h-14 w-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-500 text-2xl shadow-inner">
                            <CheckCircleOutlined />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Selesai</p>
                            <h3 className="text-3xl font-extrabold text-gray-800 leading-none">{resolvedComplaints}</h3>
                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className="grid grid-cols-1 w-full">
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full overflow-hidden">
                        <Table 
                            columns={columns} 
                            dataSource={complaints} 
                            rowKey="id"
                            scroll={{ x: 'max-content' }}
                            className="custom-soft-table w-full"
                            pagination={{ 
                                pageSize: 10,
                                showTotal: (total, range) => (
                                    <span className="text-gray-500 font-medium">
                                        Menampilkan {range[0]}-{range[1]} dari {total} laporan
                                    </span>
                                ),
                                className: "mt-4 mb-4 mr-6"
                            }}
                        />
                    </div>
                </div>
                
            </div>
        </AdminLayout>
    );
}