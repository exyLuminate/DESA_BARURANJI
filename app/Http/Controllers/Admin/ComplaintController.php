<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Complaint;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ComplaintController extends Controller
{
    public function index()
    {
        $complaints = Complaint::latest()->get();
        return Inertia::render('Admin/Complaint/Index', [
            'complaints' => $complaints
        ]);
    }

    public function show(Complaint $complaint)
    {
        return Inertia::render('Admin/Complaint/Show', [
            'complaint' => $complaint
        ]);
    }

    public function update(Request $request, Complaint $complaint)
    {
        $request->validate([
            'status' => 'required|in:pending,diproses,selesai,ditolak'
        ]);

        $complaint->update([
            'status' => $request->status
        ]);

        return redirect()->back()->with('success', 'Status laporan berhasil diperbarui.');
    }

    public function destroy(Complaint $complaint)
    {
        // Hapus file gambar jika ada
        if ($complaint->image && Storage::disk('public')->exists($complaint->image)) {
            Storage::disk('public')->delete($complaint->image);
        }
        
        $complaint->delete();

        return redirect()->route('admin.complaints.index')->with('success', 'Laporan berhasil dihapus.');
    }
}