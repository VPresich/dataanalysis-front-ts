import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { selectTheme } from "../../redux/auth/selectors";
import { closeSidebar } from "../../redux/sidebar/slice";
import DocumentTitle from "../../components/DocumentTitle";
import Button from "../../components/UI/Button/Button";
import imgDefaultUrl from "../../assets/img/home/default_block.webp";
import imgYellowUrl from "../../assets/img/home/yellow_analysis_block.webp";
import imgBlueUrl from "../../assets/img/home/blue_analysis_block.webp";
import imgGreenUrl from "../../assets/img/home/green_analysis_block.webp";
import imgRedUrl from "../../assets/img/home/red_analysis_block.webp";
import { refreshUser } from "../../redux/auth/operations";
import { saveToken } from "../../redux/auth/slice";

const selectImgUrl = (theme) => {
  let imgUrl = imgDefaultUrl;

  switch (theme) {
    case "yellow":
      imgUrl = imgYellowUrl;
      break;
    case "green":
      imgUrl = imgGreenUrl;
      break;
    case "blue":
      imgUrl = imgBlueUrl;
      break;
    case "red":
      imgUrl = imgRedUrl;
      break;
    default:
      break;
  }
  return imgUrl;
};

import { useNavigate } from "react-router-dom";

import css from "./HomePage.module.css";

export default function HomePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(closeSidebar());
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      dispatch(saveToken(token));
      dispatch(refreshUser());
      navigate("/");
    }
  }, [dispatch, location.search, navigate]);

  const theme = useSelector(selectTheme);

  const handleClick = () => {
    navigate("/data");
  };

  return (
    <React.Fragment>
      <DocumentTitle>Home Page</DocumentTitle>
      <div className={css.container}>
        <section className={css.welcome}>
          <div className={css.info}>
            <h1 className={css.title}>
              Turn{" "}
              <span className={clsx(css.accent, css[theme])}>raw data</span>{" "}
              into knowledge
            </h1>
            <p className={css.text}>
              Transform complex datasets into actionable insights. Explore and
              understand your data, visualize it easily, and make informed
              decisions.
            </p>
            <Button onClick={handleClick} btnAuxStyles={css.btnAuxStyles}>
              Get started
            </Button>
          </div>
          <div className={css.imgContainer}>
            <img src={selectImgUrl(theme)} alt="Picture" className={css.img} />
          </div>
        </section>

        <section className={clsx(css.features, css[theme])}>
          <ul className={css.featuresList}>
            <li className={css.featureItem}>
              <p className={css.itemTitle}>Add Data</p>
              <p className={css.itemText}>
                Upload and manage your datasets effortlessly
              </p>
            </li>
            <li className={css.featureItem}>
              <p className={css.itemTitle}>Analyze</p>
              <p className={css.itemText}>
                Quickly explore and interpret your datasets
              </p>
            </li>
            <li className={css.featureItem}>
              <p className={css.itemTitle}>Visualize</p>
              <p className={css.itemText}>
                Create clear charts and dashboards in seconds.
              </p>
            </li>
            <li className={css.featureItem}>
              <p className={css.itemTitle}>Decide</p>
              <p className={css.itemText}>
                Make confident, data-driven business choices.
              </p>
            </li>
          </ul>
        </section>
      </div>
    </React.Fragment>
  );
}
