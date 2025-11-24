import clsx from "clsx";
import css from "./UserImageElem.module.css";
import defImgUrl from "../../../assets/img/defaultUser.png";

const UserImageElem = ({
  imgUrl,
  altText = "",
  containerClass = null,
  isSmall = false,
}) => {
  return (
    <div className={clsx(css.container, containerClass, isSmall && css.small)}>
      <img
        className={css.img}
        src={imgUrl || defImgUrl}
        alt={altText ? `Photo of ${altText}` : "User photo"}
      />
    </div>
  );
};

export default UserImageElem;
