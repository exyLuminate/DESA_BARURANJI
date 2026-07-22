<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Complaint;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComplaintController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Complaint');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'contact' => 'nullable|string|max:255',
            'type' => 'required|in:pengaduan,aspirasi,pertanyaan',
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $data = $request->all();

        // Jika warga mengunggah foto bukti
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('complaints', 'public');
        }

        Complaint::create($data);

        return redirect()->back()->with('success', 'Laporan Anda berhasil dikirim dan akan segera diproses oleh perangkat desa.');
    }
}