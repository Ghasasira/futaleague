import React from 'react';
import { Head } from '@inertiajs/react';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { TeamPageView } from '@/components/TeamPageView';
import { Team, Player, Match } from '@/types/league';

interface Props {
    team: Team;
}

export default function Show({ team }: Props) {
    // In a real app, these would come from props as well (team->players, team->matches)
    const players: Player[] = (team as any).players || [];
    const matches: Match[] = (team as any).homeMatches ? [...(team as any).homeMatches, ...((team as any).awayMatches || [])] : [];
    
    return (
        <WebsiteLayout title={`${team.name} Profile`}>
            <Head title={team.name} />
            
            <TeamPageView 
                team={team}
                allTeams={[team]} // Mocked for now to satisfy component props
                players={players}
                matches={matches}
                onSelectMatch={(mId) => {
                    window.location.href = '/matches/' + mId;
                }}
                onSelectPlayer={(p) => {
                    window.location.href = '/players/' + p.id;
                }}
            />
        </WebsiteLayout>
    );
}
