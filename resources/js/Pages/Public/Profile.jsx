import React from 'react';
import { Head } from '@inertiajs/react';
// Sesuaikan import PublicLayout dengan struktur folder Anda, contoh:
import PublicLayout from '@/Layouts/PublicLayout'; 

export default function Profile({ profile, officials }) {
    // Fallback jika data profil belum diisi sama sekali
    const villageName = profile?.village_name || 'Desa Baru Ranji';

    return (
        <PublicLayout>
            <Head title={`Profil - ${villageName}`} />

            {/* Hero Section (Cover Desa) */}
            <div className="relative bg-gray-900 h-64 sm:h-80 lg:h-96 w-full flex items-center justify-center overflow-hidden">
                {profile?.village_cover ? (
                    <img 
                        src={`/storage/${profile.village_cover}`} 
                        alt={`Cover ${villageName}`} 
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                ) : (
                    <div className="absolute inset-0 w-full h-full bg-gray-800 opacity-50"></div>
                )}
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">Profil {villageName}</h1>
                    <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
                        Mengenal lebih dekat sejarah, visi, misi, dan struktur pemerintahan desa kami.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
                
                {/* Section: Sambutan Kepala Desa */}
                {(profile?.greeting_title || profile?.greeting_message) && (
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            {profile?.greeting_image && (
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <img src={`/storage/${profile.greeting_image}`} alt="Kepala Desa" className="rounded-xl shadow-md object-cover max-h-80" />
                                </div>
                            )}
                            <div className="w-full md:w-2/3 space-y-4">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    {profile?.greeting_title || 'Sambutan Kepala Desa'}
                                </h2>
                                <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                                    {profile?.greeting_message}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Section: Sejarah, Visi, & Misi */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-8 w-2 bg-indigo-600 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-gray-900">Sejarah Desa</h2>
                        </div>
                        {profile?.history ? (
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-justify">
                                {profile.history}
                            </p>
                        ) : (
                            <p className="text-gray-400 italic">Informasi sejarah desa belum tersedia.</p>
                        )}
                    </div>
                    
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-8 w-2 bg-indigo-600 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-gray-900">Visi</h2>
                            </div>
                            {profile?.vision ? (
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-600">
                                    {profile.vision}
                                </p>
                            ) : (
                                <p className="text-gray-400 italic">Visi belum tersedia.</p>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-8 w-2 bg-indigo-600 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-gray-900">Misi</h2>
                            </div>
                            {profile?.mission ? (
                                <div className="text-gray-600 leading-relaxed whitespace-pre-line pl-4">
                                    {profile.mission}
                                </div>
                            ) : (
                                <p className="text-gray-400 italic">Misi belum tersedia.</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Section: Struktur Organisasi (Perangkat Desa) */}
                <section>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900">Struktur Pemerintahan Desa</h2>
                        <p className="mt-4 text-gray-600">Jajaran perangkat desa yang melayani masyarakat {villageName}.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {officials && officials.length > 0 ? (
                            officials.map((official) => (
                                <div key={official.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden text-center p-6">
                                    <div className="mx-auto h-32 w-32 rounded-full border-4 border-indigo-50 overflow-hidden mb-4 shadow-sm">
                                        {official.photo ? (
                                            <img src={`/storage/${official.photo}`} alt={official.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                                                <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{official.name}</h3>
                                    <p className="text-indigo-600 font-medium mt-1">{official.position}</p>
                                    {(official.period_start || official.period_end) && (
                                        <p className="text-sm text-gray-500 mt-2">
                                            Periode: {official.period_start || '?'} - {official.period_end || 'Sekarang'}
                                        </p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                Data perangkat desa belum ditambahkan.
                            </div>
                        )}
                    </div>
                </section>

                {/* Section: Wilayah & Peta */}
                <section className="bg-gray-50 rounded-2xl p-6 sm:p-10 border border-gray-200">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">Informasi Geografis & Wilayah</h2>
                            
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Luas Wilayah</h4>
                                    <p className="mt-1 text-lg font-medium text-gray-900">
                                        {profile?.area_size ? `${profile.area_size} Hektar` : '-'}
                                    </p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Batas Wilayah</h4>
                                    <p className="mt-1 text-gray-700 whitespace-pre-line">
                                        {profile?.boundary_description || '-'}
                                    </p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Alamat & Kontak</h4>
                                    <p className="mt-1 text-gray-700">{profile?.address || 'Alamat belum diatur'}</p>
                                    <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600">
                                        {profile?.phone && <span>📞 {profile.phone}</span>}
                                        {profile?.email && <span>✉️ {profile.email}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="h-80 lg:h-full min-h-[300px] w-full bg-gray-200 rounded-xl overflow-hidden shadow-sm">
                            {profile?.maps_embed ? (
                                <div 
                                    className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                                    dangerouslySetInnerHTML={{ __html: profile.maps_embed }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    Peta belum ditambahkan
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                
            </div>
        </PublicLayout>
    );
}