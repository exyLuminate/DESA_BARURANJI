<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Activitylog\Traits\LogsActivity; // <-- Import Spatie
use Spatie\Activitylog\LogOptions;          // <-- Import Spatie

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, LogsActivity; // <-- Tambahkan LogsActivity

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // <-- Tambahkan Blok Fungsi Activity Log Ini -->
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(fn(string $eventName) => "Akun admin/pengguna telah di-{$eventName}")
            ->useLogName('Manajemen Akun'); 
    }

    public function createdBanners()
    {
        return $this->hasMany(Banner::class, 'created_by');
    }

    public function updatedBanners()
    {
        return $this->hasMany(Banner::class, 'updated_by');
    }

    public function deletedBanners()
    {
        return $this->hasMany(Banner::class, 'deleted_by');
    }
}