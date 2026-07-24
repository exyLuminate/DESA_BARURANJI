import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Table, Button, Tag, Space, Popconfirm, Avatar, message } from 'antd';
import { 
    PlusOutlined, EditOutlined, DeleteOutlined, 
    CrownOutlined, UserOutlined 
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout'; // Sesuaikan path layout Anda

export default function Index({ officials, success }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id, name) => {
        destroy(route('admin.officials.destroy', id), {
            preserveScroll: true,
            onSuccess: () => message.success(`Profil ${name} berhasil dihapus (Soft Delete).`),
        });
    };

    // Definisi Kolom Tabel Ant Design
    const columns = [
        {
            title: 'Urutan',
            dataIndex: 'sort_order',
            key: 'sort_order',
            align: 'center',
            render: (text) => (
                <span className="font-mono bg-gray-100 px-3 py-1 rounded-lg text-gray-700 font-bold">
                    {text}
                </span>
            ),
            width: '10%',
            sorter: (a, b) => a.sort_order - b.sort_order,
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Profil Perangkat Desa',
            key: 'profile',
            render: (_, record) => (
                <div className="flex items-center gap-4">
                    <Avatar 
                        size={48} 
                        src={record.photo ? `/storage/${record.photo}` : null}
                        icon={!record.photo && <UserOutlined />}
                        className="shadow-sm border-2 border-gray-100 bg-white text-gray-400 shrink-0"
                    />
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-bold text-gray-800 text-sm line-clamp-1">{record.name}</span>
                            {record.is_village_head && (
                                <Tag color="gold" className="m-0 border-0 flex items-center gap-1 font-bold text-[10px] rounded-full px-2 shadow-sm">
                                    <CrownOutlined /> Kades
                                </Tag>
                            )}
                        </div>
                        <span className="text-xs text-gray-500 font-medium">
                            Masa Jabatan: {record.period_start || '?'} - {record.period_end || 'Sekarang'}
                        </span>
                    </div>
                </div>
            ),
            width: '35%',
        },
        {
            title: 'Jabatan',
            dataIndex: 'position',
            key: 'position',
            render: (text) => (
                <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs border border-blue-100">
                    {text}
                </span>
            ),
            width: '20%',
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            align: 'center',
            render: (isActive) => (
                <Tag 
                    color={isActive ? 'green' : 'red'} 
                    className="rounded-full px-3 py-0.5 border-0 font-bold text-[10px] uppercase tracking-wider"
                >
                    {isActive ? 'Aktif' : 'Nonaktif'}
                </Tag>
            ),
            width: '15%',
        },
        {
            title: 'Aksi',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="small">
                    <Link href={route('admin.officials.edit', record.id)}>
                        <Button type="text" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg" icon={<EditOutlined />}>
                            Edit
                        </Button>
                    </Link>
                    <Popconfirm
                        title={`Hapus Profil ${record.name}?`}
                        description="Data akan dipindah ke trash (Soft Delete)."
                        onConfirm={() => handleDelete(record.id, record.name)}
                        okText="Hapus"
                        cancelText="Batal"
                        okButtonProps={{ danger: true }}
                    >
                        <Button type="text" danger className="hover:bg-red-50 rounded-lg" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
            width: '20%',
        },
    ];

    return (
        <AdminLayout>
            <Head title="Manajemen Perangkat Desa" />

            <div className="max-w-7xl mx-auto pb-10">
                
                {/* Header Soft UI */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Struktur Perangkat Desa</h1>
                        <p className="text-gray-500 text-sm">Kelola profil, jabatan, dan urutan tampil pimpinan serta staf desa.</p>
                    </div>
                    <Link href={route('admin.officials.create')}>
                        <Button type="primary" size="large" icon={<PlusOutlined />} className="bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-200">
                            Tambah Perangkat
                        </Button>
                    </Link>
                </div>

                {/* Notifikasi Sukses Bawaan Controller */}
                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl shadow-sm flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-3 animate-pulse"></span>
                        <p className="font-medium">{success}</p>
                    </div>
                )}

                {/* Table Section (Soft UI) */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden p-2">
                    <Table 
                        columns={columns} 
                        dataSource={officials.map(official => ({ ...official, key: official.id }))} 
                        pagination={{ 
                            pageSize: 10,
                            showSizeChanger: false,
                            className: "mt-4 mr-4"
                        }}
                        scroll={{ x: 800 }}
                        className="custom-soft-table"
                    />
                </div>
                
            </div>
        </AdminLayout>
    );
}