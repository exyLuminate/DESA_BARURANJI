<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;
use App\Models\User;

class ActivityLogController extends Controller
{
    /**
     * Display a listing of the activity logs.
     */
    public function index(Request $request)
    {
        $query = Activity::with('causer')->latest();

        // Pencarian berdasarkan deskripsi atau nama log
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('description', 'like', "%{$search}%")
                  ->orWhere('log_name', 'like', "%{$search}%");
            });
        }

        // Filter berdasarkan Pengguna (causer_id)
        if ($request->filled('causer_id')) {
            $query->where('causer_id', $request->input('causer_id'));
        }

        // Filter berdasarkan Modul (subject_type)
        if ($request->filled('subject_type')) {
            $query->where('subject_type', $request->input('subject_type'));
        }

        $logs = $query->paginate(15)->withQueryString();

        // Ambil data users untuk dropdown filter
        $users = User::select('id', 'name')->orderBy('name')->get();

        // Ambil daftar modul (subject_type) unik yang pernah dicatat untuk dropdown filter
        $modules = Activity::select('subject_type')
                    ->whereNotNull('subject_type')
                    ->distinct()
                    ->pluck('subject_type');

        return Inertia::render('Admin/ActivityLog/Index', [
            'logs' => $logs,
            'users' => $users,
            'modules' => $modules,
            'filters' => $request->only(['search', 'causer_id', 'subject_type'])
        ]);
    }

    /**
     * Display the specified activity log detail.
     */
    public function show(Activity $activityLog)
    {
        $activityLog->load('causer');
        
        return Inertia::render('Admin/ActivityLog/Show', [
            'log' => $activityLog
        ]);
    }
}