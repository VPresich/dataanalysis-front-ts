import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../../../redux/auth/operations";
import { selectUserName, selectAvatarURL } from "../../../redux/auth/selectors";
import UserImageElem from "../UserImageElem/UserImageElem";
import {
  errNotify,
  successNotify,
} from "../../../auxiliary/notification/notification";
import ModalWrapper from "../../UI/ModalWrapper/ModalWrapper";
import UserSettingsForm from "../Forms/UserSettingsForm/UserSettingsForm";
import css from "./UserAvatarModal.module.css";

const isDevMode = import.meta.env.VITE_DEVELOPED_MODE === "true";

export default function UserAvatarModal() {
  const userName = useSelector(selectUserName);
  const userAvatarURL = useSelector(selectAvatarURL);
  const [showUserForm, setShowUserForm] = useState(false);
  const dispatch = useDispatch();

  const handleAvatarClick = () => {
    setShowUserForm(true);
  };

  const onSaveUserProfile = async (values) => {
    if (Object.keys(values).length === 0) {
      console.log("Nothing changed, skipping request");
      setShowUserForm(false);
      return;
    }
    try {
      await dispatch(updateUserProfile(values)).unwrap();
      if (isDevMode) successNotify("Success loading data");
      setShowUserForm(false);
    } catch (e) {
      console.error(e);
      errNotify(e.message || "Failed to update user profile");
    }
  };

  return (
    <div className={css.userAvatarContainer}>
      <button className={css.avatarBtn} onClick={handleAvatarClick}>
        <UserImageElem
          imgUrl={userAvatarURL}
          altText={userName}
          isSmall={true}
        />
      </button>

      {showUserForm && (
        <ModalWrapper onClose={() => setShowUserForm(false)}>
          <UserSettingsForm handleUserSave={onSaveUserProfile} />
        </ModalWrapper>
      )}
    </div>
  );
}
