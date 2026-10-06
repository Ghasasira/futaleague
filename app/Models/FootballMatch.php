<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class FootballMatch extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'matches';
    protected $guarded = [];

    protected $casts = [
        'date' => 'date',
        'home_lineup' => 'array',
        'away_lineup' => 'array',
        'stats' => 'array',
    ];

    public function homeTeam()
    {
        return $this->belongsTo(Team::class, 'home_team_id');
    }

    public function awayTeam()
    {
        return $this->belongsTo(Team::class, 'away_team_id');
    }

    public function mvpPlayer()
    {
        return $this->belongsTo(Player::class, 'mvp_player_id');
    }

    public function events()
    {
        return $this->hasMany(MatchEvent::class, 'match_id');
    }
}
