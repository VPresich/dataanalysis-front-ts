import { TrajectoryPoint } from "../types/trajectoryPoint";

const normalRandom = (mean: number, stdDev: number): number => {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2); // Box–Muller
  return mean + z0 * stdDev;
};

const generateTrajectoryPoints = (
  m: number = 1,
  b: number = 0,
  xRange: number = 10,
  noiseStdDev: number = 0.5
): TrajectoryPoint[] => {
  const generatedPoints: TrajectoryPoint[] = [];

  for (let i = 0; i < 10; i++) {
    const x = Math.random() * xRange;

    let y = m * x + b;
    y += normalRandom(0, noiseStdDev);

    const t = Math.random() * 10;

    generatedPoints.push({ x, y, t });
  }

  return generatedPoints;
};

export default generateTrajectoryPoints;
