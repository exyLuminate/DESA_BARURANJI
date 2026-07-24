import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Table, Button, Space, Popconfirm, Image, Switch, Input, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout'; // Sesuaikan path layout Anda

const { Option } = Select;

export default function Index({ banners, filters }) {
    // State untuk filter pencarian
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || undefined);

    // Fungsi memicu filter ke backend
    const handleFilter = () => {
        router.get(
            route('admin.banners.index'),
            { search, status },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    // Otomatis filter saat dropdown status berubah
    useEffect(() => {
        if (status !== filters?.status) {
            handleFilter();
        }
    }, [status]);

    const handleReset = () => {
        setSearch('');
        setStatus(undefined);
        router.get(route('admin.banners.index'));
    };

    const handleToggle = (id, checked) => {
        router.patch(route('admin.banners.toggle', id), {}, {
            preserveScroll: true,
            onSuccess: () => message.success(`Banner berhasil ${checked ? 'diaktifkan' : 'dinonaktifkan'}.`)
        });
    };

    const handleDelete = (id) => {
        router.delete(route('admin.banners.destroy', id), {
            preserveScroll: true,
            onSuccess: () => message.success('Banner berhasil dihapus.')
        });
    };

    // Definisi Kolom Tabel
    const columns = [
        {
            title: 'Gambar',
            dataIndex: 'image',
            key: 'image',
            render: (text) => (
                // Menggunakan Image Ant Design untuk fitur Lightbox/Zoom
                <div className="w-32 h-16 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 flex items-center justify-center">
                    <Image 
                        src={`/storage/${text}`} 
                        alt="Banner" 
                        className="object-cover w-full h-full"
                        preview={{ mask: 'Lihat' }}
                    />
                </div>
            ),
            width: '15%',
        },
        {
            title: 'Informasi Banner',
            key: 'info',
            render: (_, record) => (
                <div>
                    <h4 className="font-bold text-gray-800">{record.title || <span className="text-gray-400 italic">Tanpa Judul</span>}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{record.subtitle || '-'}</p>
                </div>
            ),
            width: '35%',
        },
        {
            title: 'Urutan',
            dataIndex: 'sort_order',
            key: 'sort_order',
            align: 'center',
            render: (text) => <span className="font-mono bg-gray-100 px-3 py-1 rounded-lg text-gray-700">{text}</span>,
            width: '10%',
        },
        {
            title: 'Status Tampil',
            dataIndex: 'is_active',
            key: 'is_active',
            align: 'center',
            render: (isActive, record) => (
                // Menggunakan Switch agar lebih interaktif
                <div className="flex flex-col items-center gap-1">
                    <Switch 
                        checked={isActive} 
                        onChange={(checked) => handleToggle(record.id, checked)} 
                    />
                    <span className={`text-[10px] font-medium ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                        {isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                </div>
            ),
            width: '15%',
        },
        {
            title: 'Aksi',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="small">
                    <Link href={route('admin.banners.edit', record.id)}>
                        <Button type="text" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg" icon={<EditOutlined />} />
                    </Link>
                    <Popconfirm
                        title="Hapus Banner"
                        description="Yakin ingin menghapus banner ini?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Hapus"
                        cancelText="Batal"
                        okButtonProps={{ danger: true }}
                    >
                        <Button type="text" danger className="hover:bg-red-50 rounded-lg" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
            width: '15%',
        },
    ];

    return (
        <AdminLayout>
            <Head title="Manajemen Banner" />

            <div className="max-w-7xl mx-auto pb-10">
                
                {/* Header Soft UI */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Manajemen Banner</h1>
                        <p className="text-gray-500 text-sm">Kelola gambar utama yang tampil di beranda masyarakat.</p>
                    </div>
                    <Link href={route('admin.banners.create')}>
                        <Button type="primary" size="large" icon={<PlusOutlined />} className="bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-200">
                            Tambah Banner
                        </Button>
                    </Link>
                </div>

                {/* Filter Section (Glassmorphism lite) */}
                <div className="mb-6 p-5 bg-white/70 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <Input
                            placeholder="Cari judul banner..."
                            prefix={<SearchOutlined className="text-gray-400" />}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onPressEnter={handleFilter}
                            className="rounded-xl px-4 py-2 w-full md:w-64 border-gray-200 hover:border-blue-400 focus:border-blue-400"
                        />
                        <Select
                            placeholder="Filter Status"
                            value={status}
                            onChange={(val) => setStatus(val)}
                            allowClear
                            className="min-w-[150px]"
                        >
                            <Option value="active">Status: Aktif</Option>
                            <Option value="inactive">Status: Nonaktif</Option>
                        </Select>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto justify-end">
                        <Button 
                            onClick={handleFilter} 
                            type="primary" 
                            className="bg-gray-800 hover:bg-gray-900 rounded-xl px-6"
                        >
                            Cari
                        </Button>
                        <Button 
                            onClick={handleReset} 
                            icon={<ReloadOutlined />} 
                            className="rounded-xl border-gray-300"
                        >
                            Reset
                        </Button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden p-2">
                    <Table 
                        columns={columns} 
                        dataSource={banners.data} // Menggunakan .data karena paginasi server-side
                        rowKey="id"
                        pagination={{ 
                            current: banners.current_page,
                            pageSize: banners.per_page,
                            total: banners.total,
                            onChange: (page) => {
                                router.get(route('admin.banners.index'), {
                                    search, status, page
                                }, { preserveState: true, preserveScroll: true });
                            },
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