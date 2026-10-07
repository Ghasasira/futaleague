import React from 'react';
import { Head } from '@inertiajs/react';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { EventsCalendarView } from '@/components/EventsCalendarView';
import { Team } from '@/types/league';
import { EmptyState } from '@/components/EmptyState';
import { Calendar } from 'lucide-react';

interface Props {
    events?: any[];
    teams?: Team[];
}

export default function Index({ events = [], teams = [] }: Props) {
    return (
        <WebsiteLayout title="League Calendar">
            <Head title="Events Calendar" />
            
            <div className="max-w-7xl mx-auto px-4 py-8">
                {events && events.length > 0 ? (
                    <EventsCalendarView />
                ) : (
                    <EmptyState 
                        title="No Upcoming Events" 
                        description="There are currently no events scheduled on the league calendar."
                        icon={Calendar}
                    />
                )}
            </div>
        </WebsiteLayout>
    );
}
