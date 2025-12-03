export interface DataFiltersState {
  trackNum: string;
  selectedTrackNums: (string | number)[];
  trackNumbers: (string | number)[];
  immConsistent: string;
  immConsistentValues: string[];
  immConsistentMaxValue: string;
  startTime: string;
  endTime: string;
  is3D: boolean;
}
