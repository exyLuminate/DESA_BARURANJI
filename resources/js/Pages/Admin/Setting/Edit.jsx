import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Input, Button, Upload, message, Alert } from 'antd';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout'; // Sesuaikan jika path layout berbeda

const { TextArea } = Input;

export default function SettingEdit({ setting, flash }) {
    // Inisialisasi form bawaan Inertia
    const { data, setData, post, processing, errors } = useForm({
        site_title: setting?.site_title || '',
        site_description: setting?.site_description || '',
        favicon: null,
    });

    // State untuk preview gambar favicon
    const [previewImage, setPreviewImage] = useState(
        setting?.favicon ? `/storage/${setting.favicon}` : null
    );

    // Handler form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Menggunakan POST karena Inertia mengharuskan POST untuk pengiriman file (Multipart)
        post(route('admin.settings.update'), {
            preserveScroll: true,
            onSuccess: () => {
                message.success('Pengaturan website berhasil diperbarui!');
            },
            onError: () => {
                message.error('Gagal memperbarui pengaturan, silakan periksa form.');
            }
        });
    };

    // Handler untuk Ant Design Upload
    const handleFileChange = (info) => {
        const fileList = info.fileList;
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            setData('favicon', file);
            setPreviewImage(URL.createObjectURL(file));
        } else {
            setData('favicon', null);
            setPreviewImage(setting?.favicon ? `/storage/${setting.favicon}` : null);
        }
    };

    return (
        <AdminLayout>
            <Head title="Pengaturan Website" />

            <div className="max-w-4xl mx-auto pb-10">
                {/* Header Section dengan Soft UI */}
                <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Pengaturan Website</h1>
                    <p className="text-gray-500">Kelola informasi dasar dan identitas visual website desa Anda.</p>
                </div>

                {flash?.success && (
                    <Alert message={flash.success} type="success" showIcon className="mb-6 rounded-xl border-green-200 bg-green-50" />
                )}

                {/* Form Section (Glassmorphism lite) */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Site Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Nama Website (Site Title) <span className="text-red-500">*</span>
                            </label>
                            <Input 
                                size="large"
                                placeholder="Contoh: Website Resmi Desa Baru Ranji"
                                value={data.site_title}
                                onChange={(e) => setData('site_title', e.target.value)}
                                className={`rounded-xl ${errors.site_title ? 'border-red-500' : 'border-gray-200 hover:border-blue-400 focus:border-blue-400'}`}
                            />
                            {errors.site_title && <span className="text-red-500 text-sm mt-1 block">{errors.site_title}</span>}
                        </div>

                        {/* Site Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Deskripsi Website (SEO)
                            </label>
                            <TextArea 
                                rows={4}
                                placeholder="Tuliskan deskripsi singkat mengenai website desa..."
                                value={data.site_description}
                                onChange={(e) => setData('site_description', e.target.value)}
                                className={`rounded-xl ${errors.site_description ? 'border-red-500' : 'border-gray-200 hover:border-blue-400 focus:border-blue-400'}`}
                            />
                            {errors.site_description && <span className="text-red-500 text-sm mt-1 block">{errors.site_description}</span>}
                            <p className="text-gray-400 text-xs mt-2">Deskripsi ini akan digunakan untuk keperluan mesin pencari (Google).</p>
                        </div>

                        {/* Favicon Upload */}
                        <div className="p-6 bg-gray-50/50 border border-gray-100 rounded-2xl">
                            <label className="block text-sm font-semibold text-gray-700 mb-4">
                                Ikon Website (Favicon)
                            </label>
                            
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                {/* Preview Kotak */}
                                <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-white overflow-hidden shadow-sm">
                                    {previewImage ? (
                                        <img src={previewImage} alt="Favicon Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-gray-400 text-xs text-center px-2">Tidak ada ikon</span>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <Upload
                                        accept="image/png, image/jpeg, image/x-icon"
                                        beforeUpload={() => false} // Mencegah auto upload Ant Design, biarkan Inertia yang handle
                                        onChange={handleFileChange}
                                        maxCount={1}
                                        showUploadList={false}
                                    >
                                        <Button icon={<UploadOutlined />} className="rounded-xl border-gray-300">
                                            Pilih Gambar
                                        </Button>
                                    </Upload>
                                    <p className="text-gray-400 text-xs mt-3 leading-relaxed">
                                        Rekomendasi: Format .png, .jpg, atau .ico. <br />
                                        Rasio 1:1 (kotak) dengan ukuran maksimal 1MB.
                                    </p>
                                    {errors.favicon && <span className="text-red-500 text-sm mt-1 block">{errors.favicon}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex justify-end">
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                size="large"
                                icon={<SaveOutlined />}
                                loading={processing}
                                className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 shadow-md shadow-blue-200"
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