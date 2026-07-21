<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreNewsCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Asumsi di-handle oleh middleware route
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
        ];
    }
}