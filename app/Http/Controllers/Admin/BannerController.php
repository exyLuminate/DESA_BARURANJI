<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBannerRequest;
use App\Http\Requests\UpdateBannerRequest;
use App\Models\Banner;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BannerController extends Controller
{
    public function index()
    {
        $banners = Banner::orderBy('sort_order')
            ->get();

        return Inertia::render(
            'Admin/Banner/Index',
            [
                'banners' => $banners,
            ]
        );
    }

    public function create()
    {
        return Inertia::render('Admin/Banner/Create');
    }

    public function store(StoreBannerRequest $request)
    {
        $imagePath = $request
            ->file('image')
            ->store('banners', 'public');

        Banner::create([
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'image' => $imagePath,
            'button_text' => $request->button_text,
            'button_url' => $request->button_url,
            'sort_order' => $request->sort_order ?? 0,
            'is_active' => $request->boolean('is_active'),
            'created_by' => auth()->id(),
        ]);

        return redirect()
            ->route('admin.banners.index')
            ->with('success', 'Banner berhasil dibuat.');
    }

    public function edit(Banner $banner)
    {
        return Inertia::render('Admin/Banner/Edit', [
            'banner' => $banner,
        ]);
    }

    public function update(UpdateBannerRequest $request, Banner $banner)
    {
        $imagePath = $banner->image;

        if ($request->hasFile('image')) {

            if (
                $banner->image &&
                Storage::disk('public')->exists($banner->image)
            ) {
                Storage::disk('public')->delete($banner->image);
            }

            $imagePath = $request
                ->file('image')
                ->store('banners', 'public');
        }

        $banner->update([
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'image' => $imagePath,
            'button_text' => $request->button_text,
            'button_url' => $request->button_url,
            'sort_order' => $request->sort_order ?? 0,
            'is_active' => $request->boolean('is_active'),
            'updated_by' => auth()->id(),
        ]);

        return redirect()
            ->route('admin.banners.index')
            ->with('success', 'Banner berhasil diperbarui.');
    }

    public function destroy(Banner $banner)
    {
        $banner->update([
            'deleted_by' => auth()->id(),
        ]);

        $banner->delete();

        return redirect()
            ->route('admin.banners.index')
            ->with('success', 'Banner berhasil dihapus.');
    }

    public function toggle(Banner $banner)
    {
        $banner->update([
            'is_active' => !$banner->is_active,
            'updated_by' => auth()->id(),
        ]);

        return back()->with(
            'success',
            'Status banner berhasil diperbarui.'
        );
    }
}