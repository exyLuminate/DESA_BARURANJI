<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Activitylog\Traits\LogsActivity; 
use Spatie\Activitylog\LogOptions;
use App\Notifications\CustomResetPassword; // <-- 1. Import class Notifikasi Custom kita

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, LogsActivity; 

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

    // <-- 2. Fungsi sakti untuk menimpa email bahasa Inggris bawaan Laravel -->
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new CustomResetPassword($token));
    }

    // <-- Blok Fungsi Activity Log -->
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