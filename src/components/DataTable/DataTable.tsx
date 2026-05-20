import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/auth/selectors";
import { DataRecord } from "../../redux/data/types";
import css from "./DataTable.module.css";

interface DataTableProps {
  data: DataRecord;
}

const DataTable = ({ data }: DataTableProps) => {
  const theme = useSelector(selectTheme);
  if (!Array.isArray(data)) {
    console.error("Expected data to be an array, but got:", data);
    return <p>No data available</p>;
  }

  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th className={clsx(css.th, css[theme])}>CV Positive</th>
          <th className={clsx(css.th, css[theme])}>CV Stable</th>
          <th className={clsx(css.th, css[theme])}>CA Positive</th>
          <th className={clsx(css.th, css[theme])}>CA Stable</th>
          <th className={clsx(css.th, css[theme])}>CT Positive</th>
          <th className={clsx(css.th, css[theme])}>CT Stable</th>
          <th className={clsx(css.th, css[theme])}>IMM Consistent Value</th>
          <th className={clsx(css.th, css[theme])}>IMM Consistent</th>
          <th className={clsx(css.th, css[theme])}>IMM Positive</th>
          <th className={clsx(css.th, css[theme])}>Velocity</th>
          <th className={clsx(css.th, css[theme])}>Speed</th>
          <th className={clsx(css.th, css[theme])}>X</th>
          <th className={clsx(css.th, css[theme])}>Y</th>
          <th className={clsx(css.th, css[theme])}>Z</th>
          <th className={clsx(css.th, css[theme])}>Probability</th>
          <th className={clsx(css.th, css[theme])}>Track</th>
          <th className={clsx(css.th, css[theme])}>Time</th>
          <th className={clsx(css.th, css[theme])}>Kde</th>
          <th className={clsx(css.th, css[theme])}>Kde Weighted</th>
          <th className={clsx(css.th, css[theme])}>Gaussian</th>
          <th className={clsx(css.th, css[theme])}>Gaussian Weighted</th>
          <th className={clsx(css.th, css[theme])}>Evaluation Num</th>
          <th className={clsx(css.th, css[theme])}>Track Consistent</th>
          <th className={clsx(css.th, css[theme])}>Velocity Consistent</th>
        </tr>
      </thead>
      <tbody className={css.tbody}>
        {data.map((item) => (
          <tr key={item._id} className={clsx(css.tr, css[theme])}>
            <td className={css.td}>{item.CVpositive}</td>
            <td className={css.td}>{item.CVstable}</td>
            <td className={css.td}>{item.CApositive}</td>
            <td className={css.td}>{item.CAstable}</td>
            <td className={css.td}>{item.CTpositive}</td>
            <td className={css.td}>{item.CTstable}</td>
            <td className={css.td}>{item.IMMconsistentValue}</td>
            <td className={css.td}>{item.IMMconsistent}</td>
            <td className={css.td}>{item.IMMpositive}</td>
            <td className={css.td}>{item.velocityOK}</td>
            <td className={css.td}>{item.speed}</td>
            <td className={css.td}>{item.X}</td>
            <td className={css.td}>{item.Y}</td>
            <td className={css.td}>{item.Z}</td>
            <td className={css.td}>{item.probability}</td>
            <td className={css.td}>{item.TrackNum}</td>
            <td className={css.td}>{item.Time}</td>
            <td className={css.td}>{String(item.Kde ?? "")}</td>
            <td className={css.td}>{String(item.KdeWeighted ?? "")}</td>
            <td className={css.td}>{String(item.Gaussian ?? "")}</td>
            <td className={css.td}>{String(item.GaussianWeighted ?? "")}</td>
            <td className={css.td}>{String(item.EvaluationNum ?? "")}</td>
            <td className={css.td}>{String(item.TrackConsistent ?? "")}</td>
            <td className={css.td}>{String(item.VelocityConsistent ?? "")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
