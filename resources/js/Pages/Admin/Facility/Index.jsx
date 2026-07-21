import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ facilities, success }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data fasilitas ini?')) {
            destroy(route('admin.facilities.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Fasilitas Desa" />

            <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
                    <h1 className="text-2xl font-semibold text-gray-800">Fasilitas Desa</h1>
                    <Link
                        href={route('admin.facilities.create')}
                        className="w-full sm:w-auto text-center bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                    >
                        + Tambah Fasilitas
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gambar</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Fasilitas</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {facilities.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">
                                            Belum ada data fasilitas desa yang ditambahkan.
                                        </td>
                                    </tr>
                                ) : (
                                    facilities.map((facility) => (
                                        <tr key={facility.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="h-16 w-24 bg-gray-100 rounded border overflow-hidden flex items-center justify-center">
                                                    {facility.image ? (
                                                        <img src={`/storage/${facility.image}`} alt={facility.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <span className="text-xs text-gray-400">No Image</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{facility.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{facility.location || '-'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                <div className="max-w-xs line-clamp-2">{facility.description || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={route('admin.facilities.edit', facility.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                                                <button onClick={() => handleDelete(facility.id)} className="text-red-600 hover:text-red-900">Hapus</button>
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