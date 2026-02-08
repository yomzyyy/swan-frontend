import { api } from './api';

/**
 * Factory that creates a standard CRUD service for any API resource.
 * Eliminates the identical getAll/getById/create/update/delete pattern
 * that was copy-pasted across fleetAdminService, careersAdminService, etc.
 *
 * Usage:
 *   const fleetService = createCrudService('fleet');
 *   const careers = await fleetService.getAll();
 *
 * @param {string} resource - Key on the api object (e.g., 'fleet', 'careers')
 * @param {Object} options
 * @param {string} options.resourceLabel - Human-readable name for error messages (default: resource)
 * @returns {{ getAll, getById, create, update, remove }}
 */
export const createCrudService = (resource, options = {}) => {
  const label = options.resourceLabel || resource;
  const apiResource = api[resource];

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

    getById: async (id) => {
      try {
        const response = await apiResource.getById(id);
        return response.data.data;
      } catch (error) {
        console.error(`Failed to fetch ${label}:`, error);
        throw error;
      }
    },

    create: async (data) => {
      try {
        const response = await apiResource.create(data);
        return { success: true, data: response.data.data };
      } catch (error) {
        return {
          success: false,
          error: error.message || `Failed to create ${label}`
        };
      }
    },

    update: async (id, data) => {
      try {
        const response = await apiResource.update(id, data);
        return { success: true, data: response.data.data };
      } catch (error) {
        return {
          success: false,
          error: error.message || `Failed to update ${label}`
        };
      }
    },

    remove: async (id) => {
      try {
        await apiResource.delete(id);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error.message || `Failed to delete ${label}`
        };
      }
    },
  };
};

// Pre-built service instances for convenience
export const fleetService = createCrudService('fleet', { resourceLabel: 'vessel' });
export const careersService = createCrudService('careers', { resourceLabel: 'career' });
