<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\News;
use App\Models\Gallery;
use App\Models\Complaint;
use App\Models\Official;
use App\Models\VillageStatistic;
use App\Models\Hamlet;
use App\Models\NewsCategory;
use App\Models\GalleryCategory;
use App\Models\Potential;
use App\Models\Facility;
use Spatie\Activitylog\Models\Activity;

class DashboardController extends Controller
{
    public function index()
    {
        // --- EXISTING STATS ---
        $stats = [
            'total_news' => News::count(),
            'total_gallery' => Gallery::count(),
            'unread_complaints' => Complaint::where('status', 'unread')->count(),
            'active_officials' => Official::where('is_active', true)->count(),
            // WIDGET 8: Ringkasan Administratif Kewilayahan
            'total_hamlets' => Hamlet::count(),
            'total_rt' => Hamlet::sum('total_rt'),
        ];

        // WIDGET 6: Info Kepala Desa Saat Ini (Sesuai SOT 5.5)
        $villageHead = Official::where('is_village_head', true)->where('is_active', true)->first();

        // WIDGET 3: Data Demografi Terbaru (Sesuai SOT 5.4)
        $latestStatistic = VillageStatistic::latest('statistic_year')->first();

        // WIDGET 7: Distribusi Kategori (Menggunakan Eager Loading withCount SOT 7.2 & 7.3)
        $newsCategories = NewsCategory::withCount('news')->get();
        $galleryCategories = GalleryCategory::withCount('galleries')->get();

        // WIDGET 9: Publikasi Berita Terakhir
        $recentPublishedNews = News::with('category')->where('is_published', true)->latest()->take(3)->get();

        // WIDGET 10: Sorotan Potensi & Fasilitas
        $recentPotentials = Potential::latest()->take(2)->get();
        $recentFacilities = Facility::latest()->take(2)->get();

        // --- EXISTING LOGS & COMPLAINTS ---
        $recentActivities = Activity::with('causer')->latest()->take(5)->get();
        $recentComplaints = Complaint::latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'villageHead' => $villageHead,
            'latestStatistic' => $latestStatistic,
            'newsCategories' => $newsCategories,
            'galleryCategories' => $galleryCategories,
            'recentPublishedNews' => $recentPublishedNews,
            'recentPotentials' => $recentPotentials,
            'recentFacilities' => $recentFacilities,
            'recentActivities' => $recentActivities,
            'recentComplaints' => $recentComplaints,
        ]);
    }
}