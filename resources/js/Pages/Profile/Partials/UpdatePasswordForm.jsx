import React, { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { Input, Button, message } from 'antd';
import { LockOutlined, KeyOutlined, SaveOutlined } from '@ant-design/icons';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef(null);
    const currentPasswordInput = useRef(null);

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                message.success('Kata sandi berhasil diperbarui!');
            },
            onError: (err) => {
                if (err.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }
                if (err.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-lg font-bold text-gray-900">Perbarui Kata Sandi</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Pastikan akun Anda menggunakan kata sandi yang panjang dan acak agar tetap aman.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Kata Sandi Saat Ini</label>
                    <Input.Password
                        size="large"
                        prefix={<LockOutlined className="text-gray-400 mr-2" />}
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        className={`rounded-xl ${errors.current_password ? 'border-red-500' : ''}`}
                        status={errors.current_password ? 'error' : ''}
                    />
                    {errors.current_password && <p className="text-red-500 text-xs mt-1">{errors.current_password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Kata Sandi Baru</label>
                    <Input.Password
                        size="large"
                        prefix={<KeyOutlined className="text-blue-400 mr-2" />}
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className={`rounded-xl ${errors.password ? 'border-red-500' : ''}`}
                        status={errors.password ? 'error' : ''}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Konfirmasi Kata Sandi</label>
                    <Input.Password
                        size="large"
                        prefix={<KeyOutlined className="text-blue-400 mr-2" />}
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className={`rounded-xl ${errors.password_confirmation ? 'border-red-500' : ''}`}
                        status={errors.password_confirmation ? 'error' : ''}
                    />
                    {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>}
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={processing}
                        icon={<SaveOutlined />}
                        className="bg-gray-800 hover:bg-gray-900 rounded-xl px-6 h-10 shadow-md"
                    >
                        Simpan Sandi
                    </Button>
                </div>
            </form>
        </section>
    );
}