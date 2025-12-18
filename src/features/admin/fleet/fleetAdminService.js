import { getStorageData, setStorageData, updateStorageItem, deleteStorageItem, generateId } from '../../../utils/localStorage';

const STORAGE_KEY = 'swan_admin_fleet';

export const getAllVessels = () => {
  return getStorageData(STORAGE_KEY) || [];
};

export const getVesselById = (id) => {
  const vessels = getAllVessels();
  return vessels.find(vessel => vessel.id === parseInt(id));
};

export const createVessel = (vesselData) => {
  const vessels = getAllVessels();
  const newId = generateId(vessels);

  const newVessel = {
    ...vesselData,
    id: newId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  vessels.push(newVessel);
  setStorageData(STORAGE_KEY, vessels);

  return { success: true, data: newVessel };
};

export const updateVessel = (id, vesselData) => {
  const vessels = getAllVessels();
  const existingVessel = getVesselById(id);

  if (!existingVessel) {
    return { success: false, error: 'Vessel not found' };
  }

  const updatedVessel = {
    ...existingVessel,
    ...vesselData,
    id: parseInt(id),
    createdAt: existingVessel.createdAt,
    updatedAt: new Date().toISOString(),
  };

  const updatedVessels = vessels.map(vessel =>
    vessel.id === parseInt(id) ? updatedVessel : vessel
  );

  setStorageData(STORAGE_KEY, updatedVessels);

  return { success: true, data: updatedVessel };
};

export const deleteVessel = (id) => {
  return deleteStorageItem(STORAGE_KEY, parseInt(id));
};

export const initializeFleetData = (defaultVessels) => {
  const existing = getAllVessels();
  if (existing.length === 0 && defaultVessels && defaultVessels.length > 0) {
    const vesselsWithIds = defaultVessels.map((vessel, index) => ({
      ...vessel,
      id: index + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    setStorageData(STORAGE_KEY, vesselsWithIds);
    return vesselsWithIds;
  }
  return existing;
};
