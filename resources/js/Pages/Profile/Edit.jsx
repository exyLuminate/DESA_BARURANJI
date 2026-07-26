import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AdminLayout>
            <Head title="Profil Saya" />

            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
                {/* Header Section */}
                <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Profil Saya</h1>
                        <p className="text-gray-500 text-sm">Kelola informasi akun, alamat email, dan pengaturan keamanan Anda.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Card 1: Informasi Profil */}
                    <div className="bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl border border-gray-100">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Card 2: Update Password */}
                    <div className="bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl border border-gray-100">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Card 3: Delete Account */}
                    <div className="bg-red-50/50 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl border border-red-100">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}