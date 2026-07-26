import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Input, Button, Upload, Select, Progress, Popconfirm, notification, Tag } from 'antd';
import { 
    UploadOutlined, ArrowLeftOutlined, SaveOutlined, 
    InboxOutlined, PictureOutlined, DeleteOutlined,
    FolderOpenOutlined
} from '@ant-design/icons';

const { Dragger } = Upload;

export default function GalleryForm({ gallery = null, categories }) {
    const isEditing = !!gallery;

    // Inisialisasi useForm Inertia
    const { data, setData, post, processing, errors, progress, delete: destroy } = useForm({
        title: gallery?.title || '',
        category_id: gallery?.category_id || null,
        image: null,
        _method: isEditing ? 'PUT' : 'POST', // Spoofing method
    });

    const [imagePreview, setImagePreview] = useState(gallery?.image ? `/storage/${gallery.image}` : null);
    const [isImageChanged, setIsImageChanged] = useState(false);

    const handleUploadChange = (info) => {
        const fileList = info.fileList;
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
            setIsImageChanged(true);
        } else {
            setData('image', null);
            setImagePreview(gallery?.image ? `/storage/${gallery.image}` : null);
            setIsImageChanged(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isEditing && !data.image) {
            notification.error({ message: 'Gagal', description: 'Silakan unggah gambar terlebih dahulu!' });
            return;
        }

        const url = isEditing 
            ? route('admin.galleries.update', gallery.id) 
            : route('admin.galleries.store');
        
        post(url, {
            forceFormData: true,
            onSuccess: () => {
                notification.success({ 
                    message: 'Berhasil', 
                    description: isEditing ? 'Foto berhasil diperbarui.' : 'Foto baru berhasil ditambahkan.',
                    placement: 'bottomRight'
                });
            }
        });
    };

    const handleDelete = () => {
        if (isEditing) {
            destroy(route('admin.galleries.destroy', gallery.id), {
                onSuccess: () => {
                    notification.success({ message: 'Terhapus', description: 'Foto berhasil dihapus.', placement: 'bottomRight' });
                }
            });
        }
    };

    // Mencari nama kategori untuk Preview
    const selectedCategoryName = categories.find(c => c.id === data.category_id)?.name || 'Kategori Belum Dipilih';

    return (
        <AdminLayout>
            <Head title={isEditing ? 'Edit Foto' : 'Tambah Foto'} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10 w-full overflow-hidden">
                
                {/* Header Soft UI */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <Link 
                            href={route('admin.galleries.index')}
                            className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition-colors mb-2"
                        >
                            <ArrowLeftOutlined className="mr-2" /> Kembali ke Galeri
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {isEditing ? 'Edit Foto Galeri' : 'Tambah Foto Galeri'}
                        </h1>
                    </div>
                </div>

                {/* Grid Responsif: 1 Kolom di HP, 5 Kolom Proporsional di Laptop */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    
                    {/* KOLOM KIRI: Form Pengisian (Lebar 3/5 di Laptop) */}
                    <div className="lg:col-span-3 flex flex-col gap-8">
                        
                        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden w-full">
                            <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500 w-full"></div>
                            
                            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Album / Kategori <span className="text-red-500">*</span></label>
                                    <Select
                                        size="large"
                                        className="w-full rounded-xl"
                                        placeholder="-- Pilih Kategori Galeri --"
                                        options={categories.map(c => ({ label: c.name, value: c.id }))}
                                        value={data.category_id}
                                        onChange={val => setData('category_id', val)}
                                        status={errors.category_id ? 'error' : ''}
                                        disabled={processing}
                                    />
                                    {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Foto <span className="text-red-500">*</span></label>
                                    <Input 
                                        size="large"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        placeholder="Contoh: Gotong Royong Warga RT 02..."
                                        className={`rounded-xl ${errors.title ? 'border-red-500' : ''}`}
                                        status={errors.title ? 'error' : ''}
                                        disabled={processing}
                                    />
                                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                                </div>

                                {/* Drag and Drop Uploader */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex justify-between">
                                        <span>Unggah Gambar {isEditing ? '(Opsional)' : <span className="text-red-500">*</span>}</span>
                                        {imagePreview && (
                                            <span 
                                                className="text-blue-600 text-xs cursor-pointer hover:underline font-medium"
                                                onClick={() => {
                                                    setData('image', null);
                                                    setImagePreview(gallery?.image ? `/storage/${gallery.image}` : null);
                                                    setIsImageChanged(false);
                                                }}
                                            >
                                                Batal Ubah
                                            </span>
                                        )}
                                    </label>
                                    <div className={`rounded-xl overflow-hidden border transition-colors bg-gray-50 ${isImageChanged ? 'border-blue-400 bg-blue-50/30' : 'border-gray-200 hover:border-blue-400'}`}>
                                        <Dragger 
                                            name="image"
                                            multiple={false}
                                            showUploadList={false}
                                            beforeUpload={() => false}
                                            onChange={handleUploadChange}
                                            className="custom-dragger border-0 bg-transparent"
                                            disabled={processing}
                                        >
                                            <p className="ant-upload-drag-icon pt-4">
                                                <InboxOutlined className={isImageChanged ? "text-blue-600" : "text-blue-400"} />
                                            </p>
                                            <p className="ant-upload-text font-semibold text-gray-700">
                                                {isImageChanged ? 'Gambar siap diunggah' : 'Klik atau tarik foto ke sini'}
                                            </p>
                                            <p className="ant-upload-hint text-xs text-gray-500 px-4 pb-4">
                                                Format JPG, PNG. Maksimal 2MB.
                                            </p>
                                        </Dragger>
                                    </div>
                                    
                                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                                    {progress && (
                                        <div className="mt-3">
                                            <Progress percent={progress.percentage} strokeColor="#4f46e5" showInfo={false} size="small" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end pt-6 border-t border-gray-100">
                                    <Button 
                                        type="primary" 
                                        htmlType="submit" 
                                        size="large"
                                        loading={processing}
                                        icon={<SaveOutlined />}
                                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 rounded-xl px-8 shadow-md"
                                    >
                                        {isEditing ? 'Simpan Perubahan' : 'Upload Foto'}
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Danger Zone (Tampil Hanya Saat Edit) */}
                        {isEditing && (
                            <div className="bg-red-50/50 border border-red-100 rounded-3xl p-6 sm:p-8 w-full">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-red-700 font-bold text-lg mb-1">Hapus Foto</h3>
                                        <p className="text-red-500 text-sm">Foto yang dihapus akan hilang dari album publik.</p>
                                    </div>
                                    <Popconfirm
                                        title="Hapus Foto Galeri?"
                                        description="Tindakan ini permanen."
                                        onConfirm={handleDelete}
                                        okText="Ya, Hapus"
                                        cancelText="Batal"
                                        okButtonProps={{ danger: true }}
                                    >
                                        <Button danger type="primary" icon={<DeleteOutlined />} size="large" className="w-full sm:w-auto rounded-xl shadow-sm shadow-red-200 shrink-0">
                                            Hapus Foto
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* KOLOM KANAN: Live Preview Polaroid (Lebar 2/5 di Laptop) */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Preview Album
                            </h3>
                            
                            {/* Polaroid Card Mockup */}
                            <div className="bg-white rounded-2xl p-4 shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-gray-100 transform transition-transform hover:rotate-1 hover:scale-105 duration-300">
                                <div className="h-56 sm:h-64 bg-gray-100 rounded-xl overflow-hidden relative mb-4">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                            <PictureOutlined className="text-5xl mb-2 opacity-50" />
                                            <span className="text-xs font-medium">Belum ada foto</span>
                                        </div>
                                    )}
                                </div>
                                <div className="px-2 pb-2">
                                    <Tag color="blue" icon={<FolderOpenOutlined />} className="mb-2 rounded-md border-0 bg-blue-50 text-blue-600">
                                        {selectedCategoryName}
                                    </Tag>
                                    <h4 className="text-lg font-bold text-gray-800 line-clamp-2 leading-snug">
                                        {data.title || 'Judul Foto Akan Tampil di Sini'}
                                    </h4>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 text-center mt-6 px-4">Kartu galeri akan menyesuaikan rasio foto asli pada halaman publik.</p>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}