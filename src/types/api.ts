export type ApiResponse<T> = {
  total_count: number;
  results: T;
};

export const POLLEN_URL =
  'https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets';
