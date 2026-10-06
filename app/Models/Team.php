<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Team extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'teams';
    protected $guarded = [];

    public function players()
    {
        return $this->hasMany(Player::class);
    }

    public function trophies()
    {
        return $this->hasMany(Trophy::class);
    }

    public function homeMatches()
    {
        return $this->hasMany(FootballMatch::class, 'home_team_id');
    }

    public function awayMatches()
    {
        return $this->hasMany(FootballMatch::class, 'away_team_id');
    }
}
