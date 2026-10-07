import React from 'react';
import { Head } from '@inertiajs/react';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { PlayerComparisonView } from '@/components/PlayerComparisonView';
import { Player, Team } from '@/types/league';
import { EmptyState } from '@/components/EmptyState';
import { Users } from 'lucide-react';

interface Props {
    players: Player[];
    teams: Team[];
}

export default function Compare({ players = [], teams = [] }: Props) {
    return (
        <WebsiteLayout title="Compare Players">
            <Head title="Player Comparison" />
            
            <div className="max-w-7xl mx-auto px-4 py-8">
                {players && players.length >= 2 ? (
                    <PlayerComparisonView 
                        players={players}
                        teams={teams}
                        onSelectPlayer={() => {}}
                        onSelectTeam={() => {}}
                    />
                ) : (
                    <EmptyState 
                        title="Insufficient Data" 
                        description="Not enough players are available in the database to run a comparison."
                        icon={Users}
                    />
                )}
            </div>
        </WebsiteLayout>
    );
}
