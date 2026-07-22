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
        Schema::create('complaints', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama pelapor
            $table->string('contact')->nullable(); // No HP atau Email pelapor
            $table->string('type')->default('pengaduan'); // Opsi: pengaduan, aspirasi, pertanyaan
            $table->string('title'); // Judul laporan
            $table->text('body'); // Isi laporan
            $table->string('image')->nullable(); // Foto bukti lampiran (opsional)
            $table->enum('status', ['pending', 'diproses', 'selesai', 'ditolak'])->default('pending'); // Status tindak lanjut
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complaints');
    }
};
