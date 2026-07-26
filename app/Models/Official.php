<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Official extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $fillable = [
        'name',
        'position',
        'photo',
        'is_village_head',
        'sort_order',
        'period_start',
        'period_end',
        'is_active',
        'created_by',
        'updated_by',
        'deleted_by',
    ];
    
    protected $guarded = ['id'];

    protected $casts = [
        'is_village_head' => 'boolean',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'period_start' => 'integer',
        'period_end' => 'integer',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(fn(string $eventName) => "Perangkat desa telah di-{$eventName}")
            ->useLogName('Aparatur Desa'); 
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