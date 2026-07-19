import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import BannerForm from '@/Components/BannerForm';

export default function Create() {
    return (
        <AdminLayout>
            <Head title="Tambah Banner" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">
                        Tambah Banner
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Tambahkan banner baru untuk homepage desa.
                    </p>
                </div>

                <BannerForm mode="create" />
            </div>
        </AdminLayout>
    );
}