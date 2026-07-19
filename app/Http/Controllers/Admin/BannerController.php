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
    public function index()
    {
        $banners = Banner::orderBy('sort_order', 'asc')->orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Admin/Banner/Index', [
            'banners' => $banners
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