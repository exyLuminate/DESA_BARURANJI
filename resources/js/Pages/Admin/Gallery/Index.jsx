import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Table, Button, Space, Popconfirm, notification, Image, Tag } from 'antd';
import { 
    PlusOutlined, EditOutlined, DeleteOutlined, 
    TagsOutlined, PictureOutlined, FolderOpenOutlined 
} from '@ant-design/icons';

export default function Index({ galleries, flash }) {
    const { delete: destroy } = useForm();

    useEffect(() => {
        if (flash?.success) notification.success({ message: 'Berhasil', description: flash.success, placement: 'bottomRight' });
        if (flash?.error) notification.error({ message: 'Gagal', description: flash.error, placement: 'bottomRight' });
    }, [flash]);

    const handleDelete = (id) => {
        destroy(route('admin.galleries.destroy', id));
    };

    const columns = [
        {
            title: 'No',
            key: 'index',
            width: 70,
            align: 'center',
            render: (text, record, index) => <span className="font-mono text-gray-500">{index + 1}</span>,
        },
        {
            title: 'Foto / Gambar',
            key: 'image',
            width: 140,
            render: (_, record) => (
                <div className="w-24 h-16 sm:w-28 sm:h-20 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm relative group">
                    {record.image ? (
                        <Image
                            src={`/storage/${record.image}`}
                            alt={record.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            fallback="/placeholder-image.png"
                            preview={{ mask: <span className="text-[10px]">Perbesar</span> }}
                        />
                    ) : (
                        <PictureOutlined className="text-xl text-gray-300" />
                    )}
                </div>
            ),
        },
        {
            title: 'Judul Foto',
            dataIndex: 'title',
            key: 'title',
            render: (text) => (
                <span className="font-bold text-gray-800 text-sm sm:text-base line-clamp-2 min-w-[150px]">
                    {text}
                </span>
            ),
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Album / Kategori',
            key: 'category',
            render: (_, record) => (
                <div className="min-w-[120px]">
                    {record.category ? (
                        <Tag icon={<FolderOpenOutlined />} color="blue" className="rounded-md border-blue-200 text-blue-600 bg-blue-50 m-0 px-2 py-0.5">
                            {record.category.name}
                        </Tag>
                    ) : (
                        <span className="text-gray-400 italic text-xs">Tanpa Kategori</span>
                    )}
                </div>
            ),
        },
        {
            title: 'Aksi',
            key: 'action',
            align: 'center',
            fixed: 'right', // Pengunci tabel responsif HP
            width: 120,
            render: (_, record) => (
                <Space size="small">
                    <Link href={route('admin.galleries.edit', record.id)}>
                        <Button type="text" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg" icon={<EditOutlined />} />
                    </Link>
                    <Popconfirm 
                        title="Hapus Foto?" 
                        description="Foto yang dihapus tidak dapat dipulihkan."
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
            <Head title="Manajemen Galeri Desa" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10 w-full overflow-hidden">
                
                {/* Header Soft UI */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Galeri Dokumentasi Desa</h1>
                        <p className="text-gray-500 text-xs sm:text-sm">Kelola arsip foto kegiatan, infrastruktur, dan momen desa.</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        <Link href={route('admin.gallery-categories.index')} className="block w-full sm:w-auto">
                            <Button size="large" icon={<TagsOutlined />} className="w-full bg-white text-gray-700 hover:text-blue-600 border border-gray-200 rounded-xl shadow-sm">
                                Kategori / Album
                            </Button>
                        </Link>
                        <Link href={route('admin.galleries.create')} className="block w-full sm:w-auto">
                            <Button type="primary" size="large" icon={<PlusOutlined />} className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-200 border-0">
                                Tambah Foto Baru
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Table Section (Responsive & Paginated Client-Side) */}
                <div className="grid grid-cols-1 w-full">
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full overflow-hidden">
                        <Table 
                            columns={columns} 
                            dataSource={galleries} 
                            rowKey="id"
                            scroll={{ x: 'max-content' }} // Anti-bocor horizontal di HP
                            className="custom-soft-table w-full"
                            pagination={{ 
                                pageSize: 10,
                                showTotal: (total, range) => (
                                    <span className="text-gray-500 font-medium">
                                        Menampilkan {range[0]}-{range[1]} dari {total} foto
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