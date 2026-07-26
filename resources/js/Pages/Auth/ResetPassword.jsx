import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Input, Button } from 'antd';
import { MailOutlined, LockOutlined, KeyOutlined, SafetyOutlined } from '@ant-design/icons';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 relative overflow-hidden font-sans">
            
            {/* Ornamen Latar Belakang */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>

            <Head title="Buat Sandi Baru" />

            <div className="w-full max-w-md relative z-10">
                
                {/* Card Reset Password (Glassmorphism) */}
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-white">
                    
                    <div className="mb-6 text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mb-4 border border-blue-100">
                            <SafetyOutlined className="text-3xl" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900">Buat Sandi Baru</h2>
                        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                            Silakan masukkan kata sandi baru untuk akun Anda. Pastikan sandi yang digunakan kuat dan mudah diingat.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        
                        {/* Input Email (Bawaan dari URL Token) */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Email</label>
                            <Input
                                size="large"
                                type="email"
                                prefix={<MailOutlined className="text-gray-400 mr-2" />}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`rounded-xl py-2 ${errors.email ? 'border-red-500' : ''}`}
                                status={errors.email ? 'error' : ''}
                                readOnly // Biasanya email direadonly karena sudah terikat dengan token
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                        </div>

                        {/* Input Sandi Baru */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Kata Sandi Baru</label>
                            <Input.Password
                                size="large"
                                prefix={<LockOutlined className="text-blue-400 mr-2" />}
                                placeholder="Minimal 8 karakter..."
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`rounded-xl py-2 ${errors.password ? 'border-red-500' : ''}`}
                                status={errors.password ? 'error' : ''}
                                autoFocus
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.password}</p>}
                        </div>

                        {/* Input Konfirmasi Sandi */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Konfirmasi Kata Sandi Baru</label>
                            <Input.Password
                                size="large"
                                prefix={<KeyOutlined className="text-blue-400 mr-2" />}
                                placeholder="Ulangi kata sandi baru..."
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className={`rounded-xl py-2 ${errors.password_confirmation ? 'border-red-500' : ''}`}
                                status={errors.password_confirmation ? 'error' : ''}
                            />
                            {errors.password_confirmation && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.password_confirmation}</p>}
                        </div>

                        <div className="pt-2">
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                size="large" 
                                block 
                                loading={processing}
                                className="bg-blue-600 hover:bg-blue-700 rounded-xl h-12 text-base font-bold shadow-md shadow-blue-200"
                            >
                                Simpan Sandi Baru
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}