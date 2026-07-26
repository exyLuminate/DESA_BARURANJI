import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Input, Button, Upload, notification, Alert } from 'antd';
import { 
    SaveOutlined, InboxOutlined, SettingOutlined, 
    GlobalOutlined 
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';

const { TextArea } = Input;
const { Dragger } = Upload;

export default function SettingEdit({ setting, flash }) {
    // Inisialisasi form bawaan Inertia (menggunakan post karena ada file upload)
    const { data, setData, post, processing, errors } = useForm({
        site_title: setting?.site_title || '',
        site_description: setting?.site_description || '',
        favicon: null,
    });

    const [previewImage, setPreviewImage] = useState(
        setting?.favicon ? `/storage/${setting.favicon}` : null
    );
    const [isFaviconChanged, setIsFaviconChanged] = useState(false);

    // Handler form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('admin.settings.update'), {
            preserveScroll: true,
            forceFormData: true, // Pastikan form-data aktif untuk file
            onSuccess: () => {
                notification.success({ 
                    message: 'Berhasil Disimpan', 
                    description: 'Pengaturan website utama berhasil diperbarui!',
                    placement: 'bottomRight'
                });
            },
            onError: () => {
                notification.error({ 
                    message: 'Penyimpanan Gagal', 
                    description: 'Silakan periksa kembali isian form Anda.',
                    placement: 'bottomRight'
                });
            }
        });
    };

    // Handler untuk Ant Design Upload (Drag & Drop)
    const handleFileChange = (info) => {
        const fileList = info.fileList;
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            setData('favicon', file);
            setPreviewImage(URL.createObjectURL(file));
            setIsFaviconChanged(true);
        } else {
            setData('favicon', null);
            setPreviewImage(setting?.favicon ? `/storage/${setting.favicon}` : null);
            setIsFaviconChanged(false);
        }
    };

    return (
        <AdminLayout>
            <Head title="Pengaturan Website" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10 w-full overflow-hidden">
                
                {/* Header Soft UI dengan Icon Ant Design */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                            Pengaturan Website <SettingOutlined className="text-indigo-500" />
                        </h1>
                        <p className="text-gray-500 text-xs sm:text-sm">Kelola identitas utama, SEO, dan aset visual global sistem.</p>
                    </div>
                </div>

                {flash?.success && (
                    <Alert message={flash.success} type="success" showIcon className="mb-6 rounded-2xl border-green-200 bg-green-50 shadow-sm" />
                )}

                {/* Form Section */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden w-full">
                    {/* Aksen Biru Gradasi */}
                    <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500 w-full"></div>
                    
                    <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* Kolom Kiri: Teks & SEO */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nama Website (Site Title) <span className="text-red-500">*</span>
                                    </label>
                                    <Input 
                                        size="large"
                                        prefix={<GlobalOutlined className="text-gray-400 mr-2" />}
                                        placeholder="Contoh: Website Resmi Desa..."
                                        value={data.site_title}
                                        onChange={(e) => setData('site_title', e.target.value)}
                                        className={`rounded-xl ${errors.site_title ? 'border-red-500' : ''}`}
                                        status={errors.site_title ? 'error' : ''}
                                        disabled={processing}
                                    />
                                    {errors.site_title && <span className="text-red-500 text-xs mt-1 block">{errors.site_title}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Deskripsi Website (Meta SEO)
                                    </label>
                                    <TextArea 
                                        rows={5}
                                        showCount
                                        maxLength={160}
                                        placeholder="Tuliskan deskripsi singkat desa Anda. Ini akan muncul di hasil pencarian Google..."
                                        value={data.site_description}
                                        onChange={(e) => setData('site_description', e.target.value)}
                                        className={`rounded-xl ${errors.site_description ? 'border-red-500' : ''}`}
                                        status={errors.site_description ? 'error' : ''}
                                        disabled={processing}
                                    />
                                    {errors.site_description && <span className="text-red-500 text-xs mt-1 block">{errors.site_description}</span>}
                                    <p className="text-gray-400 text-[11px] mt-1 italic">Optimal 150-160 karakter untuk SEO Google yang baik.</p>
                                </div>
                            </div>

                            {/* Kolom Kanan: Visual & Upload */}
                            <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                                <label className="block text-sm font-semibold text-gray-700 mb-4 flex justify-between">
                                    <span>Ikon Website (Favicon)</span>
                                    {isFaviconChanged && (
                                        <span 
                                            className="text-blue-600 text-xs cursor-pointer hover:underline"
                                            onClick={() => {
                                                setData('favicon', null);
                                                setPreviewImage(setting?.favicon ? `/storage/${setting.favicon}` : null);
                                                setIsFaviconChanged(false);
                                            }}
                                        >
                                            Batal Ubah
                                        </span>
                                    )}
                                </label>
                                
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    
                                    {/* Box Preview Favicon (Mungil) */}
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border border-gray-200 flex items-center justify-center bg-white overflow-hidden shadow-sm shrink-0 relative group">
                                        {previewImage ? (
                                            <img src={previewImage} alt="Favicon" className="w-full h-full object-contain p-2" />
                                        ) : (
                                            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider text-center px-2">No Icon</span>
                                        )}
                                        
                                        {/* Keterangan Status saat Hover */}
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-white text-[10px] font-bold text-center px-2">
                                                {isFaviconChanged ? 'Ikon Baru Siap Simpan' : 'Ikon Saat Ini'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Dragger Upload Ant Design */}
                                    <div className="flex-1 w-full">
                                        <div className={`rounded-xl overflow-hidden border transition-colors bg-white ${isFaviconChanged ? 'border-blue-400 bg-blue-50/30' : 'border-gray-200 hover:border-blue-400'}`}>
                                            <Dragger 
                                                name="favicon"
                                                multiple={false}
                                                showUploadList={false}
                                                beforeUpload={() => false}
                                                onChange={handleFileChange}
                                                className="custom-dragger border-0 bg-transparent"
                                                accept=".ico,.png,.jpg,.jpeg"
                                                disabled={processing}
                                            >
                                                <p className="ant-upload-drag-icon pt-2">
                                                    <InboxOutlined className={isFaviconChanged ? "text-blue-600 text-2xl" : "text-blue-400 text-2xl"} />
                                                </p>
                                                <p className="ant-upload-text font-semibold text-gray-700 text-xs sm:text-sm px-2">
                                                    Tarik / Klik untuk Upload
                                                </p>
                                            </Dragger>
                                        </div>
                                        <p className="text-gray-400 text-[11px] mt-3 leading-relaxed">
                                            Format: <strong>.ico, .png, .jpg</strong><br />
                                            Rasio 1:1 (Kotak). Maksimal 1MB.
                                        </p>
                                        {errors.favicon && <span className="text-red-500 text-xs mt-1 block">{errors.favicon}</span>}
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6 border-t border-gray-100 flex justify-end">
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                size="large"
                                icon={<SaveOutlined />}
                                loading={processing}
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 rounded-xl px-10 shadow-md shadow-blue-200 h-12 font-bold"
                            >
                                Simpan Pengaturan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}