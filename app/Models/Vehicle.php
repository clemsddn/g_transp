<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehicle extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'license_plate', 'vehicle_type', 'marque', 'model', 'provenance',
        'datequisition', 'amortissement', 'etat', 'valeur', 'image',
        'imageUrl', 'capaciteCharge', 'typeCarburant', 'capaciteReservoir',
        'puissanceMoteur', 'kilometrage', 'status'
    ];

    protected $table = 'vehicles';
    // Primary Key
    public $primaryKey = 'id';
    // Timestamps
    public $timestamps = true;

   
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }
    public function dimension()
    {
        return $this->hasOne(Dimension::class);
    }

    public function trailers():HasMany
    {
        return $this->hasMany(Vehicle::class, 'trailer_id');
    }

    /**
     * Récupère l'utilisateur parent si cet utilisateur est un sous-utilisateur.
     */
    public function tractor():BelongsTo
    {
        return $this->belongsTo(Vehicle::class, 'tractor_id');
    }
}
