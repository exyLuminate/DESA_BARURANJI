import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ banners = [] }) {

    const handleDelete = (banner) => {
        if (
            !confirm(
                `Yakin ingin menghapus banner "${banner.title ?? 'Tanpa Judul'}"?`
            )
        ) {
            return;
        }

        router.delete(
            route('admin.banners.destroy', banner.id),
            {
                preserveScroll: true,
            }
        );
    };

    const toggleBanner = (banner) => {
        router.patch(
            route(
                'admin.banners.toggle',
                banner.id
            ),
            {},
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <AdminLayout>
            <Head title="Banner Management" />

            <div className="space-y-6">

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Banner Management
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Kelola banner homepage website desa.
                        </p>
                    </div>

                    <Link
                        href={route('admin.banners.create')}
                        className="px-5 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                    >
                        Tambah Banner
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow overflow-hidden">

                    {banners.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            Belum ada banner yang dibuat.
                        </div>
                    ) : (
                        <table className="w-full">

                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-6 py-4">
                                        Banner
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Sort Order
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Status
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {banners.map((banner) => (
                                    <tr
                                        key={banner.id}
                                        className="border-b"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">

                                                <img
                                                    src={`/storage/${banner.image}`}
                                                    alt={banner.title}
                                                    className="w-32 h-20 rounded-lg object-cover"
                                                />

                                                <div>
                                                    <h3 className="font-semibold">
                                                        {banner.title ?? 'Tanpa Judul'}
                                                    </h3>

                                                    <p className="text-sm text-gray-500 line-clamp-2">
                                                        {banner.subtitle ?? '-'}
                                                    </p>
                                                </div>

                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            {banner.sort_order}
                                        </td>

                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleBanner(banner)}
                                                className={`px-3 py-1 rounded-full text-sm transition ${
                                                    banner.is_active
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                }`}
                                            >
                                                {banner.is_active
                                                    ? 'Aktif'
                                                    : 'Nonaktif'}
                                            </button>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex gap-3">

                                                <Link
                                                    href={route(
                                                        'admin.banners.edit',
                                                        banner.id
                                                    )}
                                                    className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(banner)
                                                    }
                                                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                                                >
                                                    Hapus
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>
                    )}

                </div>

            </div>
        </AdminLayout>
    );
}