import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, InputNumber, Switch, Button, Upload, Alert, Popconfirm } from 'antd';
import { 
    SaveOutlined, ArrowLeftOutlined, UserOutlined, 
    IdcardOutlined, CalendarOutlined, CameraOutlined, 
    CrownOutlined, SafetyCertificateOutlined, DeleteOutlined 
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout'; // Sesuaikan path layout Anda

export default function Edit({ official }) {
    // Tambahkan _method: 'put' dan fungsi 'delete: destroy'
    const { data, setData, post, processing, errors, delete: destroy } = useForm({
        name: official.name || '',
        position: official.position || '',
        photo: null, 
        is_village_head: official.is_village_head || false,
        sort_order: official.sort_order || 0,
        period_start: official.period_start || '',
        period_end: official.period_end || '',
        is_active: official.is_active ?? true,
        _method: 'put', // Requirement Laravel untuk multipart/form-data update
    });

    const [photoPreview, setPhotoPreview] = useState(official.photo ? `/storage/${official.photo}` : null);
    const [isPhotoChanged, setIsPhotoChanged] = useState(false);

    const handlePhotoChange = (info) => {
        const fileList = info.fileList;
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            setData('photo', file);
            setPhotoPreview(URL.createObjectURL(file));
            setIsPhotoChanged(true);
        } else {
            // Jika dihapus, kembalikan ke foto lama
            setData('photo', null);
            setPhotoPreview(official.photo ? `/storage/${official.photo}` : null);
            setIsPhotoChanged(false);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        // Menggunakan post dengan forceFormData karena ada file upload
        post(route('admin.officials.update', official.id), {
            forceFormData: true,
        });
    };

    const handleDelete = () => {
        destroy(route('admin.officials.destroy', official.id));
    };

    return (
        <AdminLayout>
            <Head title={`Edit Profil - ${data.name}`} />
            
            <div className="max-w-7xl mx-auto pb-10">
                {/* Header Soft UI */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <Link 
                            href={route('admin.officials.index')}
                            className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition-colors mb-2"
                        >
                            <ArrowLeftOutlined className="mr-2" /> Kembali ke Daftar Perangkat
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Edit Perangkat Desa</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* KOLOM KIRI: Form Pengisian (Lebar 2/3) */}
                    <div className="lg:col-span-2">
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* SECTION 1: Profil & Identitas */}
                            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center border-b pb-4 mb-6">
                                    <span className="bg-blue-100 text-blue-600 w-8 h-8 flex items-center justify-center rounded-xl mr-3 text-sm"><UserOutlined /></span> 
                                    Profil & Identitas
                                </h2>

                                <div className="flex flex-col sm:flex-row gap-8 mb-6">
                                    {/* Circular Avatar Uploader */}
                                    <div className="shrink-0 flex flex-col items-center">
                                        <Upload
                                            name="avatar"
                                            listType="picture-circle"
                                            className="avatar-uploader-custom"
                                            showUploadList={false}
                                            beforeUpload={() => false}
                                            onChange={handlePhotoChange}
                                        >
                                            {photoPreview ? (
                                                <img 
                                                    src={photoPreview} 
                                                    alt="Avatar" 
                                                    className={`w-[120px] h-[120px] rounded-full object-cover border-4 shadow-sm transition-all duration-300 ${isPhotoChanged ? 'border-blue-200' : 'border-gray-50'}`}
                                                />
                                            ) : (
                                                <div className="w-[120px] h-[120px] rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-400 transition-colors">
                                                    <CameraOutlined className="text-2xl mb-1" />
                                                    <div className="text-xs font-medium">Unggah Pas Foto</div>
                                                </div>
                                            )}
                                        </Upload>
                                        <span className="text-[10px] text-gray-400 mt-2">
                                            {isPhotoChanged ? 'Foto baru siap diunggah' : 'Klik foto untuk mengganti'}
                                        </span>
                                        {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
                                    </div>

                                    {/* Input Nama & Jabatan */}
                                    <div className="flex-1 space-y-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap & Gelar <span className="text-red-500">*</span></label>
                                            <Input 
                                                size="large"
                                                prefix={<UserOutlined className="text-gray-400 mr-1" />}
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className={`rounded-xl ${errors.name ? 'border-red-500' : ''}`}
                                                status={errors.name ? 'error' : ''}
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Posisi / Jabatan <span className="text-red-500">*</span></label>
                                            <Input 
                                                size="large"
                                                prefix={<IdcardOutlined className="text-gray-400 mr-1" />}
                                                value={data.position}
                                                onChange={e => setData('position', e.target.value)}
                                                className={`rounded-xl ${errors.position ? 'border-red-500' : ''}`}
                                                status={errors.position ? 'error' : ''}
                                            />
                                            {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 2: Pengaturan & Masa Jabatan */}
                            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center border-b pb-4 mb-6">
                                    <span className="bg-purple-100 text-purple-600 w-8 h-8 flex items-center justify-center rounded-xl mr-3 text-sm"><SafetyCertificateOutlined /></span> 
                                    Masa Jabatan & Pengaturan
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Tahun Mulai (Opsional)</label>
                                        <InputNumber 
                                            size="large"
                                            prefix={<CalendarOutlined className="text-gray-400 mr-1" />}
                                            min={1900} max={2100}
                                            value={data.period_start}
                                            onChange={val => setData('period_start', val)}
                                            placeholder="YYYY"
                                            className="w-full rounded-xl"
                                        />
                                        {errors.period_start && <p className="text-red-500 text-xs mt-1">{errors.period_start}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Tahun Selesai (Opsional)</label>
                                        <InputNumber 
                                            size="large"
                                            prefix={<CalendarOutlined className="text-gray-400 mr-1" />}
                                            min={1900} max={2100}
                                            value={data.period_end}
                                            onChange={val => setData('period_end', val)}
                                            placeholder="YYYY"
                                            className="w-full rounded-xl"
                                        />
                                        {errors.period_end && <p className="text-red-500 text-xs mt-1">{errors.period_end}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Urutan Tampil</label>
                                        <InputNumber 
                                            size="large"
                                            min={0}
                                            value={data.sort_order}
                                            onChange={val => setData('sort_order', val)}
                                            className="w-full rounded-xl"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Status Aktif</label>
                                        <div className="flex items-center">
                                            <Switch checked={data.is_active} onChange={checked => setData('is_active', checked)} className="mr-3" />
                                            <span className={`text-xs font-medium ${data.is_active ? 'text-green-600' : 'text-gray-400'}`}>
                                                {data.is_active ? 'Sedang Menjabat' : 'Nonaktif'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Hak Akses Khusus</label>
                                        <div className="flex items-center">
                                            <Switch checked={data.is_village_head} onChange={checked => setData('is_village_head', checked)} className="mr-3" />
                                            <span className={`text-xs font-medium ${data.is_village_head ? 'text-yellow-600' : 'text-gray-400'}`}>
                                                Kades Tertinggi
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {data.is_village_head && (
                                    <Alert 
                                        message="Perhatian" 
                                        description="Profil ini ditandai sebagai Kepala Desa. Pastikan Kepala Desa periode sebelumnya sudah dinonaktifkan agar tidak ada duplikasi di halaman publik." 
                                        type="warning" 
                                        showIcon 
                                        className="mt-4 rounded-xl"
                                    />
                                )}
                            </div>

                            {/* Floating Action Bar */}
                            <div className="flex justify-end mt-8">
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    size="large"
                                    loading={processing}
                                    icon={<SaveOutlined />}
                                    className="bg-gray-900 hover:bg-gray-800 rounded-xl px-8 shadow-md"
                                >
                                    Update Perangkat Desa
                                </Button>
                            </div>
                        </form>

                        {/* Danger Zone (Hapus Langsung) */}
                        <div className="mt-8 bg-red-50/50 border border-red-100 rounded-3xl p-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-red-700 font-bold text-lg mb-1">Danger Zone</h3>
                                    <p className="text-red-500 text-sm">Menghapus perangkat desa akan menghilangkan profilnya dari struktur organisasi publik.</p>
                                </div>
                                <Popconfirm
                                    title="Hapus Perangkat Desa?"
                                    description="Tindakan ini akan memindahkan data ke *trash* (Soft Delete)."
                                    onConfirm={handleDelete}
                                    okText="Ya, Hapus"
                                    cancelText="Batal"
                                    okButtonProps={{ danger: true }}
                                >
                                    <Button danger type="primary" icon={<DeleteOutlined />} size="large" className="rounded-xl shadow-sm shadow-red-200 shrink-0">
                                        Hapus Profil
                                    </Button>
                                </Popconfirm>
                            </div>
                        </div>

                    </div>

                    {/* KOLOM KANAN: Live Preview (Lebar 1/3) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> ID Card Preview
                            </h3>
                            
                            {/* ID Card Mockup */}
                            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden relative">
                                {/* Hiasan Background Header */}
                                <div className="h-24 bg-gradient-to-r from-gray-800 to-gray-600 w-full absolute top-0 left-0"></div>
                                
                                <div className="p-6 pt-10 relative z-10 flex flex-col items-center text-center mt-2">
                                    {/* Avatar Publik */}
                                    <div className="w-28 h-28 rounded-full bg-white p-1 shadow-md mb-4 relative transition-transform duration-300 hover:scale-105">
                                        {photoPreview ? (
                                            <img src={photoPreview} alt="Profil" className="w-full h-full object-cover rounded-full" />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                                                <UserOutlined className="text-4xl text-gray-300" />
                                            </div>
                                        )}
                                        {data.is_village_head && (
                                            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm" title="Kepala Desa">
                                                <CrownOutlined className="text-lg" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Judul & Teks */}
                                    <h4 className="text-xl font-bold text-gray-800 mb-1 leading-tight">
                                        {data.name || 'Nama Lengkap'}
                                    </h4>
                                    
                                    <p className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">
                                        {data.position || 'JABATAN'}
                                    </p>
                                    
                                    <div className="w-full border-t border-gray-100 border-dashed pt-4 flex justify-between px-2">
                                        <div className="text-left">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Masa Jabatan</p>
                                            <p className="text-xs font-semibold text-gray-700">
                                                {data.period_start || '?'} - {data.period_end || 'Sekarang'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Status</p>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${data.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {data.is_active ? 'AKTIF' : 'NONAKTIF'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}