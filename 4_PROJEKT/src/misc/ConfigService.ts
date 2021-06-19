import config from "../config";
import IAppStorage from "../interfaces/IAppStorage";
import { IConfig } from "../interfaces/IConfig";
import FirebaseStorage from "./storage/FirebaseStorage";
import LocalStorage from "./storage/LocalStorage";
import { StorageType } from "./types";


export default class ConfigService {

    public static readonly config: IConfig = config;

    public readonly storage: IAppStorage;

    constructor() {
        this.storage = this.initStorage(ConfigService.config.storageType);
    }

    public initStorage = (type: StorageType): IAppStorage => {
        switch (type) {
            case "Firebase":
                return new FirebaseStorage();
            default:
                return new LocalStorage();
        }
    }


}


export const configService = new ConfigService();