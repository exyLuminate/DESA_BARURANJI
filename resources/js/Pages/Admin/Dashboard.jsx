import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout'; 
import { 
    FileTextOutlined, PictureOutlined, MessageOutlined, ClockCircleOutlined,
    RightOutlined, UserOutlined, EnvironmentOutlined, GlobalOutlined,
    PlusCircleOutlined, EditOutlined, SettingOutlined, CompassOutlined, AppstoreOutlined
} from '@ant-design/icons';
import { Tag, Tooltip, Progress } from 'antd';

export default function Dashboard(props) {
    const { 
        stats = { total_news: 0, total_gallery: 0, unread_complaints: 0, active_officials: 0, total_hamlets: 0, total_rt: 0 }, 
        villageHead = null, 
        latestStatistic = null, 
        newsCategories = [], 
        galleryCategories = [], 
        recentPublishedNews = [], 
        recentPotentials = [], 
        recentFacilities = [], 
        recentActivities = [], 
        recentComplaints = [] 
    } = props;

    // Kalkulasi Persentase Gender untuk Widget 3
    const totalGender = latestStatistic ? (latestStatistic.total_male + latestStatistic.total_female) : 0;
    const malePercent = totalGender ? Math.round((latestStatistic.total_male / totalGender) * 100) : 0;
    const femalePercent = totalGender ? Math.round((latestStatistic.total_female / totalGender) * 100) : 0;

    const eventColorMap = { created: 'green', updated: 'blue', deleted: 'red', login: 'cyan' };

    return (
        <AdminLayout>
            <Head title="Command Center" />

            <div className="max-w-7xl mx-auto pb-10 space-y-6">
                
                {/* WIDGET 1: Aksi Cepat (Quick Actions) */}
                <div className="flex flex-wrap gap-4 items-center">
                    <h2 className="text-xl font-bold text-gray-800 mr-2">Command Center</h2>
                    <Link href={route('admin.news.create')} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition shadow-sm shadow-blue-200">
                        <PlusCircleOutlined className="mr-2" /> Tulis Berita
                    </Link>
                    <Link href={route('admin.galleries.index')} className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-xl hover:bg-purple-200 transition">
                        <PictureOutlined className="mr-2" /> Unggah Galeri
                    </Link>
                    <Link href={route('admin.village-profile.edit')} className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition">
                        <EditOutlined className="mr-2" /> Edit Profil
                    </Link>
                    <Link href={route('admin.settings')} className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition">
                        <SettingOutlined className="mr-2" /> Pengaturan
                    </Link>
                </div>

                {/* ROW 1: STATS & WILAYAH (WIDGET 8) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex items-center">
                        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mr-4"><FileTextOutlined /></div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Berita</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.total_news}</h3>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex items-center">
                        <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mr-4"><PictureOutlined /></div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Galeri</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.total_gallery}</h3>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex items-center">
                        <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center text-2xl mr-4"><MessageOutlined /></div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Pesan Unread</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.unread_complaints}</h3>
                        </div>
                    </div>
                    {/* Widget 8 */}
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex items-center">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mr-4"><EnvironmentOutlined /></div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Wilayah</p>
                            <h3 className="text-lg font-bold text-gray-800">{stats.total_hamlets} <span className="text-sm text-gray-500 font-medium">Dusun</span></h3>
                            <p className="text-xs text-gray-500">{stats.total_rt} Total RT</p>
                        </div>
                    </div>
                </div>

                {/* ROW 2: KEPALA DESA & DEMOGRAFI (WIDGET 6 & 3) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Widget 6 */}
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center uppercase tracking-wide"><UserOutlined className="mr-2 text-blue-500" /> Kepala Desa Aktif</h3>
                        {villageHead ? (
                            <div className="flex flex-col items-center text-center mt-4">
                                <div className="w-24 h-24 rounded-full border-4 border-blue-50 shadow-sm overflow-hidden mb-4 bg-gray-100">
                                    {villageHead.photo ? <img src={`/storage/${villageHead.photo}`} className="w-full h-full object-cover" /> : <UserOutlined className="text-4xl text-gray-400 mt-6" />}
                                </div>
                                <h4 className="font-bold text-lg text-gray-800">{villageHead.name}</h4>
                                <Tag color="blue" className="mt-2 rounded-full px-3">{villageHead.period_start || '?'} - {villageHead.period_end || 'Sekarang'}</Tag>
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm italic text-center mt-10">Data kepala desa aktif belum diatur.</p>
                        )}
                    </div>

                    {/* Widget 3 */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col justify-center">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-bold text-gray-800 flex items-center uppercase tracking-wide"><GlobalOutlined className="mr-2 text-indigo-500" /> Visualisasi Demografi {latestStatistic?.statistic_year}</h3>
                            <Link href={route('admin.village-statistics.index')} className="text-xs text-blue-600 hover:underline">Kelola Data</Link>
                        </div>
                        {latestStatistic ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <div className="flex justify-between text-sm mb-2"><span className="text-gray-600 font-medium">Laki-laki ({malePercent}%)</span> <span className="font-bold text-gray-800">{latestStatistic.total_male}</span></div>
                                    <Progress percent={malePercent} showInfo={false} strokeColor="#3b82f6" trailColor="#eff6ff" className="mb-4" />
                                    
                                    <div className="flex justify-between text-sm mb-2"><span className="text-gray-600 font-medium">Perempuan ({femalePercent}%)</span> <span className="font-bold text-gray-800">{latestStatistic.total_female}</span></div>
                                    <Progress percent={femalePercent} showInfo={false} strokeColor="#ec4899" trailColor="#fdf2f8" />
                                    <p className="text-xs text-gray-400 mt-4">Total Populasi: <b>{latestStatistic.total_population}</b> Jiwa</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Tingkat Kesejahteraan</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center"><span className="text-xs text-gray-600">Pra Sejahtera</span> <Tag className="rounded-full m-0">{latestStatistic.pre_prosperous} KK</Tag></div>
                                        <div className="flex justify-between items-center"><span className="text-xs text-gray-600">KS 1</span> <Tag color="orange" className="rounded-full m-0">{latestStatistic.ks_1} KK</Tag></div>
                                        <div className="flex justify-between items-center"><span className="text-xs text-gray-600">KS 2</span> <Tag color="blue" className="rounded-full m-0">{latestStatistic.ks_2} KK</Tag></div>
                                        <div className="flex justify-between items-center"><span className="text-xs text-gray-600">KS 3 & KS 3+</span> <Tag color="green" className="rounded-full m-0">{latestStatistic.ks_3 + latestStatistic.ks_3_plus} KK</Tag></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm italic text-center">Data statistik belum tersedia.</p>
                        )}
                    </div>
                </div>

                {/* ROW 3: KATEGORI, PUBLIKASI, POTENSI (WIDGET 7, 9, 10) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Widget 9 */}
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center uppercase tracking-wide"><FileTextOutlined className="mr-2 text-green-500" /> Publikasi Terbaru</h3>
                        <div className="space-y-4">
                            {recentPublishedNews.length > 0 ? recentPublishedNews.map(news => (
                                <div key={news.id} className="group relative">
                                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-blue-600">{news.title}</h4>
                                    <p className="text-xs text-gray-500">{new Date(news.published_at || news.created_at).toLocaleDateString('id-ID')} • {news.category?.name || 'Umum'}</p>
                                </div>
                            )) : <p className="text-xs text-gray-400">Belum ada publikasi.</p>}
                        </div>
                    </div>

                    {/* Widget 7 */}
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center uppercase tracking-wide"><AppstoreOutlined className="mr-2 text-purple-500" /> Distribusi Kategori</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 mb-2">Kategori Berita</p>
                                <div className="flex flex-wrap gap-2">
                                    {newsCategories.map(c => <Tag key={c.id} color="blue" className="rounded-lg m-0">{c.name} ({c.news_count})</Tag>)}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 mb-2 mt-3">Kategori Galeri</p>
                                <div className="flex flex-wrap gap-2">
                                    {galleryCategories.map(c => <Tag key={c.id} color="purple" className="rounded-lg m-0">{c.name} ({c.galleries_count})</Tag>)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Widget 10 */}
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center uppercase tracking-wide"><CompassOutlined className="mr-2 text-orange-500" /> Aset & Potensi Baru</h3>
                        <div className="space-y-3">
                            {recentPotentials.map(p => (
                                <div key={`p-${p.id}`} className="flex items-center text-sm"><span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span> <span className="font-medium text-gray-700 truncate">{p.title}</span> <span className="ml-auto text-xs text-gray-400">Potensi</span></div>
                            ))}
                            {recentFacilities.map(f => (
                                <div key={`f-${f.id}`} className="flex items-center text-sm"><span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span> <span className="font-medium text-gray-700 truncate">{f.name}</span> <span className="ml-auto text-xs text-gray-400">Fasilitas</span></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ROW 4: EXISTING WIDGETS (COMPLAINTS & LOGS) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pesan Terbaru */}
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-gray-800 flex items-center uppercase tracking-wide"><MessageOutlined className="mr-2 text-orange-500" /> Pesan Terbaru</h3>
                            <Link href={route('admin.complaints.index')} className="text-xs text-blue-600">Semua</Link>
                        </div>
                        <div className="space-y-3">
                            {recentComplaints.length > 0 ? recentComplaints.map(c => (
                                <div key={c.id} className="p-3 bg-gray-50 rounded-xl">
                                    <div className="flex justify-between mb-1"><span className="font-semibold text-sm text-gray-800">{c.name}</span> <Tag color={c.status === 'unread' ? 'orange' : 'default'} className="m-0 rounded-full text-[10px]">{c.status}</Tag></div>
                                    <p className="text-xs text-gray-500 line-clamp-1">{c.subject}</p>
                                </div>
                            )) : <p className="text-xs text-gray-400">Belum ada pesan.</p>}
                        </div>
                    </div>

                    {/* Log Aktivitas */}
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-gray-800 flex items-center uppercase tracking-wide"><ClockCircleOutlined className="mr-2 text-blue-500" /> Log Aktivitas</h3>
                            <Link href={route('admin.activity-logs.index')} className="text-xs text-blue-600">Semua</Link>
                        </div>
                        <div className="space-y-3">
                            {recentActivities.length > 0 ? recentActivities.map(log => (
                                <div key={log.id} className="flex items-start">
                                    <div className={`mt-1 w-2 h-2 rounded-full mr-3 shrink-0 bg-${eventColorMap[log.event] || 'gray'}-500`}></div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-800"><span className="capitalize">{log.causer?.name || 'Sistem'}</span> <span className="text-gray-500 font-normal">{log.description}</span></p>
                                        <p className="text-[10px] text-gray-400 mt-0.5">{new Date(log.created_at).toLocaleString('id-ID')}</p>
                                    </div>
                                </div>
                            )) : <p className="text-xs text-gray-400">Belum ada aktivitas.</p>}
                        </div>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}