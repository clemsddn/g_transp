<?php

use App\Models\Invoice;
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
        Schema::create('trips', function (Blueprint $table) {
            $table->id();
           
            $table->double('prixUnitaire')->nullable();
            $table->double('fraisRoutier')->nullable();
            $table->double('avanceCarburant')->nullable();
            $table->double('pesee1')->nullable();
            $table->double('pesee2')->nullable();
            $table->string('depart')->nullable();
            $table->string('destination')->nullable();
            $table->date('dateDepart')->nullable();
            $table->date('dateArriver')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
        Schema::table('trips', function(Blueprint $table){
            $table->foreignIdFor(Vehicle::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();

        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trips');
        Schema::table('trips', function(Blueprint $table){
            $table->dropForeignIdFor(Vehicle::class);
            $table->dropForeignIdFor(User::class);


        });
    }
};
