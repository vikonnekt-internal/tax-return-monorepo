import {
  MicroserviceConfig,
  MicroserviceModuleOptions,
} from '@tax/microservice-client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const knownMicroservices = [
  'legal-parser-ms',
  'legal-formater-ms',
  'legal-adaptation-ms',
] as const;

/**
 * Represents a known microservice by name
 */
export type KnownMicroservice = (typeof knownMicroservices)[number];

/**
 * Creates a type-safe microservice configuration
 * @param name Service name
 * @param config Service configuration
 * @returns Typed microservice configuration
 */
export function createMicroservice<T extends KnownMicroservice>(
  name: T,
  config: Omit<MicroserviceConfig, 'name'>,
): MicroserviceConfig {
  return { name, ...config };
}

/**
 * Creates a type-safe module options configuration
 * @param options Module options
 * @returns Typed microservice module options
 */
export function createMicroserviceOptions(
  options: Omit<MicroserviceModuleOptions, 'services'> & {
    services: MicroserviceConfig[];
  },
): MicroserviceModuleOptions {
  return options;
}
