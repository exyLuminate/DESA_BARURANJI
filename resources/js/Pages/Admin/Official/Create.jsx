import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        position: '',
        photo: null,
        is_village_head: false,
        sort_order: 0,
        period_start: '',
        period_end: '',
        is_active: true,
    });

    const [photoPreview, setPhotoPreview] = useState(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setData('photo', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setPhotoPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.officials.store'), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Tambah Perangkat Desa" />
            <div className="py-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Responsive Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
                    <h1 className="text-2xl font-semibold text-gray-800">Tambah Perangkat Desa</h1>
                    <Link href={route('admin.officials.index')} className="text-gray-600 hover:text-gray-900 border sm:border-none px-3 py-1 sm:p-0 rounded-md sm:rounded-none text-sm sm:text-base">
                        &larr; Kembali
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg p-4 sm:p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" required />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Jabatan</label>
                                <input type="text" value={data.position} onChange={e => setData('position', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" required placeholder="Contoh: Sekretaris Desa" />
                                {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
                            </div>

                            {/* Responsive Grid for Years */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tahun Mulai (Opsional)</label>
                                    <input type="number" min="1900" max="2100" value={data.period_start} onChange={e => setData('period_start', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="YYYY" />
                                    {errors.period_start && <p className="text-red-500 text-xs mt-1">{errors.period_start}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tahun Selesai (Opsional)</label>
                                    <input type="number" min="1900" max="2100" value={data.period_end} onChange={e => setData('period_end', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="YYYY" />
                                    {errors.period_end && <p className="text-red-500 text-xs mt-1">{errors.period_end}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Urutan Tampil</label>
                                <input type="number" value={data.sort_order} onChange={e => setData('sort_order', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" />
                                <p className="text-xs text-gray-500 mt-1">Angka lebih kecil akan tampil lebih dulu (contoh: 1 untuk Kades).</p>
                                {errors.sort_order && <p className="text-red-500 text-xs mt-1">{errors.sort_order}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Foto Profil</label>
                                {photoPreview && <img src={photoPreview} alt="Preview" className="h-24 w-24 object-cover my-2 rounded border" />}
                                {/* Update padding file input for mobile touch area */}
                                <input type="file" accept="image/*" onChange={handlePhotoChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 cursor-pointer" />
                                {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
                            </div>

                            {/* Responsive Checkboxes */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-gray-50 p-4 rounded-md border border-gray-100">
                                <label className="flex items-center cursor-pointer">
                                    <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="h-5 w-5 sm:h-4 sm:w-4 rounded border-gray-300 text-gray-800 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
                                    <span className="ml-3 sm:ml-2 text-sm text-gray-700 font-medium sm:font-normal">Status Aktif</span>
                                </label>
                                
                                <label className="flex items-center cursor-pointer">
                                    <input type="checkbox" checked={data.is_village_head} onChange={e => setData('is_village_head', e.target.checked)} className="h-5 w-5 sm:h-4 sm:w-4 rounded border-gray-300 text-gray-800 shadow-sm focus:border-gray-500 focus:ring-gray-500" />
                                    <span className="ml-3 sm:ml-2 text-sm text-gray-700 font-medium sm:font-normal">Tandai sebagai Kepala Desa</span>
                                </label>
                            </div>
                        </div>

                        {/* Responsive Button */}
                        <div className="flex justify-end pt-4 border-t">
                            <button type="submit" disabled={processing} className="w-full sm:w-auto bg-gray-800 text-white px-6 py-3 sm:py-2 rounded-md hover:bg-gray-700 disabled:opacity-50 font-medium transition-colors">
                                {processing ? 'Menyimpan...' : 'Simpan Data'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}