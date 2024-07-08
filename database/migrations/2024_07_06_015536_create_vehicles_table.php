<?php

use App\Models\Driver;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('license_plate')->nullable()->unique(); // Making license_plate nullable and unique
            $table->enum('vehicle_type', ['tractor', 'trailer', 'truck', 'off']);
            $table->string('marque');
            $table->string('model');
            $table->string('provenance');
            $table->date('datequisition');
            $table->integer('amortissement');
            $table->string('etat');
            $table->double('valeur');
            $table->string('image')->nullable();
            $table->string('imageUrl')->nullable();
            $table->double('capaciteCharge');
            $table->string('typeCarburant')->nullable();
            $table->double('capaciteReservoir')->nullable();
            $table->double('puissanceMoteur')->nullable();
            $table->double('kilometrage')->nullable();
            $table->boolean('status')->default(true);
            $table->boolean('is_maried')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });


        Schema::table('vehicles', function(Blueprint $table){
            $table->foreignIdFor(Driver::class)->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(User::class)->nullable()->constrained()->cascadeOnDelete();

        });

        Schema::table('vehicles', function (Blueprint $table) {
            $table->unsignedBigInteger('tractor_id')->nullable();
            $table->foreign('tractor_id')->references('id')->on('vehicles')->onDelete('cascade');
        });
       
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vehicles');
      
        Schema::table('vehicles', function(Blueprint $table){
            $table->dropForeignIdFor(Driver::class);
            $table->dropForeign(['tractor_id']);
            $table->dropColumn('tractor_id');
            $table->dropForeignIdFor(User::class);
        });
    }
};
