<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('site_setting_translates', function (Blueprint $table) {
            $table->id();
            $table->integer('setting_id');
            $table->string('lang');
            $table->string('title')->nullable();
            $table->string('description')->nullable();
            $table->string('author')->nullable();
            $table->string('keywords')->nullable();
            $table->string('copyright')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_setting_translates');
    }
};
