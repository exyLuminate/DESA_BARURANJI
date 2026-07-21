<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreHamletRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100', 'unique:hamlets,name'], // Nama dusun wajib unik
            'total_rt' => ['required', 'integer', 'min:0'],
            'head_name' => ['nullable', 'string', 'max:150'],
            'description' => ['nullable', 'string'],
        ];
    }
}