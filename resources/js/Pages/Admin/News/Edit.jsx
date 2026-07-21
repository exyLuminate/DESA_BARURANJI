import React from 'react';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { Button, Form, Input, Select, Switch, notification, Card, Upload } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';
import TiptapEditor from '@/Components/TiptapEditor';

export default function Edit({ news, categories }) {
    // Karena ada file upload (thumbnail), edit form pada method PUT di Laravel sering bermasalah jika pakai FormData.
    // Inertia merekomendasikan pakai POST dengan _method: 'PUT'.
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: news.title,
        category_id: news.category_id,
        thumbnail: null,
        content: news.content,
        is_published: news.is_published,
    });

    const onFinish = () => {
        post(route('admin.news.update', news.id), {
            onSuccess: () => notification.success({ message: 'Berita berhasil diperbarui' }),
        });
    };

    return (
        <AdminLayout>
            <Head title="Edit Berita" />
            
            <div className="mb-4">
                <Link href={route('admin.news.index')}>
                    <Button icon={<ArrowLeftOutlined />}>Kembali</Button>
                </Link>
            </div>

            <Card title={<span className="text-lg font-semibold">Edit Berita</span>}>
                <Form layout="vertical" onFinish={onFinish}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
                            <Form.Item label="Judul Berita" validateStatus={errors.title ? 'error' : ''} help={errors.title} required>
                                <Input size="large" value={data.title} onChange={e => setData('title', e.target.value)} />
                            </Form.Item>

                            <Form.Item label="Konten Berita" validateStatus={errors.content ? 'error' : ''} help={errors.content} required>
                                <TiptapEditor value={data.content} onChange={(html) => setData('content', html)} />
                            </Form.Item>
                        </div>

                        <div className="space-y-4">
                            <Form.Item label="Kategori" validateStatus={errors.category_id ? 'error' : ''} help={errors.category_id} required>
                                <Select
                                    size="large"
                                    options={categories.map(c => ({ label: c.name, value: c.id }))}
                                    value={data.category_id}
                                    onChange={val => setData('category_id', val)}
                                />
                            </Form.Item>

                            <Form.Item label="Ganti Thumbnail" validateStatus={errors.thumbnail ? 'error' : ''} help={errors.thumbnail || 'Biarkan kosong jika tidak ingin mengubah thumbnail'}>
                                {news.thumbnail && (
                                    <div className="mb-2">
                                        <img src={`/storage/${news.thumbnail}`} alt="Current" className="w-full h-32 object-cover rounded" />
                                    </div>
                                )}
                                <Upload beforeUpload={(file) => { setData('thumbnail', file); return false; }} maxCount={1} listType="picture">
                                    <Button icon={<UploadOutlined />}>Pilih Gambar Baru</Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item label="Status Publikasi">
                                <Switch 
                                    checked={data.is_published}
                                    onChange={(checked) => setData('is_published', checked)}
                                    checkedChildren="Publish" 
                                    unCheckedChildren="Draft"
                                />
                            </Form.Item>

                            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={processing} block size="large">
                                Simpan Perubahan
                            </Button>
                        </div>
                    </div>
                </Form>
            </Card>
        </AdminLayout>
    );
}