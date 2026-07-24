import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, Button, Upload, message } from 'antd';
import { SaveOutlined, ArrowLeftOutlined, CameraOutlined, UserOutlined } from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout'; // Sesuaikan path layout admin Anda

const { TextArea } = Input;

export default function Greeting({ profile }) {
    const { data, setData, post, processing, errors } = useForm({
        greeting_title: profile.greeting_title || '',
        greeting_message: profile.greeting_message || '',
        greeting_image: null,
        _method: 'put',
    });

    // State preview avatar bulat
    const [previewUrl, setPreviewUrl] = useState(
        profile.greeting_image ? `/storage/${profile.greeting_image}` : null
    );

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.village-profile.greeting.update'), {
            preserveScroll: true,
            onSuccess: () => {
                message.success('Sambutan Kepala Desa berhasil diperbarui!');
                setData('greeting_image', null); // Reset agar tidak terkirim ulang
            },
        });
    };

    const handleImageChange = (info) => {
        const fileList = info.fileList;
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            setData('greeting_image', file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setData('greeting_image', null);
            setPreviewUrl(profile.greeting_image ? `/storage/${profile.greeting_image}` : null);
        }
    };

    return (
        <AdminLayout>
            <Head title="Sambutan Kepala Desa" />

            <div className="max-w-7xl mx-auto pb-10">
                {/* Header Soft UI */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <Link 
                            href={route('admin.village-profile.edit')}
                            className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition-colors mb-2"
                        >
                            <ArrowLeftOutlined className="mr-2" /> Kembali ke Profil Desa
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Sambutan Kepala Desa</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    
                    {/* KOLOM KIRI: Form Pengisian (Lebar 3/5) */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                            <form onSubmit={submit} className="space-y-8">
                                
                                {/* Upload Foto (Circular Avatar) */}
                                <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6 border-b border-gray-100 pb-8">
                                    <div className="shrink-0">
                                        <Upload
                                            name="avatar"
                                            listType="picture-circle"
                                            className="avatar-uploader-custom"
                                            showUploadList={false}
                                            beforeUpload={() => false}
                                            onChange={handleImageChange}
                                        >
                                            {previewUrl ? (
                                                <img 
                                                    src={previewUrl} 
                                                    alt="Avatar" 
                                                    className="w-[120px] h-[120px] rounded-full object-cover border-4 border-gray-50 shadow-sm"
                                                />
                                            ) : (
                                                <div className="w-[120px] h-[120px] rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-400 transition-colors">
                                                    <CameraOutlined className="text-2xl mb-1" />
                                                    <div className="text-xs font-medium">Unggah Foto</div>
                                                </div>
                                            )}
                                        </Upload>
                                    </div>
                                    <div className="pt-2 text-center sm:text-left">
                                        <h3 className="text-lg font-bold text-gray-800">Foto Kepala Desa</h3>
                                        <p className="text-sm text-gray-500 mt-1 mb-2">Unggah foto resmi atau *portrait* Kepala Desa. Gambar akan dipotong secara otomatis menjadi lingkaran.</p>
                                        <span className="text-xs px-3 py-1 bg-gray-100 rounded-lg text-gray-600 font-medium">JPG / PNG Maks 2MB</span>
                                        {errors.greeting_image && <p className="text-red-500 text-sm mt-2">{errors.greeting_image}</p>}
                                    </div>
                                </div>

                                {/* Form Input Konten */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Sambutan <span className="text-red-500">*</span></label>
                                        <Input 
                                            size="large"
                                            value={data.greeting_title}
                                            onChange={(e) => setData('greeting_title', e.target.value)}
                                            placeholder="Contoh: Sambutan Kepala Desa Baru Ranji"
                                            className={`rounded-xl ${errors.greeting_title ? 'border-red-500' : ''}`}
                                            status={errors.greeting_title ? 'error' : ''}
                                        />
                                        {errors.greeting_title && <p className="text-red-500 text-sm mt-1">{errors.greeting_title}</p>}
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-end mb-2">
                                            <label className="block text-sm font-semibold text-gray-700">Isi Pesan Sambutan <span className="text-red-500">*</span></label>
                                        </div>
                                        <TextArea 
                                            rows={12}
                                            showCount // Fitur Ant Design untuk character counter
                                            maxLength={2000}
                                            value={data.greeting_message}
                                            onChange={(e) => setData('greeting_message', e.target.value)}
                                            placeholder="Tuliskan pesan sambutan, visi misi singkat, atau ucapan selamat datang untuk pengunjung website..."
                                            className={`rounded-xl ${errors.greeting_message ? 'border-red-500' : ''}`}
                                            status={errors.greeting_message ? 'error' : ''}
                                        />
                                        {errors.greeting_message && <p className="text-red-500 text-sm mt-1">{errors.greeting_message}</p>}
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4 border-t border-gray-100">
                                    <Button 
                                        type="primary" 
                                        htmlType="submit" 
                                        size="large"
                                        loading={processing}
                                        icon={<SaveOutlined />}
                                        className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 shadow-md shadow-blue-200"
                                    >
                                        Simpan Sambutan
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* KOLOM KANAN: Live Preview (Lebar 2/5) */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Simulasi Tampilan Publik
                            </h3>
                            
                            {/* Greeting Card Mockup */}
                            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden relative">
                                {/* Hiasan Background Header */}
                                <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600 w-full absolute top-0 left-0"></div>
                                
                                <div className="p-8 pt-12 relative z-10 flex flex-col items-center text-center mt-4">
                                    {/* Avatar Publik */}
                                    <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg mb-4">
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Kades" className="w-full h-full object-cover rounded-full" />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                                                <UserOutlined className="text-3xl text-gray-300" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Judul & Teks */}
                                    <h4 className="text-lg font-bold text-gray-800 mb-4 px-2 line-clamp-2">
                                        {data.greeting_title || 'Judul Sambutan Kepala Desa'}
                                    </h4>
                                    
                                    <div className="w-8 h-1 bg-blue-500 rounded-full mb-4"></div>
                                    
                                    <p className="text-sm text-gray-600 leading-relaxed italic text-left w-full whitespace-pre-wrap line-clamp-[12]">
                                        {data.greeting_message ? `"${data.greeting_message}"` : '"Teks sambutan Anda akan muncul di sini. Tuliskan pesan yang hangat dan informatif untuk masyarakat."'}
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