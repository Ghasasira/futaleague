<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class MatchEvent extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'match_events';
    protected $guarded = [];

    public function match()
    {
        return $this->belongsTo(FootballMatch::class, 'match_id');
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function player()
    {
        return $this->belongsTo(Player::class);
    }
}
