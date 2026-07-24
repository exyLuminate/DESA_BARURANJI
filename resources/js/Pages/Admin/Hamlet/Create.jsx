import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, InputNumber, Button } from 'antd';
import { 
    SaveOutlined, ArrowLeftOutlined, EnvironmentOutlined, 
    UserOutlined, HomeOutlined, FileTextOutlined 
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout'; // Sesuaikan path layout Anda

const { TextArea } = Input;

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        total_rt: 0,
        head_name: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.hamlets.store'));
    };

    return (
        <AdminLayout>
            <Head title="Tambah Dusun" />
            
            <div className="py-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                
                {/* Header Soft UI */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <Link 
                            href={route('admin.hamlets.index')}
                            className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition-colors mb-2"
                        >
                            <ArrowLeftOutlined className="mr-2" /> Kembali ke Daftar Dusun
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Tambah Dusun Baru</h1>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                    {/* Aksen Header Card */}
                    <div className="h-3 bg-gradient-to-r from-green-400 to-blue-500 w-full"></div>
                    
                    <form onSubmit={submit} className="p-8 space-y-8">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* Input Nama Dusun */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Dusun <span className="text-red-500">*</span></label>
                                <Input 
                                    size="large"
                                    prefix={<EnvironmentOutlined className="text-gray-400 mr-2" />}
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="Contoh: Dusun I, Dusun Suka Maju..."
                                    className={`rounded-xl ${errors.name ? 'border-red-500' : ''}`}
                                    status={errors.name ? 'error' : ''}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            {/* Input Kepala Dusun */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Kepala Dusun (Opsional)</label>
                                <Input 
                                    size="large"
                                    prefix={<UserOutlined className="text-gray-400 mr-2" />}
                                    value={data.head_name}
                                    onChange={e => setData('head_name', e.target.value)}
                                    placeholder="Masukkan nama kepala dusun"
                                    className={`rounded-xl ${errors.head_name ? 'border-red-500' : ''}`}
                                    status={errors.head_name ? 'error' : ''}
                                />
                                {errors.head_name && <p className="text-red-500 text-xs mt-1">{errors.head_name}</p>}
                            </div>

                            {/* Input Jumlah RT */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah RT <span className="text-red-500">*</span></label>
                                <InputNumber 
                                    size="large"
                                    min={0}
                                    prefix={<HomeOutlined className="text-gray-400 mr-2" />}
                                    value={data.total_rt}
                                    onChange={val => setData('total_rt', val)}
                                    className={`w-full rounded-xl ${errors.total_rt ? 'border-red-500' : ''}`}
                                    status={errors.total_rt ? 'error' : ''}
                                />
                                {errors.total_rt && <p className="text-red-500 text-xs mt-1">{errors.total_rt}</p>}
                            </div>

                            {/* Input Deskripsi */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                    <FileTextOutlined className="text-gray-400 mr-2" /> Deskripsi Singkat Wilayah (Opsional)
                                </label>
                                <TextArea 
                                    rows={4}
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    placeholder="Jelaskan secara singkat mengenai batas wilayah, potensi, atau karakteristik dusun ini..."
                                    className={`rounded-xl ${errors.description ? 'border-red-500' : ''}`}
                                    status={errors.description ? 'error' : ''}
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>

                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end pt-6 border-t border-gray-100">
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                size="large"
                                loading={processing}
                                icon={<SaveOutlined />}
                                className="bg-gray-900 hover:bg-gray-800 rounded-xl px-8 shadow-md"
                            >
                                Simpan Dusun Baru
                            </Button>
                        </div>

                    </form>
                </div>

            </div>
        </AdminLayout>
    );
}