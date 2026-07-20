<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Official;
use App\Http\Requests\Admin\StoreOfficialRequest;
use App\Http\Requests\Admin\UpdateOfficialRequest;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OfficialController extends Controller
{
    public function index()
    {
        // Mengambil data perangkat desa diurutkan berdasarkan sort_order
        $officials = Official::orderBy('sort_order', 'asc')->get();
        return Inertia::render('Admin/Official/Index', [
            'officials' => $officials
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Official/Create');
    }

    public function store(StoreOfficialRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('officials', 'public');
        }

        Official::create($validated);

        return redirect()->route('admin.officials.index')->with('success', 'Perangkat desa berhasil ditambahkan.');
    }

    public function edit(Official $official)
    {
        return Inertia::render('Admin/Official/Edit', [
            'official' => $official
        ]);
    }

    public function update(UpdateOfficialRequest $request, Official $official)
    {
        $validated = $request->validated();

        if ($request->hasFile('photo')) {
            // Hapus foto lama jika ada
            if ($official->photo && Storage::disk('public')->exists($official->photo)) {
                Storage::disk('public')->delete($official->photo);
            }
            $validated['photo'] = $request->file('photo')->store('officials', 'public');
        }

        $official->update($validated);

        return redirect()->route('admin.officials.index')->with('success', 'Perangkat desa berhasil diperbarui.');
    }

    public function destroy(Official $official)
    {
        // Hapus foto dari storage saat dihapus (opsional, tapi SOT menyarankan file bisa tertinggal jika soft delete, 
        // namun untuk best practice kebersihan storage, jika soft delete kita biarkan saja fotonya).
        $official->delete();

        return redirect()->route('admin.officials.index')->with('success', 'Perangkat desa berhasil dihapus.');
    }
}