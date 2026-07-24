import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, Button, notification } from 'antd';
import { 
    SaveOutlined, ArrowLeftOutlined, TagsOutlined,
    LinkOutlined
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.news-categories.store'), {
            onSuccess: () => {
                // Mempertahankan notifikasi Ant Design yang sudah Anda buat
                notification.success({ 
                    message: 'Berhasil', 
                    description: 'Kategori berita berhasil ditambahkan.',
                    placement: 'bottomRight' // Muncul rapi di pojok kanan bawah
                });
            },
        });
    };

    // Fungsi canggih untuk simulasi Live Slug
    const liveSlug = data.name 
        ? data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') 
        : 'nama-kategori';

    return (
        <AdminLayout>
            <Head title="Tambah Kategori Berita" />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10 w-full">
                
                {/* Header Soft UI */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <Link 
                            href={route('admin.news-categories.index')}
                            className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition-colors mb-2"
                        >
                            <ArrowLeftOutlined className="mr-2" /> Kembali ke Daftar Kategori
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Tambah Kategori Baru</h1>
                    </div>
                </div>

                {/* Form Container (Soft UI) */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                    {/* Aksen Biru Gradasi */}
                    <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500 w-full"></div>
                    
                    <form onSubmit={submit} className="p-6 sm:p-8">
                        
                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Nama Kategori <span className="text-red-500">*</span>
                            </label>
                            
                            <Input 
                                size="large"
                                prefix={<TagsOutlined className="text-gray-400 mr-2" />}
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="Contoh: Pemerintahan, Pembangunan, Pengumuman..."
                                className={`rounded-xl ${errors.name ? 'border-red-500' : ''}`}
                                status={errors.name ? 'error' : ''}
                                disabled={processing}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}

                            {/* 🚀 Widget Live Slug Simulator */}
                            <div className="mt-4 flex items-start sm:items-center text-sm p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-600 mr-3 shrink-0 shadow-sm">
                                    <LinkOutlined />
                                </span>
                                <span className="text-gray-600 break-all leading-relaxed">
                                    Simulasi URL Publik: <br className="sm:hidden" />
                                    <span className="font-mono text-blue-600 font-bold bg-white px-2 py-0.5 rounded border border-blue-200 mt-1 sm:mt-0 sm:ml-1 inline-block">
                                        /berita/kategori/{liveSlug}
                                    </span>
                                </span>
                            </div>
                        </div>

                        {/* Tombol Action (Responsif) */}
                        <div className="flex justify-end pt-6 border-t border-gray-100">
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                size="large"
                                loading={processing}
                                icon={<SaveOutlined />}
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 rounded-xl px-8 shadow-md shadow-blue-200"
                            >
                                Simpan Kategori
                            </Button>
                        </div>
                    </form>
                </div>
                
            </div>
        </AdminLayout>
    );
}