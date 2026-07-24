import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, Button, Upload, Progress } from 'antd';
import { 
    SaveOutlined, ArrowLeftOutlined, StarOutlined, 
    InboxOutlined, FileTextOutlined, PictureOutlined 
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';

const { TextArea } = Input;
const { Dragger } = Upload;

export default function Create() {
    const { data, setData, post, processing, errors, progress } = useForm({
        title: '',
        description: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (info) => {
        const fileList = info.fileList;
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setData('image', null);
            setImagePreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.potentials.store'), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Tambah Potensi Desa" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10">
                
                {/* Header Soft UI */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <Link 
                            href={route('admin.potentials.index')}
                            className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition-colors mb-2"
                        >
                            <ArrowLeftOutlined className="mr-2" /> Kembali ke Daftar Potensi
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Tambah Potensi Desa</h1>
                    </div>
                </div>

                {/* Grid Responsif: 1 Kolom di HP, 5 Kolom Proporsional di Laptop */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    
                    {/* KOLOM KIRI: Form Pengisian (Lebar 3/5 di Laptop) */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500 w-full"></div>
                            
                            <form onSubmit={submit} className="p-6 sm:p-8 space-y-6">
                                
                                {/* Input Judul */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Potensi <span className="text-red-500">*</span></label>
                                    <Input 
                                        size="large"
                                        prefix={<StarOutlined className="text-gray-400 mr-2" />}
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        placeholder="Contoh: Kerajinan Anyaman Bambu, Wisata Curug..."
                                        className={`rounded-xl ${errors.title ? 'border-red-500' : ''}`}
                                        status={errors.title ? 'error' : ''}
                                    />
                                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                                </div>

                                {/* Drag and Drop Uploader */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Foto/Gambar Potensi (Opsional)</label>
                                    <div className="rounded-xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-colors bg-gray-50">
                                        <Dragger 
                                            name="image"
                                            multiple={false}
                                            showUploadList={false}
                                            beforeUpload={() => false} // Mencegah auto-upload Antd
                                            onChange={handleImageChange}
                                            className="custom-dragger border-0 bg-transparent"
                                        >
                                            <p className="ant-upload-drag-icon pt-4">
                                                <InboxOutlined className="text-blue-500" />
                                            </p>
                                            <p className="ant-upload-text font-semibold text-gray-700">
                                                Klik atau tarik gambar ke area ini
                                            </p>
                                            <p className="ant-upload-hint text-xs text-gray-500 px-4 pb-4">
                                                Dukung format JPG, PNG. Rekomendasi rasio lanskap (16:9).
                                            </p>
                                        </Dragger>
                                    </div>
                                    
                                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                                    
                                    {/* Progress Bar Upload Inertia */}
                                    {progress && (
                                        <div className="mt-3">
                                            <Progress percent={progress.percentage} strokeColor="#4f46e5" showInfo={false} size="small" />
                                            <span className="text-xs text-gray-500 mt-1">Mengunggah... {progress.percentage}%</span>
                                        </div>
                                    )}
                                </div>

                                {/* Text Area Deskripsi */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                        <FileTextOutlined className="text-gray-400 mr-2" /> Deskripsi Singkat
                                    </label>
                                    <TextArea 
                                        rows={5}
                                        showCount
                                        maxLength={1000}
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        placeholder="Jelaskan mengenai keunikan potensi desa ini, produk UMKM, atau lokasi wisata secara menarik..."
                                        className={`rounded-xl ${errors.description ? 'border-red-500' : ''}`}
                                        status={errors.description ? 'error' : ''}
                                    />
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                </div>

                                {/* Tombol Simpan */}
                                <div className="flex justify-end pt-6 border-t border-gray-100">
                                    <Button 
                                        type="primary" 
                                        htmlType="submit" 
                                        size="large"
                                        loading={processing}
                                        icon={<SaveOutlined />}
                                        className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 rounded-xl px-8 shadow-md"
                                    >
                                        Simpan Potensi
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* KOLOM KANAN: Live Preview (Lebar 2/5 di Laptop) */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span> Preview Kartu Publik
                            </h3>
                            
                            {/* Card Mockup (Persis seperti tampilan homepage) */}
                            <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg">
                                {/* Area Gambar */}
                                <div className="h-48 sm:h-56 bg-gray-100 relative group flex items-center justify-center overflow-hidden">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    ) : (
                                        <div className="text-center text-gray-400 flex flex-col items-center">
                                            <PictureOutlined className="text-4xl mb-2 text-gray-300" />
                                            <span className="text-xs">Gambar belum dipilih</span>
                                        </div>
                                    )}
                                    {/* Overlay Gradient (Opsional untuk estetika card) */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                
                                {/* Area Konten */}
                                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                                    <h4 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 leading-snug">
                                        {data.title || 'Judul Potensi Desa Anda'}
                                    </h4>
                                    <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4 flex-1">
                                        {data.description || 'Deskripsi potensi desa akan tampil di sini. Teks yang terlalu panjang akan dipotong menjadi tiga baris di halaman beranda publik.'}
                                    </p>
                                    <div className="pt-4 border-t border-gray-100">
                                        <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">Baca Selengkapnya &rarr;</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-gray-400 text-center mt-4 px-4">Tampilan ini mensimulasikan bagaimana kartu akan terlihat di layar warga/masyarakat.</p>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}