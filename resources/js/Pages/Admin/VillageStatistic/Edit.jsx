import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ statistic }) {
    const { data, setData, put, processing, errors } = useForm({
        statistic_year: statistic.statistic_year || '',
        total_population: statistic.total_population || 0,
        total_family_cards: statistic.total_family_cards || 0,
        total_male: statistic.total_male || 0,
        total_female: statistic.total_female || 0,
        total_hamlets: statistic.total_hamlets || 0,
        total_rt: statistic.total_rt || 0,
        pre_prosperous: statistic.pre_prosperous || 0,
        ks_1: statistic.ks_1 || 0,
        ks_2: statistic.ks_2 || 0,
        ks_3: statistic.ks_3 || 0,
        ks_3_plus: statistic.ks_3_plus || 0,
    });

    const submit = (e) => {
        e.preventDefault();
        // Menggunakan PUT karena tidak ada upload file gambar di sini
        put(route('admin.village-statistics.update', statistic.id));
    };

    return (
        <AdminLayout>
            <Head title="Edit Statistik Desa" />
            <div className="py-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
                    <h1 className="text-2xl font-semibold text-gray-800">Edit Statistik Desa</h1>
                    <Link href={route('admin.village-statistics.index')} className="text-gray-600 hover:text-gray-900 border sm:border-none px-3 py-1 sm:p-0 rounded-md sm:rounded-none text-sm sm:text-base">
                        &larr; Kembali
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-8">
                        {/* Section: Tahun & Umum */}
                        <div>
                            <h2 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Tahun Data</h2>
                            <div className="max-w-xs">
                                <label className="block text-sm font-medium text-gray-700">Tahun Statistik</label>
                                <input type="number" min="1900" max="2100" value={data.statistic_year} onChange={e => setData('statistic_year', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm font-bold" required />
                                {errors.statistic_year && <p className="text-red-500 text-xs mt-1">{errors.statistic_year}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Kiri: Demografi */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Demografi & Penduduk</h2>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Total Penduduk</label>
                                        <input type="number" min="0" value={data.total_population} onChange={e => setData('total_population', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" required />
                                        {errors.total_population && <p className="text-red-500 text-xs mt-1">{errors.total_population}</p>}
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Total Kepala Keluarga (KK)</label>
                                        <input type="number" min="0" value={data.total_family_cards} onChange={e => setData('total_family_cards', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" required />
                                        {errors.total_family_cards && <p className="text-red-500 text-xs mt-1">{errors.total_family_cards}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Laki-laki</label>
                                        <input type="number" min="0" value={data.total_male} onChange={e => setData('total_male', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" required />
                                        {errors.total_male && <p className="text-red-500 text-xs mt-1">{errors.total_male}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Perempuan</label>
                                        <input type="number" min="0" value={data.total_female} onChange={e => setData('total_female', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" required />
                                        {errors.total_female && <p className="text-red-500 text-xs mt-1">{errors.total_female}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Kanan: Administratif & Kesejahteraan */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Wilayah Administratif</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Total Dusun</label>
                                            <input type="number" min="0" value={data.total_hamlets} onChange={e => setData('total_hamlets', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" required />
                                            {errors.total_hamlets && <p className="text-red-500 text-xs mt-1">{errors.total_hamlets}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Total RT</label>
                                            <input type="number" min="0" value={data.total_rt} onChange={e => setData('total_rt', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" required />
                                            {errors.total_rt && <p className="text-red-500 text-xs mt-1">{errors.total_rt}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Tingkat Kesejahteraan (KK)</h2>
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Pra Sejahtera</label>
                                            <input type="number" min="0" value={data.pre_prosperous} onChange={e => setData('pre_prosperous', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" required />
                                            {errors.pre_prosperous && <p className="text-red-500 text-xs mt-1">{errors.pre_prosperous}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">KS 1</label>
                                            <input type="number" min="0" value={data.ks_1} onChange={e => setData('ks_1', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" required />
                                            {errors.ks_1 && <p className="text-red-500 text-xs mt-1">{errors.ks_1}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">KS 2</label>
                                            <input type="number" min="0" value={data.ks_2} onChange={e => setData('ks_2', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" required />
                                            {errors.ks_2 && <p className="text-red-500 text-xs mt-1">{errors.ks_2}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">KS 3</label>
                                            <input type="number" min="0" value={data.ks_3} onChange={e => setData('ks_3', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" required />
                                            {errors.ks_3 && <p className="text-red-500 text-xs mt-1">{errors.ks_3}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">KS 3+</label>
                                            <input type="number" min="0" value={data.ks_3_plus} onChange={e => setData('ks_3_plus', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" required />
                                            {errors.ks_3_plus && <p className="text-red-500 text-xs mt-1">{errors.ks_3_plus}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 border-t mt-8">
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