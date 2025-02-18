<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Driver extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = ['id'];
    public function user()
    {
        $this->belongsTo(User::class);
    }
    public function vehicles(){
        $this->hasMany(Vehicle::class);
    }

}
