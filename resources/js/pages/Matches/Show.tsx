import React from 'react';
import { Head } from '@inertiajs/react';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { MatchCenterView } from '@/components/MatchCenterView';
import { Match, Team, Player } from '@/types/league';
import { EmptyState } from '@/components/EmptyState';
import { CalendarOff } from 'lucide-react';

interface Props {
    match: Match;
    teams: Team[];
    players: Player[];
}

export default function Show({ match, teams, players }: Props) {
    return (
        <WebsiteLayout title="Match Center">
            <Head title={`Match Center - ${match?.homeTeam?.shortName} vs ${match?.awayTeam?.shortName}`} />
            
            {match ? (
                <MatchCenterView 
                    match={match}
                    teams={teams}
                    players={players}
                    isAdmin={false}
                    onUpdateMatch={() => {}}
                    onSelectTeam={() => {}}
                    onSelectPlayer={() => {}}
                />
            ) : (
                <EmptyState 
                    title="Match Not Found" 
                    description="The match you are looking for does not exist or has been removed."
                    icon={CalendarOff}
                />
            )}
        </WebsiteLayout>
    );
}
