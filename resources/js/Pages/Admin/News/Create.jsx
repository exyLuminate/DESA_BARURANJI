import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, Button, Select, Switch, Upload, Progress, notification } from 'antd';
import { 
    ArrowLeftOutlined, SaveOutlined, InboxOutlined, 
    SettingOutlined, PictureOutlined 
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';
import TiptapEditor from '@/Components/TiptapEditor';

const { Dragger } = Upload;

export default function Create({ categories }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        title: '',
        category_id: null,
        thumbnail: null,
        content: '',
        is_published: false,
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (info) => {
        const fileList = info.fileList;
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            setData('thumbnail', file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setData('thumbnail', null);
            setImagePreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.news.store'), {
            forceFormData: true,
            onSuccess: () => {
                notification.success({ 
                    message: 'Berhasil', 
                    description: 'Berita berhasil dipublikasikan/disimpan.',
                    placement: 'bottomRight'
                });
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Tulis Berita Baru" />
            
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10 w-full">
                
                {/* Header Navigasi Minimalis */}
                <div className="mb-6">
                    <Link 
                        href={route('admin.news.index')}
                        className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition-colors"
                    >
                        <ArrowLeftOutlined className="mr-2" /> Kembali ke Daftar Berita
                    </Link>
                </div>

                {/* Form Utama membungkus seluruh grid agar tombol submit di sidebar bekerja */}
                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* AREA KIRI: Ruang Fokus Menulis (Lebar 8/12 di Laptop) */}
                    <div className="lg:col-span-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-10 min-h-[600px]">
                        
                        {/* Immersive Title Input ala Medium */}
                        <div className="mb-6">
                            <Input.TextArea 
                                autoSize={{ minRows: 1, maxRows: 3 }}
                                placeholder="Judul Berita..."
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                disabled={processing}
                                className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 border-0 border-b border-transparent hover:border-gray-200 focus:border-blue-500 rounded-none px-0 py-2 shadow-none resize-none transition-colors ${errors.title ? 'border-red-500 focus:border-red-500 placeholder-red-300' : 'placeholder-gray-300'}`}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
                        </div>

                        {/* Editor Konten */}
                        <div className="prose-editor-container">
                            <TiptapEditor 
                                value={data.content} 
                                onChange={(html) => setData('content', html)} 
                            />
                            {errors.content && <p className="text-red-500 text-sm mt-2">{errors.content}</p>}
                        </div>
                    </div>

                    {/* AREA KANAN: Sticky Sidebar Pengaturan (Lebar 4/12 di Laptop) */}
                    <div className="lg:col-span-4 sticky top-6 flex flex-col gap-6">
                        
                        {/* Box Pengaturan Publikasi */}
                        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                            <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex items-center">
                                <SettingOutlined className="text-blue-500 mr-2 text-lg" />
                                <h3 className="font-bold text-gray-700">Pengaturan Publikasi</h3>
                            </div>
                            
                            <div className="p-6 space-y-6">
                                {/* Pilihan Kategori */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori Berita <span className="text-red-500">*</span></label>
                                    <Select
                                        size="large"
                                        className="w-full rounded-xl"
                                        placeholder="-- Pilih Kategori --"
                                        options={categories.map(c => ({ label: c.name, value: c.id }))}
                                        value={data.category_id}
                                        onChange={val => setData('category_id', val)}
                                        status={errors.category_id ? 'error' : ''}
                                        disabled={processing}
                                    />
                                    {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                                </div>

                                {/* Uploader Thumbnail Interaktif */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex justify-between">
                                        <span>Thumbnail Utama</span>
                                        {imagePreview && (
                                            <span 
                                                className="text-red-500 text-xs cursor-pointer hover:underline"
                                                onClick={() => {
                                                    setData('thumbnail', null);
                                                    setImagePreview(null);
                                                }}
                                            >
                                                Hapus
                                            </span>
                                        )}
                                    </label>
                                    
                                    <div className={`rounded-xl overflow-hidden border-2 border-dashed transition-colors ${imagePreview ? 'border-transparent bg-gray-100 p-1' : 'border-gray-300 hover:border-blue-400 bg-gray-50'}`}>
                                        {imagePreview ? (
                                            <div className="relative rounded-lg overflow-hidden h-40 group">
                                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-white text-sm font-medium">Thumbnail Terpilih</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <Dragger 
                                                name="thumbnail"
                                                multiple={false}
                                                showUploadList={false}
                                                beforeUpload={() => false}
                                                onChange={handleImageChange}
                                                className="custom-dragger border-0 bg-transparent"
                                                disabled={processing}
                                            >
                                                <p className="ant-upload-drag-icon pt-2">
                                                    <PictureOutlined className="text-gray-400 text-3xl" />
                                                </p>
                                                <p className="ant-upload-text font-medium text-gray-600 text-sm">
                                                    Upload gambar cover
                                                </p>
                                                <p className="ant-upload-hint text-xs text-gray-400 px-4 pb-2">
                                                    Resolusi 16:9 direkomendasikan
                                                </p>
                                            </Dragger>
                                        )}
                                    </div>
                                    {errors.thumbnail && <p className="text-red-500 text-xs mt-1">{errors.thumbnail}</p>}
                                    {progress && (
                                        <Progress percent={progress.percentage} strokeColor="#4f46e5" showInfo={false} size="small" className="mt-2" />
                                    )}
                                </div>

                                {/* Toggle Status */}
                                <div className="pt-4 border-t border-gray-100">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Status Visibilitas</label>
                                    <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                                        <span className="text-sm font-medium text-gray-700">
                                            {data.is_published ? 'Tayang ke Publik' : 'Simpan sebagai Draft'}
                                        </span>
                                        <Switch 
                                            checked={data.is_published}
                                            onChange={(checked) => setData('is_published', checked)}
                                            disabled={processing}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tombol Simpan Raksasa (Selalu terjangkau di Sidebar) */}
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            size="large" 
                            icon={<SaveOutlined />} 
                            loading={processing} 
                            className={`w-full rounded-2xl h-14 text-base font-bold shadow-xl border-0 ${data.is_published ? 'bg-green-500 hover:bg-green-600 shadow-green-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}`}
                        >
                            {data.is_published ? 'Publikasikan Berita' : 'Simpan sebagai Draft'}
                        </Button>
                        
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}