<?php

$modelsPath = __DIR__ . '/app/Models';

if (!is_dir($modelsPath)) {
    mkdir($modelsPath, 0755, true);
}

$models = [
    'Team' => [
        'table' => 'teams',
        'hasMany' => ['players' => 'Player', 'trophies' => 'Trophy', 'homeMatches' => 'FootballMatch', 'awayMatches' => 'FootballMatch'],
        'traits' => ['HasUuids']
    ],
    'Trophy' => [
        'table' => 'trophies',
        'belongsTo' => ['team' => 'Team'],
    ],
    'Player' => [
        'table' => 'players',
        'belongsTo' => ['team' => 'Team'],
        'hasOne' => ['attributes' => 'PlayerAttribute'],
        'hasMany' => ['transfers' => 'TransferRecord', 'matchLogs' => 'PlayerMatchLog'],
        'casts' => ['stats' => 'array', 'injury_return_date' => 'date', 'birth_date' => 'date', 'contract_expires' => 'date'],
        'traits' => ['HasUuids']
    ],
    'PlayerAttribute' => [
        'table' => 'player_attributes',
        'belongsTo' => ['player' => 'Player'],
    ],
    'TransferRecord' => [
        'table' => 'transfer_records',
        'belongsTo' => ['player' => 'Player'],
        'traits' => ['HasUuids'],
        'casts' => ['date' => 'date']
    ],
    'PlayerMatchLog' => [
        'table' => 'player_match_logs',
        'belongsTo' => ['player' => 'Player'],
        'traits' => ['HasUuids'],
        'casts' => ['date' => 'date']
    ],
    'FootballMatch' => [
        'table' => 'matches',
        'belongsTo' => ['homeTeam' => 'Team', 'awayTeam' => 'Team', 'mvpPlayer' => 'Player'],
        'hasMany' => ['events' => 'MatchEvent'],
        'casts' => ['date' => 'date', 'home_lineup' => 'array', 'away_lineup' => 'array', 'stats' => 'array'],
        'traits' => ['HasUuids']
    ],
    'MatchEvent' => [
        'table' => 'match_events',
        'belongsTo' => ['match' => 'FootballMatch', 'team' => 'Team', 'player' => 'Player'],
        'traits' => ['HasUuids']
    ],
    'LeagueStanding' => [
        'table' => 'league_standings',
        'belongsTo' => ['team' => 'Team'],
        'casts' => ['form' => 'array']
    ],
    'LeagueEvent' => [
        'table' => 'league_events',
        'belongsTo' => ['team' => 'Team'],
        'traits' => ['HasUuids'],
        'casts' => ['date' => 'date']
    ],
    'Subscriber' => [
        'table' => 'subscribers',
        'traits' => ['HasUuids'],
        'casts' => ['preferences' => 'array', 'subscribed_at' => 'datetime']
    ],
    'DispatchedEmail' => [
        'table' => 'dispatched_emails',
        'traits' => ['HasUuids'],
        'casts' => ['sent_at' => 'datetime']
    ]
];

foreach ($models as $name => $meta) {
    $code = "<?php\n\nnamespace App\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Factories\\HasFactory;\nuse Illuminate\\Database\\Eloquent\\Model;\n";
    if (in_array('HasUuids', $meta['traits'] ?? [])) {
        $code .= "use Illuminate\\Database\\Eloquent\\Concerns\\HasUuids;\n";
    }
    $code .= "\nclass $name extends Model\n{\n    use HasFactory;\n";
    if (in_array('HasUuids', $meta['traits'] ?? [])) {
        $code .= "    use HasUuids;\n";
    }

    $code .= "\n    protected \$table = '{$meta['table']}';\n";
    $code .= "\n    protected \$guarded = [];\n";

    if (!empty($meta['casts'])) {
        $casts = var_export($meta['casts'], true);
        $casts = str_replace(['array (', ')'], ['[', ']'], $casts);
        $code .= "\n    protected \$casts = $casts;\n";
    }

    if (!empty($meta['belongsTo'])) {
        foreach ($meta['belongsTo'] as $method => $related) {
            $code .= "\n    public function $method()\n    {\n        return \$this->belongsTo($related::class);\n    }\n";
        }
    }
    
    if (!empty($meta['hasMany'])) {
        foreach ($meta['hasMany'] as $method => $related) {
            $code .= "\n    public function $method()\n    {\n        return \$this->hasMany($related::class);\n    }\n";
        }
    }

    if (!empty($meta['hasOne'])) {
        foreach ($meta['hasOne'] as $method => $related) {
            $code .= "\n    public function $method()\n    {\n        return \$this->hasOne($related::class);\n    }\n";
        }
    }

    $code .= "}\n";

    file_put_contents("$modelsPath/$name.php", $code);
}
echo "Models generated.\n";
