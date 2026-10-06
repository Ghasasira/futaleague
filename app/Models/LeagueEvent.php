<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class LeagueEvent extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'league_events';
    protected $guarded = [];

    protected $casts = [
        'date' => 'date',
        'is_highlighted' => 'boolean',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
