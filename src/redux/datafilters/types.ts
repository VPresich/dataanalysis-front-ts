export interface DataFiltersState {
  trackNum: string;
  selectedTrackNums: string[];
  trackNumbers: string[];
  immConsistent: string;
  immConsistentValues: string[];
  immConsistentMaxValue: string;
  startTime: string;
  endTime: string;
  is3D: boolean;
}

export interface TimeDataPayload {
  startTime: string;
  endTime: string;
}
