<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlayerController extends Controller
{
    public function index()
    {
        $players = Player::with('team')->get();

        return Inertia::render('Players/Index', [
            'players' => $players,
        ]);
    }

    public function show(Player $player)
    {
        $player->load(['team', 'attributes', 'transfers', 'matchLogs']);

        return Inertia::render('Players/Show', [
            'player' => $player,
        ]);
    }

    public function compare()
    {
        return Inertia::render('Players/Compare', [
            'players' => Player::with('team')->get(),
            'teams' => Team::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'team_id' => 'required|exists:teams,id',
            'name' => 'required|string',
            'position' => 'required|string',
            'number' => 'required|integer',
            'nationality' => 'required|string',
            'age' => 'required|integer',
        ]);

        Player::create($validated);

        return redirect()->back()->with('success', 'Player created.');
    }

    public function update(Request $request, Player $player)
    {
        $validated = $request->validate([
            'name' => 'string',
            'position' => 'string',
            'number' => 'integer',
        ]);

        $player->update($validated);

        return redirect()->back()->with('success', 'Player updated.');
    }

    public function destroy(Player $player)
    {
        $player->delete();
        return redirect()->back()->with('success', 'Player deleted.');
    }
}
