export interface AIRequest {
  id_source: string;
  TrackNum: number;
}

export interface AIResponse {
  status: string;
  response: string;
}

export interface AIState {
  id_source: string | null;
  TrackNum: number | null;
  evaluations: Record<number, AIResponse>;
  isLoading: boolean;
  error: string | null;
}
