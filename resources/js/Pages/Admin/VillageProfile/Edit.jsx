import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Tabs, Input, Button, Upload, message } from 'antd';
import { 
    SaveOutlined, InboxOutlined, BankOutlined, HistoryOutlined, 
    EnvironmentOutlined, GlobalOutlined, FacebookOutlined, 
    InstagramOutlined, YoutubeOutlined, TikTokOutlined, CompassOutlined, UserOutlined
} from '@ant-design/icons';
import AdminLayout from '@/Layouts/AdminLayout'; // Sesuaikan path layout Anda

const { Dragger } = Upload;
const { TextArea } = Input;

export default function Edit({ profile }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        village_name: profile?.village_name || '',
        village_logo: null,
        village_cover: null,
        history: profile?.history || '',
        vision: profile?.vision || '',
        mission: profile?.mission || '',
        boundary_description: profile?.boundary_description || '',
        area_size: profile?.area_size || '',
        address: profile?.address || '',
        phone: profile?.phone || '',
        email: profile?.email || '',
        maps_embed: profile?.maps_embed || '',
        facebook_url: profile?.facebook_url || '',
        instagram_url: profile?.instagram_url || '',
        youtube_url: profile?.youtube_url || '',
        tiktok_url: profile?.tiktok_url || '',
    });

    // State preview
    const [logoPreview, setLogoPreview] = useState(profile?.village_logo ? `/storage/${profile.village_logo}` : null);
    const [coverPreview, setCoverPreview] = useState(profile?.village_cover ? `/storage/${profile.village_cover}` : null);

    // Handler Upload
    const handleFileChange = (info, field) => {
        const fileList = info.fileList;
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            setData(field, file);
            if (field === 'village_logo') setLogoPreview(URL.createObjectURL(file));
            if (field === 'village_cover') setCoverPreview(URL.createObjectURL(file));
        } else {
            setData(field, null);
            if (field === 'village_logo') setLogoPreview(profile?.village_logo ? `/storage/${profile.village_logo}` : null);
            if (field === 'village_cover') setCoverPreview(profile?.village_cover ? `/storage/${profile.village_cover}` : null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.village-profile.update'), {
            preserveScroll: true,
            forceFormData: true, 
            onSuccess: () => message.success('Data profil desa berhasil diperbarui!'),
        });
    };

    // --- KONTEN TABS ---
    
    // Tab 1: Identitas & Visual
    const TabIdentity = (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4 mb-2 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center text-xl shrink-0 shadow-sm">
                        <UserOutlined />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-base">Sambutan Kepala Desa</h3>
                        <p className="text-sm text-gray-500">Kelola foto dan teks pesan pimpinan desa untuk ditampilkan di beranda masyarakat.</p>
                    </div>
                </div>
                <Link href={route('admin.village-profile.greeting.edit')} className="shrink-0 w-full md:w-auto">
                    <Button type="primary" className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl px-6 shadow-md shadow-blue-200">
                        Kelola Sambutan
                    </Button>
                </Link>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Desa <span className="text-red-500">*</span></label>
                <Input 
                    size="large"
                    value={data.village_name}
                    onChange={e => setData('village_name', e.target.value)}
                    placeholder="Contoh: Desa Baru Ranji"
                    className={`rounded-xl ${errors.village_name ? 'border-red-500' : ''}`}
                    status={errors.village_name ? 'error' : ''}
                />
                {errors.village_name && <p className="text-red-500 text-xs mt-1">{errors.village_name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Logo Desa</label>
                    <Dragger
                        accept="image/*"
                        beforeUpload={() => false}
                        onChange={(info) => handleFileChange(info, 'village_logo')}
                        maxCount={1}
                        showUploadList={false}
                        className="rounded-2xl bg-gray-50 hover:bg-blue-50 border-gray-200"
                    >
                        {logoPreview ? (
                            <div className="p-2"><img src={logoPreview} alt="Logo" className="mx-auto h-32 object-contain" /></div>
                        ) : (
                            <div className="p-6">
                                <p className="ant-upload-drag-icon text-blue-500"><InboxOutlined /></p>
                                <p className="ant-upload-text text-sm font-medium">Klik atau seret logo</p>
                            </div>
                        )}
                    </Dragger>
                    <p className="text-xs text-gray-400 mt-2 text-center">Rekomendasi: Format PNG transparan (Rasio 1:1)</p>
                    {errors.village_logo && <p className="text-red-500 text-xs mt-1">{errors.village_logo}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Desa (Hero Image)</label>
                    <Dragger
                        accept="image/*"
                        beforeUpload={() => false}
                        onChange={(info) => handleFileChange(info, 'village_cover')}
                        maxCount={1}
                        showUploadList={false}
                        className="rounded-2xl bg-gray-50 hover:bg-blue-50 border-gray-200 overflow-hidden"
                    >
                        {coverPreview ? (
                            <div className="h-36 w-full"><img src={coverPreview} alt="Cover" className="w-full h-full object-cover" /></div>
                        ) : (
                            <div className="p-6">
                                <p className="ant-upload-drag-icon text-blue-500"><InboxOutlined /></p>
                                <p className="ant-upload-text text-sm font-medium">Klik atau seret gambar cover</p>
                            </div>
                        )}
                    </Dragger>
                    <p className="text-xs text-gray-400 mt-2 text-center">Rekomendasi: Gambar lanskap (Rasio 16:9)</p>
                    {errors.village_cover && <p className="text-red-500 text-xs mt-1">{errors.village_cover}</p>}
                </div>
            </div>
        </div>
    );

    // Tab 2: Sejarah & Visi Misi
    const TabHistory = (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sejarah Singkat Desa</label>
                <TextArea 
                    rows={5}
                    value={data.history}
                    onChange={e => setData('history', e.target.value)}
                    placeholder="Ceritakan asal-usul dan sejarah berdirinya desa..."
                    className="rounded-xl"
                />
                {errors.history && <p className="text-red-500 text-xs mt-1">{errors.history}</p>}
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Visi</label>
                <TextArea 
                    rows={3}
                    value={data.vision}
                    onChange={e => setData('vision', e.target.value)}
                    placeholder="Cita-cita atau tujuan utama desa..."
                    className="rounded-xl"
                />
                {errors.vision && <p className="text-red-500 text-xs mt-1">{errors.vision}</p>}
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Misi</label>
                <TextArea 
                    rows={5}
                    value={data.mission}
                    onChange={e => setData('mission', e.target.value)}
                    placeholder="Langkah-langkah untuk mencapai visi desa..."
                    className="rounded-xl"
                />
                {errors.mission && <p className="text-red-500 text-xs mt-1">{errors.mission}</p>}
            </div>
        </div>
    );

    // Tab 3: Wilayah & Kontak
    const TabContact = (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Luas Wilayah (Hektar / m²)</label>
                    <Input 
                        size="large"
                        type="number"
                        step="0.01"
                        value={data.area_size}
                        onChange={e => setData('area_size', e.target.value)}
                        addonAfter="Ha"
                        className="rounded-xl"
                    />
                    {errors.area_size && <p className="text-red-500 text-xs mt-1">{errors.area_size}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Desa</label>
                    <Input 
                        size="large"
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        placeholder="contoh@desa.go.id"
                        className="rounded-xl"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon / WhatsApp</label>
                    <Input 
                        size="large"
                        value={data.phone}
                        onChange={e => setData('phone', e.target.value)}
                        placeholder="081234567890"
                        className="rounded-xl"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Lengkap Kantor Desa</label>
                    <TextArea 
                        rows={3}
                        value={data.address}
                        onChange={e => setData('address', e.target.value)}
                        className="rounded-xl"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Batas Wilayah</label>
                    <TextArea 
                        rows={3}
                        value={data.boundary_description}
                        onChange={e => setData('boundary_description', e.target.value)}
                        placeholder="Utara: ... Selatan: ..."
                        className="rounded-xl"
                    />
                    {errors.boundary_description && <p className="text-red-500 text-xs mt-1">{errors.boundary_description}</p>}
                </div>
                
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Google Maps Embed (Iframe HTML)</label>
                    <TextArea 
                        rows={3}
                        value={data.maps_embed}
                        onChange={e => setData('maps_embed', e.target.value)}
                        placeholder='<iframe src="..."></iframe>'
                        className="rounded-xl font-mono text-xs text-blue-600"
                    />
                    {errors.maps_embed && <p className="text-red-500 text-xs mt-1">{errors.maps_embed}</p>}
                    
                    {/* Live Map Preview */}
                    <div className="mt-4 bg-gray-50 border border-gray-200 rounded-2xl p-2 h-48 flex flex-col items-center justify-center overflow-hidden relative">
                        {data.maps_embed && data.maps_embed.includes('<iframe') ? (
                            <div className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:rounded-xl" dangerouslySetInnerHTML={{ __html: data.maps_embed }} />
                        ) : (
                            <div className="text-center text-gray-400">
                                <CompassOutlined className="text-3xl mb-2 block mx-auto" />
                                <p className="text-xs">Live Preview Peta<br/>Masukkan tag iframe Google Maps di atas.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    // Tab 4: Sosial Media
    const TabSocial = (
        <div className="max-w-2xl mx-auto space-y-6 py-6">
            <div className="text-center mb-8">
                <h3 className="text-lg font-bold text-gray-800">Hubungkan Sosial Media</h3>
                <p className="text-sm text-gray-500">Kosongkan URL jika tidak memiliki akun di platform tersebut.</p>
            </div>
            <Input 
                size="large"
                addonBefore={<FacebookOutlined className="text-blue-600 w-6 text-center" />}
                value={data.facebook_url}
                onChange={e => setData('facebook_url', e.target.value)}
                placeholder="https://facebook.com/..."
                className="rounded-xl"
            />
            <Input 
                size="large"
                addonBefore={<InstagramOutlined className="text-pink-600 w-6 text-center" />}
                value={data.instagram_url}
                onChange={e => setData('instagram_url', e.target.value)}
                placeholder="https://instagram.com/..."
                className="rounded-xl"
            />
            <Input 
                size="large"
                addonBefore={<YoutubeOutlined className="text-red-600 w-6 text-center" />}
                value={data.youtube_url}
                onChange={e => setData('youtube_url', e.target.value)}
                placeholder="https://youtube.com/..."
                className="rounded-xl"
            />
            <Input 
                size="large"
                addonBefore={<TikTokOutlined className="text-black w-6 text-center" />}
                value={data.tiktok_url}
                onChange={e => setData('tiktok_url', e.target.value)}
                placeholder="https://tiktok.com/..."
                className="rounded-xl"
            />
        </div>
    );

    const items = [
        { key: '1', label: <span className="px-2 font-medium"><BankOutlined /> Identitas & Visual</span>, children: TabIdentity },
        { key: '2', label: <span className="px-2 font-medium"><HistoryOutlined /> Sejarah, Visi & Misi</span>, children: TabHistory },
        { key: '3', label: <span className="px-2 font-medium"><EnvironmentOutlined /> Wilayah & Kontak</span>, children: TabContact },
        { key: '4', label: <span className="px-2 font-medium"><GlobalOutlined /> Sosial Media</span>, children: TabSocial },
    ];

    return (
        <AdminLayout>
            <Head title="Kelola Profil Desa" />

            <form onSubmit={submit} className="relative pb-24">
                <div className="max-w-5xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Soft UI */}
                    <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-sm border border-blue-100 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-1">Kelola Profil Desa</h1>
                            <p className="text-gray-500 text-sm">Pusat informasi utama tentang desa Anda (Identitas, Sejarah, Kontak).</p>
                        </div>
                    </div>

                    {/* Main Content dengan Tabs Ant Design */}
                    <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl border border-gray-100 p-6 md:p-8">
                        <Tabs 
                            defaultActiveKey="1" 
                            items={items} 
                            animated={{ inkBar: true, tabPane: true }}
                            className="custom-soft-tabs"
                        />
                    </div>

                </div>

                {/* Floating Action Bar (Sticky Footer) */}
                <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white/80 backdrop-blur-lg border-t border-gray-200 p-4 shadow-[0_-10px_30px_rgb(0,0,0,0.05)] z-40 flex justify-end px-8">
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        size="large"
                        icon={<SaveOutlined />}
                        loading={processing}
                        className="bg-gray-900 hover:bg-gray-800 rounded-xl px-8 shadow-md"
                    >
                        Simpan Perubahan
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}