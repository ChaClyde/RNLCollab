import { useEffect, useState, type FC, type FormEvent } from "react"
import CloseButton from "../../../components/Button/CloseButton"
import SubmitButton from "../../../components/Button/SubmitButton"
import Modal from "../../../components/Modal"
import type { EventColumns } from "../../../interfaces/EventInterface"
import EventService from "../../../services/EventService"

interface DeleteEventFormModalProps {
    event: EventColumns | null
    onDeleteEvent: (message: string) => void
    refreshKey: () => void
    isOpen: boolean
    onClose: () => void
}

const DeleteEventFormModal: FC<DeleteEventFormModalProps> = ({
    event,
    onDeleteEvent,
    refreshKey,
    isOpen,
    onClose,
}) => {

    const [loadingDestroy, setLoadingDestroy] = useState(false)

    const [activityTitle, setActivityTitle] = useState("")
    const [activityDescription, setActivityDescription] = useState("")
    const [date, setDate] = useState("")
    const [numberOfDays, setNumberOfDays] = useState<number>(1)
    const [timeStart, setTimeStart] = useState("")
    const [timeEnd, setTimeEnd] = useState("")
    const [requestedBy, setRequestedBy] = useState("")
    const [telephoneNumber, setTelephoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [user, setUser] = useState("")
    const [venue, setVenue] = useState("")
    const [department, setDepartment] = useState("")

    const handleDestroyEvent = async (e: FormEvent) => {
        try {
            e.preventDefault()

            setLoadingDestroy(true)

            const res = await EventService.destroyEvent(event?.event_id!)

            if (res.status === 200) {
                onDeleteEvent(res.data.message)

                refreshKey()
                onClose()
            } else {
                console.error(
                    "Unexpected error occured during deleting event: ",
                    res.status
                )
            }
        } catch (error) {
            console.error(
                "Unexpected server error occured during deleting event: ",
                error
            )
        } finally {
            setLoadingDestroy(false)
        }
    }

    useEffect(() => {
        if (event) {
            setActivityTitle(event.activity_title)
            setActivityDescription(event.activity_description ?? "")
            setDate(event.date)
            setNumberOfDays(event.number_of_days)
            setTimeStart(event.time_start)
            setTimeEnd(event.time_end)
            setRequestedBy(event.requested_by)
            setTelephoneNumber(event.telephone_number ?? "")
            setEmail(event.email)

            setUser(
                `${event.user.first_name} ${event.user.last_name}`
            )

            setVenue(event.venue.venue_name)

            setDepartment(event.department.department_name)
        } else {
            console.error(
                "Unexpected event error occured during getting event details: ",
                event
            )
        }
    }, [event])

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
                <form onSubmit={handleDestroyEvent}>
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6 px-1">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                            Delete Event Form
                        </h1>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b border-b-gray-100 mb-4">

                        <div className="mb-4">
                            <label className="text-black font-medium mb-2">
                                Activity Title
                            </label>

                            <p className="text-gray-500 font-medium">
                                {activityTitle}
                            </p>
                        </div>

                        <div className="mb-4">
                            <label className="text-black font-medium mb-2">
                                Activity Description
                            </label>

                            <p className="text-gray-500 font-medium">
                                {activityDescription || "N/A"}
                            </p>
                        </div>

                        <div className="mb-4">
                            <label className="text-black font-medium mb-2">
                                Date
                            </label>

                            <p className="text-gray-500 font-medium">
                                {date}
                            </p>
                        </div>

                        <div className="mb-4">
                            <label className="text-black font-medium mb-2">
                                Number of Days
                            </label>

                            <p className="text-gray-500 font-medium">
                                {numberOfDays}
                            </p>
                        </div>

                        <div className="mb-4">
                            <label className="text-black font-medium mb-2">
                                Time Start
                            </label>

                            <p className="text-gray-500 font-medium">
                                {timeStart}
                            </p>
                        </div>

                        <div className="mb-4">
                            <label className="text-black font-medium mb-2">
                                Time End
                            </label>

                            <p className="text-gray-500 font-medium">
                                {timeEnd}
                            </p>
                        </div>

                        <div className="mb-4">
                            <label className="text-black font-medium mb-2">
                                Requested By
                            </label>

                            <p className="text-gray-500 font-medium">
                                {requestedBy}
                            </p>
                        </div>

                        <div className="mb-4">
                            <label className="text-black font-medium mb-2">
                                Telephone Number
                            </label>

                            <p className="text-gray-500 font-medium">
                                {telephoneNumber || "N/A"}
                            </p>
                        </div>

                        <div className="mb-4">
                            <label className="text-black font-medium mb-2">
                                Email
                            </label>

                            <p className="text-gray-500 font-medium">
                                {email}
                            </p>
                        </div>

                        <div className="mb-4">
                            <label className="text-black font-medium mb-2">
                                User
                            </label>

                            <p className="text-gray-500 font-medium">
                                {user}
                            </p>
                        </div>

                        <div className="mb-4">
                            <label className="text-black font-medium mb-2">
                                Venue
                            </label>

                            <p className="text-gray-500 font-medium">
                                {venue}
                            </p>
                        </div>

                        <div className="mb-4">
                            <label className="text-black font-medium mb-2">
                                Department
                            </label>

                            <p className="text-gray-500 font-medium">
                                {department}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        {!loadingDestroy && (
                            <CloseButton
                                label="Close"
                                onClose={onClose}
                            />
                        )}

                        <SubmitButton
                            className="bg-red-600 hover:bg-red-700"
                            label="Delete Event"
                            loading={loadingDestroy}
                            loadingLabel="Deleting Event..."
                        />
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default DeleteEventFormModal