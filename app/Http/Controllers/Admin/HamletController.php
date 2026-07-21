<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hamlet;
use App\Http\Requests\Admin\StoreHamletRequest;
use App\Http\Requests\Admin\UpdateHamletRequest;
use Inertia\Inertia;

class HamletController extends Controller
{
    public function index()
    {
        // Menampilkan daftar dusun
        $hamlets = Hamlet::latest()->get();
        return Inertia::render('Admin/Hamlet/Index', [
            'hamlets' => $hamlets
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Hamlet/Create');
    }

    public function store(StoreHamletRequest $request)
    {
        Hamlet::create($request->validated());

        return redirect()->route('admin.hamlets.index')->with('success', 'Data dusun berhasil ditambahkan.');
    }

    public function edit(Hamlet $hamlet)
    {
        return Inertia::render('Admin/Hamlet/Edit', [
            'hamlet' => $hamlet
        ]);
    }

    public function update(UpdateHamletRequest $request, Hamlet $hamlet)
    {
        $hamlet->update($request->validated());

        return redirect()->route('admin.hamlets.index')->with('success', 'Data dusun berhasil diperbarui.');
    }

    public function destroy(Hamlet $hamlet)
    {
        $hamlet->delete(); // Menggunakan Soft Delete

        return redirect()->route('admin.hamlets.index')->with('success', 'Data dusun berhasil dihapus.');
    }
}