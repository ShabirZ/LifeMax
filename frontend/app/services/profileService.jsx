import { getProfile, updateProfile } from "../api/Health/ProfileAPI";

export const fetchHealthProfile = async () => {
  const res = await getProfile();
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch health profile");
  return res.json();
};

export const saveHealthProfile = async (data) => {
  const res = await updateProfile(data);
  if (!res.ok) throw new Error("Failed to save health profile");
  return true;
};
