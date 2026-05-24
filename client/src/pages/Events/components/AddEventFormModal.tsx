import FloatingLabelInput from "../../../components/Input/FloatingLabelInput"
import Modal from "../../../components/Modal"
import FloatingLabelSelect from "../../../components/Select/FloatingLabelselect"
import SubmitButton from "../../../components/Button/SubmitButton";
import CloseButton from "../../../components/Button/CloseButton";
import { useEffect, useState, type FC, type FormEvent } from "react";

import DepartmentService from "../../../services/DepartmentService";
import UserService from "../../../services/UserService";
import VenueService from "../../../services/VenueService";
import EventService from "../../../services/EventService";

import type { EventFieldErrors } from "../../../interfaces/EventInterface";
import type { UserColumns } from "../../../interfaces/UserInterface";
import type { DepartmentsColumns } from "../../../interfaces/DepartmentInterface";
import type { VenueColumns } from "../../../interfaces/VenueInterface";

interface AddEventFormModalProps {
    onEventAdded: (message: string) => void
    isOpen: boolean;
    onClose: () => void;
    refreshKey: () => void;
}

const AddEventFormModal: FC<AddEventFormModalProps> = ({
    onEventAdded,
    isOpen,
    onClose,
    refreshKey
}) => {
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [users, setUsers] = useState<UserColumns[]>([]);

    const [loadingDepartments, setLoadingDepartments] = useState(false);
    const [departments, setDepartments] = useState<DepartmentsColumns[]>([]);

    const [loadingVenues, setLoadingVenues] = useState(false);
    const [venues, setVenues] = useState<VenueColumns[]>([]);

    const [loadingStore, setLoadingStore] = useState(false);

    const [activityTitle, setActivityTitle] = useState("");
    const [activityDescription, setActivityDescription] = useState("");
    const [date, setDate] = useState("");
    const [numberOfDays, setNumberOfDays] = useState("");
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [requestedBy, setRequestedBy] = useState("");
    const [telephoneNumber, setTelephoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const [userId, setUserId] = useState("");
    const [venueId, setVenueId] = useState("");
    const [departmentId, setDepartmentId] = useState("");

    const [errors, setErrors] = useState<EventFieldErrors>({});

    const handleStoreEvent = async (e: FormEvent) => {
        try {
            e.preventDefault();

            setLoadingStore(true);

            const payload = {
                activity_title: activityTitle,
                activity_description: activityDescription,
                date: date,
                number_of_days: numberOfDays,
                time_start: timeStart,
                time_end: timeEnd,
                requested_by: requestedBy,
                telephone_number: telephoneNumber,
                email: email,
                user_id: userId,
                venue_id: venueId,
                department_id: departmentId,
            };

            const res = await EventService.storeEvent(payload);

            if (res.status === 200) {

                onEventAdded(res.data.message);

                setActivityTitle("");
                setActivityDescription("");
                setDate("");
                setNumberOfDays("");
                setTimeStart("");
                setTimeEnd("");
                setRequestedBy("");
                setTelephoneNumber("");
                setEmail("");

                setUserId("");
                setVenueId("");
                setDepartmentId("");

                setErrors({});

                refreshKey();

            } else {
                console.error(
                    "Unexpected status error occured during storing event:",
                    res.status
                );
            }

        } catch (error: any) {

            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error(
                    "Unexpected server error occured during storing event:",
                    error
                );
            }

        } finally {
            setLoadingStore(false);
        }
    };

    const handleLoadUsers = async () => {
        try {

            setLoadingUsers(true);

            const res = await UserService.loadUsers();

            if (res.status === 200) {
                setUsers(res.data.users);
            }

        } catch (error) {
            console.error("Error loading users:", error);
        } finally {
            setLoadingUsers(false);
        }
    };

    const handleLoadDepartments = async () => {
        try {

            setLoadingDepartments(true);

            const res = await DepartmentService.loadDepartment();

            if (res.status === 200) {
                setDepartments(res.data.departments);
            }

        } catch (error) {
            console.error("Error loading departments:", error);
        } finally {
            setLoadingDepartments(false);
        }
    };

    const handleLoadVenues = async () => {
        try {

            setLoadingVenues(true);

            const res = await VenueService.loadVenue();

            if (res.status === 200) {
                setVenues(res.data.venues);
            }

        } catch (error) {
            console.error("Error loading venues:", error);
        } finally {
            setLoadingVenues(false);
        }
    };

    useEffect(() => {

        if (isOpen) {
            handleLoadUsers();
            handleLoadDepartments();
            handleLoadVenues();
        }

    }, [isOpen]);

  return (
    <>
          <Modal
              isOpen={isOpen}
              onClose={onClose}
              showCloseButton
          >

              <form onSubmit={handleStoreEvent}>

                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6 px-1">

                      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                          Add Event
                      </h1>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Fill in the event information below.
                      </p>

                  </div>

                  <div className="grid grid-cols-2 gap-4 border-b border-b-gray-100 mb-4">

                      <div className="col-span-2">
                          <FloatingLabelInput
                              label="Activity Title"
                              type="text"
                              name="activity_title"
                              value={activityTitle}
                              onChange={(e) => setActivityTitle(e.target.value)}
                              errors={errors.activity_title}
                              required
                              autoFocus
                          />
                      </div>

                      <div className="col-span-2">
                          <FloatingLabelInput
                              label="Activity Description"
                              type="text"
                              name="activity_description"
                              value={activityDescription}
                              onChange={(e) => setActivityDescription(e.target.value)}
                              errors={errors.activity_description}
                          />
                      </div>

                      <div>
                          <FloatingLabelInput
                              label="Date"
                              type="date"
                              name="date"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              errors={errors.date}
                              required
                          />
                      </div>

                      <div>
                          <FloatingLabelInput
                              label="Number of Days"
                              type="number"
                              name="number_of_days"
                              value={numberOfDays}
                              onChange={(e) => setNumberOfDays(e.target.value)}
                              errors={errors.number_of_days}
                              required
                          />
                      </div>

                      <div>
                          <FloatingLabelInput
                              label="Start Time"
                              type="time"
                              name="time_start"
                              value={timeStart}
                              onChange={(e) => setTimeStart(e.target.value)}
                              errors={errors.time_start}
                              required
                          />
                      </div>

                      <div>
                          <FloatingLabelInput
                              label="End Time"
                              type="time"
                              name="time_end"
                              value={timeEnd}
                              onChange={(e) => setTimeEnd(e.target.value)}
                              errors={errors.time_end}
                              required
                          />
                      </div>

                      <div>
                          <FloatingLabelInput
                              label="Requested By"
                              type="text"
                              name="requested_by"
                              value={requestedBy}
                              onChange={(e) => setRequestedBy(e.target.value)}
                              errors={errors.requested_by}
                              required
                          />
                      </div>

                      <div>
                          <FloatingLabelInput
                              label="Telephone Number"
                              type="text"
                              name="telephone_number"
                              value={telephoneNumber}
                              onChange={(e) => setTelephoneNumber(e.target.value)}
                              errors={errors.telephone_number}
                          />
                      </div>

                      <div className="col-span-2">
                          <FloatingLabelInput
                              label="Email"
                              type="email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              errors={errors.email}
                              required
                          />
                      </div>

                      <div>
                          <FloatingLabelSelect
                              label="User"
                              name="user_id"
                              value={userId}
                              onChange={(e) => setUserId(e.target.value)}
                              errors={errors.user_id}
                          >

                              {loadingUsers ? (
                                  <option value="">Loading...</option>
                              ) : (
                                  <>
                                      <option value="">Select User</option>

                                      {users.map((user, index) => (
                                          <option
                                              value={user.user_id}
                                              key={index}
                                          >
                                              {user.first_name} {user.last_name}
                                          </option>
                                      ))}
                                  </>
                              )}

                          </FloatingLabelSelect>
                      </div>

                      <div>
                          <FloatingLabelSelect
                              label="Venue"
                              name="venue_id"
                              value={venueId}
                              onChange={(e) => setVenueId(e.target.value)}
                              errors={errors.venue_id}
                          >

                              {loadingVenues ? (
                                  <option value="">Loading...</option>
                              ) : (
                                  <>
                                      <option value="">Select Venue</option>

                                      {venues.map((venue, index) => (
                                          <option
                                              value={venue.venue_id}
                                              key={index}
                                          >
                                              {venue.venue_name}
                                          </option>
                                      ))}
                                  </>
                              )}

                          </FloatingLabelSelect>
                      </div>

                      <div className="col-span-2">
                          <FloatingLabelSelect
                              label="Department"
                              name="department_id"
                              value={departmentId}
                              onChange={(e) => setDepartmentId(e.target.value)}
                              errors={errors.department_id}
                          >

                              {loadingDepartments ? (
                                  <option value="">Loading...</option>
                              ) : (
                                  <>
                                      <option value="">
                                          Select Department
                                      </option>

                                      {departments.map((department, index) => (
                                          <option
                                              value={department.department_id}
                                              key={index}
                                          >
                                              {department.department_name}
                                          </option>
                                      ))}
                                  </>
                              )}

                          </FloatingLabelSelect>
                      </div>

                  </div>

                  <div className="flex justify-end gap-4">

                      {!loadingStore && (
                          <CloseButton
                              label="Close"
                              onClose={onClose}
                          />
                      )}

                      <SubmitButton
                          label="Save Event"
                          loading={loadingStore}
                          loadingLabel="Saving Event..."
                      />

                  </div>

              </form>

          </Modal>
    </>
  )
}

export default AddEventFormModal