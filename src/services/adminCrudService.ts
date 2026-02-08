import { api } from './api';
import type { ServiceResult, RemoveResult } from '../types/api';
import type { Fleet, Career } from '../types/models';

// The subset of api resources that support standard CRUD operations
type CrudResource = 'fleet' | 'careers';

interface CrudServiceOptions {
  resourceLabel?: string;
}

interface CrudService<T> {
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T>;
  create: (data: Partial<T>) => Promise<ServiceResult<T>>;
  update: (id: string, data: Partial<T>) => Promise<ServiceResult<T>>;
  remove: (id: string) => Promise<RemoveResult>;
}

export const createCrudService = <T>(resource: CrudResource, options: CrudServiceOptions = {}): CrudService<T> => {
  const label = options.resourceLabel || resource;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiResource = api[resource] as any;

  if (!apiResource) {
    throw new Error(`API resource "${resource}" does not exist`);
  }

  return {
    getAll: async () => {
      try {
        const response = await apiResource.getAll();
        return response.data.data;
      } catch (error) {
        console.error(`Failed to fetch ${label}:`, error);
        throw error;
      }
    },

    getById: async (id: string) => {
      try {
        const response = await apiResource.getById(id);
        return response.data.data;
      } catch (error) {
        console.error(`Failed to fetch ${label}:`, error);
        throw error;
      }
    },

    create: async (data: Partial<T>) => {
      try {
        const response = await apiResource.create(data);
        return { success: true as const, data: response.data.data };
      } catch (error) {
        return {
          success: false as const,
          error: (error as Error).message || `Failed to create ${label}`
        };
      }
    },

    update: async (id: string, data: Partial<T>) => {
      try {
        const response = await apiResource.update(id, data);
        return { success: true as const, data: response.data.data };
      } catch (error) {
        return {
          success: false as const,
          error: (error as Error).message || `Failed to update ${label}`
        };
      }
    },

    remove: async (id: string) => {
      try {
        await apiResource.delete(id);
        return { success: true as const };
      } catch (error) {
        return {
          success: false as const,
          error: (error as Error).message || `Failed to delete ${label}`
        };
      }
    },
  };
};

// Pre-built service instances for convenience
export const fleetService = createCrudService<Fleet>('fleet', { resourceLabel: 'vessel' });
export const careersService = createCrudService<Career>('careers', { resourceLabel: 'career' });
