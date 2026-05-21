import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { updateTheme } from "../../redux/auth/operations";
import { selectTheme, selectIsLoggedIn } from "../../redux/auth/selectors";
import { Theme } from "../../redux/auth/types";
import { setTheme } from "../../redux/auth/slice";

import iconsPath from "../../assets/img/icons.svg";
import clsx from "clsx";
import css from "./ColorSelector.module.css";

const themes = ["default", "green", "blue", "yellow", "red"];

const ColorSelector = (): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [isOpen, setIsOpen] = useState(false);

  if (!isLoggedIn) return null;

  const handleThemeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const selectedTheme = event.target.value.toLowerCase() as Theme;
    dispatch(setTheme(selectedTheme));
    dispatch(updateTheme({ theme: selectedTheme }));
    setIsOpen(false);
  };

  return (
    <div className={css.header}>
      <button
        className={clsx(css.btn, { [css.open]: isOpen }, css[theme])}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className={clsx(css.icon, css[theme])} aria-label="arrow icon">
          <use href={`${iconsPath}#icon-dropdown`} />
        </svg>
      </button>
      {isOpen && (
        <div className={clsx(css.dropdown, css[theme])}>
          {themes.map((themeOption) => (
            <label
              key={themeOption}
              className={clsx(css.label, css[themeOption])}
            >
              <input
                type="radio"
                value={themeOption}
                checked={theme === themeOption}
                onChange={handleThemeChange}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorSelector;
