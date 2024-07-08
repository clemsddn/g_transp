<?php

use App\Models\Vehicle;
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
        Schema::create('dimensions', function (Blueprint $table) {
            $table->id();
            $table->double('longueur');
            $table->double('largeur');
            $table->double('hauteur');
            $table->softDeletes();
            $table->timestamps();
        });
        
        Schema::table('dimensions', function(Blueprint $table){
            $table->foreignIdFor(Vehicle::class)->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dimensions');
        
        Schema::table('dimensions', function(Blueprint $table){
            $table->foreignIdFor(Vehicle::class)->constrained()->cascadeOnDelete();
        });
    }
};
