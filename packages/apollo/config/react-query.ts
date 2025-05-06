// eslint-disable-next-line import/no-unresolved
import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import {
  DefaultError,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { OperationDefinitionNode } from 'graphql';

import { createRequest } from './graphql-config';

function createRQClient() {
  const queryClient = new QueryClient();

  return queryClient;
}

/** Helper type to force empty object to undefined. */
type Strict<T> = T extends Record<string, never> ? undefined : NonNullable<T>;

function getOperationName<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
) {
  return (document?.definitions[0] as OperationDefinitionNode)?.name?.value;
}

function createGraphQlHook(
  createGraphQLRequest: ReturnType<typeof createRequest>,
) {
  return function useGraphQL<TResult, TVariables>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scopeKeys: readonly any[],
    document: TypedDocumentNode<TResult, TVariables>,
    variables: Strict<TVariables>,
    options?: UseQueryOptions<TResult, DefaultError>,
  ): UseQueryResult<TResult> {
    const operationName = getOperationName(document);

    if (!operationName) throw new Error('Operation name is required');
    const queryKey = [...scopeKeys, operationName, variables] as const;
    return useQuery({
      queryKey,
      queryFn: async ({ queryKey }) =>
        createGraphQLRequest(document)(queryKey.at(-1) as TVariables),
      ...options,
    });
  };
}
export {
  QueryClientProvider,
  useQueryClient,
  createRQClient,
  ReactQueryDevtools,
  createGraphQlHook,
  getOperationName,
};
