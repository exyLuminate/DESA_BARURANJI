<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\VillageProfile;
use App\Models\Official;
use App\Models\VillageStatistic;
use App\Models\Potential;
use App\Models\News;
use App\Models\Gallery;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $banners = Banner::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        $profile = VillageProfile::first();

        $villageHead = Official::where('is_village_head', true)
            ->where('is_active', true)
            ->first();

        $statistics = VillageStatistic::orderBy('statistic_year', 'desc')->first();

        // 1. Ambil 3 Potensi Unggulan
        $featuredPotentials = Potential::latest()->take(3)->get();

        // 2. Ambil 3 Berita Terbaru yang sudah di-publish
        $latestNews = News::with(['category', 'author'])
            ->where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get();

        // 3. Ambil 4 Galeri/Dokumentasi Terbaru
        $latestGalleries = Gallery::with('category')
            ->latest()
            ->take(4)
            ->get();

        return Inertia::render('Public/Home', [
            'banners' => $banners,
            'profile' => $profile,
            'villageHead' => $villageHead,
            'statistics' => $statistics,
            'featuredPotentials' => $featuredPotentials,
            'latestNews' => $latestNews,
            'latestGalleries' => $latestGalleries,
        ]);
    }
}