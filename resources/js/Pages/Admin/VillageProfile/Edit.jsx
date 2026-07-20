import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout'; // Sesuaikan jika path layout berbeda

export default function Edit({ profile }) {
    // Tambahkan progress dan recentlySuccessful dari useForm
    const { data, setData, post, processing, errors, progress, recentlySuccessful } = useForm({
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

    const [logoPreview, setLogoPreview] = useState(profile?.village_logo ? `/storage/${profile.village_logo}` : null);
    const [coverPreview, setCoverPreview] = useState(profile?.village_cover ? `/storage/${profile.village_cover}` : null);

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        setData(field, file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (field === 'village_logo') setLogoPreview(e.target.result);
                if (field === 'village_cover') setCoverPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.village-profile.update'), {
            preserveScroll: true,
            forceFormData: true, 
        });
    };

    return (
        <AdminLayout>
            <Head title="Kelola Profil Desa" />

            <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Kelola Profil Desa</h1>
                </div>

                {/* Banner Notifikasi Berhasil */}
                {recentlySuccessful && (
                    <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md shadow-sm">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="font-medium">Data profil desa berhasil diperbarui!</p>
                        </div>
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    {/* Section: Identitas Utama & Visual */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Identitas Utama & Visual</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Nama Desa</label>
                                <input
                                    type="text"
                                    value={data.village_name}
                                    onChange={e => setData('village_name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                    placeholder="Masukkan nama desa"
                                />
                                {errors.village_name && <p className="text-red-500 text-xs mt-1">{errors.village_name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Logo Desa</label>
                                {logoPreview && <img src={logoPreview} alt="Logo Preview" className="h-20 object-contain my-2 bg-gray-50 rounded border p-1" />}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => handleFileChange(e, 'village_logo')}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                                />
                                {errors.village_logo && <p className="text-red-500 text-xs mt-1">{errors.village_logo}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cover Desa</label>
                                {coverPreview && <img src={coverPreview} alt="Cover Preview" className="h-20 w-full object-cover my-2 bg-gray-50 rounded border p-1" />}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => handleFileChange(e, 'village_cover')}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                                />
                                {errors.village_cover && <p className="text-red-500 text-xs mt-1">{errors.village_cover}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Section: Sejarah, Visi, & Misi */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Sejarah, Visi & Misi</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Sejarah Desa</label>
                                <textarea
                                    rows="4"
                                    value={data.history}
                                    onChange={e => setData('history', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                ></textarea>
                                {errors.history && <p className="text-red-500 text-xs mt-1">{errors.history}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Visi</label>
                                <textarea
                                    rows="3"
                                    value={data.vision}
                                    onChange={e => setData('vision', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                ></textarea>
                                {errors.vision && <p className="text-red-500 text-xs mt-1">{errors.vision}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Misi</label>
                                <textarea
                                    rows="4"
                                    value={data.mission}
                                    onChange={e => setData('mission', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                ></textarea>
                                {errors.mission && <p className="text-red-500 text-xs mt-1">{errors.mission}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Section: Wilayah & Kontak */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Wilayah & Kontak</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Luas Wilayah (Hektar / m²)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.area_size}
                                    onChange={e => setData('area_size', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                />
                                {errors.area_size && <p className="text-red-500 text-xs mt-1">{errors.area_size}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Desa</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Batas Wilayah</label>
                                <textarea
                                    rows="2"
                                    value={data.boundary_description}
                                    onChange={e => setData('boundary_description', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                />
                                {errors.boundary_description && <p className="text-red-500 text-xs mt-1">{errors.boundary_description}</p>}
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Alamat Lengkap Kantor Desa</label>
                                <textarea
                                    rows="2"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                />
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Google Maps Embed (Iframe HTML)</label>
                                <textarea
                                    rows="3"
                                    value={data.maps_embed}
                                    onChange={e => setData('maps_embed', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm text-gray-600 font-mono text-xs"
                                    placeholder='<iframe src="https://www.google.com/maps/embed?..." ></iframe>'
                                ></textarea>
                                {errors.maps_embed && <p className="text-red-500 text-xs mt-1">{errors.maps_embed}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Section: Sosial Media */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Sosial Media</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Facebook URL</label>
                                <input
                                    type="url"
                                    value={data.facebook_url}
                                    onChange={e => setData('facebook_url', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                />
                                {errors.facebook_url && <p className="text-red-500 text-xs mt-1">{errors.facebook_url}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
                                <input
                                    type="url"
                                    value={data.instagram_url}
                                    onChange={e => setData('instagram_url', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                />
                                {errors.instagram_url && <p className="text-red-500 text-xs mt-1">{errors.instagram_url}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">YouTube URL</label>
                                <input
                                    type="url"
                                    value={data.youtube_url}
                                    onChange={e => setData('youtube_url', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                />
                                {errors.youtube_url && <p className="text-red-500 text-xs mt-1">{errors.youtube_url}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">TikTok URL</label>
                                <input
                                    type="url"
                                    value={data.tiktok_url}
                                    onChange={e => setData('tiktok_url', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                />
                                {errors.tiktok_url && <p className="text-red-500 text-xs mt-1">{errors.tiktok_url}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Tombol Aksi dengan Progress Bar */}
                    <div className="flex flex-col items-end pt-4 space-y-2">
                        {progress && (
                            <div className="w-48 bg-gray-200 rounded-full h-2.5">
                                <div className="bg-gray-800 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress.percentage}%` }}></div>
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-colors"
                        >
                            {processing ? 'Menyimpan Data...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}