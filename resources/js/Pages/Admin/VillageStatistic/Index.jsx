import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ statistics, success }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data statistik ini?')) {
            destroy(route('admin.village-statistics.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Statistik Desa" />

            <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
                    <h1 className="text-2xl font-semibold text-gray-800">Statistik Desa</h1>
                    <Link
                        href={route('admin.village-statistics.create')}
                        className="w-full sm:w-auto text-center bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                    >
                        + Tambah Data
                    </Link>
                </div>

                {success && (
                    <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md shadow-sm">
                        {success}
                    </div>
                )}

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahun</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penduduk</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kepala Keluarga</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dusun</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {statistics.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">
                                            Belum ada data statistik yang ditambahkan.
                                        </td>
                                    </tr>
                                ) : (
                                    statistics.map((stat) => (
                                        <tr key={stat.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{stat.statistic_year}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{stat.total_population} Jiwa</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{stat.total_family_cards} KK</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{stat.total_hamlets} Dusun</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={route('admin.village-statistics.edit', stat.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                                                <button onClick={() => handleDelete(stat.id)} className="text-red-600 hover:text-red-900">Hapus</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}