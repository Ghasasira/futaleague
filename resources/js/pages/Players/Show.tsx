import React from 'react';
import { Head } from '@inertiajs/react';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { PlayerDetailPageView } from '@/components/PlayerDetailPageView';
import { Player, Team } from '@/types/league';

interface Props {
    player: Player;
}

export default function Show({ player }: Props) {
    const team = player.team;
    
    return (
        <WebsiteLayout title={`${player.name} Profile`}>
            <Head title={player.name} />
            
            <PlayerDetailPageView 
                player={player}
                team={team}
                allTeams={team ? [team] : []}
                allPlayers={[player]}
                onBack={() => {
                    window.location.href = '/players';
                }}
                onSelectTeam={(tId) => {
                    window.location.href = '/teams/' + tId;
                }}
                onSelectPlayer={(p) => {
                    window.location.href = '/players/' + p.id;
                }}
                onStartComparison={(p) => {
                    window.location.href = '/compare?player=' + p.id;
                }}
            />
        </WebsiteLayout>
    );
}
