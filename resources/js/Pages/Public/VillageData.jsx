import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function VillageData({ statistic, hamlets, potentials, facilities }) {
    return (
        <PublicLayout>
            <Head title="Data Desa" />

            {/* Hero Section */}
            <div className="bg-green-700 py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                        Pusat Data Desa
                    </h1>
                    <p className="mt-4 text-lg text-green-100 max-w-2xl mx-auto">
                        Informasi lengkap mengenai demografi, wilayah administratif, potensi, dan fasilitas yang ada di desa kami.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
                
                {/* 1. Section Demografi & Statistik */}
                <section>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Demografi & Kesejahteraan</h2>
                        <p className="text-gray-600 mt-2">
                            {statistic 
                                ? `Data statistik penduduk berdasarkan sensus tahun ${statistic.statistic_year}.`
                                : 'Data statistik belum tersedia.'}
                        </p>
                    </div>

                    {statistic && (
                        <div className="space-y-8">
                            {/* Kependudukan */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                                    <div className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Total Penduduk</div>
                                    <div className="text-4xl font-extrabold text-indigo-600">{statistic.total_population}</div>
                                    <div className="text-gray-400 text-sm mt-1">Jiwa</div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                                    <div className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Kepala Keluarga</div>
                                    <div className="text-4xl font-extrabold text-indigo-600">{statistic.total_family_cards}</div>
                                    <div className="text-gray-400 text-sm mt-1">KK</div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                                    <div className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Laki-laki</div>
                                    <div className="text-4xl font-extrabold text-blue-500">{statistic.total_male}</div>
                                    <div className="text-gray-400 text-sm mt-1">Jiwa</div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                                    <div className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Perempuan</div>
                                    <div className="text-4xl font-extrabold text-pink-500">{statistic.total_female}</div>
                                    <div className="text-gray-400 text-sm mt-1">Jiwa</div>
                                </div>
                            </div>

                            {/* Kesejahteraan */}
                            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-800 mb-6 text-center">Tingkat Kesejahteraan Keluarga</h3>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                                        <div className="text-2xl font-bold text-gray-900">{statistic.pre_prosperous}</div>
                                        <div className="text-xs text-gray-500 mt-1 uppercase font-medium">Pra Sejahtera</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                                        <div className="text-2xl font-bold text-gray-900">{statistic.ks_1}</div>
                                        <div className="text-xs text-gray-500 mt-1 uppercase font-medium">KS 1</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                                        <div className="text-2xl font-bold text-gray-900">{statistic.ks_2}</div>
                                        <div className="text-xs text-gray-500 mt-1 uppercase font-medium">KS 2</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                                        <div className="text-2xl font-bold text-gray-900">{statistic.ks_3}</div>
                                        <div className="text-xs text-gray-500 mt-1 uppercase font-medium">KS 3</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm text-center col-span-2 md:col-span-1">
                                        <div className="text-2xl font-bold text-gray-900">{statistic.ks_3_plus}</div>
                                        <div className="text-xs text-gray-500 mt-1 uppercase font-medium">KS 3 Plus</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* 2. Section Wilayah Administratif (Dusun) */}
                <section>
                    <div className="mb-8 flex items-center justify-between border-b pb-4">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Wilayah Administratif</h2>
                            <p className="text-gray-600 mt-2">Daftar pembagian wilayah dusun dan rukun tetangga (RT).</p>
                        </div>
                        {statistic && (
                            <div className="hidden sm:block text-right">
                                <div className="text-3xl font-extrabold text-green-600">{statistic.total_hamlets}</div>
                                <div className="text-sm text-gray-500 uppercase font-medium">Total Dusun</div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hamlets && hamlets.length > 0 ? (
                            hamlets.map((hamlet) => (
                                <div key={hamlet.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                                        {hamlet.name}
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                            <span className="text-gray-500 text-sm">Kepala Dusun</span>
                                            <span className="font-medium text-gray-900">{hamlet.head_name || '-'}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                            <span className="text-gray-500 text-sm">Jumlah RT</span>
                                            <span className="font-medium text-gray-900">{hamlet.total_rt} RT</span>
                                        </div>
                                        {hamlet.description && (
                                            <p className="text-sm text-gray-600 pt-2">{hamlet.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                Data wilayah dusun belum tersedia.
                            </div>
                        )}
                    </div>
                </section>

                {/* 3. Section Potensi Desa */}
                <section className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Potensi Desa</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Sumber daya, produk unggulan, dan kekayaan alam yang menjadi pilar penggerak ekonomi masyarakat desa.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {potentials && potentials.length > 0 ? (
                            potentials.map((potential) => (
                                <div key={potential.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                                    <div className="h-56 bg-gray-200">
                                        {potential.image ? (
                                            <img src={`/storage/${potential.image}`} alt={potential.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">Tanpa Gambar</div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{potential.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                                            {potential.description || 'Tidak ada deskripsi.'}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500">
                                Data potensi desa belum tersedia.
                            </div>
                        )}
                    </div>
                </section>

                {/* 4. Section Fasilitas Desa */}
                <section>
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Fasilitas Umum</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Sarana dan prasarana publik yang tersedia untuk menunjang kegiatan masyarakat desa sehari-hari.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {facilities && facilities.length > 0 ? (
                            facilities.map((facility) => (
                                <div key={facility.id} className="flex flex-col sm:flex-row bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="w-full sm:w-2/5 h-48 sm:h-auto bg-gray-200 flex-shrink-0">
                                        {facility.image ? (
                                            <img src={`/storage/${facility.image}`} alt={facility.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">Tanpa Gambar</div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col justify-center">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{facility.name}</h3>
                                        {facility.location && (
                                            <div className="flex items-center text-green-600 text-sm font-medium mb-3">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                                {facility.location}
                                            </div>
                                        )}
                                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                                            {facility.description || 'Tidak ada deskripsi.'}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-8">
                                Data fasilitas desa belum tersedia.
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </PublicLayout>
    );
}