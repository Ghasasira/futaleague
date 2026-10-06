<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('short_name');
            $table->string('code');
            $table->string('crest_color')->nullable();
            $table->string('secondary_color')->nullable();
            $table->integer('founded')->nullable();
            $table->string('stadium')->nullable();
            $table->integer('capacity')->nullable();
            $table->string('manager')->nullable();
            $table->string('president')->nullable();
            $table->text('philosophy')->nullable();
            $table->string('crest_badge_style')->nullable();
            $table->string('crest_icon')->nullable();
            $table->string('website')->nullable();
            $table->timestamps();
        });

        Schema::create('trophies', function (Blueprint $table) {
            $table->id();
            $table->uuid('team_id');
            $table->string('name');
            $table->integer('count')->default(1);
            $table->string('last_won')->nullable();
            $table->timestamps();

            $table->foreign('team_id')->references('id')->on('teams')->onDelete('cascade');
        });

        Schema::create('players', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('team_id');
            $table->string('name');
            $table->integer('number');
            $table->string('position');
            $table->string('nationality');
            $table->string('flag')->nullable();
            $table->integer('age');
            $table->string('height')->nullable();
            $table->string('preferred_foot')->nullable();
            $table->integer('appearances')->default(0);
            $table->integer('goals')->default(0);
            $table->integer('assists')->default(0);
            $table->integer('clean_sheets')->default(0);
            $table->integer('yellow_cards')->default(0);
            $table->integer('red_cards')->default(0);
            $table->integer('minutes_played')->default(0);
            $table->string('market_value')->nullable();
            $table->decimal('form_rating', 3, 1)->nullable();
            $table->string('status')->default('fit');
            $table->string('injury_status')->nullable();
            $table->string('injury_note')->nullable();
            $table->date('injury_return_date')->nullable();
            $table->string('avatar_bg')->nullable();
            $table->date('birth_date')->nullable();
            $table->string('birth_place')->nullable();
            $table->string('weight')->nullable();
            $table->date('contract_expires')->nullable();
            $table->string('estimated_wage')->nullable();
            $table->text('bio_text')->nullable();
            $table->json('stats')->nullable();
            $table->timestamps();

            $table->foreign('team_id')->references('id')->on('teams')->onDelete('cascade');
        });

        Schema::create('player_attributes', function (Blueprint $table) {
            $table->id();
            $table->uuid('player_id')->unique();
            $table->integer('pace')->default(0);
            $table->integer('shooting')->default(0);
            $table->integer('passing')->default(0);
            $table->integer('dribbling')->default(0);
            $table->integer('defending')->default(0);
            $table->integer('physical')->default(0);
            $table->timestamps();

            $table->foreign('player_id')->references('id')->on('players')->onDelete('cascade');
        });

        Schema::create('transfer_records', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('player_id');
            $table->string('season');
            $table->date('date');
            $table->string('from_team');
            $table->string('to_team');
            $table->string('fee')->nullable();
            $table->string('transfer_type');
            $table->timestamps();

            $table->foreign('player_id')->references('id')->on('players')->onDelete('cascade');
        });

        Schema::create('player_match_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('player_id');
            $table->date('date');
            $table->string('opponent');
            $table->string('opponent_code');
            $table->string('result');
            $table->integer('minutes')->default(0);
            $table->integer('goals')->default(0);
            $table->integer('assists')->default(0);
            $table->decimal('rating', 3, 1)->nullable();
            $table->timestamps();

            $table->foreign('player_id')->references('id')->on('players')->onDelete('cascade');
        });

        Schema::create('matches', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('matchweek');
            $table->string('season');
            $table->date('date');
            $table->time('time');
            $table->uuid('home_team_id');
            $table->uuid('away_team_id');
            $table->integer('home_score')->default(0);
            $table->integer('away_score')->default(0);
            $table->string('status');
            $table->integer('current_minute')->default(0);
            $table->string('venue')->nullable();
            $table->string('referee')->nullable();
            $table->integer('attendance')->nullable();
            $table->json('home_lineup')->nullable();
            $table->json('away_lineup')->nullable();
            $table->json('stats')->nullable();
            $table->string('weather')->nullable();
            $table->uuid('mvp_player_id')->nullable();
            $table->timestamps();

            $table->foreign('home_team_id')->references('id')->on('teams')->onDelete('cascade');
            $table->foreign('away_team_id')->references('id')->on('teams')->onDelete('cascade');
            $table->foreign('mvp_player_id')->references('id')->on('players')->onDelete('set null');
        });

        Schema::create('match_events', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('match_id');
            $table->integer('minute');
            $table->integer('added_time')->nullable();
            $table->string('type');
            $table->uuid('team_id');
            $table->uuid('player_id')->nullable();
            $table->string('player_name')->nullable();
            $table->uuid('secondary_player_id')->nullable();
            $table->string('secondary_player_name')->nullable();
            $table->string('detail')->nullable();
            $table->timestamps();

            $table->foreign('match_id')->references('id')->on('matches')->onDelete('cascade');
            $table->foreign('team_id')->references('id')->on('teams')->onDelete('cascade');
        });

        Schema::create('league_standings', function (Blueprint $table) {
            $table->id();
            $table->uuid('team_id');
            $table->integer('played')->default(0);
            $table->integer('won')->default(0);
            $table->integer('drawn')->default(0);
            $table->integer('lost')->default(0);
            $table->integer('goals_for')->default(0);
            $table->integer('goals_against')->default(0);
            $table->integer('goal_difference')->default(0);
            $table->integer('points')->default(0);
            $table->json('form')->nullable();
            $table->timestamps();

            $table->foreign('team_id')->references('id')->on('teams')->onDelete('cascade');
        });

        Schema::create('league_events', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('category');
            $table->date('date');
            $table->time('time');
            $table->string('location');
            $table->uuid('team_id')->nullable();
            $table->text('description');
            $table->boolean('is_highlighted')->default(false);
            $table->timestamps();

            $table->foreign('team_id')->references('id')->on('teams')->onDelete('set null');
        });

        Schema::create('subscribers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('email')->unique();
            $table->string('name');
            $table->json('preferences')->nullable();
            $table->timestamp('subscribed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('dispatched_emails', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('subscriber_email');
            $table->string('subject');
            $table->string('preview_text')->nullable();
            $table->longText('body_html');
            $table->timestamp('sent_at')->nullable();
            $table->string('type');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dispatched_emails');
        Schema::dropIfExists('subscribers');
        Schema::dropIfExists('league_events');
        Schema::dropIfExists('league_standings');
        Schema::dropIfExists('match_events');
        Schema::dropIfExists('matches');
        Schema::dropIfExists('player_match_logs');
        Schema::dropIfExists('transfer_records');
        Schema::dropIfExists('player_attributes');
        Schema::dropIfExists('players');
        Schema::dropIfExists('trophies');
        Schema::dropIfExists('teams');
    }
};
