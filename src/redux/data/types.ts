export interface DataRecord {
  _id: string;
  id_source: string;
  CVpositive: string;
  CVstable: string;
  CApositive: string;
  CAstable: string;
  CTpositive: string;
  CTstable: string;

  X: number;
  Y: number;
  Z: number;

  Kde: string;
  KdeWeighted: string;
  Gaussian: string;
  GaussianWeighted: string;

  EvaluationNum: string;
  IMMconsistentValue: string;
  probability: string;
  TrackConsistent: string;
  VelocityConsistent: string;
  IMMconsistent: string;
  IMMpositive: string;
  velocityOK: string;
  speed: string;

  TrackNum: number;
  Time: number;

  createdAt: string;
  updatedAt: string;
}

export interface FilterParams {
  startTime?: string;
  endTime?: string;
}

export interface RequestFilterParams extends FilterParams {
  sourceNumber: number;
}

export interface AnalysisState {
  items: DataRecord[];
  isLoading: boolean;
  error: string | null;
  // uploadProgress: number;
}
