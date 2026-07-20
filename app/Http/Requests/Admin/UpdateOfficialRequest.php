<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOfficialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:150'],
            'position' => ['required', 'string', 'max:100'],
            'photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
            'is_village_head' => ['boolean'],
            'sort_order' => ['integer'],
            'period_start' => ['nullable', 'digits:4', 'integer', 'min:1900', 'max:2100'],
            'period_end' => ['nullable', 'digits:4', 'integer', 'min:1900', 'max:2100'],
            'is_active' => ['boolean'],
        ];
    }
}