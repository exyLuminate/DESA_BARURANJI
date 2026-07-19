import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subtitle: '',
        image: null,
        button_text: '',
        button_url: '',
        sort_order: 0,
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.banners.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Banner</h2>}
        >
            <Head title="Tambah Banner" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} encType="multipart/form-data">
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Gambar Banner *</label>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                                <p className="text-xs text-gray-500 mt-1">Format: JPG, JPEG, PNG, WEBP (Maks 2MB).</p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Judul</label>
                                <input 
                                    type="text" 
                                    value={data.title} 
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Sub Judul</label>
                                <textarea 
                                    value={data.subtitle} 
                                    onChange={(e) => setData('subtitle', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    rows="3"
                                ></textarea>
                                {errors.subtitle && <div className="text-red-500 text-sm mt-1">{errors.subtitle}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Teks Tombol</label>
                                    <input 
                                        type="text" 
                                        value={data.button_text} 
                                        onChange={(e) => setData('button_text', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                    {errors.button_text && <div className="text-red-500 text-sm mt-1">{errors.button_text}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">URL Tombol</label>
                                    <input 
                                        type="url" 
                                        value={data.button_url} 
                                        onChange={(e) => setData('button_url', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                    {errors.button_url && <div className="text-red-500 text-sm mt-1">{errors.button_url}</div>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Urutan Tampil (Sort Order)</label>
                                    <input 
                                        type="number" 
                                        value={data.sort_order} 
                                        onChange={(e) => setData('sort_order', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                    {errors.sort_order && <div className="text-red-500 text-sm mt-1">{errors.sort_order}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status Aktif</label>
                                    <select 
                                        value={data.is_active ? 1 : 0} 
                                        onChange={(e) => setData('is_active', e.target.value === '1')}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    >
                                        <option value={1}>Aktif</option>
                                        <option value={0}>Tidak Aktif</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Link href={route('admin.banners.index')} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
                                    Batal
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}