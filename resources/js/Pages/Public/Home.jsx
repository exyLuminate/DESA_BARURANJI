import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout'; // Import PublicLayout

// PASTIKAN SEMUA PROPS DITERIMA DI SINI
export default function Home({ 
    banners, 
    profile, 
    villageHead, 
    statistics, 
    featuredPotentials, 
    latestNews, 
    latestGalleries 
}) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-play slider
    useEffect(() => {
        if (!banners || banners.length <= 1) return;
        
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(timer);
    }, [banners]);

    return (
        <PublicLayout>
            <Head title="Beranda" />

            {/* Hero Slider Section */}
            <section className="relative w-full h-[600px] overflow-hidden bg-gray-900">
                {banners && banners.length > 0 ? (
                    banners.map((banner, index) => (
                        <div
                            key={banner.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                        >
                            <img
                                src={`/storage/${banner.image}`}
                                alt={banner.title || 'Banner Desa'}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                            <div className="absolute inset-0 flex items-end">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20 md:pb-32">
                                    <div className="max-w-3xl">
                                        {banner.title && (
                                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-md">
                                                {banner.title}
                                            </h1>
                                        )}
                                        {banner.subtitle && (
                                            <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow">
                                                {banner.subtitle}
                                            </p>
                                        )}
                                        {banner.button_text && (
                                            <a
                                                href={banner.button_url || '#'}
                                                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-md transition duration-300 shadow-lg"
                                            >
                                                {banner.button_text}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                        <p className="text-gray-500">Belum ada banner yang aktif.</p>
                    </div>
                )}

                {banners && banners.length > 1 && (
                    <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentSlide ? 'bg-green-500 w-8' : 'bg-white/50 hover:bg-white'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Sambutan Kepala Desa Section */}
            {(profile?.greeting_title || profile?.greeting_message) && (
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            
                            <div className="w-full md:w-1/3 flex flex-col items-center">
                                <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-green-100 shadow-xl">
                                    {profile?.greeting_image ? (
                                        <img 
                                            src={`/storage/${profile.greeting_image}`} 
                                            alt="Foto Sambutan" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                            Tidak ada foto
                                        </div>
                                    )}
                                </div>
                                {villageHead && (
                                    <div className="mt-6 text-center">
                                        <h3 className="text-xl font-bold text-gray-900">{villageHead.name}</h3>
                                        <p className="text-green-600 font-medium">{villageHead.position}</p>
                                    </div>
                                )}
                            </div>

                            <div className="w-full md:w-2/3 text-center md:text-left">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6 relative inline-block">
                                    {profile?.greeting_title || 'Sambutan Kepala Desa'}
                                    <span className="absolute -bottom-2 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 w-16 h-1 bg-green-500 rounded"></span>
                                </h2>
                                
                                <div className="text-gray-600 leading-relaxed space-y-4 whitespace-pre-line text-lg">
                                    {profile?.greeting_message}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            )}

            {/* Homepage Statistics Widget Section */}
            <section className="py-12 bg-green-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Statistik Desa</h2>
                        {statistics?.statistic_year && (
                            <p className="text-green-200 mt-2">Berdasarkan data tahun {statistics.statistic_year}</p>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20">
                            <div className="text-4xl font-extrabold text-white mb-2">
                                {statistics?.total_population || 0}
                            </div>
                            <div className="text-green-100 font-medium">Penduduk</div>
                        </div>
                        
                        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20">
                            <div className="text-4xl font-extrabold text-white mb-2">
                                {statistics?.total_family_cards || 0}
                            </div>
                            <div className="text-green-100 font-medium">Kepala Keluarga</div>
                        </div>
                        
                        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20">
                            <div className="text-4xl font-extrabold text-white mb-2">
                                {statistics?.total_hamlets || 0}
                            </div>
                            <div className="text-green-100 font-medium">Dusun</div>
                        </div>
                        
                        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20">
                            <div className="text-4xl font-extrabold text-white mb-2 flex items-center justify-center gap-1">
                                <span>{profile?.area_size || 0}</span>
                                <span className="text-xl font-normal">Ha</span>
                            </div>
                            <div className="text-green-100 font-medium">Luas Wilayah</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Potensi Desa Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Potensi Unggulan Desa</h2>
                        <div className="w-24 h-1 bg-green-500 mx-auto mt-4 rounded"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredPotentials && featuredPotentials.length > 0 ? (
                            featuredPotentials.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <div className="h-48 bg-gray-200">
                                        {item.image ? (
                                            <img src={`/storage/${item.image}`} alt={item.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">Tanpa Gambar</div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-gray-600 line-clamp-3">{item.description}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500">Data potensi desa belum tersedia.</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Berita Terbaru Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12 border-b pb-4">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Berita Terbaru</h2>
                            <div className="w-24 h-1 bg-green-500 mt-4 rounded"></div>
                        </div>
                        <Link href={route('news')} className="text-green-600 hover:text-green-800 font-medium flex items-center gap-1">
                            Lihat Semua <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {latestNews && latestNews.length > 0 ? (
                            latestNews.map((news) => (
                                <div key={news.id} className="group cursor-pointer">
                                    <div className="h-56 bg-gray-200 rounded-lg overflow-hidden mb-4 relative">
                                        {news.thumbnail ? (
                                            <img src={`/storage/${news.thumbnail}`} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">Tanpa Gambar</div>
                                        )}
                                        {news.category && (
                                            <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded">
                                                {news.category.name}
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-500 mb-2">
                                        {new Date(news.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                                        {news.title}
                                    </h3>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500">Belum ada berita yang dipublikasikan.</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Dokumentasi / Galeri Section */}
            <section className="py-16 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white">Galeri Desa</h2>
                        <div className="w-24 h-1 bg-green-500 mx-auto mt-4 rounded"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {latestGalleries && latestGalleries.length > 0 ? (
                            latestGalleries.map((gallery) => (
                                <div key={gallery.id} className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden group">
                                    <img src={`/storage/${gallery.image}`} alt={gallery.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                        <div className="p-4 w-full">
                                            <h3 className="text-white font-medium text-sm truncate">{gallery.title}</h3>
                                            {gallery.category && <p className="text-green-400 text-xs mt-1">{gallery.category.name}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-400 py-8">Dokumentasi belum tersedia.</div>
                        )}
                    </div>
                    
                    <div className="text-center mt-10">
                        <Link href={route('gallery')} className="inline-block border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-6 py-2 rounded-md transition-colors">
                            Lihat Semua Galeri
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}