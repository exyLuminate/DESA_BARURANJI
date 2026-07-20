<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VillageProfile;
use App\Http\Requests\UpdateGreetingRequest;
use App\Http\Requests\Admin\UpdateVillageProfileRequest;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VillageProfileController extends Controller
{
    /**
     * Memastikan single record pattern terpenuhi.
     */
    private function getProfile()
    {
        return VillageProfile::firstOrCreate(
            ['id' => 1],
            ['village_name' => 'Desa Baru Ranji'] // Nilai default wajib
        );
    }

    public function editGreeting()
    {
        return Inertia::render('Admin/VillageProfile/Greeting', [
            'profile' => $this->getProfile()
        ]);
    }

    public function updateGreeting(UpdateGreetingRequest $request)
    {
        $profile = $this->getProfile();
        $validated = $request->validated();

        if ($request->hasFile('greeting_image')) {
            if ($profile->greeting_image && Storage::disk('public')->exists($profile->greeting_image)) {
                Storage::disk('public')->delete($profile->greeting_image);
            }
            
            $path = $request->file('greeting_image')->store('profiles', 'public');
            $validated['greeting_image'] = $path;
        } else {
            unset($validated['greeting_image']);
        }

        $validated['updated_by'] = auth()->id();
        $profile->update($validated);

        return back()->with('success', 'Sambutan Kepala Desa berhasil diperbarui.');
    }

    public function edit()
    {
        // Menggunakan Single Record Pattern sesuai aturan SOT
        $profile = VillageProfile::first() ?? new VillageProfile();

        return Inertia::render('Admin/VillageProfile/Edit', [
            'profile' => $profile
        ]);
    }
    
    public function update(UpdateVillageProfileRequest $request)
    {
        // Menggunakan Single Record Pattern
        $profile = VillageProfile::first();
        if (!$profile) {
            $profile = new VillageProfile();
        }

        $validated = $request->validated();

        // Manajemen Upload Logo Desa dengan Storage
        if ($request->hasFile('village_logo')) {
            if ($profile->village_logo && Storage::disk('public')->exists($profile->village_logo)) {
                Storage::disk('public')->delete($profile->village_logo);
            }
            $validated['village_logo'] = $request->file('village_logo')->store('village-profiles', 'public');
        }

        // Manajemen Upload Cover Desa dengan Storage
        if ($request->hasFile('village_cover')) {
            if ($profile->village_cover && Storage::disk('public')->exists($profile->village_cover)) {
                Storage::disk('public')->delete($profile->village_cover);
            }
            $validated['village_cover'] = $request->file('village_cover')->store('village-profiles', 'public');
        }

        // Simpan pembaruan ke database
        $profile->fill($validated);
        $profile->save();

        return redirect()->back()->with('success', 'Profil desa berhasil diperbarui.');
    }
}