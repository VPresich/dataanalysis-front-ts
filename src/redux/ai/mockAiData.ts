import { AIResponse } from "./types";

export const mockAiEvaluations: Record<number, AIResponse> = {
  11: {
    status: "success",
    response: `### BLOCK 1: Localization and Failure Symptoms
* **Trajectory #11**: Analysis captured at timestamp **13.862s**.
* **Color Zone**: **Red Zone** (Total critical kinematics failure).
* **Symptoms**: Chi-square criterion remains within normal limits, but the velocity plausibility flag dropped to zero.

### BLOCK 2: Mathematical Diagnosis
1. Discovered **dynamic mismatch** between the prior predicted and posterior corrected velocity distributions.
2. **KDE (0.308)** and **Gaussian (0.306)** metrics synchronously dropped below the 0.5 threshold. The Kalman filter registered a sharp non-linear target maneuver.

### BLOCK 3: Engineering Recommendations
- On the frontend, it is recommended to apply **cubic spline smoothing**.
- On the backend, increase the process noise covariance matrix **Q**.`,
  },
  16: {
    status: "success",
    response: `### BLOCK 1: Localization and Failure Symptoms
* **Trajectory #33**: Prolonged anomaly detected in the time interval **24.8s - 314.3s**.
* **Color Zone**: **Orange Zone** (Systematic velocity drift).

### BLOCK 2: Mathematical Diagnosis
1. Continuous sustained motion along a curved trajectory is observed. Chi-square values are ideal (**Chi2 ~ 1.9**).
2. However, the velocity overlap integral is stuck at **KDE: 0.41**, continuously invalidating motion kinematics, even though the track visually appears smooth.

### BLOCK 3: Engineering Recommendations
- This trajectory segment is **safe for frontend visualization** since the overall smoothed trend is completely preserved.`,
  },
  18: {
    status: "success",
    response: `### BLOCK 1: Localization and Failure Symptoms
* **Trajectory #45**: Isolated point anomaly captured at timestamp **10.64s**.
* **Color Zone**: **Orange Zone** (Initial kinematics shock).

### BLOCK 2: Mathematical Diagnosis
1. Extremely low Chi-square test statistic value (**0.710**).
2. Velocity density overlap metrics dropped critically (**KDE: 0.169**, **Gaussian: 0.170**), indicating a sharp turn immediately following track initialization.`,
  },
  30: {
    status: "success",
    response: `### AI Evaluation: Track Consistent
No points violating consistency thresholds were discovered in the database for this track. All kinematics metrics match the prior filter predictions perfectly.`,
  },
  1463: {
    status: "success",
    response: `### BLOCK 1: Localization and Failure Symptoms
* **Trajectory #1463**: Sustained tracking issues captured between **405.199s** and **406.077s**.
* **Color Zone**: **Blue Zone** (Chi-square threshold violation).
* **Symptoms**: The residual filtering statistics (**Chi2_Value ~ 7.74**) severely violated statistical limits, causing the smoothed route to collapse completely (**Track_consistent = 0**).

### BLOCK 2: Mathematical Diagnosis
1. Perfect velocity correlation (**Vel_consistent = 1**) and high overlap densities (**KDE ~ 0.97**, **Gaussian ~ 0.96**) prove the target is moving smoothly at a constant pace without sharp maneuvering.
2. High association probabilities (**JPDA_prob ~ 0.99**) isolate this issue from radar clutter. The filter exhibits a **positional model mismatch**, accumulating tracking lag due to an unmodeled gradual track deviation.

### BLOCK 3: Engineering Recommendations
- **Do not ignore** these data coordinates; frontend views should flag a potential target track divergence.
- Recalibrate the backend Chi-square confidence level filters or fine-tune transition configurations to counter mounting positioning drift.`,
  },
  828: {
    status: "success",
    response: `### BLOCK 1: Localization and Failure Symptoms
* **Trajectory #828**: Mass clutter-induced anomalies detected over an extended interval starting at **333.474s**.
* **Color Zone**: **Blue Zone** mutating into transient **Orange Zones** during severe tracking degradation.
* **Symptoms**: Residual errors instantly spiked to astronomical heights (**Chi2_Value = 1249.02**).

### BLOCK 2: Mathematical Diagnosis
1. Extreme radar cluster contamination occurred. The posterior tracking association probability crashed entirely (**JPDA_prob = 0.029**), proving the JPDA node committed heavily to false plots.
2. The IMM filter swallowed contaminated telemetry inputs, driving tracking matrices out of bounds while creating a synthetic, false-smooth speed trajectory.

### BLOCK 3: Engineering Recommendations
- **Prune this data layer entirely** from frontend render configurations; the system tracked radar clutter blocks instead of the genuine object target.
- Restrict gate assignment sizes inside the backend JPDA module to block dense clutter clouds.`,
  },
};
