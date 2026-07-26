import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, Button, Checkbox, Alert } from 'antd';
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 relative overflow-hidden font-sans">
            
            {/* Ornamen Latar Belakang (Circles) */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>

            <Head title="Masuk ke Sistem" />

            <div className="w-full max-w-md relative z-10">
                
                {/* Logo & Judul */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-200 mb-4">
                        <LoginOutlined className="text-3xl" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">CMS <span className="text-blue-600">Desa Baru Ranji</span></h1>
                    <p className="text-gray-500 mt-2 font-medium">Masuk untuk mengelola portal informasi desa.</p>
                </div>

                {/* Card Login (Glassmorphism) */}
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-white">
                    
                    {status && (
                        <Alert message={status} type="success" showIcon className="mb-6 rounded-xl border-green-200 bg-green-50" />
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        
                        {/* Input Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Email</label>
                            <Input
                                size="large"
                                type="email"
                                prefix={<MailOutlined className="text-gray-400 mr-2" />}
                                placeholder="admin@desa.go.id"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`rounded-xl py-2 ${errors.email ? 'border-red-500' : ''}`}
                                status={errors.email ? 'error' : ''}
                                autoFocus
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                        </div>

                        {/* Input Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Kata Sandi</label>
                            <Input.Password
                                size="large"
                                prefix={<LockOutlined className="text-gray-400 mr-2" />}
                                placeholder="••••••••"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`rounded-xl py-2 ${errors.password ? 'border-red-500' : ''}`}
                                status={errors.password ? 'error' : ''}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.password}</p>}
                        </div>

                        {/* Fitur Bawah: Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between pt-2">
                            <Checkbox 
                                checked={data.remember} 
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="text-gray-600 font-medium"
                            >
                                Ingat Saya
                            </Checkbox>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    Lupa sandi?
                                </Link>
                            )}
                        </div>

                        {/* Tombol Submit */}
                        <div className="pt-4">
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                size="large" 
                                block 
                                loading={processing}
                                className="bg-blue-600 hover:bg-blue-700 rounded-xl h-12 text-base font-bold shadow-md shadow-blue-200"
                            >
                                Masuk ke Dashboard
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Footer Copyright */}
                <p className="text-center text-gray-400 text-sm mt-8 font-medium">
                    &copy; {new Date().getFullYear()} Desa Baru Ranji.
                </p>
            </div>
        </div>
    );
}