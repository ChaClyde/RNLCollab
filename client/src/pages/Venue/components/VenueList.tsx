import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/Table"
import Spinner from "../../../components/Spinner/Spinner"
import { Link } from "react-router-dom"
import type { VenueColumns } from "../../../interfaces/VenueInterface"
import { useEffect, useState, type FC } from "react"
import VenueService from "../../../services/VenueService"

interface VenueListProps {
    refreshKey: boolean;
}

const VenueList: FC<VenueListProps> = ({refreshKey}) => {
    const [loadingVenues, setLoadingVenues] = useState(false)
    const [venues, setVenues] = useState<VenueColumns[]>([])

    const handleLoadVenues = async () => {
        try {
            setLoadingVenues(true);

            const res = await VenueService.loadVenue();

            if (res.status === 200) {
                setVenues(res.data.venues);
            } else {
                console.error('Unexpected error status occured during loading venues: ', res.status);
            }
        } catch (error) {
            console.error('Unexpected error status occured during loading venues: ', error);
        } finally {
            setLoadingVenues(false);
        }
    }

    useEffect(() => {
        handleLoadVenues();
    }, [refreshKey])

    return (
        <>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="max-w-full max-h-[calc(100vh)] overflow-x-auto divide-y">
                    <Table>
                        <TableHeader className="border-b border-gray-200 bg-gray-950 sticky top-0 text-white text-xs">
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">N0.</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-start">VENUE</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-staer">DESCRIPTION</TableCell>
                            {/* <TableCell isHeader className="px-5 py-3 font-medium text-center">STATUS</TableCell> */}
                            <TableCell isHeader className="px-5 py-3 font-medium text-start">ACTIONS</TableCell>
                        </TableHeader>
                        <TableBody className="diveide-y divide-gray-100 text-gray-500 text-sm">
                          {loadingVenues ? (
                              <TableRow>
                                  <TableCell colSpan={4} className="px-4 py-3 text-center">
                                      <Spinner size="md" />
                                  </TableCell>
                              </TableRow>
                          ) : venues.map((venue, index) => (
                              <TableRow className="hover:bg-gray-100" key={index}>
                                  <TableCell className="px-4 py-3 text-center">{index + 1}</TableCell>
                                  <TableCell className="px-4 py-3 text-start">{venue.venue_name}</TableCell>
                                  <TableCell className="px-4 py-3 text-start">{venue.venue_description}</TableCell>
                                  <TableCell className="px-4 py-3 text-center">
                                      <div className="flex justify-start text-start items-start gap-4">
                                          <Link to={`/venue/edit/${venue.venue_id}`} className="text-green-600 font-medium hover:underline">
                                              Edit
                                          </Link>
                                          <Link to={`/venue/delete/${venue.venue_id}`} className="text-red-600 hover:underline font-medium">
                                              Delete
                                          </Link>
                                      </div>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default VenueList