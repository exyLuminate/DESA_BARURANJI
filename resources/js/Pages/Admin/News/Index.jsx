import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Table, Button, Space, Popconfirm, notification, Tag, Tooltip, Image } from 'antd';
import { 
    PlusOutlined, EditOutlined, DeleteOutlined, 
    FolderOpenOutlined, EyeOutlined, PictureOutlined,
    CheckCircleOutlined, ClockCircleOutlined
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ news }) {
    const handleDelete = (id, title) => {
        router.delete(route('admin.news.destroy', id), {
            preserveScroll: true,
            onSuccess: () => notification.success({ 
                message: 'Terhapus', 
                description: `Artikel "${title}" berhasil dihapus.`,
                placement: 'bottomRight'
            }),
        });
    };

    const columns = [
        {
            title: 'No',
            key: 'index',
            width: 60,
            align: 'center',
            render: (text, record, index) => (
                <span className="font-mono text-gray-500">
                    {(news.current_page - 1) * news.per_page + index + 1}
                </span>
            ),
        },
        {
            title: 'Cover',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            width: '12%',
            render: (text, record) => (
                <div className="w-20 h-14 sm:w-28 sm:h-16 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm relative group">
                    {text ? (
                        <Image 
                            src={`/storage/${text}`} 
                            alt={record.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            fallback="/placeholder-image.png"
                            preview={{ mask: <span className="text-[10px]">Lihat</span> }}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                            <PictureOutlined className="text-lg mb-1 opacity-50" />
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: 'Judul Artikel',
            dataIndex: 'title',
            key: 'title',
            render: (text) => (
                <div className="min-w-[200px] md:min-w-[250px]">
                    <span className="font-bold text-gray-800 text-sm sm:text-base leading-snug line-clamp-2 hover:text-blue-600 transition-colors cursor-default">
                        {text}
                    </span>
                </div>
            ),
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Kategori',
            dataIndex: 'category',
            key: 'category',
            render: (category) => (
                <div className="min-w-[120px]">
                    {category ? (
                        <Tag 
                            icon={<FolderOpenOutlined />} 
                            color="blue" 
                            className="rounded-md px-2 border-blue-200 text-blue-600 bg-blue-50 m-0"
                        >
                            {category.name}
                        </Tag>
                    ) : (
                        <span className="text-gray-400 italic text-xs">Tanpa Kategori</span>
                    )}
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'is_published',
            key: 'is_published',
            align: 'center',
            render: (is_published) => (
                <div className="min-w-[100px]">
                    {is_published ? (
                        <Tag icon={<CheckCircleOutlined />} color="success" className="m-0 rounded-full border-0 bg-green-50 text-green-600 font-bold px-3">
                            Published
                        </Tag>
                    ) : (
                        <Tag icon={<ClockCircleOutlined />} color="warning" className="m-0 rounded-full border-0 bg-orange-50 text-orange-600 font-bold px-3">
                            Draft
                        </Tag>
                    )}
                </div>
            ),
            sorter: (a, b) => (a.is_published === b.is_published) ? 0 : a.is_published ? -1 : 1,
        },
        {
            title: 'Aksi',
            key: 'action',
            align: 'center',
            fixed: 'right', // Pengunci anti-bocor di HP
            width: 150,
            render: (_, record) => (
                <Space size="small" className="flex-nowrap">
                    <Tooltip title="Preview di Tab Baru" color="blue">
                        <a href={route('news.show', record.slug)} target="_blank" rel="noreferrer">
                            <Button type="text" className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" icon={<EyeOutlined />} />
                        </a>
                    </Tooltip>
                    <Link href={route('admin.news.edit', record.id)}>
                        <Button type="text" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg" icon={<EditOutlined />} />
                    </Link>
                    <Popconfirm 
                        title="Hapus Artikel?" 
                        description={`"${record.title}" akan dihapus permanen.`}
                        onConfirm={() => handleDelete(record.id, record.title)}
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
            <Head title="Manajemen Berita" />

            {/* Fondasi Anti-Bocor (w-full overflow-hidden) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10 w-full overflow-hidden">
                
                {/* Header Soft UI (Blue Theme) */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Daftar Berita & Artikel</h1>
                        <p className="text-gray-500 text-xs sm:text-sm">Kelola publikasi informasi, kegiatan, dan pengumuman desa.</p>
                    </div>
                    
                    {/* Grup Tombol Aksi di Header */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        <Link href={route('admin.news-categories.index')} className="block w-full sm:w-auto">
                            <Button size="large" icon={<FolderOpenOutlined />} className="w-full bg-white text-gray-700 hover:text-blue-600 border border-gray-200 rounded-xl shadow-sm">
                                Kelola Kategori
                            </Button>
                        </Link>
                        <Link href={route('admin.news.create')} className="block w-full sm:w-auto">
                            <Button type="primary" size="large" icon={<PlusOutlined />} className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-200 border-0">
                                Tulis Berita Baru
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Table Section (Responsive & Paginated) */}
                <div className="grid grid-cols-1 w-full">
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full overflow-hidden">
                        <Table 
                            columns={columns} 
                            dataSource={news.data} 
                            rowKey="id"
                            scroll={{ x: 'max-content' }} // Anti-bocor horizontal di HP
                            className="custom-soft-table w-full"
                            pagination={{
                                total: news.total,
                                current: news.current_page,
                                pageSize: news.per_page,
                                showTotal: (total, range) => (
                                    <span className="text-gray-500 font-medium">
                                        Menampilkan {range[0]}-{range[1]} dari {total} berita
                                    </span>
                                ),
                                className: "mt-4 mb-4 mr-6",
                                onChange: (page) => {
                                    router.get(route('admin.news.index', { page }), {}, { preserveState: true });
                                }
                            }}
                        />
                    </div>
                </div>
                
            </div>
        </AdminLayout>
    );
}