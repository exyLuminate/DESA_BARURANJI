import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ hamlet }) {
    const { data, setData, put, processing, errors } = useForm({
        name: hamlet.name || '',
        total_rt: hamlet.total_rt || 0,
        head_name: hamlet.head_name || '',
        description: hamlet.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.hamlets.update', hamlet.id));
    };

    return (
        <AdminLayout>
            <Head title="Edit Dusun" />
            <div className="py-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
                    <h1 className="text-2xl font-semibold text-gray-800">Edit Dusun</h1>
                    <Link href={route('admin.hamlets.index')} className="text-gray-600 hover:text-gray-900 border sm:border-none px-3 py-1 sm:p-0 rounded-md sm:rounded-none text-sm sm:text-base">
                        &larr; Kembali
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Nama Dusun</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" required />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Kepala Dusun (Opsional)</label>
                                <input type="text" value={data.head_name} onChange={e => setData('head_name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" />
                                {errors.head_name && <p className="text-red-500 text-xs mt-1">{errors.head_name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Jumlah RT</label>
                                <input type="number" min="0" value={data.total_rt} onChange={e => setData('total_rt', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" required />
                                {errors.total_rt && <p className="text-red-500 text-xs mt-1">{errors.total_rt}</p>}
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Deskripsi Singkat (Opsional)</label>
                                <textarea rows="4" value={data.description} onChange={e => setData('description', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"></textarea>
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>
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