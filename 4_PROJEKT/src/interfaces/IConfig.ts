import { StorageType } from "../misc/types";
import IFirebaseConfig from "./IFirebaseConfig";

export interface IConfig {

    storageType: StorageType
    firebaseConfig: IFirebaseConfig

}