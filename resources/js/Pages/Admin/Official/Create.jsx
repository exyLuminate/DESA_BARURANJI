import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, InputNumber, Switch, Button, Upload, Alert } from 'antd';
import { 
    SaveOutlined, ArrowLeftOutlined, UserOutlined, 
    IdcardOutlined, CalendarOutlined, CameraOutlined, 
    CrownOutlined, SafetyCertificateOutlined 
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout'; // Sesuaikan path layout Anda

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        position: '',
        photo: null,
        is_village_head: false,
        sort_order: 0,
        period_start: '',
        period_end: '',
        is_active: true,
    });

    const [photoPreview, setPhotoPreview] = useState(null);

    const handlePhotoChange = (info) => {
        const fileList = info.fileList;
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            setData('photo', file);
            setPhotoPreview(URL.createObjectURL(file));
        } else {
            setData('photo', null);
            setPhotoPreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.officials.store'), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Tambah Perangkat Desa" />
            
            {/* Penambahan px-4 sm:px-6 lg:px-8 dan pt-4 sm:pt-0 agar tidak nempel layar HP */}
            <div className="max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-0">
                {/* Header Soft UI */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <Link 
                            href={route('admin.officials.index')}
                            className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition-colors mb-2 text-sm sm:text-base"
                        >
                            <ArrowLeftOutlined className="mr-2" /> Kembali ke Daftar Perangkat
                        </Link>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Tambah Perangkat Desa</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* KOLOM KIRI: Form Pengisian (Lebar 2/3) */}
                    <div className="lg:col-span-2">
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* SECTION 1: Profil & Identitas */}
                            {/* Penyesuaian padding p-5 sm:p-8 untuk mobile */}
                            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-5 sm:p-8">
                                <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center border-b pb-4 mb-6">
                                    <span className="bg-blue-100 text-blue-600 w-8 h-8 flex items-center justify-center rounded-xl mr-3 text-sm"><UserOutlined /></span> 
                                    Profil & Identitas
                                </h2>

                                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-6">
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
                                                    className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full object-cover border-4 border-gray-50 shadow-sm"
                                                />
                                            ) : (
                                                <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-400 transition-colors">
                                                    <CameraOutlined className="text-xl sm:text-2xl mb-1" />
                                                    <div className="text-[10px] sm:text-xs font-medium text-center px-2">Unggah Pas Foto</div>
                                                </div>
                                            )}
                                        </Upload>
                                        <span className="text-[10px] text-gray-400 mt-2">Format: JPG/PNG Maks 2MB</span>
                                        {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
                                    </div>

                                    {/* Input Nama & Jabatan */}
                                    <div className="flex-1 space-y-5 w-full">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap & Gelar <span className="text-red-500">*</span></label>
                                            <Input 
                                                size="large"
                                                prefix={<UserOutlined className="text-gray-400 mr-1" />}
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                placeholder="Contoh: Drs. H. Ahmad Budi"
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
                                                placeholder="Contoh: Sekretaris Desa"
                                                className={`rounded-xl ${errors.position ? 'border-red-500' : ''}`}
                                                status={errors.position ? 'error' : ''}
                                            />
                                            {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 2: Pengaturan & Masa Jabatan */}
                            {/* Penyesuaian padding p-5 sm:p-8 untuk mobile */}
                            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-5 sm:p-8">
                                <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center border-b pb-4 mb-6">
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
                                            placeholder="YYYY (Biarkan kosong jika masih menjabat)"
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
                                        <p className="text-[10px] text-gray-400 mt-1">Angka lebih kecil tampil lebih dulu.</p>
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
                                                Kades Sekarang
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {data.is_village_head && (
                                    <Alert 
                                        message="Perhatian" 
                                        description="Anda menandai profil ini sebagai Kepala Desa. Sistem biasanya hanya menyorot satu Kades aktif. Pastikan status Kades periode sebelumnya telah dinonaktifkan." 
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
                                    /* Ditambahkan w-full sm:w-auto agar full width di HP */
                                    className="bg-gray-900 hover:bg-gray-800 rounded-xl px-8 shadow-md w-full sm:w-auto"
                                >
                                    Simpan Perangkat Desa
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* KOLOM KANAN: Live Preview (Lebar 1/3) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 mt-8 lg:mt-0">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span> Live ID Preview
                            </h3>
                            
                            {/* ID Card Mockup */}
                            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden relative">
                                {/* Hiasan Background Header */}
                                <div className="h-24 bg-gradient-to-r from-gray-800 to-gray-600 w-full absolute top-0 left-0"></div>
                                
                                <div className="p-6 pt-10 relative z-10 flex flex-col items-center text-center mt-2">
                                    {/* Avatar Publik */}
                                    <div className="w-28 h-28 rounded-full bg-white p-1 shadow-md mb-4 relative">
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
                                    <h4 className="text-xl font-bold text-gray-800 mb-1 leading-tight break-words w-full">
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
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${data.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {data.is_active ? 'AKTIF' : 'NONAKTIF'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 text-center mt-4 px-4">Tampilan ini adalah simulasi desain. Tampilan pada website publik dapat menyesuaikan tata letak perangkat.</p>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}