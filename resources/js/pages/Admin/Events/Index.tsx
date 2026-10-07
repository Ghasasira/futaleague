import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Calendar, Plus } from 'lucide-react';

export default function EventsIndex({ events = [] }: { events: any[] }) {
    const [isAdding, setIsAdding] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Ceremony');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateEvent = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/admin/events', {
            title, category, date, time, location, description
        }, {
            onSuccess: () => {
                setIsAdding(false);
                setTitle(''); setCategory('Ceremony'); setDate(''); setTime(''); setLocation(''); setDescription('');
            }
        });
    };

    return (
        <>
            <Head title="Events Management" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">Events Calendar Management</h2>
                        <p className="text-xs text-slate-400 mt-1">Manage league ceremonies, cup draws, and press conferences.</p>
                    </div>
                    <button onClick={() => setIsAdding(!isAdding)} className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1.5 transition-colors">
                        <Plus className="w-4 h-4" />
                        <span>{isAdding ? 'Cancel' : 'Create Event'}</span>
                    </button>
                </div>

                {/* Add Event Form */}
                {isAdding && (
                    <form onSubmit={handleCreateEvent} className="bg-slate-900/80 p-5 rounded-xl border border-emerald-500/30 space-y-4">
                        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                            Schedule New Event
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                            <div>
                                <label className="block text-slate-300 mb-1">Event Title</label>
                                <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. End of Season Awards" className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white" />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Category</label>
                                <select required value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white">
                                    <option value="Ceremony">Ceremony</option>
                                    <option value="Match">Match</option>
                                    <option value="Draw">Cup Draw</option>
                                    <option value="Press">Press Conference</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Date</label>
                                <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white" />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Time</label>
                                <input required type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white" />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Location</label>
                                <input required type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white" />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Description</label>
                                <input required type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <button type="button" onClick={() => setIsAdding(false)} className="px-3 py-1.5 rounded text-xs text-slate-400 hover:text-white">Cancel</button>
                            <button type="submit" className="px-4 py-1.5 rounded text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300">Schedule Event</button>
                        </div>
                    </form>
                )}

                {/* Events List */}
                {events.length > 0 ? (
                    <div className="space-y-3">
                        {events.map((evt) => (
                            <div key={evt.id} className="flex flex-col sm:flex-row justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                                <div>
                                    <h3 className="text-lg font-bold text-white">{evt.title}</h3>
                                    <div className="text-xs text-slate-400 mt-1 flex gap-2 items-center">
                                        <span className="font-semibold text-emerald-400">{evt.category}</span>
                                        <span>&bull;</span>
                                        <span>{evt.date} @ {evt.time}</span>
                                        <span>&bull;</span>
                                        <span>{evt.location}</span>
                                    </div>
                                    <p className="text-sm text-slate-300 mt-2">{evt.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center bg-slate-900/40 border border-slate-800 border-dashed rounded-xl p-8 mt-4">
                        <Calendar className="w-12 h-12 text-slate-700 mb-4" />
                        <h3 className="text-lg font-bold text-slate-300">No Upcoming Events</h3>
                        <p className="text-sm text-slate-500 text-center max-w-sm mt-2">
                            There are currently no events scheduled on the calendar. Click "Create Event" to schedule a press conference, award ceremony, or cup draw.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

EventsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Events Calendar',
            href: '/admin/events',
        },
    ],
};
