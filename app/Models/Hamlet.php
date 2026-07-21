<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Hamlet extends Model
{
    use HasFactory, SoftDeletes; // Soft Delete: ✅

    protected $fillable = [
        'name',
        'total_rt',
        'head_name',
        'description',
        'created_by',
        'updated_by',
        'deleted_by',
    ];
}