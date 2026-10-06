<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Player extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'players';
    protected $guarded = [];

    protected $casts = [
        'stats' => 'array',
        'injury_return_date' => 'date',
        'birth_date' => 'date',
        'contract_expires' => 'date',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function attributes()
    {
        return $this->hasOne(PlayerAttribute::class);
    }

    public function transfers()
    {
        return $this->hasMany(TransferRecord::class);
    }

    public function matchLogs()
    {
        return $this->hasMany(PlayerMatchLog::class);
    }
}
