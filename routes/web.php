<?php

use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Admin\VillageProfileController;
use App\Http\Controllers\Admin\OfficialController;
use App\Http\Controllers\Admin\VillageStatisticController;
use App\Http\Controllers\Admin\HamletController;
use App\Http\Controllers\Admin\PotentialController; 
use App\Http\Controllers\Admin\FacilityController;
use App\Http\Controllers\Admin\NewsCategoryController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Public\NewsController as PublicNewsController; 
use App\Http\Controllers\Admin\GalleryCategoryController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Public\GalleryController as PublicGalleryController;
use App\Http\Controllers\Admin\ComplaintController;
use App\Http\Controllers\Public\ComplaintController as PublicComplaintController;
use App\Models\VillageProfile;
use App\Models\Official;
use App\Models\VillageStatistic;
use App\Models\Hamlet;
use App\Models\Potential;
use App\Models\Facility;


/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES (Halaman Depan Website Desa)
|--------------------------------------------------------------------------
*/
Route::get('/', [HomeController::class, 'index'])
    ->name('home');

Route::get('/profil', function () {
    return Inertia::render('Public/Profile', [
        'profile' => VillageProfile::first(),
        'officials' => Official::where('is_active', true)->orderBy('sort_order', 'asc')->get()
    ]);
})->name('public.profile');

Route::get('/data-desa', function () {
    return Inertia::render('Public/VillageData', [
        // Mengambil statistik tahun terbaru
        'statistic' => VillageStatistic::orderBy('statistic_year', 'desc')->first(),
        // Mengambil seluruh dusun
        'hamlets' => Hamlet::orderBy('name', 'asc')->get(),
        // Mengambil seluruh potensi desa
        'potentials' => Potential::latest()->get(),
        // Mengambil seluruh fasilitas desa
        'facilities' => Facility::latest()->get(),
    ]);
})->name('village-data');

Route::get('/berita', [PublicNewsController::class, 'index'])->name('news');
Route::get('/berita/{slug}', [PublicNewsController::class, 'show'])->name('news.show');

// INI RUTE GALERI PUBLIK YANG BENAR
Route::get('/galeri', [PublicGalleryController::class, 'index'])->name('gallery');

Route::get('/layanan-pengaduan', [PublicComplaintController::class, 'index'])->name('complaints.public');
Route::post('/layanan-pengaduan', [PublicComplaintController::class, 'store'])->name('complaints.store');


/*
|--------------------------------------------------------------------------
| AUTH & PROFILE ROUTES (Bawaan Laravel Breeze)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});


/*
|--------------------------------------------------------------------------
| ADMIN ROUTES (Area Pengelolaan CMS)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {

        Route::get('/dashboard', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('dashboard');

        /*
        |--------------------------------------------------------------------------
        | Homepage Module
        |--------------------------------------------------------------------------
        */
        Route::resource('banners', BannerController::class);
        Route::patch('banners/{banner}/toggle', [BannerController::class, 'toggle'])->name('banners.toggle');

        Route::get('village-profile/greeting', [VillageProfileController::class, 'editGreeting'])->name('village-profile.greeting.edit');
        Route::put('village-profile/greeting', [VillageProfileController::class, 'updateGreeting'])->name('village-profile.greeting.update');

        Route::get('/village-profile', [VillageProfileController::class, 'edit'])->name('village-profile.edit');
        Route::post('/village-profile', [VillageProfileController::class, 'update'])->name('village-profile.update');

        /*
        |--------------------------------------------------------------------------
        | Officials Module (Perangkat Desa)
        |--------------------------------------------------------------------------
        */

        Route::resource('officials', OfficialController::class)->except(['show']);
        Route::post('officials/{official}', [OfficialController::class, 'update'])->name('officials.update');
        
        /*
        |--------------------------------------------------------------------------
        | Data Desa Module
        |--------------------------------------------------------------------------
        */
        Route::resource('village-statistics', VillageStatisticController::class)->except(['show']);
        Route::resource('hamlets', HamletController::class)->except(['show']);

        Route::resource('potentials', PotentialController::class)->except(['show']);
        Route::post('potentials/{potential}', [PotentialController::class, 'update'])->name('potentials.update');

        Route::resource('facilities', FacilityController::class)->except(['show']);
        Route::post('facilities/{facility}', [FacilityController::class, 'update'])->name('facilities.update');

        /*
        |--------------------------------------------------------------------------
        | News Module (Phase 5)
        |--------------------------------------------------------------------------
        */
        Route::resource('news-categories', NewsCategoryController::class)->except(['show']);
        Route::post('news/upload-image', [NewsController::class, 'uploadImage'])->name('news.upload-image');
        Route::resource('news', NewsController::class)->except(['show']); 
       
        /*
        |--------------------------------------------------------------------------
        | Gallery Module (Phase 6)
        |--------------------------------------------------------------------------
        */
        Route::resource('gallery-categories', GalleryCategoryController::class)->except(['show', 'create', 'edit']);
        Route::resource('galleries', GalleryController::class);

        /*
        |--------------------------------------------------------------------------
        | Complaint Module (Phase 7)
        |--------------------------------------------------------------------------
        */
        Route::resource('complaints', ComplaintController::class)->except(['create', 'store', 'edit']);

        /*
        |--------------------------------------------------------------------------
        | Future Modules
        |--------------------------------------------------------------------------
        */
        // Route::resource('officials', OfficialController::class);
        // Route::resource('news', NewsController::class);
        // Route::resource('galleries', GalleryController::class);
    });

require __DIR__ . '/auth.php';