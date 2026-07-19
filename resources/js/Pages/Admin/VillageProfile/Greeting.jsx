import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button, message } from 'antd';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Greeting({ auth, profile }) {
    const { data, setData, post, processing, errors } = useForm({
        greeting_title: profile.greeting_title || '',
        greeting_message: profile.greeting_message || '',
        greeting_image: null,
        _method: 'put',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.village-profile.greeting.update'), {
            preserveScroll: true,
            onSuccess: () => {
                message.success('Sambutan Kepala Desa berhasil diperbarui!');
                setData('greeting_image', null); // Reset file input
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pengelolaan Sambutan Kepala Desa</h2>}
        >
            <Head title="Sambutan Kepala Desa" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} encType="multipart/form-data">
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Foto Sambutan / Kepala Desa</label>
                                {profile.greeting_image && (
                                    <div className="mb-4 mt-2">
                                        <img 
                                            src={`/storage/${profile.greeting_image}`} 
                                            alt="Foto Sambutan" 
                                            className="w-40 h-40 object-cover rounded-md shadow" 
                                        />
                                    </div>
                                )}
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => setData('greeting_image', e.target.files[0])}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                {errors.greeting_image && <div className="text-red-500 text-sm mt-1">{errors.greeting_image}</div>}
                                <p className="text-xs text-gray-500 mt-1">Format: JPG, JPEG, PNG, WEBP (Maks 2MB).</p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Judul Sambutan</label>
                                <input 
                                    type="text" 
                                    value={data.greeting_title} 
                                    onChange={(e) => setData('greeting_title', e.target.value)}
                                    placeholder="Contoh: Sambutan Kepala Desa Baru Ranji"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                {errors.greeting_title && <div className="text-red-500 text-sm mt-1">{errors.greeting_title}</div>}
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700">Isi Pesan Sambutan</label>
                                <textarea 
                                    value={data.greeting_message} 
                                    onChange={(e) => setData('greeting_message', e.target.value)}
                                    rows="8"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                ></textarea>
                                {errors.greeting_message && <div className="text-red-500 text-sm mt-1">{errors.greeting_message}</div>}
                            </div>

                            <div className="flex justify-end">
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    loading={processing}
                                    className="bg-blue-600"
                                >
                                    Simpan Perubahan
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}