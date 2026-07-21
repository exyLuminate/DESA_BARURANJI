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

Route::get('/berita', function () {
    return Inertia::render('Public/News');
})->name('news');

Route::get('/galeri', function () {
    return Inertia::render('Public/Gallery');
})->name('gallery');

Route::get('/kontak', function () {
    return Inertia::render('Public/Contact');
})->name('contact');


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
        | Future Modules
        |--------------------------------------------------------------------------
        */
        // Route::resource('officials', OfficialController::class);
        // Route::resource('news', NewsController::class);
        // Route::resource('galleries', GalleryController::class);
    });

require __DIR__ . '/auth.php';