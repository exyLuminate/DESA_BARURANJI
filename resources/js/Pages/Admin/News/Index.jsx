import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Table, Button, Space, Popconfirm, notification, Card, Tag, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, FolderOpenOutlined, EyeOutlined } from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ news }) {
    const handleDelete = (id) => {
        router.delete(route('admin.news.destroy', id), {
            preserveScroll: true,
            onSuccess: () => notification.success({ message: 'Berita berhasil dihapus.' }),
        });
    };

    const columns = [
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            width: 100,
            render: (text) => text ? (
                <img src={`/storage/${text}`} alt="thumb" className="w-16 h-12 object-cover rounded" />
            ) : '-'
        },
        {
            title: 'Judul',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Kategori',
            dataIndex: 'category',
            key: 'category',
            render: (category) => category?.name || '-'
        },
        {
            title: 'Status',
            dataIndex: 'is_published',
            key: 'is_published',
            render: (is_published) => (
                <Tag color={is_published ? 'green' : 'orange'}>
                    {is_published ? 'Published' : 'Draft'}
                </Tag>
            )
        },
        {
            title: 'Aksi',
            key: 'action',
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Lihat Preview (Tab Baru)">
                        <a href={route('news.show', record.slug)} target="_blank" rel="noreferrer">
                            <Button icon={<EyeOutlined />} size="small" />
                        </a>
                    </Tooltip>
                    <Link href={route('admin.news.edit', record.id)}>
                        <Button type="primary" icon={<EditOutlined />} size="small">Edit</Button>
                    </Link>
                    <Popconfirm 
                        title="Hapus Berita?" 
                        onConfirm={() => handleDelete(record.id)}
                        okButtonProps={{ danger: true }}
                    >
                        <Button danger icon={<DeleteOutlined />} size="small">Hapus</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <AdminLayout>
            <Head title="Manajemen Berita" />
            <Card 
                title={<span className="text-lg font-semibold">Daftar Berita</span>}
                extra={
                    <Space>
                        {/* Tombol ke halaman kategori */}
                        <Link href={route('admin.news-categories.index')}>
                            <Button icon={<FolderOpenOutlined />}>Kelola Kategori</Button>
                        </Link>
                        <Link href={route('admin.news.create')}>
                            <Button type="primary" icon={<PlusOutlined />}>Tambah Berita</Button>
                        </Link>
                    </Space>
                }
            >
                <Table 
                    columns={columns} 
                    dataSource={news.data} 
                    rowKey="id"
                    pagination={{
                        total: news.total,
                        current: news.current_page,
                        pageSize: news.per_page,
                        onChange: (page) => router.get(route('admin.news.index', { page }), {}, { preserveState: true })
                    }}
                />
            </Card>
        </AdminLayout>
    );
}