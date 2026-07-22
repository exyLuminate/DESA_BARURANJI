import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Image, Empty } from 'antd';
import { PictureOutlined } from '@ant-design/icons';

// Tambahkan default parameter (=[], ={data:[], links:[]}) agar tidak undefined
export default function Gallery({ categories = [], galleries = { data: [], links: [] }, currentCategory = 'semua' }) {
    
    // Fungsi untuk mengubah filter kategori tanpa me-reload penuh halaman
    const handleFilter = (slug) => {
        router.get(route('gallery'), { kategori: slug }, { preserveState: true, preserveScroll: true });
    };

    return (
        <div className="min-h-screen bg-white pb-16 pt-8">
            <Head title="Galeri Desa" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Galeri Desa</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Kumpulan dokumentasi foto kegiatan, pembangunan, dan potensi yang ada di Desa Baru Ranji.
                    </p>
                </div>

                {/* Kategori Filter */}
                <div className="flex overflow-x-auto pb-4 mb-8 gap-2 justify-start md:justify-center scrollbar-hide">
                    <button
                        onClick={() => handleFilter('semua')}
                        className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors border ${
                            currentCategory === 'semua' 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        Semua Foto
                    </button>
                    {/* Gunakan optional chaining ?.map */}
                    {categories?.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleFilter(cat.slug)}
                            className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors border ${
                                currentCategory === cat.slug 
                                ? 'bg-blue-600 text-white border-blue-600' 
                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Grid Galeri */}
                {galleries?.data?.length > 0 ? (
                    <Image.PreviewGroup>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {galleries.data.map((item) => (
                                <div className="group flex flex-col bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="aspect-square w-full overflow-hidden bg-gray-200 relative [&_.ant-image]:w-full [&_.ant-image]:h-full">
                                        <Image
                                            src={`/storage/${item.image}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            style={{ objectFit: 'cover' }}
                                            preview={{
                                                mask: <div className="flex items-center gap-2"><PictureOutlined /> Lihat</div>
                                            }}
                                            fallback="/images/placeholder.png"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2" title={item.title}>
                                            {item.title}
                                        </h3>
                                        <span className="text-xs text-blue-600 mt-1 block">
                                            {item.category?.name || 'Tanpa Kategori'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Image.PreviewGroup>
                ) : (
                    <div className="py-20 flex justify-center">
                        <Empty description="Belum ada foto pada kategori ini" />
                    </div>
                )}

                {/* Pagination Sederhana Tailwind */}
                {galleries?.last_page > 1 && (
                    <div className="mt-12 flex justify-center gap-2">
                        {galleries.links?.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-4 py-2 text-sm border rounded-md transition-colors ${
                                    link.active 
                                    ? 'bg-blue-600 text-white border-blue-600' 
                                    : !link.url 
                                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                preserveScroll
                            />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}