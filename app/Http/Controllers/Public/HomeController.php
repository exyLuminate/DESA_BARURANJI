<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Mengambil banner aktif, urut berdasarkan sort_order, lalu fallback ke yang terbaru
        $banners = Banner::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Public/Home', [
            'banners' => $banners
        ]);
    }
}