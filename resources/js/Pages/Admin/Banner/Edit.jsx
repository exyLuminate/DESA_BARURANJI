import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import BannerForm from '@/Components/BannerForm';

export default function Edit({ banner }) {
    return (
        <AdminLayout>
            <Head title="Edit Banner" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">
                        Edit Banner
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Perbarui informasi banner homepage.
                    </p>
                </div>

                <BannerForm
                    mode="edit"
                    banner={banner}
                />
            </div>
        </AdminLayout>
    );
}