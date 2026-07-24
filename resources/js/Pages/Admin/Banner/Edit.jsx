import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, Button, Upload, InputNumber, Switch, Popconfirm } from 'antd';
import { InboxOutlined, SaveOutlined, ArrowLeftOutlined, DeleteOutlined, PictureOutlined } from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout'; // Sesuaikan path layout admin Anda

const { Dragger } = Upload;
const { TextArea } = Input;

export default function Edit({ banner }) {
    // Inisialisasi state Inertia
    // Kita tambahkan fungsi 'delete: destroy' untuk fitur Danger Zone
    const { data, setData, post, processing, errors, delete: destroy } = useForm({
        title: banner.title || '',
        subtitle: banner.subtitle || '',
        image: null, // Dikosongkan, hanya terisi jika admin mengunggah gambar baru
        button_text: banner.button_text || '',
        button_url: banner.button_url || '',
        sort_order: banner.sort_order || 0,
        is_active: banner.is_active,
        _method: 'put', // Requirement Laravel untuk multipart/form-data (Update)
    });

    // State lokal untuk Live Preview (Default ke gambar lama)
    const [previewUrl, setPreviewUrl] = useState(banner.image ? `/storage/${banner.image}` : null);
    const [isImageChanged, setIsImageChanged] = useState(false);

    // Handler Submit Update
    const submit = (e) => {
        e.preventDefault();
        post(route('admin.banners.update', banner.id));
    };

    // Handler Hapus Cepat (Danger Zone)
    const handleDelete = () => {
        destroy(route('admin.banners.destroy', banner.id));
    };

    // Handler Upload Gambar (Mencegah upload otomatis Ant Design)
    const handleImageChange = (info) => {
        const fileList = info.fileList;
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            setData('image', file);
            setPreviewUrl(URL.createObjectURL(file));
            setIsImageChanged(true);
        } else {
            // Jika di-clear, kembalikan ke gambar asli dari database
            setData('image', null);
            setPreviewUrl(banner.image ? `/storage/${banner.image}` : null);
            setIsImageChanged(false);
        }
    };

    return (
        <AdminLayout>
            <Head title="Edit Banner" />

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
                        <h1 className="text-2xl font-bold text-gray-800">Edit Banner</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* KOLOM KIRI: Form Input & Danger Zone (Lebar 2/3) */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        <form onSubmit={submit} className="space-y-6">
                            {/* Section 1: Media & Konten */}
                            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                                <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center border-b pb-4">
                                    <span className="bg-blue-100 text-blue-600 w-8 h-8 flex items-center justify-center rounded-xl mr-3 text-sm">1</span> 
                                    Media & Teks Utama
                                </h2>

                                <div className="space-y-6">
                                    {/* Upload Dragger (Visualisasi Ganti Gambar) */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Gambar Banner</label>
                                        <Dragger
                                            accept="image/png, image/jpeg, image/webp"
                                            beforeUpload={() => false}
                                            onChange={handleImageChange}
                                            maxCount={1}
                                            showUploadList={false}
                                            className={`rounded-2xl transition-all ${isImageChanged ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'} border-2 ${errors.image ? 'border-red-400' : ''}`}
                                        >
                                            <p className={`ant-upload-drag-icon ${isImageChanged ? 'text-blue-500' : 'text-gray-400'}`}>
                                                <InboxOutlined />
                                            </p>
                                            <p className="ant-upload-text font-medium text-gray-700">
                                                {isImageChanged ? 'Gambar baru siap diunggah' : 'Klik atau seret untuk mengganti gambar saat ini'}
                                            </p>
                                            <p className="ant-upload-hint text-gray-400 text-xs">Biarkan kosong jika tidak ingin mengubah gambar.</p>
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
                                    Update Banner
                                </Button>
                            </div>
                        </form>

                        {/* Danger Zone (Hapus Banner Langsung) */}
                        <div className="mt-8 bg-red-50/50 border border-red-100 rounded-3xl p-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-red-700 font-bold text-lg mb-1">Danger Zone</h3>
                                    <p className="text-red-500 text-sm">Menghapus banner akan menghilangkannya dari halaman publik selamanya.</p>
                                </div>
                                <Popconfirm
                                    title="Hapus Banner ini?"
                                    description="Apakah Anda yakin? Data akan dipindah ke trash."
                                    onConfirm={handleDelete}
                                    okText="Ya, Hapus"
                                    cancelText="Batal"
                                    okButtonProps={{ danger: true }}
                                >
                                    <Button danger type="primary" icon={<DeleteOutlined />} size="large" className="rounded-xl shadow-sm shadow-red-200 shrink-0">
                                        Hapus Banner
                                    </Button>
                                </Popconfirm>
                            </div>
                        </div>

                    </div>

                    {/* KOLOM KANAN: Live Preview (Lebar 1/3) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Visual Preview
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
                                        {data.subtitle || 'Sub judul atau deskripsi banner akan tampil di sini.'}
                                    </p>
                                    
                                    {data.button_text && (
                                        <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium text-sm shadow-lg hover:bg-blue-700 transition">
                                            {data.button_text}
                                        </button>
                                    )}
                                </div>
                            </div>
                            
                            <div className="mt-4 p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Status Saat Ini:</span>
                                    <span className={`font-bold ${data.is_active ? 'text-green-600' : 'text-red-500'}`}>
                                        {data.is_active ? 'Sedang Tayang' : 'Disembunyikan'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}