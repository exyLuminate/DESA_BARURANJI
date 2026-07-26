import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, Button, Upload, message, Collapse } from 'antd';
import { SaveOutlined, ArrowLeftOutlined, CameraOutlined, UserOutlined, EyeOutlined } from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';

const { TextArea } = Input;

export default function Greeting({ profile }) {
    const { data, setData, post, processing, errors } = useForm({
        greeting_title: profile.greeting_title || '',
        greeting_message: profile.greeting_message || '',
        greeting_image: null,
        _method: 'put',
    });

    const [previewUrl, setPreviewUrl] = useState(
        profile.greeting_image ? `/storage/${profile.greeting_image}` : null
    );

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.village-profile.greeting.update'), {
            preserveScroll: true,
            onSuccess: () => {
                message.success('Sambutan Kepala Desa berhasil diperbarui!');
                setData('greeting_image', null);
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

    // Komponen Live Preview (Bisa dipanggil di Desktop maupun Mobile)
    const LivePreviewCard = () => (
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden relative">
            <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600 w-full absolute top-0 left-0"></div>
            
            <div className="p-6 sm:p-8 pt-12 relative z-10 flex flex-col items-center text-center mt-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-1 shadow-lg mb-4 shrink-0">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Kades" className="w-full h-full object-cover rounded-full" />
                    ) : (
                        <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                            <UserOutlined className="text-3xl text-gray-300" />
                        </div>
                    )}
                </div>
                
                <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-4 px-2 line-clamp-2">
                    {data.greeting_title || 'Judul Sambutan Kepala Desa'}
                </h4>
                
                <div className="w-8 h-1 bg-blue-500 rounded-full mb-4"></div>
                
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic text-left w-full whitespace-pre-wrap break-words">
                    {data.greeting_message ? `"${data.greeting_message}"` : '"Teks sambutan Anda akan muncul di sini. Tuliskan pesan yang hangat dan informatif untuk masyarakat."'}
                </p>
            </div>
        </div>
    );

    return (
        <AdminLayout>
            <Head title="Sambutan Kepala Desa" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 sm:pb-10">
                
                {/* Header Soft UI (Responsive) */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <Link 
                            href={route('admin.village-profile.edit')}
                            className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition-colors mb-2 text-sm sm:text-base"
                        >
                            <ArrowLeftOutlined className="mr-2" /> Kembali
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Sambutan Kades</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
                    
                    {/* KOLOM KIRI: Form Pengisian */}
                    <div className="lg:col-span-3 order-1">
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-5 sm:p-8">
                            <form onSubmit={submit} className="space-y-6 sm:space-y-8">
                                
                                {/* Upload Foto */}
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 border-b border-gray-100 pb-6 sm:pb-8">
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
                                                    className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full object-cover border-4 border-gray-50 shadow-sm"
                                                />
                                            ) : (
                                                <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-400 transition-colors">
                                                    <CameraOutlined className="text-xl sm:text-2xl mb-1" />
                                                    <div className="text-[10px] sm:text-xs font-medium text-center">Unggah<br/>Foto</div>
                                                </div>
                                            )}
                                        </Upload>
                                    </div>
                                    <div className="pt-2 text-center sm:text-left w-full">
                                        <h3 className="text-base sm:text-lg font-bold text-gray-800">Foto Resmi Kades</h3>
                                        <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-2 sm:mb-3">Unggah foto rasio 1:1. Gambar akan dipotong lingkaran otomatis.</p>
                                        <span className="text-[10px] sm:text-xs px-3 py-1 bg-gray-100 rounded-lg text-gray-600 font-medium inline-block">JPG / PNG Maks 2MB</span>
                                        {errors.greeting_image && <p className="text-red-500 text-xs sm:text-sm mt-2">{errors.greeting_image}</p>}
                                    </div>
                                </div>

                                {/* Form Input Konten */}
                                <div className="space-y-5 sm:space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Sambutan <span className="text-red-500">*</span></label>
                                        <Input 
                                            size="large"
                                            value={data.greeting_title}
                                            onChange={(e) => setData('greeting_title', e.target.value)}
                                            placeholder="Contoh: Sambutan Kepala Desa..."
                                            className={`rounded-xl ${errors.greeting_title ? 'border-red-500' : ''}`}
                                            status={errors.greeting_title ? 'error' : ''}
                                        />
                                        {errors.greeting_title && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.greeting_title}</p>}
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-end mb-2">
                                            <label className="block text-sm font-semibold text-gray-700">Isi Pesan Sambutan <span className="text-red-500">*</span></label>
                                        </div>
                                        <TextArea 
                                            rows={8}
                                            showCount
                                            maxLength={2000}
                                            value={data.greeting_message}
                                            onChange={(e) => setData('greeting_message', e.target.value)}
                                            placeholder="Tuliskan pesan sambutan..."
                                            className={`rounded-xl sm:!h-[280px] ${errors.greeting_message ? 'border-red-500' : ''}`}
                                            status={errors.greeting_message ? 'error' : ''}
                                        />
                                        {errors.greeting_message && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.greeting_message}</p>}
                                    </div>
                                </div>

                                {/* Mobile Preview Toggle (Hanya Muncul di HP) */}
                                <div className="block lg:hidden mt-4">
                                    <Collapse 
                                        ghost 
                                        items={[{
                                            key: '1',
                                            label: <span className="text-blue-600 font-semibold flex items-center gap-2"><EyeOutlined /> Lihat Simulasi Tampilan Publik</span>,
                                            children: <div className="pt-2 pb-4 px-1"><LivePreviewCard /></div>
                                        }]}
                                        className="bg-blue-50/50 rounded-xl border border-blue-100"
                                    />
                                </div>

                                {/* Tombol Submit */}
                                <div className="flex justify-end pt-4 sm:pt-6 border-t border-gray-100 mt-6 sm:mt-8">
                                    <Button 
                                        type="primary" 
                                        htmlType="submit" 
                                        size="large"
                                        loading={processing}
                                        icon={<SaveOutlined />}
                                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 rounded-xl px-8 shadow-md shadow-blue-200 h-12 sm:h-auto"
                                    >
                                        Simpan Sambutan
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* KOLOM KANAN: Live Preview (Hanya muncul di Desktop) */}
                    <div className="hidden lg:block lg:col-span-2 order-2">
                        <div className="sticky top-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span> 
                                Simulasi Tampilan Publik
                            </h3>
                            <LivePreviewCard />
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}