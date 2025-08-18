import { ApiResponse } from '@/types/api';
import { PollenApiResult } from '@/types/pollen';

export function fetcherPollenData(url: string): Promise<ApiResponse<PollenApiResult[]>> {
  return fetch(url).then((response) => response.json());
}
