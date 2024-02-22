<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\SiteSettings;
use App\Models\SiteSettingTranslate;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(1)->create();
        User::create([
            'name' => 'Pasha',
            'email' => 'info@admin.com',
            'email_verified_at' => now(),
            'password' => Hash::make('123'),
            'user_type' => 'admin',
            'api_token' => Str::random(60),
            'destroy' => 0,
        ]);

        SiteSettings::create(['id' => 1]);
        SiteSettingTranslate::create(['setting_id' => 1, 'lang' => 'az']);
        SiteSettingTranslate::create(['setting_id' => 1, 'lang' => 'en']);
        SiteSettingTranslate::create(['setting_id' => 1, 'lang' => 'ru']);
    }
}
