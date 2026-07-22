<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting; // Pastikan model Setting sudah ada
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    /**
     * Menampilkan halaman form pengaturan (Single Record)
     */
    public function edit()
    {
        // Menggunakan firstOrCreate agar tidak error jika tabel masih kosong
        $setting = Setting::firstOrCreate(
            ['id' => 1],
            [
                'site_title' => 'Website Desa',
                'site_description' => 'Sistem Informasi Profil Desa',
            ]
        );

        return Inertia::render('Admin/Setting/Edit', [
            'setting' => $setting
        ]);
    }

    /**
     * Memperbarui data pengaturan
     */
    public function update(Request $request)
    {
        $setting = Setting::first();

        $validated = $request->validate([
            'site_title' => 'required|string|max:255',
            'site_description' => 'nullable|string',
            'favicon' => 'nullable|image|mimes:ico,png,jpg,jpeg|max:1024',
        ]);

        // Proses upload favicon jika ada file yang diunggah
        if ($request->hasFile('favicon')) {
            // Hapus favicon lama jika ada
            if ($setting->favicon && Storage::disk('public')->exists($setting->favicon)) {
                Storage::disk('public')->delete($setting->favicon);
            }
            // Simpan favicon baru
            $validated['favicon'] = $request->file('favicon')->store('settings', 'public');
        }

        $setting->update($validated);

        return redirect()->back()->with('success', 'Pengaturan website berhasil diperbarui.');
    }
}