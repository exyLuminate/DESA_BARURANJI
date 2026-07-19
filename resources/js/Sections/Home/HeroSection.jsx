import { Link } from '@inertiajs/react';

export default function HeroSection({
    banners = [],
}) {

    const banner = banners[0];

    if (!banner) {
        return (
            <section className="h-[600px] flex items-center justify-center bg-gray-100">
                <p className="text-gray-500">
                    Banner belum tersedia.
                </p>
            </section>
        );
    }

    return (
        <section
            className="relative h-[700px] bg-cover bg-center"
            style={{
                backgroundImage:
                    `url(/storage/${banner.image})`,
            }}
        >
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-6 text-white">

                    <h1 className="text-5xl font-bold max-w-3xl">
                        {banner.title}
                    </h1>

                    <p className="mt-6 text-xl max-w-2xl">
                        {banner.subtitle}
                    </p>

                    {banner.button_text &&
                        banner.button_url && (
                            <a
                                href={banner.button_url}
                                className="inline-block mt-8 px-8 py-4 bg-sky-600 rounded-lg hover:bg-sky-700"
                            >
                                {banner.button_text}
                            </a>
                        )}

                </div>
            </div>
        </section>
    );
}