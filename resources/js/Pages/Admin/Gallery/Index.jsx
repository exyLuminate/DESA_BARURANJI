import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Table, Button, Space, Popconfirm, notification, Card, Image, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, TagsOutlined } from '@ant-design/icons';

export default function Index({ galleries, flash }) {
    const { delete: destroy } = useForm();

    useEffect(() => {
        if (flash?.success) notification.success({ message: 'Berhasil', description: flash.success });
        if (flash?.error) notification.error({ message: 'Gagal', description: flash.error });
    }, [flash]);

    const handleDelete = (id) => {
        destroy(route('admin.galleries.destroy', id));
    };

    const columns = [
        {
            title: 'No',
            key: 'index',
            width: 70,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Gambar',
            key: 'image',
            width: 120,
            render: (_, record) => (
                <Image
                    width={80}
                    height={60}
                    className="object-cover rounded-md border border-gray-200"
                    src={`/storage/${record.image}`}
                    fallback="/images/placeholder.png"
                />
            ),
        },
        {
            title: 'Judul Foto',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Kategori',
            key: 'category',
            render: (_, record) => (
                <Tag color="blue">{record.category?.name || 'Tanpa Kategori'}</Tag>
            ),
        },
        {
            title: 'Aksi',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Space size="small">
                    <Link href={route('admin.galleries.edit', record.id)}>
                        <Button type="primary" icon={<EditOutlined />} size="small" />
                    </Link>
                    <Popconfirm 
                        title="Hapus Foto?" 
                        description="Foto ini akan dihapus permanen."
                        onConfirm={() => handleDelete(record.id)}
                        okButtonProps={{ danger: true }}
                    >
                        <Button danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <AdminLayout>
            <Head title="Manajemen Galeri" />
            
            <Card 
             title="Daftar Foto Galeri" 
             extra={
                 <Space>
                     <Link href={route('admin.gallery-categories.index')}>
                         <Button icon={<TagsOutlined />}>
                             Kelola Kategori
                         </Button>
                     </Link>
                     <Link href={route('admin.galleries.create')}>
                         <Button type="primary" icon={<PlusOutlined />}>
                             Tambah Foto
                         </Button>
                     </Link>
                 </Space>
             }
         >
             <Table 
                 columns={columns} 
                 dataSource={galleries} 
                 rowKey="id"
                 pagination={{ pageSize: 10 }}
             />
         </Card>
        </AdminLayout>
    );
}