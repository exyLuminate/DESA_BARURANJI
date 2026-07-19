<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGreetingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'greeting_title' => 'nullable|string|max:255',
            'greeting_message' => 'nullable|string',
            'greeting_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ];
    }
}