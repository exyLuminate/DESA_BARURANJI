<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use App\Http\Requests\Admin\StoreFacilityRequest;
use App\Http\Requests\Admin\UpdateFacilityRequest;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FacilityController extends Controller
{
    public function index()
    {
        $facilities = Facility::latest()->get();
        return Inertia::render('Admin/Facility/Index', [
            'facilities' => $facilities
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Facility/Create');
    }

    public function store(StoreFacilityRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('facilities', 'public');
        }

        Facility::create($validated);

        return redirect()->route('admin.facilities.index')->with('success', 'Fasilitas desa berhasil ditambahkan.');
    }

    public function edit(Facility $facility)
    {
        return Inertia::render('Admin/Facility/Edit', [
            'facility' => $facility
        ]);
    }

    public function update(UpdateFacilityRequest $request, Facility $facility)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($facility->image && Storage::disk('public')->exists($facility->image)) {
                Storage::disk('public')->delete($facility->image);
            }
            $validated['image'] = $request->file('image')->store('facilities', 'public');
        }

        $facility->update($validated);

        return redirect()->route('admin.facilities.index')->with('success', 'Fasilitas desa berhasil diperbarui.');
    }

    public function destroy(Facility $facility)
    {
        $facility->delete(); // Soft delete

        return redirect()->route('admin.facilities.index')->with('success', 'Fasilitas desa berhasil dihapus.');
    }
}