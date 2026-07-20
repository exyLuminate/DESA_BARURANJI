<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVillageStatisticRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $statisticId = $this->route('village_statistic') ? $this->route('village_statistic')->id : null;

        return [
            // Validasi tahun unik kecuali untuk ID ini sendiri
            'statistic_year' => ['required', 'digits:4', 'integer', 'min:1900', 'max:2100', Rule::unique('village_statistics', 'statistic_year')->ignore($statisticId)],
            'total_population' => ['required', 'integer', 'min:0'],
            'total_family_cards' => ['required', 'integer', 'min:0'],
            'total_male' => ['required', 'integer', 'min:0'],
            'total_female' => ['required', 'integer', 'min:0'],
            'total_hamlets' => ['required', 'integer', 'min:0'],
            'total_rt' => ['required', 'integer', 'min:0'],
            'pre_prosperous' => ['required', 'integer', 'min:0'],
            'ks_1' => ['required', 'integer', 'min:0'],
            'ks_2' => ['required', 'integer', 'min:0'],
            'ks_3' => ['required', 'integer', 'min:0'],
            'ks_3_plus' => ['required', 'integer', 'min:0'],
        ];
    }
}