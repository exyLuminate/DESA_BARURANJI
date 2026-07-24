import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Table, Button, Space, Popconfirm, Tooltip, message, Image } from 'antd';
import { 
    PlusOutlined, EditOutlined, DeleteOutlined, 
    PictureOutlined, EnvironmentOutlined 
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ facilities, success }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id, name) => {
        destroy(route('admin.facilities.destroy', id), {
            preserveScroll: true,
            onSuccess: () => message.success(`Fasilitas "${name}" berhasil dihapus.`),
        });
    };

    const columns = [
        {
            title: 'Visual',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => (
                <div className="w-24 h-16 sm:w-32 sm:h-20 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm relative group">
                    {text ? (
                        <Image 
                            src={`/storage/${text}`} 
                            alt={record.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            fallback="/placeholder-image.png"
                            preview={{ mask: <span className="text-xs">Lihat</span> }}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                            <PictureOutlined className="text-xl mb-1 opacity-50" />
                            <span className="text-[10px] uppercase font-bold tracking-wider opacity-50">Kosong</span>
                        </div>
                    )}
                </div>
            ),
            width: '15%',
        },
        {
            title: 'Nama Fasilitas',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
                <span className="font-bold text-gray-800 text-sm sm:text-base min-w-[150px] block">
                    {text}
                </span>
            ),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Titik Lokasi',
            dataIndex: 'location',
            key: 'location',
            render: (text) => (
                <div className="min-w-[120px]">
                    {text ? (
                        <span className="inline-flex items-center text-sm font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                            <EnvironmentOutlined className="mr-1.5" />
                            {text}
                        </span>
                    ) : (
                        <span className="text-gray-400 italic text-xs">Belum ditentukan</span>
                    )}
                </div>
            ),
            sorter: (a, b) => (a.location || '').localeCompare(b.location || ''),
        },
        {
            title: 'Deskripsi Singkat',
            dataIndex: 'description',
            key: 'description',
            render: (text) => (
                <div className="min-w-[180px]">
                    {text ? (
                        <Tooltip title={text} placement="topLeft" color="blue">
                            <div className="max-w-[180px] md:max-w-[250px] line-clamp-2 text-gray-500 text-sm cursor-help hover:text-blue-600 transition-colors leading-relaxed">
                                {text}
                            </div>
                        </Tooltip>
                    ) : (
                        <span className="text-gray-400 italic text-xs">Tidak ada deskripsi</span>
                    )}
                </div>
            ),
        },
        {
            title: 'Aksi',
            key: 'action',
            align: 'center',
            fixed: 'right', // Mengunci tombol aksi agar tetap terlihat saat di-scroll di HP
            render: (_, record) => (
                <Space size="small">
                    <Link href={route('admin.facilities.edit', record.id)}>
                        <Button type="text" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg" icon={<EditOutlined />}>
                            <span className="hidden sm:inline">Edit</span>
                        </Button>
                    </Link>
                    <Popconfirm
                        title={`Hapus "${record.name}"?`}
                        description="Data fasilitas akan dihapus secara permanen."
                        onConfirm={() => handleDelete(record.id, record.name)}
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
            <Head title="Manajemen Fasilitas Desa" />

            {/* Layout Master: w-full dan overflow-hidden untuk fondasi anti-bocor */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10 w-full overflow-hidden">
                
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-3xl shadow-sm border border-blue-100">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Inventaris Fasilitas Desa</h1>
                        <p className="text-gray-500 text-xs sm:text-sm">Kelola data sarana, prasarana, dan ruang publik milik desa.</p>
                    </div>
                    <Link href={route('admin.facilities.create')} className="block w-full md:w-auto">
                        <Button type="primary" size="large" icon={<PlusOutlined />} className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-200 border-0">
                            Tambah Fasilitas
                        </Button>
                    </Link>
                </div>

                {/* Notifikasi Sukses */}
                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl shadow-sm flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-3 animate-pulse shrink-0"></span>
                        <p className="font-medium text-sm">{success}</p>
                    </div>
                )}

                {/* Table Section (Gallery Style & Strict Responsive) */}
                <div className="grid grid-cols-1 w-full">
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full overflow-hidden">
                        <Table 
                            columns={columns} 
                            dataSource={facilities.map(fac => ({ ...fac, key: fac.id }))} 
                            pagination={{ 
                                pageSize: 10,
                                showSizeChanger: false,
                                className: "mt-4 mb-4 mr-4"
                            }}
                            scroll={{ x: 'max-content' }} // Kunci tabel responsif horizontal
                            className="custom-soft-table w-full"
                        />
                    </div>
                </div>
                
            </div>
        </AdminLayout>
    );
}