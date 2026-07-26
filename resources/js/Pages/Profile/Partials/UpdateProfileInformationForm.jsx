import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Input, Button, message } from 'antd';
import { SaveOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => message.success('Informasi profil berhasil diperbarui!'),
        });
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-lg font-bold text-gray-900">Informasi Profil</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Perbarui nama akun dan alamat email Anda di sini.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                    <Input
                        size="large"
                        prefix={<UserOutlined className="text-gray-400 mr-2" />}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={`rounded-xl ${errors.name ? 'border-red-500' : ''}`}
                        status={errors.name ? 'error' : ''}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Email</label>
                    <Input
                        size="large"
                        type="email"
                        prefix={<MailOutlined className="text-gray-400 mr-2" />}
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className={`rounded-xl ${errors.email ? 'border-red-500' : ''}`}
                        status={errors.email ? 'error' : ''}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                        <p className="text-sm text-yellow-800">
                            Alamat email Anda belum diverifikasi.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 font-bold underline hover:text-yellow-900 focus:outline-none"
                            >
                                Klik di sini untuk mengirim ulang email verifikasi.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                Link verifikasi baru telah dikirim ke alamat email Anda.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={processing}
                        icon={<SaveOutlined />}
                        className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 h-10 shadow-md shadow-blue-200"
                    >
                        Simpan Perubahan
                    </Button>
                </div>
            </form>
        </section>
    );
}