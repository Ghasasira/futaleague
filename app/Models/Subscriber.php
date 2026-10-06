<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Subscriber extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'subscribers';
    protected $guarded = [];

    protected $casts = [
        'preferences' => 'array',
        'subscribed_at' => 'datetime',
    ];
}
