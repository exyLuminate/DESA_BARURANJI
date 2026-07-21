import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { SearchOutlined } from '@ant-design/icons';
// Asumsikan Anda memiliki komponen PublicLayout. Sesuaikan import-nya jika berbeda.
import PublicLayout from '@/Layouts/PublicLayout'; 

export default function News({ news, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('news.index'), { search, category: filters.category }, { preserveState: true });
    };

    const handleCategoryFilter = (categorySlug) => {
        router.get(route('news'), { search: filters.search, category: categorySlug });
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <PublicLayout>
            <Head title="Berita Desa" />
            
            {/* Header Section */}
            <div className="bg-blue-800 text-white py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Berita & Informasi Desa</h1>
                <p className="text-blue-100 max-w-2xl mx-auto">Pantau terus informasi terbaru, pengumuman, dan kegiatan pembangunan di desa kami.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="flex flex-col md:flex-row gap-8">
                    
                    {/* Sidebar: Search & Categories */}
                    <div className="w-full md:w-1/4 space-y-8">
                        {/* Search Bar */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg mb-4 text-gray-800">Cari Berita</h3>
                            <form onSubmit={handleSearch} className="relative">
                                <input 
                                    type="text" 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Masukkan kata kunci..." 
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                                />
                                <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-600">
                                    <SearchOutlined />
                                </button>
                            </form>
                        </div>

                        {/* Category Filter */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg mb-4 text-gray-800">Kategori</h3>
                            <ul className="space-y-2">
                                <li>
                                    <button 
                                        onClick={() => handleCategoryFilter('')}
                                        className={`w-full text-left px-3 py-2 rounded-md transition ${!filters.category ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        Semua Berita
                                    </button>
                                </li>
                                {categories.map((cat) => (
                                    <li key={cat.id}>
                                        <button 
                                            onClick={() => handleCategoryFilter(cat.slug)}
                                            className={`w-full text-left px-3 py-2 rounded-md transition ${filters.category === cat.slug ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            {cat.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Main Content: News Grid */}
                    <div className="w-full md:w-3/4">
                        {news.data.length === 0 ? (
                            <div className="bg-white p-12 text-center rounded-lg shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-lg">Belum ada berita yang diterbitkan untuk saat ini.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {news.data.map((item) => (
                                    <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col">
                                        <Link href={route('news.show', item.slug)} className="block relative aspect-video overflow-hidden bg-gray-100">
                                            {item.thumbnail ? (
                                                <img src={`/storage/${item.thumbnail}`} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                                            ) : (
                                                <div className="flex items-center justify-center w-full h-full text-gray-400">Tanpa Gambar</div>
                                            )}
                                        </Link>
                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{item.category?.name}</span>
                                                <span className="text-xs text-gray-500">{formatDate(item.published_at)}</span>
                                            </div>
                                            <Link href={route('news.show', item.slug)} className="block mb-3">
                                                <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 line-clamp-2 leading-tight">
                                                    {item.title}
                                                </h3>
                                            </Link>
                                            {/* Extract plain text from HTML content for a snippet */}
                                            <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow" dangerouslySetInnerHTML={{ __html: item.content.replace(/<[^>]+>/g, '') }}></p>
                                            
                                            <Link href={route('news.show', item.slug)} className="text-blue-600 text-sm font-medium hover:underline mt-auto">
                                                Baca Selengkapnya &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {news.last_page > 1 && (
                            <div className="mt-10 flex justify-center gap-2">
                                {news.links.map((link, index) => (
                                    <Link 
                                        key={index} 
                                        href={link.url || '#'} 
                                        className={`px-4 py-2 rounded-md border ${link.active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'} ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}