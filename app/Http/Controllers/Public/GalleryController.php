<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\GalleryCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $categories = GalleryCategory::orderBy('name')->get();
        
        $query = Gallery::with('category')->latest();

        // Filter berdasarkan kategori
        if ($request->has('kategori') && $request->kategori !== 'semua') {
            $query->whereHas('category', function($q) use ($request) {
                $q->where('slug', $request->kategori);
            });
        }

        // PASTIKAN BARIS INI MENGGUNAKAN paginate(12), bukan get()
        $galleries = $query->paginate(12)->withQueryString();

        return Inertia::render('Public/Gallery', [
            'categories' => $categories,
            'galleries' => $galleries,
            'currentCategory' => $request->kategori ?? 'semua'
        ]);
    }
}