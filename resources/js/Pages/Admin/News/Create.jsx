import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button, Form, Input, Select, Switch, notification, Card, Upload, Divider } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';
import TiptapEditor from '@/Components/TiptapEditor';

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category_id: null,
        thumbnail: null,
        content: '',
        is_published: false,
    });

    const onFinish = () => {
        post(route('admin.news.store'), {
            onSuccess: () => notification.success({ message: 'Berita berhasil ditambahkan' }),
        });
    };

    return (
        <AdminLayout>
            <Head title="Tambah Berita" />
            
            <div className="flex justify-between items-center mb-4">
                <Link href={route('admin.news.index')}>
                    <Button icon={<ArrowLeftOutlined />}>Kembali</Button>
                </Link>
                <Button type="primary" onClick={() => document.getElementById('submitBtn').click()} icon={<SaveOutlined />} loading={processing}>
                    Simpan Berita
                </Button>
            </div>

            <Form layout="vertical" onFinish={onFinish}>
                {/* Area Fokus Menulis */}
                <Card className="mb-6 shadow-sm border-0">
                    <Form.Item validateStatus={errors.title ? 'error' : ''} help={errors.title} required>
                        <Input 
                            size="large" 
                            value={data.title} 
                            onChange={e => setData('title', e.target.value)} 
                            placeholder="Masukkan Judul Berita..."
                            className="text-2xl font-bold border-0 border-b-2 shadow-none focus:ring-0 rounded-none px-0 mb-4"
                        />
                    </Form.Item>

                    <Form.Item validateStatus={errors.content ? 'error' : ''} help={errors.content} required>
                        <TiptapEditor 
                            value={data.content} 
                            onChange={(html) => setData('content', html)} 
                        />
                    </Form.Item>
                </Card>

                {/* Area Pengaturan (Meta) */}
                <Card title="Pengaturan Publikasi" className="shadow-sm border-0 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Form.Item label="Kategori" validateStatus={errors.category_id ? 'error' : ''} help={errors.category_id} required>
                            <Select
                                size="large"
                                placeholder="Pilih Kategori"
                                options={categories.map(c => ({ label: c.name, value: c.id }))}
                                value={data.category_id}
                                onChange={val => setData('category_id', val)}
                            />
                        </Form.Item>

                        <Form.Item label="Thumbnail Utama" validateStatus={errors.thumbnail ? 'error' : ''} help={errors.thumbnail}>
                            <Upload 
                                beforeUpload={(file) => { setData('thumbnail', file); return false; }} 
                                maxCount={1}
                                listType="picture"
                            >
                                <Button icon={<UploadOutlined />}>Pilih Gambar</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item label="Status Publikasi">
                            <div className="pt-2">
                                <Switch 
                                    checked={data.is_published}
                                    onChange={(checked) => setData('is_published', checked)}
                                    checkedChildren="Publish" 
                                    unCheckedChildren="Draft"
                                />
                                <span className="ml-3 text-gray-500">
                                    {data.is_published ? 'Akan tampil di website publik' : 'Hanya disimpan sebagai draft'}
                                </span>
                            </div>
                        </Form.Item>
                    </div>

                    <Divider />
                    <Button id="submitBtn" type="primary" htmlType="submit" icon={<SaveOutlined />} loading={processing} block size="large">
                        Simpan Berita
                    </Button>
                </Card>
            </Form>
        </AdminLayout>
    );
}