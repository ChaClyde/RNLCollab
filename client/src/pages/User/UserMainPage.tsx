import ToastMessage from "../../components/ToastMessage/ToastMessage";
import { useModal } from "../../hooks/useModal"
import { useRefresh } from "../../hooks/useRefresh";
import { useToastMessage } from "../../hooks/useToastMessage";
import AddUserFormModal from "./components/AddUserFormModal"
import DeleteUserFormModal from "./components/DeleteUserFormModal";
import EditUserFormModal from "./components/EditUserFormModal";
import UserList from "./components/UserList"


const UserMainPage = () => {
  const {
    isOpen: isAddUserFormModal,
    openModal: openAddUserFormModal,
    closeModal: closeAddUserFormModal
  } = useModal(false);

  const {
    isOpen: isEditUserFormModal,
    selectedUser: selectedUserForEdit,
    openModal: openEditUserFormModal,
    closeModal: closeEditUserFormModal
  } = useModal(false);

  const {
    isOpen: isDeleteUserFormModalOpen,
    selectedUser: selectedUserForDelete,
    openModal: openDeleteUserFormModal,
    closeModal: closeDeleteUserFormModal
  } = useModal(false);

  const {
    message: toastMessage,
    isVisible: toastMessageIsVisible,
    showToastMessage,
    closeToastMessage
  } = useToastMessage("", false, false);

  const {
    refresh,
    handleRefresh
  } = useRefresh(false);

  return (
    <>
      <ToastMessage
        message={toastMessage}
        isVisible={toastMessageIsVisible}
        onClose={closeToastMessage}
      />

      <AddUserFormModal
        onUserAdded={showToastMessage}
        refreshKey={handleRefresh}
        isOpen={isAddUserFormModal}
        onClose={closeAddUserFormModal}
      />

      <EditUserFormModal
        user={selectedUserForEdit}
        onUserUpdated={showToastMessage}
        refreshKey={handleRefresh}
        isOpen={isEditUserFormModal}
        onClose={closeEditUserFormModal}
      />

      <DeleteUserFormModal
      user={selectedUserForDelete}
      onDeleteUser={showToastMessage}
      refreshKey={handleRefresh}
      isOpen={isDeleteUserFormModalOpen}
      onClose={closeDeleteUserFormModal}
      />

      <UserList
        onAddUser={openAddUserFormModal}
        onEditUser={(user) => openEditUserFormModal(user)}
        onDeleteUser={(user) => openDeleteUserFormModal(user)}
        refreshKey={refresh}
      /> 

    </>
  )
}

export default UserMainPage;