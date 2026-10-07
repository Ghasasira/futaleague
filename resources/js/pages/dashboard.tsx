import { Head, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { AdminDashboard } from '@/components/AdminDashboard';
import { Team, Player, Match } from '@/types/league';

interface Props {
    teams: Team[];
    players: Player[];
    matches: Match[];
}

export default function Dashboard({ teams, players, matches }: Props) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <AdminDashboard 
                    teams={teams}
                    players={players}
                    matches={matches}
                    onUpdateMatch={(match) => {
                        router.put(`/admin/matches/${match.id}`, {
                            home_score: match.homeScore,
                            away_score: match.awayScore,
                            status: match.status,
                            current_minute: match.currentMinute,
                        });
                    }}
                    onAddMatch={(match) => {
                        router.post(`/admin/matches`, {
                            home_team_id: match.homeTeamId,
                            away_team_id: match.awayTeamId,
                            date: match.date,
                            time: match.time,
                            matchweek: match.matchweek,
                            season: match.season,
                        });
                    }}
                    onAddPlayer={(player) => {
                        router.post(`/admin/players`, {
                            team_id: player.teamId,
                            name: player.name,
                            position: player.position,
                            number: player.number,
                            nationality: player.nationality,
                            age: player.age,
                        });
                    }}
                    onUpdatePlayer={(player) => {
                        router.put(`/admin/players/${player.id}`, {
                            name: player.name,
                            position: player.position,
                            number: player.number,
                        });
                    }}
                    onDeletePlayer={(playerId) => {
                        router.delete(`/admin/players/${playerId}`);
                    }}
                    onExportData={() => {}}
                    onImportData={() => {}}
                    onResetData={() => {}}
                    onOpenMatchCenter={() => {}}
                />
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
