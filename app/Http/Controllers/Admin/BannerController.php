<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Http\Requests\StoreBannerRequest;
use App\Http\Requests\UpdateBannerRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BannerController extends Controller
{
    public function index(Request $request)
    {
        $query = Banner::query();

        // Fitur Pencarian (Judul / Sub Judul)
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('subtitle', 'like', "%{$search}%");
            });
        }

        // Fitur Filter Status Aktif/Tidak Aktif
        if ($request->filled('status')) {
            $status = $request->input('status') === 'active' ? true : false;
            $query->where('is_active', $status);
        }

        // Pengurutan dan Paginasi
        $banners = $query->orderBy('sort_order', 'asc')
                         ->orderBy('created_at', 'desc')
                         ->paginate(10)
                         ->withQueryString();
        
        return Inertia::render('Admin/Banner/Index', [
            'banners' => $banners,
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Banner/Create');
    }

    public function store(StoreBannerRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('banners', 'public');
            $validated['image'] = $path;
        }

        $validated['created_by'] = auth()->id();

        Banner::create($validated);

        return redirect()->route('admin.banners.index')->with('success', 'Banner berhasil ditambahkan.');
    }

    public function edit(Banner $banner)
    {
        return Inertia::render('Admin/Banner/Edit', [
            'banner' => $banner
        ]);
    }

    public function update(UpdateBannerRequest $request, Banner $banner)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            // Hapus gambar lama
            if ($banner->image && Storage::disk('public')->exists($banner->image)) {
                Storage::disk('public')->delete($banner->image);
            }
            
            // Simpan gambar baru
            $path = $request->file('image')->store('banners', 'public');
            $validated['image'] = $path;
        } else {
            // HAPUS KEY 'image' JIKA TIDAK ADA GAMBAR BARU 
            // Agar tidak menimpa data di database menjadi null
            unset($validated['image']);
        }

        $validated['updated_by'] = auth()->id();

        $banner->update($validated);

        return redirect()->route('admin.banners.index')->with('success', 'Banner berhasil diperbarui.');
    }
    
    public function destroy(Banner $banner)
    {
        $banner->update(['deleted_by' => auth()->id()]);
        $banner->delete(); // Soft delete

        return redirect()->route('admin.banners.index')->with('success', 'Banner berhasil dihapus.');
    }

    public function toggle(Banner $banner)
    {
        $banner->update([
            'is_active' => !$banner->is_active,
            'updated_by' => auth()->id()
        ]);

        return back()->with('success', 'Status banner berhasil diubah.');
    }
}