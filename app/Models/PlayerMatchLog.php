<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class PlayerMatchLog extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'player_match_logs';
    protected $guarded = [];

    protected $casts = [
        'date' => 'date',
    ];

    public function player()
    {
        return $this->belongsTo(Player::class);
    }
}
