import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, Button, Upload, InputNumber, Switch } from 'antd';
import { InboxOutlined, SaveOutlined, ArrowLeftOutlined, PictureOutlined } from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout'; // Sesuaikan path layout admin Anda

const { Dragger } = Upload;
const { TextArea } = Input;

export default function Create() {
    // Inisialisasi state Inertia
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subtitle: '',
        image: null,
        button_text: '',
        button_url: '',
        sort_order: 0,
        is_active: true,
    });

    // State lokal untuk Live Preview Gambar
    const [previewUrl, setPreviewUrl] = useState(null);

    // Handler Submit
    const submit = (e) => {
        e.preventDefault();
        post(route('admin.banners.store'));
    };

    // Handler Upload Gambar (Mencegah upload otomatis Ant Design)
    const handleImageChange = (info) => {
        const fileList = info.fileList;
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            setData('image', file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setData('image', null);
            setPreviewUrl(null);
        }
    };

    return (
        <AdminLayout>
            <Head title="Tambah Banner" />

            <div className="max-w-7xl mx-auto pb-10">
                {/* Header Soft UI */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <Link 
                            href={route('admin.banners.index')}
                            className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition-colors mb-2"
                        >
                            <ArrowLeftOutlined className="mr-2" /> Kembali ke Daftar Banner
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Tambah Banner Baru</h1>
                    </div>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* KOLOM KIRI: Form Input (Lebar 2/3) */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Section 1: Media & Konten */}
                        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center border-b pb-4">
                                <span className="bg-blue-100 text-blue-600 w-8 h-8 flex items-center justify-center rounded-xl mr-3 text-sm">1</span> 
                                Media & Teks Utama
                            </h2>

                            <div className="space-y-6">
                                {/* Upload Dragger */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gambar Banner <span className="text-red-500">*</span></label>
                                    <Dragger
                                        accept="image/png, image/jpeg, image/webp"
                                        beforeUpload={() => false}
                                        onChange={handleImageChange}
                                        maxCount={1}
                                        showUploadList={false}
                                        className={`rounded-2xl bg-gray-50 hover:bg-blue-50 border-2 ${errors.image ? 'border-red-400' : 'border-gray-200'}`}
                                    >
                                        <p className="ant-upload-drag-icon text-blue-500">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text font-medium text-gray-700">Klik atau seret file gambar ke area ini</p>
                                        <p className="ant-upload-hint text-gray-400 text-xs">Mendukung format JPG, PNG, WEBP. Maksimal 2MB.</p>
                                    </Dragger>
                                    {errors.image && <span className="text-red-500 text-sm mt-1 block">{errors.image}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Banner</label>
                                    <Input 
                                        size="large"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Contoh: Selamat Datang di Desa Baru Ranji"
                                        className={`rounded-xl ${errors.title ? 'border-red-500' : ''}`}
                                        status={errors.title ? 'error' : ''}
                                    />
                                    {errors.title && <span className="text-red-500 text-sm mt-1 block">{errors.title}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sub Judul / Deskripsi</label>
                                    <TextArea 
                                        rows={3}
                                        value={data.subtitle}
                                        onChange={(e) => setData('subtitle', e.target.value)}
                                        placeholder="Contoh: Bersama membangun desa yang maju dan mandiri..."
                                        className={`rounded-xl ${errors.subtitle ? 'border-red-500' : ''}`}
                                        status={errors.subtitle ? 'error' : ''}
                                    />
                                    {errors.subtitle && <span className="text-red-500 text-sm mt-1 block">{errors.subtitle}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Tombol & Pengaturan */}
                        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center border-b pb-4">
                                <span className="bg-purple-100 text-purple-600 w-8 h-8 flex items-center justify-center rounded-xl mr-3 text-sm">2</span> 
                                Call to Action (CTA) & Pengaturan
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Teks Tombol (Opsional)</label>
                                    <Input 
                                        size="large"
                                        value={data.button_text}
                                        onChange={(e) => setData('button_text', e.target.value)}
                                        placeholder="Contoh: Selengkapnya"
                                        className="rounded-xl"
                                    />
                                    {errors.button_text && <span className="text-red-500 text-sm mt-1 block">{errors.button_text}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">URL Tombol (Opsional)</label>
                                    <Input 
                                        size="large"
                                        type="url"
                                        value={data.button_url}
                                        onChange={(e) => setData('button_url', e.target.value)}
                                        placeholder="https://..."
                                        className="rounded-xl"
                                    />
                                    {errors.button_url && <span className="text-red-500 text-sm mt-1 block">{errors.button_url}</span>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Urutan Tampil (Sort Order)</label>
                                    <InputNumber 
                                        min={0}
                                        size="large"
                                        value={data.sort_order}
                                        onChange={(val) => setData('sort_order', val)}
                                        className="w-full rounded-xl"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Angka terkecil tampil lebih dulu.</p>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status Penayangan</label>
                                    <div className="flex items-center">
                                        <Switch 
                                            checked={data.is_active} 
                                            onChange={(checked) => setData('is_active', checked)} 
                                            className="mr-3"
                                        />
                                        <span className={`font-medium text-sm ${data.is_active ? 'text-green-600' : 'text-gray-400'}`}>
                                            {data.is_active ? 'Aktif (Ditayangkan)' : 'Disembunyikan'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3">
                            <Link href={route('admin.banners.index')}>
                                <Button size="large" className="rounded-xl border-gray-300">Batal</Button>
                            </Link>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                size="large"
                                loading={processing}
                                icon={<SaveOutlined />}
                                className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 shadow-md shadow-blue-200"
                            >
                                Simpan Banner
                            </Button>
                        </div>
                    </div>

                    {/* KOLOM KANAN: Live Preview (Lebar 1/3) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span> Live Preview
                            </h3>
                            
                            {/* Kotak Mockup Banner */}
                            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden border border-gray-100 aspect-[4/5] relative flex items-center justify-center">
                                
                                {/* Background Image */}
                                {previewUrl ? (
                                    <img src={previewUrl} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt="Preview" />
                                ) : (
                                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                        <PictureOutlined className="text-4xl text-gray-300" />
                                    </div>
                                )}
                                
                                {/* Overlay Gelap agar Teks Terbaca */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                {/* Konten Preview */}
                                <div className="relative z-10 p-6 text-center w-full mt-auto mb-10">
                                    <h2 className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                                        {data.title || 'Judul Banner'}
                                    </h2>
                                    <p className="text-gray-200 text-sm mb-6 line-clamp-3 drop-shadow">
                                        {data.subtitle || 'Sub judul atau deskripsi banner akan tampil di sini. Ketik di form untuk melihat perubahan langsung.'}
                                    </p>
                                    
                                    {data.button_text && (
                                        <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium text-sm shadow-lg hover:bg-blue-700 transition">
                                            {data.button_text}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 text-center mt-4">Tampilan ini adalah simulasi. Tampilan asli mungkin menyesuaikan layar perangkat pengguna.</p>
                        </div>
                    </div>

                </form>
            </div>
        </AdminLayout>
    );
}