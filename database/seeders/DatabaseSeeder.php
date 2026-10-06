<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\Player;
use App\Models\FootballMatch;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password123'),
            'email_verified_at' => now(),
        ]);

        $team1 = Team::create([
            'id' => Str::uuid(),
            'name' => 'Apex City FC',
            'short_name' => 'Apex City',
            'code' => 'ACFC',
            'crest_color' => '#3b82f6',
            'secondary_color' => '#1e3a8a',
            'founded' => 1995,
            'stadium' => 'Apex Arena',
            'capacity' => 45000,
            'manager' => 'John Doe',
            'president' => 'Jane Smith',
            'crest_badge_style' => 'shield',
        ]);

        $team2 = Team::create([
            'id' => Str::uuid(),
            'name' => 'Crown Vanguard',
            'short_name' => 'Vanguard',
            'code' => 'CVG',
            'crest_color' => '#ef4444',
            'secondary_color' => '#7f1d1d',
            'founded' => 1988,
            'stadium' => 'Vanguard Stadium',
            'capacity' => 55000,
            'manager' => 'Mark Taylor',
            'president' => 'Sarah Johnson',
            'crest_badge_style' => 'circle',
        ]);

        Player::create([
            'id' => Str::uuid(),
            'team_id' => $team1->id,
            'name' => 'Alex Striker',
            'number' => 9,
            'position' => 'FW',
            'nationality' => 'USA',
            'age' => 25,
            'height' => '1.85m',
            'goals' => 12,
            'assists' => 4,
            'status' => 'fit',
        ]);

        Player::create([
            'id' => Str::uuid(),
            'team_id' => $team2->id,
            'name' => 'Sam Defender',
            'number' => 4,
            'position' => 'DF',
            'nationality' => 'UK',
            'age' => 28,
            'height' => '1.90m',
            'goals' => 1,
            'assists' => 2,
            'status' => 'fit',
        ]);

        FootballMatch::create([
            'id' => Str::uuid(),
            'matchweek' => 1,
            'season' => '2026/2027',
            'date' => now()->toDateString(),
            'time' => '15:00',
            'home_team_id' => $team1->id,
            'away_team_id' => $team2->id,
            'home_score' => 2,
            'away_score' => 1,
            'status' => 'FINISHED',
            'venue' => 'Apex Arena',
        ]);
    }
}
