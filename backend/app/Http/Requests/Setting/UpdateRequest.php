<?php

namespace App\Http\Requests\Setting;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "data.file.logo" => 'nullable|image|mimes:png,jpg,jpeg,svg,webp',
            "data.file.logo_white" => 'nullable|image|mimes:png,jpg,jpeg,svg,webp',
            "data.file.favicon" => 'nullable|image|mimes:png,jpg,jpeg,svg,webp',
            "data.file.pdf" => 'nullable|image|mimes:pdf',
        ];
    }
}
