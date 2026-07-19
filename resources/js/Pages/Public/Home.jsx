import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Home({ banners }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-play slider (Ganti setiap 5 detik)
    useEffect(() => {
        if (!banners || banners.length <= 1) return;
        
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(timer);
    }, [banners]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Beranda" />

            {/* Navbar Placeholder (Nanti disesuaikan pada phase layout publik menyeluruh) */}
            <nav className="bg-white shadow relative z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="font-bold text-xl text-green-700">Desa Baru Ranji</div>
                    <div className="space-x-4">
                        <Link href={route('home')} className="text-gray-700 hover:text-green-600">Beranda</Link>
                        {/* Menu publik lainnya akan ditambahkan kemudian */}
                    </div>
                </div>
            </nav>

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
                            {/* Background Image */}
                            <img
                                src={`/storage/${banner.image}`}
                                alt={banner.title || 'Banner Desa'}
                                className="w-full h-full object-cover"
                            />
                            
                            {/* Overlay Gradient (Dari gelap di kiri bawah ke transparan di atas) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                            {/* Content Layout (Left-Aligned Stack) */}
                            <div className="absolute inset-0 flex items-end">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20 md:pb-32">
                                    <div className="max-w-3xl">
                                        {banner.title && (
                                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-md animate-fade-in-up">
                                                {banner.title}
                                            </h1>
                                        )}
                                        
                                        {banner.subtitle && (
                                            <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow animate-fade-in-up delay-75">
                                                {banner.subtitle}
                                            </p>
                                        )}
                                        
                                        {banner.button_text && (
                                            <a
                                                href={banner.button_url || '#'}
                                                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-md transition duration-300 shadow-lg animate-fade-in-up delay-150"
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
                    // Empty State jika belum ada banner
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                        <p className="text-gray-500">Belum ada banner yang aktif.</p>
                    </div>
                )}

                {/* Slider Indicators (Dots) */}
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

            {/* Konten Home Lainnya (Sambutan Kades, Statistik, dll akan ditambahkan pada sub-phase berikutnya) */}
            
        </div>
    );
}