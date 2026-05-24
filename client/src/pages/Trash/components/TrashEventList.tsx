import { useEffect, useState, type FC } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow
} from "../../../components/Table";

import Spinner from "../../../components/Spinner/Spinner";
import EventService from "../../../services/EventService";

import type { EventColumns }
from "../../../interfaces/EventInterface";

interface TrashEventListProps {
    refreshKey: boolean;
    onRestoreEvent: (message: string) => void;
    onPermanentDelete: (message: string) => void;
}

const TrashEventList: FC<TrashEventListProps> = ({
    refreshKey,
    onRestoreEvent,
    onPermanentDelete
}) => {

    const [loadingEvents, setLoadingEvents] =
        useState(false);

    const [events, setEvents] =
        useState<EventColumns[]>([]);

    const handleLoadTrashEvents = async () => {

        try {

            setLoadingEvents(true);

            const res =
                await EventService.loadTrashEvent();

            if (res.status === 200) {
                setEvents(res.data.events);
            }

        } catch (error) {

            console.error(
                "Error loading trash events:",
                error
            );

        } finally {

            setLoadingEvents(false);

        }
    };

    const handleRestoreEvent = async (
        eventId: number
    ) => {

        try {

            const res =
                await EventService.restoreEvent(
                    eventId
                );

            if (res.status === 200) {

                onRestoreEvent(
                    res.data.message
                );

                handleLoadTrashEvents();
            }

        } catch (error) {

            console.error(
                "Error restoring event:",
                error
            );
        }
    };

    const handlePermanentDelete = async (
        eventId: number
    ) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to permanently delete this event?"
            );

        if (!confirmDelete) return;

        try {

            const res =
                await EventService.forceDeleteEvent(
                    eventId
                );

            if (res.status === 200) {

                onPermanentDelete(
                    res.data.message
                );

                handleLoadTrashEvents();
            }

        } catch (error) {

            console.error(
                "Error permanently deleting event:",
                error
            );
        }
    };

    useEffect(() => {

        handleLoadTrashEvents();

    }, [refreshKey]);

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">

            <div className="max-w-full max-h-[calc(100vh)] overflow-x-auto">

                <Table>

                    <caption className="mb-4">

                        <div className="border-b border-gray-100 p-4">

                            <h2 className="text-lg font-semibold text-gray-700">
                                Deleted Events
                            </h2>

                        </div>

                    </caption>

                    <TableHeader className="border-b border-gray-200 bg-gray-950 sticky top-0 text-white text-xs">

                        <TableCell isHeader className="px-5 py-3 text-center">
                            No.
                        </TableCell>

                        <TableCell isHeader className="px-5 py-3 text-center">
                            ACTIVITY
                        </TableCell>

                        <TableCell isHeader className="px-5 py-3 text-center">
                            DATE
                        </TableCell>

                        <TableCell isHeader className="px-5 py-3 text-center">
                            REQUESTED BY
                        </TableCell>

                        <TableCell isHeader className="px-5 py-3 text-center">
                            VENUE
                        </TableCell>

                        <TableCell isHeader className="px-5 py-3 text-center">
                            DEPARTMENT
                        </TableCell>

                        <TableCell isHeader className="px-5 py-3 text-center">
                            ACTIONS
                        </TableCell>

                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 text-gray-500 text-sm">

                        {loadingEvents ? (

                            <TableRow>

                                <TableCell
                                    colSpan={7}
                                    className="px-4 py-3 text-center"
                                >

                                    <Spinner size="md" />

                                </TableCell>

                            </TableRow>

                        ) : (

                            events.map((event, index) => (

                                <TableRow
                                    key={event.event_id}
                                    className="hover:bg-gray-100"
                                >

                                    <TableCell className="px-4 py-3 text-center">
                                        {index + 1}
                                    </TableCell>

                                    <TableCell className="px-4 py-3">
                                        {event.activity_title}
                                    </TableCell>

                                    <TableCell className="px-4 py-3">
                                        {event.date}
                                    </TableCell>

                                    <TableCell className="px-4 py-3">
                                        {event.requested_by}
                                    </TableCell>

                                    <TableCell className="px-4 py-3">
                                        {event.venue.venue_name}
                                    </TableCell>

                                    <TableCell className="px-4 py-3">
                                        {event.department.department_name}
                                    </TableCell>

                                    <TableCell className="px-4 py-3">

                                        <div className="flex gap-4">

                                            <button
                                                type="button"
                                                className="text-green-600 hover:underline font-medium cursor-pointer"
                                                onClick={() =>
                                                    handleRestoreEvent(
                                                        event.event_id
                                                    )
                                                }
                                            >
                                                Restore
                                            </button>

                                            <button
                                                type="button"
                                                className="text-red-600 hover:underline font-medium cursor-pointer"
                                                onClick={() =>
                                                    handlePermanentDelete(
                                                        event.event_id
                                                    )
                                                }
                                            >
                                                Delete Permanently
                                            </button>

                                        </div>

                                    </TableCell>

                                </TableRow>

                            ))

                        )}

                    </TableBody>

                </Table>

            </div>

        </div>
    );
};

export default TrashEventList;