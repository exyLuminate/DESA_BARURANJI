import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Table, Button, Tag, Space, Popconfirm, Progress, message, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, BarChartOutlined } from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';

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

    // --- KOLOM TABEL UNTUK DESKTOP ---
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
                        description="Data akan dihapus permanen."
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

            {/* Tambahan padding responsif */}
            <div className="max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-0">
                
                {/* Header Soft UI */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Manajemen Statistik Desa</h1>
                        <p className="text-gray-500 text-xs sm:text-sm">Kelola data tahunan penduduk, kesejahteraan, dan kewilayahan desa.</p>
                    </div>
                    <Link href={route('admin.village-statistics.create')} className="block w-full md:w-auto">
                        <Button 
                            type="primary" 
                            size="large" 
                            icon={<PlusOutlined />} 
                            className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-200"
                        >
                            Tambah Data Baru
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
                    {statistics.length === 0 ? (
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center text-gray-500">
                            Belum ada data statistik.
                        </div>
                    ) : (
                        statistics
                            .sort((a, b) => b.statistic_year - a.statistic_year)
                            .map((stat) => {
                                const totalGender = stat.total_male + stat.total_female;
                                const malePercent = totalGender ? Math.round((stat.total_male / totalGender) * 100) : 0;

                                return (
                                    <div key={stat.id} className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 relative">
                                        
                                        {/* Badge Tahun Aktif */}
                                        {parseInt(stat.statistic_year) === latestYear && (
                                            <div className="absolute top-4 right-4">
                                                <Tag color="blue" className="m-0 border-0 rounded-full text-[10px] uppercase font-bold tracking-wider">
                                                    Tahun Aktif
                                                </Tag>
                                            </div>
                                        )}

                                        {/* Judul Kartu */}
                                        <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                                <BarChartOutlined className="text-xl" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500">Statistik Tahun</div>
                                                <h3 className="font-bold text-gray-800 text-lg leading-tight">
                                                    {stat.statistic_year}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Info Utama */}
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                                <div className="text-xs text-gray-500 mb-1">Penduduk</div>
                                                <div className="font-bold text-gray-800">{stat.total_population} Jiwa</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                                <div className="text-xs text-gray-500 mb-1">Keluarga</div>
                                                <div className="font-bold text-gray-800">{stat.total_family_cards} KK</div>
                                            </div>
                                            <div className="col-span-2 bg-gray-50 rounded-xl p-3 border border-gray-100 flex justify-between items-center">
                                                <div className="text-xs text-gray-500">Wilayah</div>
                                                <div className="font-semibold text-gray-700 text-sm">
                                                    {stat.total_hamlets} Dusun, {stat.total_rt} RT
                                                </div>
                                            </div>
                                        </div>

                                        {/* Demografi Bar */}
                                        <div className="mb-5">
                                            <div className="text-xs text-gray-500 mb-2">Demografi Gender</div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="text-blue-500 font-semibold w-8">{malePercent}%</span>
                                                <Progress 
                                                    percent={malePercent} 
                                                    showInfo={false} 
                                                    strokeColor="#3b82f6" 
                                                    trailColor="#ec4899" 
                                                    className="m-0 flex-1"
                                                />
                                                <span className="text-pink-500 font-semibold w-8 text-right">{100 - malePercent}%</span>
                                            </div>
                                            <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
                                                <span>{stat.total_male} Laki-laki</span>
                                                <span>{stat.total_female} Perempuan</span>
                                            </div>
                                        </div>

                                        {/* Tombol Aksi */}
                                        <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                                            <Link href={route('admin.village-statistics.edit', stat.id)}>
                                                <Button type="primary" ghost size="small" className="rounded-lg px-4" icon={<EditOutlined />}>
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Popconfirm
                                                title="Hapus Permanen?"
                                                onConfirm={() => handleDelete(stat.id, stat.statistic_year)}
                                                okText="Hapus"
                                                cancelText="Batal"
                                                okButtonProps={{ danger: true }}
                                            >
                                                <Button danger size="small" className="rounded-lg px-3" icon={<DeleteOutlined />} />
                                            </Popconfirm>
                                        </div>
                                    </div>
                                );
                            })
                    )}
                </div>

                {/* ============================================== */}
                {/* 2. TAMPILAN DESKTOP (TABEL) - hidden di mobile */}
                {/* ============================================== */}
                <div className="hidden md:block bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden p-3">
                    <Table 
                        columns={columns} 
                        dataSource={statistics.map(stat => ({ ...stat, key: stat.id }))} 
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