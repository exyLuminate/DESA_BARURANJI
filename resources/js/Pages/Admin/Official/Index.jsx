import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Table, Button, Tag, Space, Popconfirm, Avatar, message } from 'antd';
import { 
    PlusOutlined, EditOutlined, DeleteOutlined, 
    CrownOutlined, UserOutlined 
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ officials, success }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id, name) => {
        destroy(route('admin.officials.destroy', id), {
            preserveScroll: true,
            onSuccess: () => message.success(`Profil ${name} berhasil dihapus (Soft Delete).`),
        });
    };

    // --- KOLOM TABEL UNTUK DESKTOP ---
    const columns = [
        {
            title: 'Urutan',
            dataIndex: 'sort_order',
            key: 'sort_order',
            align: 'center',
            render: (text) => (
                <span className="font-mono bg-gray-100 px-3 py-1 rounded-lg text-gray-700 font-bold text-sm">
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
                            <span className="font-bold text-gray-800 text-sm">{record.name}</span>
                            {record.is_village_head && (
                                <Tag color="gold" className="m-0 border-0 flex items-center gap-1 font-bold text-[10px] rounded-full px-2 shadow-sm shrink-0">
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
                    className="rounded-full px-3 py-0.5 border-0 font-bold text-[10px] uppercase tracking-wider m-0"
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
                        description="Data dipindah ke trash."
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

            <div className="max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-0">
                
                {/* Header Soft UI */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Struktur Perangkat Desa</h1>
                        <p className="text-gray-500 text-xs sm:text-sm">Kelola profil, jabatan, dan urutan tampil pimpinan serta staf desa.</p>
                    </div>
                    
                    <Link href={route('admin.officials.create')} className="block w-full md:w-auto">
                        <Button 
                            type="primary" 
                            size="large" 
                            icon={<PlusOutlined />} 
                            className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-200"
                        >
                            Tambah Perangkat
                        </Button>
                    </Link>
                </div>

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl shadow-sm flex items-center text-sm sm:text-base">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-3 animate-pulse shrink-0"></span>
                        <p className="font-medium">{success}</p>
                    </div>
                )}

                {/* ========================================= */}
                {/* 1. TAMPILAN MOBILE (KARTU) - hidden di md */}
                {/* ========================================= */}
                <div className="block md:hidden space-y-4">
                    {officials.length === 0 ? (
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center text-gray-500">
                            Belum ada data perangkat desa.
                        </div>
                    ) : (
                        officials.sort((a, b) => a.sort_order - b.sort_order).map((official) => (
                            <div key={official.id} className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 relative">
                                
                                {/* Badge Status di pojok kanan atas kartu */}
                                <div className="absolute top-4 right-4">
                                    <Tag color={official.is_active ? 'green' : 'red'} className="m-0 border-0 rounded-full text-[10px] uppercase font-bold tracking-wider">
                                        {official.is_active ? 'Aktif' : 'Nonaktif'}
                                    </Tag>
                                </div>

                                {/* Profil (Kiri) */}
                                <div className="flex items-center gap-3 pr-16 mb-4">
                                    <Avatar 
                                        size={56} 
                                        src={official.photo ? `/storage/${official.photo}` : null}
                                        icon={!official.photo && <UserOutlined />}
                                        className="shadow-sm border border-gray-100 shrink-0"
                                    />
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1 line-clamp-2">
                                            {official.name}
                                        </h3>
                                        {official.is_village_head && (
                                            <Tag color="gold" className="m-0 border-0 flex items-center gap-1 font-bold text-[10px] rounded-full px-2 shadow-sm w-max">
                                                <CrownOutlined /> Kades
                                            </Tag>
                                        )}
                                    </div>
                                </div>

                                {/* Info Jabatan & Masa (Tengah) */}
                                <div className="bg-gray-50/50 rounded-xl p-3 text-xs mb-4 space-y-2 border border-gray-50">
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Jabatan</span>
                                        <span className="font-bold text-blue-600">{official.position}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Periode</span>
                                        <span className="font-semibold text-gray-700">{official.period_start || '?'} - {official.period_end || 'Sekarang'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Urutan Tampil</span>
                                        <span className="font-mono bg-gray-200 px-2 py-0.5 rounded text-gray-700 font-bold">{official.sort_order}</span>
                                    </div>
                                </div>

                                {/* Tombol Aksi (Bawah) */}
                                <div className="flex justify-end gap-2 pt-2">
                                    <Link href={route('admin.officials.edit', official.id)}>
                                        <Button type="primary" ghost size="small" className="rounded-lg px-4" icon={<EditOutlined />}>
                                            Edit
                                        </Button>
                                    </Link>
                                    <Popconfirm
                                        title="Hapus Profil?"
                                        onConfirm={() => handleDelete(official.id, official.name)}
                                        okText="Hapus"
                                        cancelText="Batal"
                                        okButtonProps={{ danger: true }}
                                    >
                                        <Button danger size="small" className="rounded-lg px-3" icon={<DeleteOutlined />} />
                                    </Popconfirm>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* ============================================== */}
                {/* 2. TAMPILAN DESKTOP (TABEL) - hidden di mobile */}
                {/* ============================================== */}
                <div className="hidden md:block bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden p-3">
                    <Table 
                        columns={columns} 
                        dataSource={officials.map(official => ({ ...official, key: official.id }))} 
                        pagination={{ 
                            pageSize: 10,
                            showSizeChanger: false,
                            className: "mt-4 mr-4"
                        }}
                        className="custom-soft-table"
                    />
                </div>
                
            </div>
        </AdminLayout>
    );
}