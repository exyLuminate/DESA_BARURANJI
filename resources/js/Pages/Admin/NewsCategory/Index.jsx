import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Table, Button, Space, Popconfirm, notification, Tag } from 'antd';
import { 
    PlusOutlined, EditOutlined, DeleteOutlined, 
    FolderOpenOutlined, LinkOutlined, ArrowLeftOutlined 
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ categories }) {
    const handleDelete = (id) => {
        router.delete(route('admin.news-categories.destroy', id), {
            preserveScroll: true,
            onSuccess: () => notification.success({ 
                message: 'Berhasil', 
                description: 'Kategori berita berhasil dihapus.',
                placement: 'bottomRight'
            }),
        });
    };

    const columns = [
        {
            title: 'No',
            key: 'index',
            width: 70,
            align: 'center',
            render: (text, record, index) => (
                <span className="font-mono text-gray-500">
                    {(categories.current_page - 1) * categories.per_page + index + 1}
                </span>
            ),
        },
        {
            title: 'Nama Kategori',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
                <div className="font-bold text-gray-800 text-sm sm:text-base flex items-center gap-2 min-w-[150px]">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                        <FolderOpenOutlined />
                    </div>
                    {text}
                </div>
            ),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Slug (URL)',
            dataIndex: 'slug',
            key: 'slug',
            render: (text) => (
                <div className="min-w-[150px]">
                    <Tag 
                        icon={<LinkOutlined />} 
                        color="blue" 
                        className="rounded-md px-2 py-1 border-blue-200 text-blue-600 bg-blue-50 shadow-sm"
                    >
                        {text}
                    </Tag>
                </div>
            ),
        },
        {
            title: 'Aksi',
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <Space size="small">
                    <Link href={route('admin.news-categories.edit', record.id)}>
                        <Button type="text" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg" icon={<EditOutlined />}>
                            <span className="hidden sm:inline">Edit</span>
                        </Button>
                    </Link>
                    <Popconfirm 
                        title={`Hapus "${record.name}"?`}
                        description="Kategori yang dihapus tidak dapat dikembalikan."
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
            <Head title="Manajemen Kategori Berita" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10 w-full overflow-hidden">
                
                {/* Header Soft UI dengan Tombol Kembali ke Berita */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Kategori Berita</h1>
                        <p className="text-gray-500 text-xs sm:text-sm">Kelola pengelompokan topik artikel dan berita desa.</p>
                    </div>
                    
                    {/* Grup Tombol Aksi di Header */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        <Link href={route('admin.news.index')} className="block w-full sm:w-auto">
                            <Button size="large" icon={<ArrowLeftOutlined />} className="w-full bg-white text-gray-700 hover:text-blue-600 border border-gray-200 rounded-xl shadow-sm">
                                Kembali ke Berita
                            </Button>
                        </Link>
                        <Link href={route('admin.news-categories.create')} className="block w-full sm:w-auto">
                            <Button type="primary" size="large" icon={<PlusOutlined />} className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-200 border-0">
                                Tambah Kategori
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Table Section */}
                <div className="grid grid-cols-1 w-full">
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full overflow-hidden">
                        <Table 
                            columns={columns} 
                            dataSource={categories.data} 
                            rowKey="id"
                            scroll={{ x: 'max-content' }}
                            className="custom-soft-table w-full"
                            pagination={{
                                total: categories.total,
                                current: categories.current_page,
                                pageSize: categories.per_page,
                                showTotal: (total, range) => (
                                    <span className="text-gray-500 font-medium">
                                        Menampilkan {range[0]}-{range[1]} dari {total} data
                                    </span>
                                ),
                                className: "mt-4 mb-4 mr-6",
                                onChange: (page) => {
                                    router.get(route('admin.news-categories.index', { page }), {}, { preserveState: true });
                                }
                            }}
                        />
                    </div>
                </div>
                
            </div>
        </AdminLayout>
    );
}