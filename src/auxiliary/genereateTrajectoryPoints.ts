import { TrajectoryPoint } from "../types/trajectoryPoint";

const generateTrajectoryPoints = (): TrajectoryPoint[] => {
  const generatedPoints: TrajectoryPoint[] = [];

  for (let i = 0; i < 10; i++) {
    const t = Math.random() * 10;
    const x = Math.random() * 10;
    const y = Math.random() * 10;

    generatedPoints.push({ x, y, t });
  }

  return generatedPoints;
};

export default generateTrajectoryPoints;
