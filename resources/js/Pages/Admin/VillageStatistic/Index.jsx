import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Table, Button, Tag, Space, Popconfirm, Progress, message, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout'; // Sesuaikan path layout Anda

export default function Index({ statistics, success }) {
    const { delete: destroy } = useForm();

    // Menentukan tahun terbaru untuk diberi label "Tahun Aktif"
    const latestYear = statistics.length > 0 
        ? Math.max(...statistics.map(s => parseInt(s.statistic_year))) 
        : null;

    const handleDelete = (id, year) => {
        destroy(route('admin.village-statistics.destroy', id), {
            preserveScroll: true,
            onSuccess: () => message.success(`Statistik tahun ${year} berhasil dihapus permanen.`),
        });
    };

    // Definisi Kolom Tabel Ant Design
    const columns = [
        {
            title: 'Tahun Data',
            dataIndex: 'statistic_year',
            key: 'statistic_year',
            render: (text) => (
                <div className="flex flex-col items-start gap-1">
                    <span className="text-lg font-bold text-gray-800">{text}</span>
                    {parseInt(text) === latestYear && (
                        <Tag color="blue" className="m-0 border-0 font-medium">Tahun Aktif</Tag>
                    )}
                </div>
            ),
            width: '15%',
            sorter: (a, b) => a.statistic_year - b.statistic_year,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Demografi Penduduk',
            key: 'population',
            render: (_, record) => {
                const totalGender = record.total_male + record.total_female;
                const malePercent = totalGender ? Math.round((record.total_male / totalGender) * 100) : 0;
                
                return (
                    <div className="min-w-[200px]">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-gray-800">{record.total_population} Jiwa</span>
                        </div>
                        {/* Mini Chart Progress Bar */}
                        <Tooltip title={`Laki-laki: ${record.total_male} | Perempuan: ${record.total_female}`}>
                            <div className="flex items-center gap-2 text-xs">
                                <span className="text-blue-500 font-medium w-8">{malePercent}%</span>
                                <Progress 
                                    percent={malePercent} 
                                    showInfo={false} 
                                    strokeColor="#3b82f6" 
                                    trailColor="#ec4899" 
                                    className="m-0 flex-1"
                                />
                                <span className="text-pink-500 font-medium w-8 text-right">{100 - malePercent}%</span>
                            </div>
                        </Tooltip>
                    </div>
                );
            },
            width: '35%',
        },
        {
            title: 'Keluarga',
            dataIndex: 'total_family_cards',
            key: 'total_family_cards',
            render: (text) => <span className="font-medium text-gray-700">{text} KK</span>,
            width: '15%',
        },
        {
            title: 'Wilayah',
            key: 'territory',
            render: (_, record) => (
                <div>
                    <div className="font-medium text-gray-700">{record.total_hamlets} Dusun</div>
                    <div className="text-xs text-gray-500">{record.total_rt} RT</div>
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
                    <Link href={route('admin.village-statistics.edit', record.id)}>
                        <Button type="text" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg" icon={<EditOutlined />}>
                            Edit
                        </Button>
                    </Link>
                    <Popconfirm
                        title={`Hapus Statistik ${record.statistic_year}?`}
                        description="Tindakan ini menghapus data secara permanen."
                        onConfirm={() => handleDelete(record.id, record.statistic_year)}
                        okText="Hapus Permanen"
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
            <Head title="Manajemen Statistik Desa" />

            <div className="max-w-7xl mx-auto pb-10">
                
                {/* Header Soft UI */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Manajemen Statistik Desa</h1>
                        <p className="text-gray-500 text-sm">Kelola data tahunan penduduk, kesejahteraan, dan kewilayahan desa.</p>
                    </div>
                    <Link href={route('admin.village-statistics.create')}>
                        <Button type="primary" size="large" icon={<PlusOutlined />} className="bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-200">
                            Tambah Data Baru
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
                        dataSource={statistics.map(stat => ({ ...stat, key: stat.id }))} 
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

