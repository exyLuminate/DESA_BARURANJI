<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VillageStatistic;
use App\Http\Requests\Admin\StoreVillageStatisticRequest;
use App\Http\Requests\Admin\UpdateVillageStatisticRequest;
use Inertia\Inertia;

class VillageStatisticController extends Controller
{
    public function index()
    {
        // Tampilkan data diurutkan dari tahun terbaru
        $statistics = VillageStatistic::orderBy('statistic_year', 'desc')->get();
        return Inertia::render('Admin/VillageStatistic/Index', [
            'statistics' => $statistics
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/VillageStatistic/Create');
    }

    public function store(StoreVillageStatisticRequest $request)
    {
        VillageStatistic::create($request->validated());

        return redirect()->route('admin.village-statistics.index')->with('success', 'Data statistik berhasil ditambahkan.');
    }

    public function edit(VillageStatistic $villageStatistic)
    {
        return Inertia::render('Admin/VillageStatistic/Edit', [
            'statistic' => $villageStatistic
        ]);
    }

    public function update(UpdateVillageStatisticRequest $request, VillageStatistic $villageStatistic)
    {
        $villageStatistic->update($request->validated());

        return redirect()->route('admin.village-statistics.index')->with('success', 'Data statistik berhasil diperbarui.');
    }

    public function destroy(VillageStatistic $villageStatistic)
    {
        $villageStatistic->delete();

        return redirect()->route('admin.village-statistics.index')->with('success', 'Data statistik berhasil dihapus.');
    }
}