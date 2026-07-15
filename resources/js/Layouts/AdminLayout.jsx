import Sidebar from '@/Components/Layout/Admin/Sidebar';
import Topbar from '@/Components/Layout/Admin/Topbar';

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex flex-1 flex-col">
                <Topbar />

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}