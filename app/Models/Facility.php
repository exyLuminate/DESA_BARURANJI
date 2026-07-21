<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Facility extends Model
{
    use HasFactory, SoftDeletes; // Soft Delete: ✅

    protected $fillable = [
        'name',
        'description',
        'location',
        'image',
        'created_by',
        'updated_by',
        'deleted_by',
    ];
}