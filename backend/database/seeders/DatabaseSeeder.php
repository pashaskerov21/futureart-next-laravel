<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Menu;
use App\Models\MenuTranslate;
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
        SiteSettingTranslate::create(['setting_id' => 1, "title" => "Futureart AZ", 'lang' => 'az']);
        SiteSettingTranslate::create(['setting_id' => 1, "title" => "Futureart EN", 'lang' => 'en']);
        SiteSettingTranslate::create(['setting_id' => 1, "title" => "Futureart RU", 'lang' => 'ru']);

        Menu::create(["id" => 1, "order" => 1, "slug" => "about"]);
        Menu::create(["id" => 2, "order" => 2, "slug" => "services"]);
        Menu::create(["id" => 3, "order" => 3, "slug" => "projects"]);
        Menu::create(["id" => 4, "order" => 4, "slug" => "references"]);
        Menu::create(["id" => 5, "order" => 5, "slug" => "contact"]);
        MenuTranslate::create(["menu_id" => 1, "lang" => "az", "title" => "Haqqımızda"]);
        MenuTranslate::create(["menu_id" => 1, "lang" => "en", "title" => "About us"]);
        MenuTranslate::create(["menu_id" => 1, "lang" => "ru", "title" => "О нас"]);
        MenuTranslate::create(["menu_id" => 2, "lang" => "az", "title" => "Xidmətlərimiz"]);
        MenuTranslate::create(["menu_id" => 2, "lang" => "en", "title" => "Services"]);
        MenuTranslate::create(["menu_id" => 2, "lang" => "ru", "title" => "Сервисы"]);
        MenuTranslate::create(["menu_id" => 3, "lang" => "az", "title" => "Layihələrimiz"]);
        MenuTranslate::create(["menu_id" => 3, "lang" => "en", "title" => "Projects"]);
        MenuTranslate::create(["menu_id" => 3, "lang" => "ru", "title" => "Проекты"]);
        MenuTranslate::create(["menu_id" => 4, "lang" => "az", "title" => "Referanslar"]);
        MenuTranslate::create(["menu_id" => 4, "lang" => "en", "title" => "References"]);
        MenuTranslate::create(["menu_id" => 4, "lang" => "ru", "title" => "Рекомендации"]);
        MenuTranslate::create(["menu_id" => 5, "lang" => "az", "title" => "Əlaqə"]);
        MenuTranslate::create(["menu_id" => 5, "lang" => "en", "title" => "Contact"]);
        MenuTranslate::create(["menu_id" => 5, "lang" => "ru", "title" => "Контакт"]);
    }
}
