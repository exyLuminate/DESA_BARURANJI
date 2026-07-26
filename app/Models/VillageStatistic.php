<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class VillageStatistic extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'statistic_year',
        'total_population',
        'total_family_cards',
        'total_male',
        'total_female',
        'total_hamlets',
        'total_rt',
        'pre_prosperous',
        'ks_1',
        'ks_2',
        'ks_3',
        'ks_3_plus',
        'created_by',
        'updated_by',
    ];

    protected $guarded = ['id'];

    protected $casts = [
        'statistic_year' => 'integer',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(fn(string $eventName) => "Statistik desa telah di-{$eventName}")
            ->useLogName('Data Statistik'); 
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function editor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}