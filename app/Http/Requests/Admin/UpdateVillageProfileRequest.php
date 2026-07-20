<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVillageProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Akan diproteksi oleh middleware auth di route
    }

    public function rules(): array
    {
        return [
            'village_name' => ['required', 'string', 'max:150'],
            'village_logo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
            'village_cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
            'history' => ['nullable', 'string'],
            'vision' => ['nullable', 'string'],
            'mission' => ['nullable', 'string'],
            'boundary_description' => ['nullable', 'string'],
            'area_size' => ['nullable', 'numeric', 'min:0'],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:100'],
            'maps_embed' => ['nullable', 'string'],
            'facebook_url' => ['nullable', 'url', 'max:255'],
            'instagram_url' => ['nullable', 'url', 'max:255'],
            'youtube_url' => ['nullable', 'url', 'max:255'],
            'tiktok_url' => ['nullable', 'url', 'max:255'],
        ];
    }
}