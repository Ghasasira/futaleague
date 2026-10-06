import React from 'react';
import { Head } from '@inertiajs/react';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { MatchCenterView } from '@/components/MatchCenterView';
import { Match, Team, Player } from '@/types/league';

interface Props {
    matches: Match[];
    teams: Team[];
    players: Player[];
}

export default function Index({ matches, teams, players }: Props) {
    // Determine the active match. Defaults to the first live or upcoming one.
    const activeMatch = matches[0];

    return (
        <WebsiteLayout title="Match Center">
            <Head title="Matches" />
            
            {activeMatch ? (
                <MatchCenterView 
                    match={activeMatch}
                    teams={teams}
                    players={players}
                    isAdmin={false}
                    onUpdateMatch={() => {}}
                    onSelectTeam={() => {}}
                    onSelectPlayer={() => {}}
                    onTriggerNotification={() => {}}
                    onDispatchEmail={() => {}}
                />
            ) : (
                <div className="text-center p-12 text-slate-400">
                    No matches found for this season.
                </div>
            )}
        </WebsiteLayout>
    );
}
