<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Complaint extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'name',
        'contact',
        'type',
        'title',
        'body',
        'image',
        'status',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(fn(string $eventName) => "Laporan warga telah di-{$eventName}")
            ->useLogName('Laporan Warga');
    }
}