import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_ROOT = "root";

export class AppStorage {
  public static Save(data: object): Promise<boolean> {
    const jsonString = JSON.stringify(data);

    return new Promise<boolean>((resolve, reject) => {
      AsyncStorage.setItem(STORAGE_ROOT, jsonString)
        .then(() => resolve(true))
        .catch((reason) => {
          console.error("Error saving data in storage, reason: " + reason);
          reject(false);
        });
    });
  }

  public static Load(): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      AsyncStorage.getItem(STORAGE_ROOT)
        .then((jsonString) => {
          if (jsonString == null) return resolve({});
          const data = JSON.parse(jsonString);
          resolve(data);
        })
        .catch((reason) => {
          console.error("Error loading data, reason: " + reason);
          reject(null);
        });
    });
  }
}
