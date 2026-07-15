export default function Footer() {
    return (
        <footer className="mt-16 border-t bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Desa Baru Ranji.
                Seluruh hak cipta dilindungi.
            </div>
        </footer>
    );
}