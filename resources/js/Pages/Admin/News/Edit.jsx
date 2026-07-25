import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, Button, Select, Switch, Upload, Progress, notification, Popconfirm, Tag } from 'antd';
import { 
    ArrowLeftOutlined, SaveOutlined, InboxOutlined, 
    SettingOutlined, PictureOutlined, DeleteOutlined,
    CheckCircleOutlined, ClockCircleOutlined
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';
import TiptapEditor from '@/Components/TiptapEditor';

const { Dragger } = Upload;

export default function Edit({ news, categories }) {
    // Mempertahankan _method: 'PUT' untuk FormData file upload di Laravel
    const { data, setData, post, processing, errors, progress, delete: destroy } = useForm({
        _method: 'PUT',
        title: news.title || '',
        category_id: news.category_id || null,
        thumbnail: null,
        content: news.content || '',
        is_published: news.is_published || false,
    });

    const [imagePreview, setImagePreview] = useState(news.thumbnail ? `/storage/${news.thumbnail}` : null);
    const [isImageChanged, setIsImageChanged] = useState(false);

    const handleImageChange = (info) => {
        const fileList = info.fileList;
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            setData('thumbnail', file);
            setImagePreview(URL.createObjectURL(file));
            setIsImageChanged(true);
        } else {
            setData('thumbnail', null);
            setImagePreview(news.thumbnail ? `/storage/${news.thumbnail}` : null);
            setIsImageChanged(false);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.news.update', news.id), {
            forceFormData: true,
            onSuccess: () => {
                notification.success({ 
                    message: 'Pembaruan Berhasil', 
                    description: 'Data berita berhasil disimpan.',
                    placement: 'bottomRight'
                });
            },
        });
    };

    const handleDelete = () => {
        destroy(route('admin.news.destroy', news.id), {
            onSuccess: () => {
                notification.success({ 
                    message: 'Terhapus', 
                    description: 'Berita berhasil dihapus.',
                    placement: 'bottomRight'
                });
            }
        });
    };

    return (
        <AdminLayout>
            <Head title={`Edit - ${news.title}`} />
            
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10 w-full overflow-hidden">
                
                {/* Header Navigasi Minimalis */}
                <div className="mb-6">
                    <Link 
                        href={route('admin.news.index')}
                        className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition-colors"
                    >
                        <ArrowLeftOutlined className="mr-2" /> Kembali ke Daftar Berita
                    </Link>
                </div>

                {/* Form Utama membungkus seluruh grid */}
                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* AREA KIRI: Ruang Fokus Menulis (Lebar 8/12 di Laptop) */}
                    <div className="lg:col-span-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-10 min-h-[600px] flex flex-col">
                        
                        {/* Live Status Badge */}
                        <div className="mb-4">
                            {news.is_published ? (
                                <Tag icon={<CheckCircleOutlined />} color="success" className="rounded-full px-3 py-1 border-0 bg-green-50 text-green-600 font-bold">
                                    LIVE - Dipublikasikan
                                </Tag>
                            ) : (
                                <Tag icon={<ClockCircleOutlined />} color="warning" className="rounded-full px-3 py-1 border-0 bg-orange-50 text-orange-600 font-bold">
                                    DRAFT - Belum Tayang
                                </Tag>
                            )}
                        </div>

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
                        <div className="prose-editor-container flex-1">
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
                                                className="text-blue-600 text-xs cursor-pointer hover:underline font-medium"
                                                onClick={() => {
                                                    setData('thumbnail', null);
                                                    setImagePreview(null);
                                                    setIsImageChanged(true);
                                                }}
                                            >
                                                Ganti Gambar
                                            </span>
                                        )}
                                    </label>
                                    
                                    <div className={`rounded-xl overflow-hidden border-2 transition-colors ${imagePreview ? 'border-transparent bg-gray-100 p-1' : 'border-dashed border-gray-300 hover:border-blue-400 bg-gray-50'}`}>
                                        {imagePreview ? (
                                            <div className="relative rounded-lg overflow-hidden h-40 group">
                                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-full mb-1">
                                                        {isImageChanged ? 'Gambar Baru' : 'Gambar Saat Ini'}
                                                    </span>
                                                    <span className="text-gray-300 text-[10px]">Klik tombol Ganti di atas untuk mengubah</span>
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
                                                    <PictureOutlined className="text-blue-400 text-3xl" />
                                                </p>
                                                <p className="ant-upload-text font-medium text-gray-600 text-sm">
                                                    Upload gambar cover baru
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
                                            {data.is_published ? 'Tayang ke Publik' : 'Simpan sbg Draft'}
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

                        {/* Tombol Simpan Raksasa */}
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            size="large" 
                            icon={<SaveOutlined />} 
                            loading={processing} 
                            className={`w-full rounded-2xl h-14 text-base font-bold shadow-xl border-0 ${data.is_published ? 'bg-green-500 hover:bg-green-600 shadow-green-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}`}
                        >
                            {data.is_published ? 'Update & Publikasikan' : 'Simpan sebagai Draft'}
                        </Button>
                        
                        {/* Danger Zone (Hapus Berita) */}
                        <div className="bg-red-50/50 border border-red-100 rounded-3xl p-6 mt-2">
                            <h3 className="text-red-700 font-bold mb-1">Hapus Artikel</h3>
                            <p className="text-red-500 text-xs mb-4 leading-relaxed">Berita yang dihapus tidak dapat dipulihkan kembali dari sistem.</p>
                            <Popconfirm
                                title="Hapus Berita Ini?"
                                description="Tindakan ini permanen."
                                onConfirm={handleDelete}
                                okText="Ya, Hapus"
                                cancelText="Batal"
                                okButtonProps={{ danger: true }}
                                placement="topRight"
                            >
                                <Button danger type="primary" icon={<DeleteOutlined />} className="w-full rounded-xl shadow-sm shadow-red-200">
                                    Hapus Berita
                                </Button>
                            </Popconfirm>
                        </div>

                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}