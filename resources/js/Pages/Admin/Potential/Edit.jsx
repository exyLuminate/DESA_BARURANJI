import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ potential }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        title: potential.title || '',
        description: potential.description || '',
        image: null, 
    });

    const [imagePreview, setImagePreview] = useState(potential.image ? `/storage/${potential.image}` : null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        // Memakai POST untuk meng-handle file upload di update (sesuai route override di web.php)
        post(route('admin.potentials.update', potential.id), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Edit Potensi Desa" />
            <div className="py-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
                    <h1 className="text-2xl font-semibold text-gray-800">Edit Potensi Desa</h1>
                    <Link href={route('admin.potentials.index')} className="text-gray-600 hover:text-gray-900 border sm:border-none px-3 py-1 sm:p-0 rounded-md sm:rounded-none text-sm sm:text-base">
                        &larr; Kembali
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Judul Potensi</label>
                            <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" required />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gambar Potensi (Upload jika ingin mengganti)</label>
                            {imagePreview && (
                                <div className="mt-2 mb-4">
                                    <img src={imagePreview} alt="Preview" className="h-40 w-auto object-cover rounded-md border" />
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 cursor-pointer" />
                            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                            {progress && (
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                    <div className="bg-gray-800 h-1.5 rounded-full" style={{ width: `${progress.percentage}%` }}></div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Deskripsi Singkat</label>
                            <textarea rows="5" value={data.description} onChange={e => setData('description', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"></textarea>
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>

                        <div className="flex justify-end pt-4 border-t mt-6">
                            <button type="submit" disabled={processing} className="w-full sm:w-auto bg-gray-800 text-white px-8 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50 transition-colors">
                                {processing ? 'Menyimpan...' : 'Update Data'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}