<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeagueStanding extends Model
{
    use HasFactory;

    protected $table = 'league_standings';
    protected $guarded = [];

    protected $casts = [
        'form' => 'array',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
