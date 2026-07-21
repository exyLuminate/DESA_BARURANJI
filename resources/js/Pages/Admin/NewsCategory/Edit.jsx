import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button, Form, Input, notification, Card, Space } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
    });

    const onFinish = () => {
        put(route('admin.news-categories.update', category.id), {
            onSuccess: () => {
                notification.success({ 
                    message: 'Berhasil', 
                    description: 'Kategori berita berhasil diperbarui.' 
                });
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Edit Kategori Berita" />
            
            <div className="mb-4">
                <Link href={route('admin.news-categories.index')}>
                    <Button icon={<ArrowLeftOutlined />}>Kembali</Button>
                </Link>
            </div>

            <Card title={<span className="text-lg font-semibold">Edit Kategori Berita</span>} className="max-w-2xl">
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item 
                        label="Nama Kategori" 
                        validateStatus={errors.name ? 'error' : ''} 
                        help={errors.name || 'Slug akan otomatis diperbarui jika nama kategori diubah'}
                        required
                    >
                        <Input 
                            size="large"
                            value={data.name} 
                            onChange={e => setData('name', e.target.value)} 
                            disabled={processing}
                        />
                    </Form.Item>

                    {/* Menampilkan current slug sebagai informasi (Read Only) */}
                    <Form.Item label="Slug (Otomatis)">
                        <Input size="large" value={category.slug} disabled />
                    </Form.Item>

                    <Form.Item className="mb-0 mt-6">
                        <Space>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                icon={<SaveOutlined />} 
                                loading={processing}
                            >
                                Simpan Perubahan
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