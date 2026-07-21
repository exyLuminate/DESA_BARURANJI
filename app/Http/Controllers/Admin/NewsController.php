<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\NewsCategory;
use App\Http\Requests\Admin\StoreNewsRequest;
use App\Http\Requests\Admin\UpdateNewsRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        // Eager load category dan author untuk optimasi query
        $news = News::with(['category', 'author'])->latest()->paginate(10);
        
        return Inertia::render('Admin/News/Index', [
            'news' => $news
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/News/Create', [
            'categories' => NewsCategory::orderBy('name')->get()
        ]);
    }

    public function store(StoreNewsRequest $request)
    {
        $data = $request->validated();
        
        // Auto Slug[cite: 1]
        $slug = Str::slug($data['title']);
        $originalSlug = $slug;
        $count = 1;
        while (News::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }
        $data['slug'] = $slug;
        $data['user_id'] = auth()->id();

        // Handle Thumbnail Upload[cite: 1]
        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('news', 'public');
        }

        // Handle Published At
        if (isset($data['is_published']) && $data['is_published']) {
            $data['published_at'] = now();
        }

        News::create($data);

        return redirect()->route('admin.news.index')->with('success', 'Berita berhasil ditambahkan.');
    }

    public function edit(News $news)
    {
        return Inertia::render('Admin/News/Edit', [
            'news' => $news,
            'categories' => NewsCategory::orderBy('name')->get()
        ]);
    }

    public function update(UpdateNewsRequest $request, News $news)
    {
        $data = $request->validated();

        // Update Slug jika judul berubah[cite: 1]
        if ($data['title'] !== $news->title) {
            $slug = Str::slug($data['title']);
            $originalSlug = $slug;
            $count = 1;
            while (News::where('slug', $slug)->where('id', '!=', $news->id)->exists()) {
                $slug = $originalSlug . '-' . $count++;
            }
            $data['slug'] = $slug;
        }

        // Handle Thumbnail Upload[cite: 1]
        if ($request->hasFile('thumbnail')) {
            if ($news->thumbnail) {
                Storage::disk('public')->delete($news->thumbnail);
            }
            $data['thumbnail'] = $request->file('thumbnail')->store('news', 'public');
        }

        // Handle Published At
        if (isset($data['is_published']) && $data['is_published'] && !$news->is_published) {
            $data['published_at'] = now();
        } elseif (isset($data['is_published']) && !$data['is_published']) {
            $data['published_at'] = null;
        }

        $news->update($data);

        return redirect()->route('admin.news.index')->with('success', 'Berita berhasil diperbarui.');
    }

    public function destroy(News $news)
    {
        // Soft delete[cite: 1]
        $news->delete();
        return redirect()->route('admin.news.index')->with('success', 'Berita berhasil dihapus.');
    }

    public function uploadImage(\Illuminate\Http\Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        // Simpan ke storage
        $path = $request->file('image')->store('news/content', 'public');

        return response()->json([
            'url' => asset('storage/' . $path)
        ]);
    }
}