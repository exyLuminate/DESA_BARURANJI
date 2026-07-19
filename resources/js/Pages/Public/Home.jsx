import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Sections/Home/HeroSection';

export default function Home({
    banners,
}) {
    return (
        <PublicLayout>
            <HeroSection
                banners={banners}
            />
        </PublicLayout>
    );
}