import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Table, Button, Tag, Space, Popconfirm, Tooltip, message } from 'antd';
import { 
    PlusOutlined, EditOutlined, DeleteOutlined, 
    EnvironmentOutlined 
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ hamlets, success }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id, name) => {
        destroy(route('admin.hamlets.destroy', id), {
            preserveScroll: true,
            onSuccess: () => message.success(`Data ${name} berhasil dihapus permanen.`),
        });
    };

    const columns = [
        {
            title: 'Nama Dusun',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
                <div className="font-bold text-gray-800 text-sm flex items-center gap-2 min-w-[150px]">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                        <EnvironmentOutlined />
                    </div>
                    {text}
                </div>
            ),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Kepala Dusun',
            dataIndex: 'head_name',
            key: 'head_name',
            render: (text) => (
                <div className="min-w-[120px]">
                    {text ? (
                        <span className="text-gray-700 font-medium">{text}</span>
                    ) : (
                        <span className="text-gray-400 italic text-xs bg-gray-50 px-2 py-1 rounded-md border border-gray-100">Belum didata</span>
                    )}
                </div>
            ),
        },
        {
            title: 'Kewilayahan',
            dataIndex: 'total_rt',
            key: 'total_rt',
            align: 'center',
            render: (total) => (
                <Tag color="cyan" className="m-0 rounded-full px-3 py-1 text-sm font-bold border-0 shadow-sm whitespace-nowrap">
                    {total} RT
                </Tag>
            ),
            sorter: (a, b) => a.total_rt - b.total_rt,
        },
        {
            title: 'Deskripsi Singkat',
            dataIndex: 'description',
            key: 'description',
            render: (text) => (
                <div className="min-w-[150px]">
                    {text ? (
                        // Fix 1: Menghapus overlayInnerStyle untuk mengatasi Warning Ant Design v5
                        <Tooltip title={text} placement="topLeft" color="blue">
                            <div className="max-w-[150px] md:max-w-[200px] truncate text-gray-500 text-sm cursor-help hover:text-blue-600 transition-colors">
                                {text}
                            </div>
                        </Tooltip>
                    ) : (
                        <span className="text-gray-400">-</span>
                    )}
                </div>
            ),
        },
        {
            title: 'Aksi',
            key: 'action',
            align: 'center',
            fixed: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Link href={route('admin.hamlets.edit', record.id)}>
                        <Button type="text" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg" icon={<EditOutlined />}>
                            <span className="hidden sm:inline">Edit</span>
                        </Button>
                    </Link>
                    <Popconfirm
                        title={`Hapus ${record.name}?`}
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
            <Head title="Manajemen Dusun" />

            {/* Fix 2: Menambahkan w-full dan pembatasan lebar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10 w-full">
                
                {/* Header Soft UI */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Pemetaan Dusun</h1>
                        <p className="text-gray-500 text-xs sm:text-sm">Kelola daftar dusun, kepala kewilayahan, dan jumlah Rukun Tetangga (RT).</p>
                    </div>
                    <Link href={route('admin.hamlets.create')} className="block w-full md:w-auto">
                        <Button type="primary" size="large" icon={<PlusOutlined />} className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-200">
                            Tambah Dusun Baru
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

                {/* Fix 3: Trick Grid Cols 1 untuk mencegah container stretching di mobile */}
                <div className="grid grid-cols-1 w-full">
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full overflow-hidden">
                        <Table 
                            columns={columns} 
                            dataSource={hamlets.map(hamlet => ({ ...hamlet, key: hamlet.id }))} 
                            pagination={{ 
                                pageSize: 10,
                                showSizeChanger: false,
                                className: "mt-4 mb-4 mr-4"
                            }}
                            scroll={{ x: 800 }} // Menjamin scroll aktif jika lebar tabel melebihi 800px
                            className="custom-soft-table"
                        />
                    </div>
                </div>
                
            </div>
        </AdminLayout>
    );
}