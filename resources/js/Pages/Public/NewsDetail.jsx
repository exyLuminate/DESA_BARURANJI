import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react'; // <-- Tambahkan usePage di sini
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function NewsDetail({ news, relatedNews }) {
    const plainTextContent = news.content.replace(/<[^>]+>/g, '').substring(0, 150) + '...';
    
    // Ambil URL dasar dari website kita untuk absolute path gambar
    const { url: currentUrl } = usePage();
    const appUrl = window.location.origin;
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12 pt-8">
            {/* Meta Tags untuk SEO dan Social Media (WA, FB) */}
            <Head>
                <title>{`${news.title} - Berita Desa`}</title>
                <meta name="description" content={plainTextContent} />
                <meta property="og:title" content={`${news.title} - Berita Desa`} />
                <meta property="og:description" content={plainTextContent} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`${appUrl}${currentUrl}`} />
                {news.thumbnail && (
                    <meta property="og:image" content={`${appUrl}/storage/${news.thumbnail}`} />
                )}
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Bagian Atas: Breadcrumbs & Tombol Kembali (Responsif) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <nav className="text-sm text-gray-500">
                        <Link href="/" className="hover:text-blue-600">Beranda</Link>
                        <span className="mx-2">&gt;</span>
                        <Link href={route('news')} className="hover:text-blue-600">Berita</Link>
                        <span className="mx-2">&gt;</span>
                        <span className="text-gray-900 truncate inline-block max-w-[200px] sm:max-w-xs align-bottom">{news.title}</span>
                    </nav>

                    <Link 
                        href={route('news')} 
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition shadow-sm w-full sm:w-auto"
                    >
                        <ArrowLeftOutlined /> Kembali ke Daftar Berita
                    </Link>
                </div>

                {/* Layout Utama: Berubah jadi 1 kolom di HP, 2 kolom di Laptop */}
                <div className="flex flex-col lg:flex-row gap-10">
                    
                    {/* Main Article Content */}
                    <article className="w-full lg:w-2/3 bg-white p-6 md:p-10 rounded-lg shadow-sm border border-gray-100">
                        <div className="mb-6">
                            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                                {news.category?.name}
                            </span>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">{news.title}</h1>
                            <div className="flex items-center text-gray-500 text-sm border-b pb-6">
                                <span>Diterbitkan: {formatDate(news.published_at)}</span>
                            </div>
                        </div>

                        {news.thumbnail && (
                            <div className="mb-8 rounded-lg overflow-hidden bg-gray-100 aspect-video relative">
                                <img src={`/storage/${news.thumbnail}`} alt={news.title} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div 
                            className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-img:rounded-xl prose-a:text-blue-600 hover:prose-a:text-blue-500"
                            dangerouslySetInnerHTML={{ __html: news.content }}
                        />
                    </article>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-1/3">
                        <div className="sticky top-6 space-y-8">
                            
                            {/* Berita Terkait (Satu Kategori) */}
                            {relatedNews.length > 0 && (
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="font-bold text-lg mb-4 text-gray-900 border-b pb-2">Berita Terkait</h3>
                                    <div className="space-y-4">
                                        {relatedNews.map((item) => (
                                            <Link key={item.id} href={route('news.show', item.slug)} className="group flex gap-4 items-start">
                                                {item.thumbnail && (
                                                    <img src={`/storage/${item.thumbnail}`} alt="" className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                                                )}
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 line-clamp-2 leading-tight">{item.title}</h4>
                                                    <span className="text-xs text-gray-500 mt-1 block">{formatDate(item.published_at)}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}