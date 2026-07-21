<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateHamletRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Ambil ID dusun dari route parameter (otomatis bernama 'hamlet' dari route resource)
        $hamletId = $this->route('hamlet') ? $this->route('hamlet')->id : null;

        return [
            'name' => ['required', 'string', 'max:100', Rule::unique('hamlets', 'name')->ignore($hamletId)],
            'total_rt' => ['required', 'integer', 'min:0'],
            'head_name' => ['nullable', 'string', 'max:150'],
            'description' => ['nullable', 'string'],
        ];
    }
}