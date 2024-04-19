import { UserProfileForm } from "@/forms/user-profile-form";
import { useGetUser, useUpdateUserProfile } from "@/lib/api/user-api";

const UserProfilePage = () => {
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUserProfile();
  const { currentUser, isLoading: isGetLoading } = useGetUser();

  if (isGetLoading) {
    return <span>Loading..</span>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;
