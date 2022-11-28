// imports nodig voor het checken van ingelogd status voor openen app
import { Device } from "@capacitor/device";
import { reactive } from "vue";

export async function useDevice() {
  const deviceId = ref();
  const info = await Device.getInfo();
  const id = await Device.getId();
  deviceId.value = info.platform + info.model + id.uuid;
  return deviceId;
}
