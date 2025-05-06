import {
  QueryClient,
  QueryKey,
  UseQueryOptions,
  useQuery as useQueryRq,
} from '@tanstack/react-query';

import { CustomError } from './mutation';

export function useRQQuery<
  TQueryFnData = unknown,
  TError = CustomError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient,
) {
  return useQueryRq(options, queryClient);
}
