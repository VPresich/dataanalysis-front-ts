import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectTheme } from "../../redux/auth/selectors";
import iconsPath from "../../assets/img/icons.svg";
import AppMobileMenuContent from "../AppMobileMenuContent/AppMobileMenuContent";
import clsx from "clsx";
import css from "./AppMobileMenuBtn.module.css";

const AppMobileMenuBtn = (): JSX.Element => {
  const theme = useAppSelector(selectTheme);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className={css.menuBtn} onClick={handleClick}>
        <svg
          className={clsx(css.menuIcon, css[theme])}
          width="24"
          height="24"
          aria-label="burger menu button"
        >
          <use xlinkHref={`${iconsPath}#icon-menu`} />
        </svg>
      </button>

      <div className={clsx(css.mobileMenu, { [css.open]: isOpen })}>
        <button className={css.closeBtn} onClick={handleClick}>
          <svg
            className={clsx(css.closeIcon, css[theme])}
            width="24"
            height="24"
            aria-label="close menu button"
          >
            <use href={`${iconsPath}#icon-x-close`} />
          </svg>
        </button>
        <AppMobileMenuContent onMenuClick={handleClick} />
      </div>
    </>
  );
};

export default AppMobileMenuBtn;
