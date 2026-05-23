import { useEffect, useState, type FormEvent } from "react"
import BackButton from "../../../components/Button/BackButton"
import SubmitButton from "../../../components/Button/SubmitButton"
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput"
import Spinner from "../../../components/Spinner/Spinner"
import { useNavigate, useParams } from "react-router-dom"
import VenueService from "../../../services/VenueService"

const DeleteVenueForm = () => {
    const [loadingGet, setLoadingGet] = useState(false)
    const [loadingDestroy, setLoadingDestroy] = useState(false)
    const [venue, setVenue] = useState("")
    const [description, setDescription] = useState("");

    const { venue_id } = useParams()
    const navigate = useNavigate()

    const handleGetVenue = async (venue_id: string | number) => {
        try {
            setLoadingGet(true);

            const res = await VenueService.getVenue(venue_id);

            if (res.status === 200) {
                setVenue(res.data.venue.venue_name)
                setDescription(res.data.venue.venue_description || "")
            } else {
                console.error('Unexpected status error occured during deleting venue: ', res.status)
            }
        } catch (error) {
            {
                console.error('Unexpected server error occured during deleting venue: ', error)
            };
        } finally {
            setLoadingGet(false)
        }
    };

    const handleDestroyVenue = async (e: FormEvent) => {
        try {
            e.preventDefault()

            setLoadingDestroy(true)

            const res = await VenueService.destroyVenue(venue_id!)

            if (res.status === 200) {
                navigate('/venue', { state: { message: res.data.message } })
            } else {
                console.error('Unexpected status error occured during deleting venue: ', res.status);
            };
        } catch (error) {
            console.error('Unexpected server error occured during deleting venue : ', error);
        } finally {
            setLoadingDestroy(false);
        }
    }

    useEffect(() => {
        if (venue_id) {
            const parsedVenueId = parseInt(venue_id);
            handleGetVenue(parsedVenueId)
        } else {
            console.error('Unexpected parameter error occured during getting: ', venue_id)
        }
    }, [venue_id]);
  return (
    <>
          {loadingGet ? (
              <div className="flex justify-center items-center mt-52">
                  <Spinner size="lg" />
              </div>
          ) : (
              <form onSubmit={handleDestroyVenue}>
                  <div className="mb-4">
                      <FloatingLabelInput label="Venue" type="text" name="venue" value={venue} readOnly />
                  </div>
                  <div className="mb-4">
                      <FloatingLabelInput label="Description" type="text" name="description" value={description} readOnly />
                  </div>
                  <div className="flex justify-end gap-4">
                      {!loadingDestroy && <BackButton label="Back" path="/venue" />}
                      <SubmitButton label="Delete Venue" className="bg-red-600 hover:bg-red-700" loading={loadingDestroy} loadingLabel="Deleting Venue..." />
                  </div>
              </form>
          )}
    </>
  )
}

export default DeleteVenueForm