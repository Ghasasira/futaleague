<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trophy extends Model
{
    use HasFactory;

    protected $table = 'trophies';
    protected $guarded = [];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
