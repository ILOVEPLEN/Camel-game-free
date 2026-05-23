import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'pb_pro';

// In production replace these two functions with RevenueCat:
//   import Purchases from 'react-native-purchases';
//   const info = await Purchases.getCustomerInfo();
//   return info.entitlements.active['pro'] !== undefined;

export async function getIsProUser(): Promise<boolean> {
  const val = await AsyncStorage.getItem(KEY);
  return val === 'true';
}

export async function setProUser(value: boolean): Promise<void> {
  await AsyncStorage.setItem(KEY, value ? 'true' : 'false');
}
