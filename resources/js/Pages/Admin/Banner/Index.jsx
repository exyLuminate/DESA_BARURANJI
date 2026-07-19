import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Table, Button, Tag, Space, Popconfirm } from 'antd';
// Asumsi Anda memiliki AuthenticatedLayout sebagai base layout admin
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; 

export default function Index({ auth, banners }) {
    const { patch, delete: destroy } = useForm();

    const handleToggle = (id) => {
        patch(route('admin.banners.toggle', id), {
            preserveScroll: true,
        });
    };

    const handleDelete = (id) => {
        destroy(route('admin.banners.destroy', id), {
            preserveScroll: true,
        });
    };

    const columns = [
        {
            title: 'Gambar',
            dataIndex: 'image',
            key: 'image',
            render: (text) => (
                <img 
                    src={`/storage/${text}`} 
                    alt="Banner" 
                    className="w-32 h-16 object-cover rounded"
                />
            ),
        },
        {
            title: 'Judul',
            dataIndex: 'title',
            key: 'title',
            render: (text) => text || '-',
        },
        {
            title: 'Urutan',
            dataIndex: 'sort_order',
            key: 'sort_order',
            align: 'center',
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (isActive, record) => (
                <Tag 
                    color={isActive ? 'green' : 'red'} 
                    className="cursor-pointer"
                    onClick={() => handleToggle(record.id)}
                >
                    {isActive ? 'Aktif' : 'Tidak Aktif'}
                </Tag>
            ),
        },
        {
            title: 'Aksi',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link href={route('admin.banners.edit', record.id)}>
                        <Button type="primary" size="small">Edit</Button>
                    </Link>
                    <Popconfirm
                        title="Hapus Banner"
                        description="Apakah Anda yakin ingin menghapus banner ini?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Ya"
                        cancelText="Tidak"
                    >
                        <Button danger size="small">Hapus</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Banner</h2>}
        >
            <Head title="Manajemen Banner" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium text-gray-900">Daftar Banner</h3>
                            <Link href={route('admin.banners.create')}>
                                <Button type="primary" className="bg-blue-600">Tambah Banner</Button>
                            </Link>
                        </div>

                        <Table 
                            columns={columns} 
                            dataSource={banners.map(b => ({ ...b, key: b.id }))} 
                            pagination={{ pageSize: 10 }}
                            scroll={{ x: true }}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}