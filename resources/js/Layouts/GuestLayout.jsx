import Navbar from '@/Components/Layout/Public/Navbar';
import Footer from '@/Components/Layout/Public/Footer';

export default function PublicLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main>
                {children}
            </main>

            <Footer />
        </div>
    );
}