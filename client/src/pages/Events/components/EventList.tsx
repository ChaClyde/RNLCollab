import { useEffect, useState, type FC } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow
} from "../../../components/Table";

import EventService from "../../../services/EventService";
import Spinner from "../../../components/Spinner/Spinner";
import type { EventColumns } from "../../../interfaces/EventInterface";

interface EventListProps {
    onAddEvent: () => void;
    onEditEvent: (event: EventColumns | null) => void;
    onDeleteEvent: (event: EventColumns | null) => void;
    refreshKey: boolean;
}

const EventList: FC<EventListProps> = ({
    onAddEvent,
    onEditEvent,
    onDeleteEvent,
    refreshKey
}) => {

    const [loadingEvents, setLoadingEvents] = useState(false);
    const [events, setEvents] = useState<EventColumns[]>([]);

    const handleLoadEvents = async () => {
        try {

            setLoadingEvents(true);

            const res = await EventService.loadEvent();

            if (res.status === 200) {
                setEvents(res.data.events);
            } else {
                console.error(
                    "Unexpected status occured during loading events: ",
                    res.status
                );
            }

        } catch (error) {

            console.error(
                "Unexpected server error occured during load events: ",
                error
            );

        } finally {
            setLoadingEvents(false);
        }
    };

    const handleTimeFormat = (time: string) => {
        return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    useEffect(() => {
        handleLoadEvents();
    }, [refreshKey]);

    return (
        <>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="max-w-full max-h-[calc(100vh)] overflow-x-auto">

                    <Table>

                        <caption className="mb-4">
                            <div className="border-b border-gray-100 p-4 flex justify-end">
                                <div className="py-2 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={onAddEvent}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white font-medium rounded-lg shadow-lg transition cursor-pointer"
                                    >
                                        Add Event
                                    </button>
                                </div>
                            </div>
                        </caption>

                        <TableHeader className="border-b border-gray-200 bg-gray-950 sticky top-0 text-white text-xs">

                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-center"
                            >
                                NO.
                            </TableCell>

                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-center"
                            >
                                ACTIVITY TITLE
                            </TableCell>

                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-center"
                            >
                                DATE
                            </TableCell>

                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-center"
                            >
                                TIME
                            </TableCell>

                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-center"
                            >
                                REQUESTED BY
                            </TableCell>

                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-center"
                            >
                                VENUE
                            </TableCell>

                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-center"
                            >
                                DEPARTMENT
                            </TableCell>

                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-start"
                            >
                                ACTIONS
                            </TableCell>

                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 text-gray-500 text-sm">

                            {loadingEvents ? (

                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="px-4 py-3 text-center"
                                    >
                                        <Spinner size="md" />
                                    </TableCell>
                                </TableRow>

                            ) : (

                                events.map((event, index) => (

                                    <TableRow
                                        className="hover:bg-gray-100"
                                        key={index}
                                    >

                                        <TableCell className="px-4 py-3 text-center">
                                            {index + 1}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start">
                                            {event.activity_title}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start">
                                            {event.date}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start">
                                            {handleTimeFormat(event.time_start)}
                                            {" - "}
                                            {handleTimeFormat(event.time_end)}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start">
                                            {event.requested_by}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start">
                                            {event.venue.venue_name}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-start">
                                            {event.department.department_name}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-center">

                                            <div className="flex text-center gap-4">

                                                <button
                                                    type="button"
                                                    className="text-green-600 hover:underline font-medium cursor-pointer"
                                                    onClick={() => onEditEvent(event)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="text-red-600 hover:underline font-medium cursor-pointer"
                                                    onClick={() => onDeleteEvent(event)}
                                                >
                                                    Delete
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
        </>
    );
};

export default EventList;