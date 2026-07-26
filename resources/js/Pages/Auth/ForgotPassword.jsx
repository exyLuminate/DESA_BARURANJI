import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, Button, Alert } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 relative overflow-hidden font-sans">
            
            {/* Ornamen Latar Belakang */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>

            <Head title="Lupa Kata Sandi" />

            <div className="w-full max-w-md relative z-10">
                
                {/* Tombol Kembali ke Login */}
                <div className="mb-6 text-center sm:text-left">
                    <Link href={route('login')} className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">
                        <ArrowLeftOutlined className="mr-2" /> Kembali ke Login
                    </Link>
                </div>

                {/* Card Forgot Password (Glassmorphism) */}
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-white">
                    
                    <div className="mb-6 text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mb-4 border border-blue-100">
                            <MailOutlined className="text-2xl" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900">Lupa Kata Sandi?</h2>
                        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                            Tidak masalah. Masukkan alamat email Anda dan kami akan mengirimkan tautan untuk membuat kata sandi baru.
                        </p>
                    </div>

                    {status && (
                        <Alert message={status} type="success" showIcon className="mb-6 rounded-xl border-green-200 bg-green-50" />
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Email Terdaftar</label>
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

                        <div className="pt-2">
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                size="large" 
                                block 
                                loading={processing}
                                className="bg-blue-600 hover:bg-blue-700 rounded-xl h-12 text-base font-bold shadow-md shadow-blue-200"
                            >
                                Kirim Tautan Reset
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}