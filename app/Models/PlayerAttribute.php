<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayerAttribute extends Model
{
    use HasFactory;

    protected $table = 'player_attributes';
    protected $guarded = [];

    public function player()
    {
        return $this->belongsTo(Player::class);
    }
}
