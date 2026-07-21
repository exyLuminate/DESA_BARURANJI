<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hamlets', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->integer('total_rt')->default(0);
            $table->string('head_name', 150)->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
            $table->softDeletes(); // SOT mewajibkan soft deletes pada entitas ini
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->unsignedBigInteger('deleted_by')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hamlets');
    }
};