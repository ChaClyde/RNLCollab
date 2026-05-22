import { useEffect, useState, type FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "../../../components/Table";
import Spinner from "../../../components/Spinner/Spinner";
import UserService from "../../../services/UserService";
import type { UserColumns } from "../../../interfaces/UserInterface";

interface TrashUserListProps {
  refreshKey: boolean;
  onRestoreUser: (message: string) => void;
  onPermanentDelete: (message: string) => void;
}
const TrashUserList: FC<TrashUserListProps> = ({
  refreshKey,
  onRestoreUser,
  onPermanentDelete
}) => {

  const [loadingUsers, setLoadingUsers] =
    useState(false);

  const [users, setUsers] =
    useState<UserColumns[]>([]);

  const handleLoadTrashUsers = async () => {
    try {

      setLoadingUsers(true);

      const res =
        await UserService.loadTrashUsers();

      if (res.status === 200) {
        setUsers(res.data.users);
      }

    } catch (error) {

      console.error(
        "Error loading trash users:",
        error
      );

    } finally {

      setLoadingUsers(false);

    }
  };

  const handleRestoreUser = async (
    userId: number
  ) => {

    try {

      const res =
        await UserService.restoreUser(
          userId
        );

      if (res.status === 200) {

        onRestoreUser(
          res.data.message
        );

        handleLoadTrashUsers();
      }

    } catch (error) {

      console.error(
        "Error restoring user:",
        error
      );

    }
  };

  const handlePermanentDelete = async (
    userId: number
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to permanently delete this user?"
      );

    if (!confirmDelete) return;

    try {

      const res =
        await UserService.forceDeleteUser(
          userId
        );

      if (res.status === 200) {

        onPermanentDelete(
          res.data.message
        );

        handleLoadTrashUsers();
      }

    } catch (error) {

      console.error(
        "Error deleting user permanently:",
        error
      );

    }
  };

  const handleUserFullNameFormat = (
    user: UserColumns
  ) => {

    let fullName = "";

    if (user.middle_name) {
      fullName =
        `${user.last_name}, ${user.first_name} ${user.middle_name.charAt(0)}.`;
    } else {
      fullName =
        `${user.last_name}, ${user.first_name}`;
    }

    if (user.suffix_name) {
      fullName += ` ${user.suffix_name}`;
    }

    return fullName;
  };

  useEffect(() => {

    handleLoadTrashUsers();

  }, [refreshKey]);

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">

        <div className="max-w-full max-h-[calc(100vh)] overflow-x-auto">

          <Table>

            <caption className="mb-4">

              <div className="border-b border-gray-100 p-4">

                <h2 className="text-lg font-semibold text-gray-700">
                  Deleted Users
                </h2>

              </div>

            </caption>

            <TableHeader className="border-b border-gray-200 bg-gray-950 sticky top-0 text-white text-xs">

              <TableCell isHeader className="px-5 py-3 text-center">
                No.
              </TableCell>

              <TableCell isHeader className="px-5 py-3 text-center">
                FULL NAME
              </TableCell>

              <TableCell isHeader className="px-5 py-3 text-center">
                ROLE
              </TableCell>

              <TableCell isHeader className="px-5 py-3 text-center">
                DEPARTMENT
              </TableCell>

              <TableCell isHeader className="px-5 py-3 text-center">
                EMAIL
              </TableCell>

              <TableCell isHeader className="px-5 py-3 text-center">
                STATUS
              </TableCell>

              <TableCell isHeader className="px-5 py-3 text-center">
                ACTIONS
              </TableCell>

            </TableHeader>

            <TableBody className="divide-y divide-gray-100 text-gray-500 text-sm">

              {loadingUsers ? (

                <TableRow>

                  <TableCell
                    colSpan={7}
                    className="px-4 py-3 text-center"
                  >

                    <Spinner size="md" />

                  </TableCell>

                </TableRow>

              ) : (

                users.map((user, index) => (

                  <TableRow
                    key={user.user_id}
                    className="hover:bg-gray-100"
                  >

                    <TableCell className="px-4 py-3 text-center">
                      {index + 1}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      {handleUserFullNameFormat(user)}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      {user.role.role_name}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      {user.department.department_name}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      {user.email}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      {user.status}
                    </TableCell>

                    <TableCell className="px-4 py-3">

                      <div className="flex gap-4">

                        <button
                          type="button"
                          className="text-green-600 hover:underline font-medium cursor-pointer"
                          onClick={() =>
                            handleRestoreUser(
                              user.user_id
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
                              user.user_id
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
    </>
  )
}

export default TrashUserList