<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class DispatchedEmail extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'dispatched_emails';
    protected $guarded = [];

    protected $casts = [
        'sent_at' => 'datetime',
    ];
}
