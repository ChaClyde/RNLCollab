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
        Schema::create('tbl_venues', function (Blueprint $table) {
            $table->id('venue_id');
            $table->string('venue_name');
            $table->text('venue_description')->nullable();
            $table->tinyInteger('is_deleted')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('tbl_venues');
        Schema::enableForeignKeyConstraints();
    }
};
