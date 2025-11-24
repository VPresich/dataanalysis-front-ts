import { useSelector } from "react-redux";
import { selectLoader } from "../../../redux/loader/selectors";
import { selectTheme } from "../../../redux/auth/selectors";
import { selectIsRefreshing } from "../../../redux/auth/selectors";
import { Rings } from "react-loader-spinner";
import css from "./Loader.module.css";

const themeColors = {
  default: "var(--default)",
  yellow: "var(--yellow)",
  green: "var(--green)",
  blue: "var(--blue)",
  pink: "var(--pink)",
  red: "var(--red)",
};

const Loader = () => {
  const isLoading = useSelector(selectLoader);
  const isRefreshing = useSelector(selectIsRefreshing);
  const theme = useSelector(selectTheme);

  if (!isLoading && !isRefreshing) return null;

  const color = themeColors[theme] || themeColors.default;

  return (
    <div className={css.loader}>
      <Rings
        visible={true}
        height="300"
        width="300"
        color={color}
        ariaLabel="rings-loading"
      />
    </div>
  );
};

export default Loader;

// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { selectTheme } from "../../../redux/auth/selectors";
// import clsx from "clsx";
// import css from "./Loader.module.css";

// import { Triangle } from "react-loader-spinner";

// const Loader = () => {
//   const [color, setColor] = useState("default");

//   const theme = useSelector(selectTheme);

//   useEffect(() => {
//     const root = document.querySelector(`.${css.triangle}.${css[theme]}`);
//     if (root) {
//       const computedStyle = getComputedStyle(root);
//       const triangleColor = computedStyle.getPropertyValue("--triangle-color");
//       setColor(triangleColor);
//     }
//   }, [theme]);

//   return (
//     <div className={css.container}>
//       <Triangle
//         visible={true}
//         height="100"
//         width="100"
//         color={color.trim()}
//         ariaLabel="triangle-loading"
//         wrapperStyle={{}}
//         wrapperClass={clsx(css.triangle, css[theme])}
//       />
//     </div>
//   );
// };

// export default Loader;
