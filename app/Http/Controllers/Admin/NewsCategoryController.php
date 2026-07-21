<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsCategory;
use App\Http\Requests\Admin\StoreNewsCategoryRequest;
use App\Http\Requests\Admin\UpdateNewsCategoryRequest;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsCategoryController extends Controller
{
    public function index()
    {
        $categories = NewsCategory::latest()->paginate(10);
        
        return Inertia::render('Admin/NewsCategory/Index', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/NewsCategory/Create');
    }

    public function store(StoreNewsCategoryRequest $request)
    {
        $slug = Str::slug($request->name);
        
        // Memastikan slug unik[cite: 1]
        $originalSlug = $slug;
        $count = 1;
        while (NewsCategory::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }

        NewsCategory::create([
            'name' => $request->name,
            'slug' => $slug,
        ]);

        return redirect()->route('admin.news-categories.index')
            ->with('success', 'Kategori berita berhasil ditambahkan.');
    }

    public function edit(NewsCategory $newsCategory)
    {
        return Inertia::render('Admin/NewsCategory/Edit', [
            'category' => $newsCategory
        ]);
    }

    public function update(UpdateNewsCategoryRequest $request, NewsCategory $newsCategory)
    {
        $data = ['name' => $request->name];

        // Update slug hanya jika nama berubah
        if ($request->name !== $newsCategory->name) {
            $slug = Str::slug($request->name);
            $originalSlug = $slug;
            $count = 1;
            while (NewsCategory::where('slug', $slug)->where('id', '!=', $newsCategory->id)->exists()) {
                $slug = $originalSlug . '-' . $count++;
            }
            $data['slug'] = $slug;
        }

        $newsCategory->update($data);

        return redirect()->route('admin.news-categories.index')
            ->with('success', 'Kategori berita berhasil diperbarui.');
    }

    public function destroy(NewsCategory $newsCategory)
    {
        // Penghapusan menggunakan soft delete[cite: 1]
        $newsCategory->delete();

        return redirect()->route('admin.news-categories.index')
            ->with('success', 'Kategori berita berhasil dihapus.');
    }
}