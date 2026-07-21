import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Table, Button, Space, Popconfirm, notification, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ categories }) {
    const handleDelete = (id) => {
        router.delete(route('admin.news-categories.destroy', id), {
            preserveScroll: true,
            onSuccess: () => notification.success({ 
                message: 'Berhasil', 
                description: 'Kategori berita berhasil dihapus.' 
            }),
        });
    };

    const columns = [
        {
            title: 'No',
            key: 'index',
            width: 70,
            render: (text, record, index) => {
                // Menghitung nomor urut berdasarkan paginasi
                return (categories.current_page - 1) * categories.per_page + index + 1;
            },
        },
        {
            title: 'Nama Kategori',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: 'Aksi',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Link href={route('admin.news-categories.edit', record.id)}>
                        <Button type="primary" icon={<EditOutlined />} size="small">
                            Edit
                        </Button>
                    </Link>
                    <Popconfirm 
                        title="Hapus Kategori?" 
                        description="Yakin ingin menghapus kategori berita ini?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Ya, Hapus"
                        cancelText="Batal"
                        okButtonProps={{ danger: true }}
                    >
                        <Button danger icon={<DeleteOutlined />} size="small">
                            Hapus
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <AdminLayout>
            <Head title="Manajemen Kategori Berita" />
            
            <Card 
                title={<span className="text-lg font-semibold">Daftar Kategori Berita</span>}
                extra={
                    <Link href={route('admin.news-categories.create')}>
                        <Button type="primary" icon={<PlusOutlined />}>
                            Tambah Kategori
                        </Button>
                    </Link>
                }
            >
                <Table 
                    columns={columns} 
                    dataSource={categories.data} 
                    rowKey="id"
                    pagination={{
                        total: categories.total,
                        current: categories.current_page,
                        pageSize: categories.per_page,
                        showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} item`,
                        onChange: (page) => {
                            router.get(route('admin.news-categories.index', { page }), {}, { preserveState: true });
                        }
                    }}
                />
            </Card>
        </AdminLayout>
    );
}