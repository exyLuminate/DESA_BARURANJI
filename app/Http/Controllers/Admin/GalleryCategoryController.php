<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class GalleryCategoryController extends Controller
{
    public function index()
    {
        $categories = GalleryCategory::latest()->get();
        return Inertia::render('Admin/GalleryCategory/Index', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:gallery_categories,name',
        ]);

        GalleryCategory::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->back()->with('success', 'Kategori galeri berhasil ditambahkan.');
    }

    public function update(Request $request, GalleryCategory $galleryCategory)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:gallery_categories,name,' . $galleryCategory->id,
        ]);

        $galleryCategory->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->back()->with('success', 'Kategori galeri berhasil diperbarui.');
    }

    public function destroy(GalleryCategory $galleryCategory)
    {
        try {
            $galleryCategory->delete();
            return redirect()->back()->with('success', 'Kategori galeri berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus kategori. Pastikan tidak ada galeri yang menggunakan kategori ini.');
        }
    }
}