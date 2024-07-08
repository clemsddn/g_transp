<?php

use App\Models\User;
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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone')->unique();
            $table->string('email')->unique();
            $table->string('fax');
            $table->string('boitPostal');
            $table->boolean('isEntreprise')->default(false);
            $table->string('address')->nullable();
            $table->string('ville')->nullable();
            $table->string('pays')->nullable();
            $table->string('logo')->nullable();
            $table->string('logoUrl')->nullable();
            $table->string('divisionFiscal')->nullable();
            $table->string('regimeFiscal')->nullable();
            $table->string('rccm')->nullable();
            $table->string('ifu')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('companies', function(Blueprint $table){
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
        Schema::dropIfExists('companies');
        Schema::table('companies', function(Blueprint $table){
            $table->dropForeignIdFor(User::class);
        });
    }
};
