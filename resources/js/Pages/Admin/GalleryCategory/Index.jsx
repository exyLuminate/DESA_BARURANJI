import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Table, Button, Space, Popconfirm, notification, Card, Modal, Form, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default function Index({ categories, flash }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formAntd] = Form.useForm();

    const { data, setData, post, put, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        name: '',
    });

    // Menangani notifikasi dari flash message Laravel
    useEffect(() => {
        if (flash?.success) notification.success({ message: 'Berhasil', description: flash.success });
        if (flash?.error) notification.error({ message: 'Gagal', description: flash.error });
    }, [flash]);

    // Sinkronisasi error Laravel ke form Ant Design
    useEffect(() => {
        if (errors.name) {
            formAntd.setFields([{ name: 'name', errors: [errors.name] }]);
        }
    }, [errors, formAntd]);

    const showModal = (record = null) => {
        clearErrors();
        if (record) {
            setEditingId(record.id);
            setData('name', record.name);
            formAntd.setFieldsValue({ name: record.name });
        } else {
            setEditingId(null);
            reset();
            formAntd.resetFields();
        }
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        reset();
        clearErrors();
    };

    const onFinish = () => {
        if (editingId) {
            put(route('admin.gallery-categories.update', editingId), {
                onSuccess: () => setIsModalVisible(false),
            });
        } else {
            post(route('admin.gallery-categories.store'), {
                onSuccess: () => setIsModalVisible(false),
            });
        }
    };

    const handleDelete = (id) => {
        destroy(route('admin.gallery-categories.destroy', id));
    };

    const columns = [
        {
            title: 'No',
            key: 'index',
            width: 70,
            render: (text, record, index) => index + 1,
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
                <Space size="small">
                    <Button 
                        type="primary" 
                        icon={<EditOutlined />} 
                        size="small" 
                        onClick={() => showModal(record)}
                    />
                    <Popconfirm 
                        title="Hapus Kategori?" 
                        description="Tindakan ini tidak dapat dibatalkan."
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
            <Head title="Kategori Galeri" />
            
            <Card 
                title="Manajemen Kategori Galeri" 
                extra={
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
                        Tambah Kategori
                    </Button>
                }
            >
                <Table 
                    columns={columns} 
                    dataSource={categories} 
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>

            <Modal
                title={editingId ? "Edit Kategori Galeri" : "Tambah Kategori Galeri"}
                open={isModalVisible}
                onOk={() => formAntd.submit()}
                onCancel={handleCancel}
                confirmLoading={processing}
            >
                <Form
                    form={formAntd}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ name: data.name }}
                >
                    <Form.Item
                        label="Nama Kategori"
                        name="name"
                        rules={[{ required: true, message: 'Nama kategori wajib diisi!' }]}
                    >
                        <Input 
                            placeholder="Contoh: Kegiatan Desa" 
                            value={data.name} 
                            onChange={(e) => setData('name', e.target.value)} 
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </AdminLayout>
    );
}