import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, InputNumber, Button, Popconfirm } from 'antd';
import { 
    SaveOutlined, ArrowLeftOutlined, EnvironmentOutlined, 
    UserOutlined, HomeOutlined, FileTextOutlined, DeleteOutlined 
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout';

const { TextArea } = Input;

export default function Edit({ hamlet }) {
    const { data, setData, put, processing, errors, delete: destroy } = useForm({
        name: hamlet.name || '',
        total_rt: hamlet.total_rt || 0,
        head_name: hamlet.head_name || '',
        description: hamlet.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.hamlets.update', hamlet.id));
    };

    const handleDelete = () => {
        destroy(route('admin.hamlets.destroy', hamlet.id));
    };

    return (
        <AdminLayout>
            <Head title={`Edit Dusun - ${data.name}`} />
            
            <div className="py-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                
                {/* Header Soft UI */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link 
                            href={route('admin.hamlets.index')}
                            className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition-colors mb-2"
                        >
                            <ArrowLeftOutlined className="mr-2" /> Kembali ke Daftar Dusun
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800 break-words">Edit Dusun: {data.name}</h1>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden mb-8">
                    {/* Aksen Header Card */}
                    <div className="h-3 bg-gradient-to-r from-green-400 to-blue-500 w-full"></div>
                    
                    <form onSubmit={submit} className="p-6 md:p-8 space-y-6 md:space-y-8">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            
                            {/* Input Nama Dusun */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Dusun <span className="text-red-500">*</span></label>
                                <Input 
                                    size="large"
                                    prefix={<EnvironmentOutlined className="text-gray-400 mr-2" />}
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="Contoh: Dusun I"
                                    className={`rounded-xl ${errors.name ? 'border-red-500' : ''}`}
                                    status={errors.name ? 'error' : ''}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            {/* Input Kepala Dusun */}
                            <div className="col-span-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Kepala Dusun (Opsional)</label>
                                <Input 
                                    size="large"
                                    prefix={<UserOutlined className="text-gray-400 mr-2" />}
                                    value={data.head_name}
                                    onChange={e => setData('head_name', e.target.value)}
                                    placeholder={hamlet.head_name ? "Nama Kepala Dusun" : "Belum ada Kepala Dusun yang didata"}
                                    className={`rounded-xl ${errors.head_name ? 'border-red-500' : ''}`}
                                    status={errors.head_name ? 'error' : ''}
                                />
                                {errors.head_name && <p className="text-red-500 text-xs mt-1">{errors.head_name}</p>}
                            </div>

                            {/* Input Jumlah RT */}
                            <div className="col-span-1">
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
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                    <FileTextOutlined className="text-gray-400 mr-2" /> Deskripsi Singkat Wilayah (Opsional)
                                </label>
                                <TextArea 
                                    rows={4}
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    placeholder={hamlet.description ? "Deskripsi dusun..." : "Ceritakan sedikit tentang potensi atau batas wilayah dusun ini untuk melengkapi data."}
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
                                className="w-full md:w-auto bg-gray-900 hover:bg-gray-800 rounded-xl px-8 shadow-md"
                            >
                                Simpan Perubahan
                            </Button>
                        </div>

                    </form>
                </div>

                {/* Danger Zone (Responsive) */}
                <div className="bg-red-50/50 border border-red-100 rounded-3xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="w-full md:w-auto">
                            <h3 className="text-red-700 font-bold text-lg mb-1">Danger Zone</h3>
                            <p className="text-red-500 text-sm">Menghapus dusun akan menghilangkan wilayah ini dari data pemetaan desa.</p>
                        </div>
                        <Popconfirm
                            title={`Hapus ${data.name}?`}
                            description="Tindakan ini tidak dapat dibatalkan."
                            onConfirm={handleDelete}
                            okText="Ya, Hapus"
                            cancelText="Batal"
                            okButtonProps={{ danger: true }}
                        >
                            <Button danger type="primary" icon={<DeleteOutlined />} size="large" className="w-full md:w-auto rounded-xl shadow-sm shadow-red-200 shrink-0">
                                Hapus Dusun
                            </Button>
                        </Popconfirm>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}