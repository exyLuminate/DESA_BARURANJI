import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard() {
    return (
        <AdminLayout>
            <div className="rounded-xl bg-white p-6 shadow">
                <h1 className="text-2xl font-bold">
                    Dashboard CMS Desa Baru Ranji
                </h1>

                <p className="mt-2 text-gray-600">
                    Selamat datang di panel administrasi website desa.
                </p>
            </div>
        </AdminLayout>
    );
}