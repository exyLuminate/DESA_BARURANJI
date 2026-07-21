<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\NewsCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $query = News::with('category', 'author')
            ->where('is_published', true); // Hanya berita yang dipublish

        // Fitur Pencarian Berita
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Fitur Filter Kategori
        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        $news = $query->latest('published_at')->paginate(9)->withQueryString();
        $categories = NewsCategory::has('news')->get(); // Hanya ambil kategori yang punya berita

        return Inertia::render('Public/News', [
            'news' => $news,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category'])
        ]);
    }

   public function show($slug)
    {
        $query = News::with(['category', 'author'])->where('slug', $slug);

        // Pengecekan Akses: Jika BUKAN admin yang login, wajibkan status publish
        if (!auth()->check()) {
            $query->where('is_published', true);
        }

        $news = $query->firstOrFail();

        // Berita Terkait Berdasarkan Kategori
        // Berita terkait tetap hanya menampilkan yang sudah dipublish
        $relatedNews = News::where('category_id', $news->category_id)
            ->where('id', '!=', $news->id)
            ->where('is_published', true)
            ->latest('published_at')
            ->take(5)
            ->get();

        return Inertia::render('Public/NewsDetail', [
            'news' => $news,
            'relatedNews' => $relatedNews,
        ]);
    }
}