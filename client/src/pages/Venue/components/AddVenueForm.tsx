import { useState, type FC, type FormEvent } from "react"
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput"
import SubmitButton from "../../../components/Button/SubmitButton"
import VenueService from "../../../services/VenueService"
import type { VenueFieldErrors } from "../../../interfaces/VenueInterface"

interface AddVenueFormProps {
    onVenueAdded: (message: string) => void;
    refreshKey: () => void;
}

const AddVenueForm: FC<AddVenueFormProps> = ({ onVenueAdded, refreshKey }) => {
    const [loadingStore, setLoadingStore] = useState(false)
    const [venue, setVenue] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState<VenueFieldErrors>({});

    const handleStoreVenue = async (e: FormEvent) => {
        try {
            e.preventDefault()

            setLoadingStore(true)

            const res = await VenueService.storeVenue({
                venue,
                description
            })

            if (res.status === 200) {
                setVenue('');
                setDescription('');
                setErrors({});

                onVenueAdded(res.data.message)
                refreshKey()
            } else {
                console.error('Unexpected error occured during store venue')
            }
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                console.error("Unexpected server error occured during store venue: ", error);
            }
        } finally {
            setLoadingStore(false)
        }
    };


    return (
        <>
            <form onSubmit={handleStoreVenue}>
                <div className="mb-4">
                    <FloatingLabelInput
                        label="Venue"
                        type="text"
                        name="venue"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        required
                        autoFocus
                        errors={errors.venue}
                    />
                </div>
                <div className="mb-4">
                    <FloatingLabelInput
                        label="Description"
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <SubmitButton
                        label="Save Venue"
                        loading={loadingStore}
                        loadingLabel="Saving Venue"
                    />
                </div>
            </form>
        </>
    )
}

export default AddVenueForm