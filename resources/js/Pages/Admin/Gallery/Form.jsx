import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, Form as AntForm, Input, Button, Upload, Select, message } from 'antd';
import { UploadOutlined, ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';

export default function GalleryForm({ gallery = null, categories }) {
    const isEditing = !!gallery;
    const [fileList, setFileList] = useState([]);

    const { data, setData, post, processing, errors } = useForm({
        title: gallery?.title || '',
        category_id: gallery?.category_id || null, // Diubah menjadi category_id
        image: null,
        _method: isEditing ? 'PUT' : 'POST', // Spoofing method for Laravel file upload in PUT request
    });

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList.length > 0) {
            setData('image', newFileList[0].originFileObj);
        } else {
            setData('image', null);
        }
    };

    const handleSubmit = () => {
        if (!isEditing && !data.image) {
            message.error('Silakan unggah gambar terlebih dahulu!');
            return;
        }

        const url = isEditing 
            ? route('admin.galleries.update', gallery.id) 
            : route('admin.galleries.store');
        
        post(url);
    };

    return (
        <AdminLayout>
            <Head title={isEditing ? 'Edit Foto' : 'Tambah Foto'} />
            
            <div className="mb-4">
                <Link href={route('admin.galleries.index')}>
                    <Button icon={<ArrowLeftOutlined />}>Kembali</Button>
                </Link>
            </div>

            <Card title={isEditing ? 'Edit Foto Galeri' : 'Tambah Foto Galeri'} className="max-w-3xl">
                <AntForm layout="vertical" onFinish={handleSubmit}>
                    
                    <AntForm.Item 
                        label="Kategori" 
                        validateStatus={errors.category_id ? 'error' : ''} // Diubah menjadi category_id
                        help={errors.category_id} // Diubah menjadi category_id
                        required
                    >
                        <Select
                            placeholder="Pilih Kategori Galeri"
                            value={data.category_id} // Diubah menjadi category_id
                            onChange={(val) => setData('category_id', val)} // Diubah menjadi category_id
                            options={categories.map(cat => ({ label: cat.name, value: cat.id }))}
                        />
                    </AntForm.Item>

                    <AntForm.Item 
                        label="Judul Foto" 
                        validateStatus={errors.title ? 'error' : ''} 
                        help={errors.title}
                        required
                    >
                        <Input 
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            placeholder="Masukkan judul foto"
                        />
                    </AntForm.Item>

                    <AntForm.Item 
                        label="Unggah Gambar" 
                        validateStatus={errors.image ? 'error' : ''} 
                        help={errors.image}
                        required={!isEditing}
                    >
                        {isEditing && gallery.image && (
                            <div className="mb-3">
                                <p className="text-sm text-gray-500 mb-2">Gambar saat ini:</p>
                                <img src={`/storage/${gallery.image}`} alt="Current" className="h-32 rounded border" />
                            </div>
                        )}
                        <Upload
                            beforeUpload={() => false} // Prevent automatic upload
                            maxCount={1}
                            fileList={fileList}
                            onChange={handleUploadChange}
                            listType="picture"
                            accept="image/*"
                        >
                            <Button icon={<UploadOutlined />}>Pilih Gambar</Button>
                        </Upload>
                        <p className="text-xs text-gray-500 mt-2">Format: JPG, PNG, WEBP. Maks 2MB.</p>
                    </AntForm.Item>

                    <AntForm.Item>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={processing}>
                            {isEditing ? 'Simpan Perubahan' : 'Simpan Foto'}
                        </Button>
                    </AntForm.Item>
                </AntForm>
            </Card>
        </AdminLayout>
    );
}