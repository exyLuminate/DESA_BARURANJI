<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('village_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('village_name', 150);
            $table->string('village_logo', 255)->nullable();
            $table->string('village_cover', 255)->nullable();
            $table->longText('history')->nullable();
            $table->longText('vision')->nullable();
            $table->longText('mission')->nullable();
            $table->text('boundary_description')->nullable();
            $table->decimal('area_size', 10, 2)->nullable();
            $table->text('address')->nullable();
            
            // Field khusus untuk Sambutan (Greeting)
            $table->string('greeting_title', 255)->nullable();
            $table->longText('greeting_message')->nullable();
            $table->string('greeting_image', 255)->nullable();
            
            $table->string('phone', 30)->nullable();
            $table->string('email', 100)->nullable();
            $table->longText('maps_embed')->nullable();
            $table->string('facebook_url', 255)->nullable();
            $table->string('instagram_url', 255)->nullable();
            $table->string('youtube_url', 255)->nullable();
            $table->string('tiktok_url', 255)->nullable();
            
            $table->timestamps();
            
            // Relasi Audit (Tanpa Soft Delete sesuai SOT)
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('village_profiles');
    }
};