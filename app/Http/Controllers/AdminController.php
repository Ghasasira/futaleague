<?php

namespace App\Http\Controllers;

use App\Models\FootballMatch;
use App\Models\Player;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'teams' => Team::all(),
            'players' => Player::all(),
            'matches' => FootballMatch::orderBy('date', 'desc')->get(),
        ]);
    }
}
