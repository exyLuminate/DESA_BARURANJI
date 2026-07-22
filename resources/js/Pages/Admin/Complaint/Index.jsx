import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, Table, Button, Tag, Space, Popconfirm, message } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export default function Index({ complaints }) {
    const handleDelete = (id) => {
        router.delete(route('admin.complaints.destroy', id), {
            onSuccess: () => message.success('Laporan berhasil dihapus'),
        });
    };

    const getStatusTag = (status) => {
        const statusMap = {
            pending: { color: 'orange', text: 'Menunggu' },
            diproses: { color: 'blue', text: 'Diproses' },
            selesai: { color: 'green', text: 'Selesai' },
            ditolak: { color: 'red', text: 'Ditolak' },
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return <Tag color={config.color}>{config.text.toUpperCase()}</Tag>;
    };

    const columns = [
        {
            title: 'Tanggal',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => dayjs(text).format('DD MMMM YYYY, HH:mm'),
        },
        {
            title: 'Pengirim',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Kategori',
            dataIndex: 'type',
            key: 'type',
            render: (text) => <span className="capitalize">{text}</span>,
        },
        {
            title: 'Judul Laporan',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => getStatusTag(status),
        },
        {
            title: 'Aksi',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link href={route('admin.complaints.show', record.id)}>
                        <Button type="primary" icon={<EyeOutlined />} size="small">
                            Detail
                        </Button>
                    </Link>
                    <Popconfirm
                        title="Hapus Laporan"
                        description="Apakah Anda yakin ingin menghapus laporan ini?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Ya, Hapus"
                        cancelText="Batal"
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
            <Head title="Manajemen Laporan Warga" />
            <Card title="Daftar Laporan & Aspirasi Warga">
                <Table 
                    columns={columns} 
                    dataSource={complaints} 
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </AdminLayout>
    );
}