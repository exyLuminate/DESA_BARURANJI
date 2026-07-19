<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('village_statistics', function (Blueprint $table) {
            $table->id();
            $table->integer('total_population')->default(0);
            $table->integer('total_family_cards')->default(0);
            $table->integer('total_male')->default(0);
            $table->integer('total_female')->default(0);
            $table->integer('total_hamlets')->default(0);
            $table->integer('total_rt')->default(0);
            
            // Data Kesejahteraan
            $table->integer('pre_prosperous')->default(0);
            $table->integer('ks_1')->default(0);
            $table->integer('ks_2')->default(0);
            $table->integer('ks_3')->default(0);
            $table->integer('ks_3_plus')->default(0);
            
            $table->year('statistic_year');
            
            $table->timestamps();
            
            // Relasi Audit (Tanpa Soft Delete)
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('village_statistics');
    }
};