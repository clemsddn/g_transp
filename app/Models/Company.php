<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Company extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'phone', 'email', 'fax', 'boitPostal', 'isEntreprise',
        'address', 'ville', 'pays', 'logo', 'logoUrl', 'divisionFiscal',
        'regimeFiscal', 'rccm', 'ifu', 'user_id'
    ];

    protected $table = 'companies';
    // Primary Key
    public $primaryKey = 'id';
    // Timestamps
    public $timestamps = true;

    public function products()
    {
        return $this->hasMany(Company::class);
    }

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }
    public function user()
    {
        return $this->belongsTo(Trip::class);
    }
}
