export interface DataSource {
  source_number: number;
  source_name: string;
  file_name: string;
  comment?: string | null;
}

export interface DataSourceCreate extends DataSource {
  datafile: File;
}

export interface DataSourceUpdate
  extends Partial<Pick<DataSource, "source_name" | "file_name" | "comment">> {}

export interface DataSourceResponse extends DataSource {
  _id: string;
  id_user: string;
  createdAt: string;
  updatedAt: string;
}

export interface DataSourceOperationResponse {
  message: string;
  totalRecords?: number;
  source: DataSourceResponse;
}

export interface DataSourcesState {
  items: DataSourceResponse[];
  isLoading: boolean;
  error: string | null;
  uploadProgress: number;
}
