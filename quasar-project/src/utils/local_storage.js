// imports nodig voor het checken van ingelogd status voor openen app
import { LocalStorage } from "quasar";

export function setWithExpiry(key, value, ttl) {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.setMinutes(now.getMinutes() + ttl),
  };
  LocalStorage.set(key, JSON.stringify(item));
}

export function getWithExpiry(key) {
  const itemStr = LocalStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    LocalStorage.remove(key);
    return null;
  }
  return item.value;
}
