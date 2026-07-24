import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, Button, Upload, Progress, Popconfirm } from 'antd';
import { 
    SaveOutlined, ArrowLeftOutlined, BankOutlined, 
    EnvironmentOutlined, InboxOutlined, FileTextOutlined, 
    PictureOutlined, DeleteOutlined
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';

const { TextArea } = Input;
const { Dragger } = Upload;

export default function Edit({ facility }) {
    // Tambahkan _method: 'put' dan delete: destroy
    const { data, setData, post, processing, errors, progress, delete: destroy } = useForm({
        name: facility.name || '',
        location: facility.location || '',
        description: facility.description || '',
        image: null, 
        _method: 'put', 
    });

    const [imagePreview, setImagePreview] = useState(facility.image ? `/storage/${facility.image}` : null);
    const [isImageChanged, setIsImageChanged] = useState(false);

    const handleImageChange = (info) => {
        const fileList = info.fileList;
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
            setIsImageChanged(true);
        } else {
            // Jika dibatalkan/dihapus, kembalikan ke foto lama
            setData('image', null);
            setImagePreview(facility.image ? `/storage/${facility.image}` : null);
            setIsImageChanged(false);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.facilities.update', facility.id), {
            forceFormData: true,
        });
    };

    const handleDelete = () => {
        destroy(route('admin.facilities.destroy', facility.id));
    };

    return (
        <AdminLayout>
            <Head title={`Edit Fasilitas - ${data.name}`} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10 w-full overflow-hidden">
                
                {/* Header Soft UI */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <Link 
                            href={route('admin.facilities.index')}
                            className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition-colors mb-2"
                        >
                            <ArrowLeftOutlined className="mr-2" /> Kembali ke Daftar Fasilitas
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800 break-words">Edit Fasilitas Desa</h1>
                    </div>
                </div>

                {/* Grid Responsif: 1 Kolom di HP, 5 Kolom Proporsional di Laptop */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    
                    {/* KOLOM KIRI: Form Pengisian (Lebar 3/5 di Laptop) */}
                    <div className="lg:col-span-3 flex flex-col gap-8">
                        
                        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden w-full">
                           
                            <div className="h-2 bg-gradient-to-r from-indigo-400 to-blue-500 w-full"></div>
                            
                            <form onSubmit={submit} className="p-6 sm:p-8 space-y-6">
                                
                                {/* Input Nama */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Fasilitas <span className="text-red-500">*</span></label>
                                    <Input 
                                        size="large"
                                        prefix={<BankOutlined className="text-gray-400 mr-2" />}
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={`rounded-xl ${errors.name ? 'border-red-500' : ''}`}
                                        status={errors.name ? 'error' : ''}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                {/* Input Lokasi */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Titik Lokasi (Opsional)</label>
                                    <Input 
                                        size="large"
                                        prefix={<EnvironmentOutlined className="text-gray-400 mr-2" />}
                                        value={data.location}
                                        onChange={e => setData('location', e.target.value)}
                                        className={`rounded-xl ${errors.location ? 'border-red-500' : ''}`}
                                        status={errors.location ? 'error' : ''}
                                    />
                                    {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                                </div>

                                {/* Drag and Drop Uploader */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Foto Fasilitas {facility.image ? '(Upload untuk mengganti)' : '(Opsional)'}
                                    </label>
                                    <div className={`rounded-xl overflow-hidden border transition-colors bg-gray-50 ${isImageChanged ? 'border-blue-400 bg-blue-50/30' : 'border-gray-200 hover:border-blue-400'}`}>
                                        <Dragger 
                                            name="image"
                                            multiple={false}
                                            showUploadList={false}
                                            beforeUpload={() => false}
                                            onChange={handleImageChange}
                                            className="custom-dragger border-0 bg-transparent"
                                        >
                                            <p className="ant-upload-drag-icon pt-4">
                                                <InboxOutlined className={isImageChanged ? "text-blue-600" : "text-blue-400"} />
                                            </p>
                                            <p className="ant-upload-text font-semibold text-gray-700">
                                                {isImageChanged ? 'Foto baru siap diunggah' : 'Klik atau tarik foto ke area ini'}
                                            </p>
                                            <p className="ant-upload-hint text-xs text-gray-500 px-4 pb-4">
                                                Dukung format JPG, PNG. Rekomendasi rasio lanskap.
                                            </p>
                                        </Dragger>
                                    </div>
                                    
                                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                                    
                                    {progress && (
                                        <div className="mt-3">
                                            <Progress percent={progress.percentage} strokeColor="#10b981" showInfo={false} size="small" />
                                            <span className="text-xs text-gray-500 mt-1">Mengunggah... {progress.percentage}%</span>
                                        </div>
                                    )}
                                </div>

                                {/* Text Area Deskripsi */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                        <FileTextOutlined className="text-gray-400 mr-2" /> Deskripsi Fasilitas
                                    </label>
                                    <TextArea 
                                        rows={4}
                                        showCount
                                        maxLength={500}
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className={`rounded-xl ${errors.description ? 'border-red-500' : ''}`}
                                        status={errors.description ? 'error' : ''}
                                    />
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                </div>

                                {/* Tombol Update */}
                                <div className="flex justify-end pt-6 border-t border-gray-100">
                                    <Button 
                                        type="primary" 
                                        htmlType="submit" 
                                        size="large"
                                        loading={processing}
                                        icon={<SaveOutlined />}
                                        className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 rounded-xl px-8 shadow-md"
                                    >
                                        Update Data Fasilitas
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Danger Zone (Responsive Full Width of Left Column) */}
                        <div className="bg-red-50/50 border border-red-100 rounded-3xl p-6 sm:p-8 w-full">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-red-700 font-bold text-lg mb-1">Danger Zone</h3>
                                    <p className="text-red-500 text-sm">Menghapus data fasilitas ini secara permanen dari sistem.</p>
                                </div>
                                <Popconfirm
                                    title="Hapus Fasilitas Desa?"
                                    description="Tindakan ini tidak dapat dibatalkan."
                                    onConfirm={handleDelete}
                                    okText="Ya, Hapus"
                                    cancelText="Batal"
                                    okButtonProps={{ danger: true }}
                                >
                                    <Button danger type="primary" icon={<DeleteOutlined />} size="large" className="w-full sm:w-auto rounded-xl shadow-sm shadow-red-200 shrink-0">
                                        Hapus Fasilitas
                                    </Button>
                                </Popconfirm>
                            </div>
                        </div>

                    </div>

                    {/* KOLOM KANAN: Live Preview (Lebar 2/5 di Laptop) */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Preview Visual
                            </h3>
                            
                            {/* Card Mockup Khusus Fasilitas */}
                            <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg w-full">
                                {/* Area Gambar */}
                                <div className="h-48 sm:h-56 bg-gray-100 relative group flex items-center justify-center overflow-hidden">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    ) : (
                                        <div className="text-center text-gray-400 flex flex-col items-center">
                                            <PictureOutlined className="text-4xl mb-2 text-gray-300" />
                                            <span className="text-xs">Gambar fasilitas belum dipilih</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                
                                {/* Area Konten */}
                                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                                    <h4 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                                        {data.name || 'Nama Fasilitas Desa'}
                                    </h4>
                                    
                                    {/* Indikator Lokasi (Pin) */}
                                    <div className="flex items-start text-blue-600 mb-3">
                                        <EnvironmentOutlined className="mt-0.5 mr-1.5 shrink-0" />
                                        <span className="text-xs font-semibold uppercase tracking-wider line-clamp-1">
                                            {data.location || 'LOKASI BELUM DITENTUKAN'}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4 flex-1 break-words">
                                        {data.description || 'Penjelasan singkat tentang fasilitas desa akan tampil di sini. Gunakan bahasa yang mudah dipahami warga.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}