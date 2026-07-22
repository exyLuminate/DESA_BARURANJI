<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Setting extends Model
{
    use LogsActivity;

    protected $fillable = [
        'site_title',
        'site_description',
        'favicon',
        'created_by',
        'updated_by'
    ];

    /**
     * Konfigurasi Spatie Activity Log
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable() // Mencatat perubahan pada kolom fillable
            ->logOnlyDirty() // Hanya mencatat kolom yang berubah
            ->dontSubmitEmptyLogs()
            ->useLogName('Settings'); // Nama modul
    }

    /**
     * Relasi Audit Sesuai SOT 7.4
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}