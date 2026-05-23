import { useEffect, useState, type FC, type FormEvent } from "react"
import BackButton from "../../../components/Button/BackButton"
import SubmitButton from "../../../components/Button/SubmitButton"
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput"
import Spinner from "../../../components/Spinner/Spinner"
import type { RoleFieldErrors } from "../../../interfaces/RoleInterface"
import VenueService from "../../../services/VenueService"
import { useParams } from "react-router-dom"

interface EditVenueFormProps {
    onVenueUpdated: (message: string) => void
}

const EditvenueForm: FC<EditVenueFormProps> = ({onVenueUpdated}) => {
    const [loadingGet, setLoadingGet] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [venue, setVenue] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState<RoleFieldErrors>({});

    const { venue_id } = useParams()

    const handleGetVenue = async (venue_id: string | number) => {
        try {
            setLoadingGet(true)

            const res = await VenueService.getVenue(venue_id)

            if (res.status === 200) {
                setVenue(res.data.venue.venue_name)
                setDescription(res.data.venue.venue_description || "");
            } else {
                console.error('Unexpected status error occured during getting venue: ', res.status)
            }
        } catch (error) {
            console.log('Unexpected server error occured during getting venue: ', error)
        } finally {
            setLoadingGet(false)
        }
    }

    const handleUpdateVenue = async (e: FormEvent) => {
            try {
                e.preventDefault()
    
                setLoadingUpdate(true)
    
                const res = await VenueService.updateVenue(venue_id!, {
                    venue_name: venue,
                    venue_description: description
                })
    
                if (res.status === 200) {
                    setErrors({})
                    setVenue(res.data.venue.venue_name)
                    onVenueUpdated(res.data.message)
                } else {
                    console.error('Unexpected status error occured during updating venue: ', res.status)
                }
            } catch (error: any) {
                if (error.response && error.response.status === 422) {
                    setErrors(error.response.data.errors)
                } else {
                    console.error('Unexpected server error occured during updating venue: ', error)
                }
            } finally {
                setLoadingUpdate(false)
            }
        };

    useEffect(() => {
            if (venue_id) {
                const parsedVenueId = parseInt(venue_id)
                handleGetVenue(parsedVenueId)
            } else {
                console.error('Unexpected parameter error occured during getting venue: ', venue_id)
            }
        }, [venue_id]);

  return (
    <>
          {loadingGet ? (
              <div className="flex justify-center items-center mt-52">
                  <Spinner size="lg" />
              </div>

          ) : (
              <form onSubmit={handleUpdateVenue}>
                  <div className="mb-4">
                      <FloatingLabelInput label="Venue" type="text" name="venue" value={venue} onChange={(e) => setVenue(e.target.value)} required autoFocus errors={errors.venue_name} />
                  </div>
                  <div className="mb-4">
                      <FloatingLabelInput label="Description" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                  <div className="flex justify-end gap-4">
                      {!loadingUpdate && <BackButton label="Back" path="/venue" />}
                      <SubmitButton label="Update Venue" loading={loadingUpdate} loadingLabel="Updating Venue..." />
                  </div>
              </form>
          )}

    </>
  )
}

export default EditvenueForm