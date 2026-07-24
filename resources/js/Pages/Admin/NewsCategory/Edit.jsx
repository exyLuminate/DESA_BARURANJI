import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, Button, notification, Popconfirm } from 'antd';
import { 
    SaveOutlined, ArrowLeftOutlined, TagsOutlined,
    LinkOutlined, DeleteOutlined
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ category }) {
    // Tambahkan properti delete: destroy dari Inertia
    const { data, setData, put, processing, errors, delete: destroy } = useForm({
        name: category.name || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.news-categories.update', category.id), {
            onSuccess: () => {
                notification.success({ 
                    message: 'Berhasil', 
                    description: 'Kategori berita berhasil diperbarui.',
                    placement: 'bottomRight'
                });
            },
        });
    };

    const handleDelete = () => {
        destroy(route('admin.news-categories.destroy', category.id), {
            onSuccess: () => {
                notification.success({ 
                    message: 'Dihapus', 
                    description: 'Kategori berita berhasil dihapus.',
                    placement: 'bottomRight'
                });
            }
        });
    };

    // Auto-generate preview slug berdasarkan input saat ini, fallback ke slug DB
    const liveSlug = data.name 
        ? data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') 
        : category.slug;

    // Cek apakah slug berubah dari versi aslinya di DB
    const isSlugChanged = liveSlug !== category.slug;

    return (
        <AdminLayout>
            <Head title={`Edit Kategori - ${category.name}`} />
            
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
                        <h1 className="text-2xl font-bold text-gray-800 break-words">Edit Kategori Berita</h1>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    
                    {/* Form Container (Soft UI) */}
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden w-full">
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
                                    className={`rounded-xl ${errors.name ? 'border-red-500' : ''}`}
                                    status={errors.name ? 'error' : ''}
                                    disabled={processing}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}

                                {/* Widget Live Slug Simulator (Read-Only Styling) */}
                                <div className={`mt-4 flex items-start sm:items-center text-sm p-4 rounded-xl border transition-colors ${isSlugChanged ? 'bg-blue-50/50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                                    <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 shrink-0 shadow-sm ${isSlugChanged ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'}`}>
                                        <LinkOutlined />
                                    </span>
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                                            {isSlugChanged ? 'URL Baru (Otomatis Diperbarui)' : 'URL Kategori Saat Ini'}
                                        </p>
                                        <span className={`font-mono font-bold break-all ${isSlugChanged ? 'text-blue-600' : 'text-gray-600'}`}>
                                            /berita/kategori/{liveSlug}
                                        </span>
                                    </div>
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
                                    Simpan Perubahan
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-red-50/50 border border-red-100 rounded-3xl p-6 sm:p-8 w-full">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-red-700 font-bold text-lg mb-1">Danger Zone</h3>
                                <p className="text-red-500 text-sm">Menghapus kategori ini dapat mempengaruhi berita yang terhubung dengannya.</p>
                            </div>
                            <Popconfirm
                                title="Hapus Kategori Ini?"
                                description="Pastikan tidak ada berita yang masih menggunakan kategori ini."
                                onConfirm={handleDelete}
                                okText="Ya, Hapus"
                                cancelText="Batal"
                                okButtonProps={{ danger: true }}
                            >
                                <Button danger type="primary" icon={<DeleteOutlined />} size="large" className="w-full sm:w-auto rounded-xl shadow-sm shadow-red-200 shrink-0">
                                    Hapus Kategori
                                </Button>
                            </Popconfirm>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}