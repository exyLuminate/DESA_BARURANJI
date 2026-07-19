import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function BannerForm({
    banner = null,
    mode = 'create',
}) {
    const { data, setData, post, processing, errors } = useForm({
        title: banner?.title ?? '',
        subtitle: banner?.subtitle ?? '',
        image: null,
        button_text: banner?.button_text ?? '',
        button_url: banner?.button_url ?? '',
        sort_order: banner?.sort_order ?? 0,
        is_active: banner?.is_active ?? true,
        _method: mode === 'edit' ? 'PUT' : 'POST',
    });

    const submit = (e) => {
        e.preventDefault();

        if (mode === 'create') {
            post(route('admin.banners.store'));
            return;
        }

        post(route('admin.banners.update', banner.id));
    };

    return (
        <form
            onSubmit={submit}
            className="space-y-6"
        >
            <div className="bg-white rounded-xl shadow p-6 space-y-6">

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Judul Banner
                    </label>

                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full rounded-lg border-gray-300"
                    />

                    {errors.title && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.title}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Subtitle
                    </label>

                    <textarea
                        rows="5"
                        value={data.subtitle}
                        onChange={(e) => setData('subtitle', e.target.value)}
                        className="w-full rounded-lg border-gray-300"
                    />

                    {errors.subtitle && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.subtitle}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Gambar Banner
                    </label>

                    <input
                        type="file"
                        onChange={(e) => setData('image', e.target.files[0])}
                    />

                    {banner?.image && (
                        <img
                            src={`/storage/${banner.image}`}
                            className="mt-4 h-48 rounded-lg object-cover"
                        />
                    )}

                    {errors.image && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.image}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Teks Tombol
                        </label>

                        <input
                            type="text"
                            value={data.button_text}
                            onChange={(e) => setData('button_text', e.target.value)}
                            className="w-full rounded-lg border-gray-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            URL Tombol
                        </label>

                        <input
                            type="text"
                            value={data.button_url}
                            onChange={(e) => setData('button_url', e.target.value)}
                            className="w-full rounded-lg border-gray-300"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Sort Order
                        </label>

                        <input
                            type="number"
                            value={data.sort_order}
                            onChange={(e) => setData('sort_order', e.target.value)}
                            className="w-full rounded-lg border-gray-300"
                        />
                    </div>

                    <div className="flex items-center gap-3 mt-8">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) =>
                                setData('is_active', e.target.checked)
                            }
                        />

                        <span>Banner Aktif</span>
                    </div>
                </div>

            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                >
                    {processing
                        ? 'Menyimpan...'
                        : mode === 'create'
                            ? 'Simpan Banner'
                            : 'Update Banner'}
                </button>
            </div>
        </form>
    );
}