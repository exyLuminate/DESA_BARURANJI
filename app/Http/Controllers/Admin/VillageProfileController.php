<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VillageProfile;
use App\Http\Requests\UpdateGreetingRequest;
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
}