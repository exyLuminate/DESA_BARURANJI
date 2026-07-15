<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES (Halaman Depan Website Desa)
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('Public/Home', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/profil', function () { return Inertia::render('Public/Profile'); })->name('profile');
Route::get('/data-desa', function () { return Inertia::render('Public/VillageData'); })->name('village-data');
Route::get('/berita', function () { return Inertia::render('Public/News'); })->name('news');
Route::get('/galeri', function () { return Inertia::render('Public/Gallery'); })->name('gallery');
Route::get('/kontak', function () { return Inertia::render('Public/Contact'); })->name('contact');


/*
|--------------------------------------------------------------------------
| AUTH & PROFILE ROUTES (Bawaan Laravel Breeze)
|--------------------------------------------------------------------------
*/
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
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

    // Nanti rute untuk CRUD Berita, Data Desa, Galeri, dll. ditaruh di dalam grup ini
    
});

require __DIR__.'/auth.php';