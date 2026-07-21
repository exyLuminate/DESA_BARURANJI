<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Potential;
use App\Http\Requests\Admin\StorePotentialRequest;
use App\Http\Requests\Admin\UpdatePotentialRequest;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PotentialController extends Controller
{
    public function index()
    {
        $potentials = Potential::latest()->get();
        return Inertia::render('Admin/Potential/Index', [
            'potentials' => $potentials
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Potential/Create');
    }

    public function store(StorePotentialRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('potentials', 'public');
        }

        Potential::create($validated);

        return redirect()->route('admin.potentials.index')->with('success', 'Potensi desa berhasil ditambahkan.');
    }

    public function edit(Potential $potential)
    {
        return Inertia::render('Admin/Potential/Edit', [
            'potential' => $potential
        ]);
    }

    public function update(UpdatePotentialRequest $request, Potential $potential)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($potential->image && Storage::disk('public')->exists($potential->image)) {
                Storage::disk('public')->delete($potential->image);
            }
            $validated['image'] = $request->file('image')->store('potentials', 'public');
        }

        $potential->update($validated);

        return redirect()->route('admin.potentials.index')->with('success', 'Potensi desa berhasil diperbarui.');
    }

    public function destroy(Potential $potential)
    {
        $potential->delete(); // Soft delete sesuai SOT

        return redirect()->route('admin.potentials.index')->with('success', 'Potensi desa berhasil dihapus.');
    }
}