import React from 'react';
import { Head } from '@inertiajs/react';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { PlayerRankings } from '@/components/PlayerRankings';
import { Player, Team } from '@/types/league';

interface Props {
    players: Player[];
    teams: Team[];
}

export default function Index({ players, teams }: Props) {
    return (
        <WebsiteLayout title="Player Rankings">
            <Head title="Rankings" />
            
            <PlayerRankings 
                players={players}
                teams={teams}
                onSelectPlayer={(p) => {
                    window.location.href = '/players/' + p.id;
                }}
            />
        </WebsiteLayout>
    );
}
