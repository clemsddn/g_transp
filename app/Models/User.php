<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;



class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function vehicles():HasMany{
        return $this->hasMany(Vehicle::class);
    }

    public function companies():HasMany{
        return $this->hasMany(Company::class);
    }


    public function users():HasMany
    {
        return $this->hasMany(User::class, 'user_id');
    }

    /**
     * Récupère l'utilisateur parent si cet utilisateur est un sous-utilisateur.
     */
    public function parent():BelongsTo
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    public function trips():HasMany{
        return $this->hasMany(Trip::class);
    }
    public function invoices():HasMany{
        return $this->hasMany(Invoice::class);
    }
    public function drivers():HasMany{
        return $this->hasMany(Driver::class);
    }
}
