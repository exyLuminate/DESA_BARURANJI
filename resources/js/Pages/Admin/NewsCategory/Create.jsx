import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button, Form, Input, notification, Card, Space } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const onFinish = () => {
        post(route('admin.news-categories.store'), {
            onSuccess: () => {
                notification.success({ 
                    message: 'Berhasil', 
                    description: 'Kategori berita berhasil ditambahkan.' 
                });
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Tambah Kategori Berita" />
            
            <div className="mb-4">
                <Link href={route('admin.news-categories.index')}>
                    <Button icon={<ArrowLeftOutlined />}>Kembali</Button>
                </Link>
            </div>

            <Card title={<span className="text-lg font-semibold">Tambah Kategori Baru</span>} className="max-w-2xl">
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item 
                        label="Nama Kategori" 
                        validateStatus={errors.name ? 'error' : ''} 
                        help={errors.name || 'Contoh: Pembangunan, Pengumuman, Pemerintahan'}
                        required
                    >
                        <Input 
                            size="large"
                            value={data.name} 
                            onChange={e => setData('name', e.target.value)} 
                            placeholder="Masukkan nama kategori berita..."
                            disabled={processing}
                        />
                    </Form.Item>

                    <Form.Item className="mb-0 mt-6">
                        <Space>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                icon={<SaveOutlined />} 
                                loading={processing}
                            >
                                Simpan Kategori
                            </Button>
                            <Link href={route('admin.news-categories.index')}>
                                <Button disabled={processing}>Batal</Button>
                            </Link>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </AdminLayout>
    );
}