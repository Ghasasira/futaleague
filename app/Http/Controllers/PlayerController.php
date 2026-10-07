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
        $teams = Team::all();

        return Inertia::render('Players/Index', [
            'players' => $players,
            'teams' => $teams,
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
            'market_value' => 'nullable|string',
            'injury_status' => 'nullable|string',
            'injury_note' => 'nullable|string',
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
            'status' => 'nullable|string',
            'injuryStatus' => 'nullable|string',
            'injuryNote' => 'nullable|string',
            'injuryReturnDate' => 'nullable|string',
            'goals' => 'nullable|integer',
            'assists' => 'nullable|integer',
        ]);

        $data = $validated;
        
        // Map camelCase keys from frontend to snake_case for DB
        if (isset($validated['injuryStatus'])) {
            $data['injury_status'] = $validated['injuryStatus'];
            unset($data['injuryStatus']);
        }
        if (isset($validated['injuryNote']) || array_key_exists('injuryNote', $validated)) {
            $data['injury_note'] = $validated['injuryNote'];
            unset($data['injuryNote']);
        }
        if (isset($validated['injuryReturnDate']) || array_key_exists('injuryReturnDate', $validated)) {
            $data['injury_return_date'] = $validated['injuryReturnDate'];
            unset($data['injuryReturnDate']);
        }

        $player->update($data);

        return redirect()->back()->with('success', 'Player updated.');
    }

    public function destroy(Player $player)
    {
        $player->delete();
        return redirect()->back()->with('success', 'Player deleted.');
    }
}
