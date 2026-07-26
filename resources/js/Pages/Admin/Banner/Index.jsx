import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Table, Button, Space, Popconfirm, Image, Switch, Input, Select, message, Pagination } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout'; 

const { Option } = Select;

export default function Index({ banners, filters }) {
    // State untuk filter pencarian
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || undefined);

    const handleFilter = () => {
        router.get(
            route('admin.banners.index'),
            { search, status },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

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

    // --- KOLOM TABEL UNTUK DESKTOP ---
    const columns = [
        {
            title: 'Gambar',
            dataIndex: 'image',
            key: 'image',
            render: (text) => (
                <div className="w-32 h-16 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 flex items-center justify-center shrink-0">
                    <Image src={`/storage/${text}`} alt="Banner" className="object-cover w-full h-full" preview={{ mask: 'Lihat' }} />
                </div>
            ),
            width: '15%',
        },
        {
            title: 'Informasi Banner',
            key: 'info',
            render: (_, record) => (
                <div>
                    <h4 className="font-bold text-gray-800 text-base line-clamp-2">{record.title || <span className="text-gray-400 italic">Tanpa Judul</span>}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{record.subtitle || '-'}</p>
                </div>
            ),
            width: '35%',
        },
        {
            title: 'Urutan',
            dataIndex: 'sort_order',
            key: 'sort_order',
            align: 'center',
            render: (text) => <span className="font-mono bg-gray-100 px-3 py-1 rounded-lg text-sm text-gray-700">{text}</span>,
            width: '10%',
        },
        {
            title: 'Status Tampil',
            dataIndex: 'is_active',
            key: 'is_active',
            align: 'center',
            render: (isActive, record) => (
                <div className="flex flex-col items-center gap-1">
                    <Switch checked={isActive} onChange={(checked) => handleToggle(record.id, checked)} size="small" />
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
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
                    <Popconfirm title="Hapus Banner" description="Yakin ingin menghapus banner ini?" onConfirm={() => handleDelete(record.id)} okText="Hapus" cancelText="Batal" okButtonProps={{ danger: true }}>
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

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-16 sm:pb-10">
                
                {/* Header Section */}
                <div className="mb-4 sm:mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl shadow-sm border border-blue-100">
                    <div className="text-center md:text-left">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Manajemen Banner</h1>
                        <p className="text-gray-500 text-xs sm:text-sm">Kelola gambar utama yang tampil di beranda masyarakat.</p>
                    </div>
                    <Link href={route('admin.banners.create')} className="w-full md:w-auto">
                        <Button type="primary" size="large" icon={<PlusOutlined />} className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-200">
                            Tambah Banner
                        </Button>
                    </Link>
                </div>

                {/* Filter Section */}
                <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-white/70 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between w-full">
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
                        <Input
                            placeholder="Cari judul banner..."
                            prefix={<SearchOutlined className="text-gray-400" />}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onPressEnter={handleFilter}
                            className="rounded-xl px-4 py-2 w-full sm:max-w-xs border-gray-200 hover:border-blue-400 focus:border-blue-400"
                        />
                        <Select
                            placeholder="Filter Status"
                            value={status}
                            onChange={(val) => setStatus(val)}
                            allowClear
                            className="w-full sm:w-[150px]"
                            size="large"
                        >
                            <Option value="active">Status: Aktif</Option>
                            <Option value="inactive">Status: Nonaktif</Option>
                        </Select>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto shrink-0 mt-2 sm:mt-0">
                        <Button onClick={handleFilter} type="primary" size="large" className="bg-gray-800 hover:bg-gray-900 rounded-xl flex-1 sm:px-6">Cari</Button>
                        <Button onClick={handleReset} icon={<ReloadOutlined />} size="large" className="rounded-xl border-gray-300 flex-1 sm:flex-none">Reset</Button>
                    </div>
                </div>

                {/* --- TAMPILAN MOBILE (Card Layout) --- */}
                <div className="block md:hidden space-y-4">
                    {banners.data.length > 0 ? banners.data.map((banner) => (
                        <div key={banner.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
                            <div className="flex gap-4 items-start">
                                {/* Thumbnail */}
                                <div className="w-24 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0 flex items-center justify-center">
                                    <Image src={`/storage/${banner.image}`} alt="Banner" className="object-cover w-full h-full" preview={{ mask: 'Lihat' }} />
                                </div>
                                {/* Info Utama */}
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-800 text-sm line-clamp-2 leading-tight">
                                        {banner.title || <span className="text-gray-400 italic">Tanpa Judul</span>}
                                    </h4>
                                    <p className="text-xs text-gray-500 line-clamp-1 mt-1">{banner.subtitle || '-'}</p>
                                    <div className="mt-2 inline-block">
                                        <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-[10px] text-gray-600 border border-gray-200">Urutan: {banner.sort_order}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Card: Aksi & Status */}
                            <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-1">
                                <div className="flex items-center gap-2">
                                    <Switch size="small" checked={banner.is_active} onChange={(checked) => handleToggle(banner.id, checked)} />
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${banner.is_active ? 'text-green-600' : 'text-gray-400'}`}>
                                        {banner.is_active ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </div>
                                <Space size="small">
                                    <Link href={route('admin.banners.edit', banner.id)}>
                                        <Button size="small" type="text" className="text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg" icon={<EditOutlined />} />
                                    </Link>
                                    <Popconfirm title="Hapus Banner" description="Hapus banner ini?" onConfirm={() => handleDelete(banner.id)} okText="Ya" cancelText="Batal" okButtonProps={{ danger: true }}>
                                        <Button size="small" type="text" danger className="bg-red-50 hover:bg-red-100 rounded-lg" icon={<DeleteOutlined />} />
                                    </Popconfirm>
                                </Space>
                            </div>
                        </div>
                    )) : (
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
                            <p className="text-gray-500 text-sm">Tidak ada data banner.</p>
                        </div>
                    )}
                    
                    {/* Pagination Khusus Mobile */}
                    {banners.total > 0 && (
                        <div className="flex justify-center mt-6 pb-4">
                            <Pagination
                                size="small"
                                current={banners.current_page}
                                pageSize={banners.per_page}
                                total={banners.total}
                                onChange={(page) => {
                                    router.get(route('admin.banners.index'), { search, status, page }, { preserveState: true, preserveScroll: true });
                                }}
                                showSizeChanger={false}
                            />
                        </div>
                    )}
                </div>

                {/* --- TAMPILAN DESKTOP (Table Layout) --- */}
                <div className="hidden md:block bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden p-2">
                    <Table 
                        columns={columns} 
                        dataSource={banners.data}
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
                            className: "mt-4 mb-4 mr-4 flex justify-end"
                        }}
                    />
                </div>
                
            </div>
        </AdminLayout>
    );
}