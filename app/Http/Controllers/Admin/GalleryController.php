<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\GalleryCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
        // Mengambil data galeri beserta relasi kategorinya
        $galleries = Gallery::with('category')->latest()->get();
        return Inertia::render('Admin/Gallery/Index', [
            'galleries' => $galleries
        ]);
    }

    public function create()
    {
        $categories = GalleryCategory::all();
        return Inertia::render('Admin/Gallery/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:gallery_categories,id', // Diubah ke category_id
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048', // Maksimal 2MB
        ]);

        $imagePath = $request->file('image')->store('galleries', 'public');

        Gallery::create([
            'category_id' => $request->category_id, // Diubah ke category_id
            'title' => $request->title,
            'image' => $imagePath,
        ]);

        return redirect()->route('admin.galleries.index')->with('success', 'Foto galeri berhasil ditambahkan.');
    }

    public function edit(Gallery $gallery)
    {
        $categories = GalleryCategory::all();
        return Inertia::render('Admin/Gallery/Edit', [
            'gallery' => $gallery,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Gallery $gallery)
    {
        $request->validate([
            'category_id' => 'required|exists:gallery_categories,id', // Diubah ke category_id
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = [
            'category_id' => $request->category_id, // Diubah ke category_id
            'title' => $request->title,
        ];

        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($gallery->image && Storage::disk('public')->exists($gallery->image)) {
                Storage::disk('public')->delete($gallery->image);
            }
            $data['image'] = $request->file('image')->store('galleries', 'public');
        }

        $gallery->update($data);

        return redirect()->route('admin.galleries.index')->with('success', 'Foto galeri berhasil diperbarui.');
    }

    public function destroy(Gallery $gallery)
    {
        if ($gallery->image && Storage::disk('public')->exists($gallery->image)) {
            Storage::disk('public')->delete($gallery->image);
        }
        
        $gallery->delete();

        return redirect()->route('admin.galleries.index')->with('success', 'Foto galeri berhasil dihapus.');
    }
}