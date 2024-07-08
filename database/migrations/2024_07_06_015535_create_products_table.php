<?php

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Eloquent\Scope;
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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('provenance');
            $table->string('unite');
            $table->longText('detail')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
        Schema::table('products', function( Blueprint $table){
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Company::class)->constrained()->cascadeOnDelete();

        });
    }



    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
        Schema::table('products', function( Blueprint $table){
            $table->dropForeignIdFor(User::class);
            $table->dropForeignIdFor(Company::class);

        });
    }
};
