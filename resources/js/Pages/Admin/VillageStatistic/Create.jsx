import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { InputNumber, Button, Alert } from 'antd';
import { 
    SaveOutlined, ArrowLeftOutlined, CalendarOutlined, 
    TeamOutlined, EnvironmentOutlined, HeartOutlined, 
    ManOutlined, WomanOutlined, HomeOutlined 
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout'; 

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        statistic_year: new Date().getFullYear(),
        total_population: 0,
        total_family_cards: 0,
        total_male: 0,
        total_female: 0,
        total_hamlets: 0,
        total_rt: 0,
        pre_prosperous: 0,
        ks_1: 0,
        ks_2: 0,
        ks_3: 0,
        ks_3_plus: 0,
    });

    // Real-time Auto-Calculation Validation
    const totalGender = (data.total_male || 0) + (data.total_female || 0);
    const isPopulationMatch = totalGender === (data.total_population || 0);
    
    const totalKs = (data.pre_prosperous || 0) + (data.ks_1 || 0) + (data.ks_2 || 0) + (data.ks_3 || 0) + (data.ks_3_plus || 0);
    const isKsMatch = totalKs === (data.total_family_cards || 0);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.village-statistics.store'));
    };

    return (
        <AdminLayout>
            <Head title="Tambah Statistik Desa" />
            
            {/* Tambahan padding responsif px-4 sm:px-6 */}
            <div className="max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-0">
                
                {/* Header Soft UI */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <Link 
                            href={route('admin.village-statistics.index')}
                            className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium transition-colors mb-2 text-sm sm:text-base"
                        >
                            <ArrowLeftOutlined className="mr-2" /> Kembali ke Daftar
                        </Link>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Tambah Statistik Desa</h1>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    
                    {/* SECTION 1: TAHUN DATA (Atas, Lebar Penuh) */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100 p-5 sm:p-6 flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                        <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl shadow-sm text-blue-600 text-xl sm:text-2xl shrink-0">
                            <CalendarOutlined />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-1">Tahun Pendataan</h2>
                            <p className="text-xs sm:text-sm text-gray-500">Pilih tahun statistik. Satu tahun hanya boleh memiliki satu data statistik resmi.</p>
                        </div>
                        <div className="w-full md:w-auto">
                            <InputNumber 
                                min={2000} 
                                max={2100} 
                                size="large"
                                value={data.statistic_year} 
                                onChange={val => setData('statistic_year', val)} 
                                className={`w-full md:w-48 rounded-xl text-center text-lg font-bold ${errors.statistic_year ? 'border-red-500' : ''}`} 
                                status={errors.statistic_year ? 'error' : ''}
                            />
                            {errors.statistic_year && <p className="text-red-500 text-xs mt-1 text-center">{errors.statistic_year}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* KIRI: DEMOGRAFI */}
                        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-5 sm:p-8 space-y-6">
                            <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center border-b pb-4">
                                <span className="bg-blue-100 text-blue-600 w-8 h-8 flex items-center justify-center rounded-xl mr-3 text-sm"><TeamOutlined /></span> 
                                Demografi & Penduduk
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Total Penduduk (Jiwa)</label>
                                    <InputNumber min={0} size="large" className="w-full rounded-xl" value={data.total_population} onChange={val => setData('total_population', val)} status={errors.total_population ? 'error' : ''} />
                                    {errors.total_population && <p className="text-red-500 text-xs mt-1">{errors.total_population}</p>}
                                </div>
                                
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 grid grid-cols-2 gap-4 relative">
                                    <div>
                                        <label className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 mb-2 line-clamp-1"><ManOutlined className="text-blue-500 mr-1"/> Laki-laki</label>
                                        <InputNumber min={0} size="large" className="w-full rounded-xl" value={data.total_male} onChange={val => setData('total_male', val)} status={errors.total_male ? 'error' : ''} />
                                    </div>
                                    <div>
                                        <label className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 mb-2 line-clamp-1"><WomanOutlined className="text-pink-500 mr-1"/> Perempuan</label>
                                        <InputNumber min={0} size="large" className="w-full rounded-xl" value={data.total_female} onChange={val => setData('total_female', val)} status={errors.total_female ? 'error' : ''} />
                                    </div>
                                    
                                    {/* Smart Validation Indicator */}
                                    <div className="col-span-2 mt-1">
                                        {data.total_population > 0 && !isPopulationMatch && (
                                            <Alert message={`Total Gender (${totalGender}) tidak sama dengan Total Penduduk (${data.total_population}).`} type="warning" showIcon className="rounded-xl py-1 text-xs" />
                                        )}
                                        {data.total_population > 0 && isPopulationMatch && (
                                            <Alert message="Jumlah sesuai" type="success" showIcon className="rounded-xl py-1 text-xs" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* KANAN: KESEJAHTERAAN & WILAYAH */}
                        <div className="space-y-6">
                            
                            {/* Kesejahteraan */}
                            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-5 sm:p-8">
                                <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center border-b pb-4 mb-5">
                                    <span className="bg-green-100 text-green-600 w-8 h-8 flex items-center justify-center rounded-xl mr-3 text-sm"><HeartOutlined /></span> 
                                    Kesejahteraan Keluarga
                                </h2>

                                <div className="mb-5">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Total Kepala Keluarga (KK)</label>
                                    <InputNumber min={0} size="large" className="w-full rounded-xl" value={data.total_family_cards} onChange={val => setData('total_family_cards', val)} status={errors.total_family_cards ? 'error' : ''} />
                                    {errors.total_family_cards && <p className="text-red-500 text-xs mt-1">{errors.total_family_cards}</p>}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">Pra Sejahtera</label>
                                        <InputNumber min={0} className="w-full rounded-lg" value={data.pre_prosperous} onChange={val => setData('pre_prosperous', val)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">KS 1</label>
                                        <InputNumber min={0} className="w-full rounded-lg" value={data.ks_1} onChange={val => setData('ks_1', val)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">KS 2</label>
                                        <InputNumber min={0} className="w-full rounded-lg" value={data.ks_2} onChange={val => setData('ks_2', val)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">KS 3</label>
                                        <InputNumber min={0} className="w-full rounded-lg" value={data.ks_3} onChange={val => setData('ks_3', val)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">KS 3+</label>
                                        <InputNumber min={0} className="w-full rounded-lg" value={data.ks_3_plus} onChange={val => setData('ks_3_plus', val)} />
                                    </div>
                                </div>
                                
                                {/* Smart Validation Indicator */}
                                <div className="mt-3">
                                    {data.total_family_cards > 0 && !isKsMatch && (
                                        <Alert message={`Rincian Kesejahteraan (${totalKs} KK) tidak cocok dengan Total KK (${data.total_family_cards}).`} type="warning" showIcon className="rounded-xl py-1 text-xs" />
                                    )}
                                </div>
                            </div>

                            {/* Wilayah */}
                            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-5 sm:p-8">
                                <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center border-b pb-4 mb-5">
                                    <span className="bg-purple-100 text-purple-600 w-8 h-8 flex items-center justify-center rounded-xl mr-3 text-sm"><EnvironmentOutlined /></span> 
                                    Cakupan Wilayah
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 mb-2"><HomeOutlined className="mr-1 text-gray-400"/> Total Dusun</label>
                                        <InputNumber min={0} size="large" className="w-full rounded-xl" value={data.total_hamlets} onChange={val => setData('total_hamlets', val)} status={errors.total_hamlets ? 'error' : ''} />
                                    </div>
                                    <div>
                                        <label className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 mb-2"><HomeOutlined className="mr-1 text-gray-400"/> Total RT</label>
                                        <InputNumber min={0} size="large" className="w-full rounded-xl" value={data.total_rt} onChange={val => setData('total_rt', val)} status={errors.total_rt ? 'error' : ''} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Floating Action Bar - w-full on mobile */}
                    <div className="flex justify-end mt-8">
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            size="large"
                            loading={processing}
                            icon={<SaveOutlined />}
                            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 rounded-xl px-8 shadow-md shadow-blue-200"
                        >
                            Simpan Data Statistik
                        </Button>
                    </div>

                </form>
            </div>
        </AdminLayout>
    );
}