import axios from "axios";
import {
    SettingFileDataKeyType,
    SettingFileDataType,
    SettingMainDataType,
    SettingTranslateDataType
} from "@/src/types/form/type";

class Settings {
    private baseURL = process.env.BASE_URL;
    private api = {
        active: `${this.baseURL}/api/site/settings/active`,
        update: `${this.baseURL}/api/site/settings/update`,
        deleteFile: `${this.baseURL}/api/site/settings/delete_file`,
    }

    public active = async (id: number) => {
        try {
            const response = await axios.post(this.api.active, {
                id: id,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            if (response.status !== 200) {
                throw new Error('Data fetch failed');
            }

            return response.data;
        } catch (error: any) {
            if (error.response) {
                return error.response.data;
            } else {
                throw new Error('Data fetch failed');
            }
        }
    }
    public update = async (data: {
        file: SettingFileDataType,
        main: SettingMainDataType,
        translate: SettingTranslateDataType,
    }) => {
        try {
            const response = await axios.post(this.api.update, {
                data: data,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status !== 200) {
                throw new Error('Update failed');
            }

            return response.data;
        } catch (error: any) {
            if (error.response) {
                return error.response.data;
            } else {
                throw new Error('Update failed');
            }
        }
    }
    public deleteFile = async (key: SettingFileDataKeyType) => {
        try {
            const response = await axios.post(this.api.deleteFile, {
                key: key
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            if (response.status !== 200) {
                throw new Error('File delete failed');
            }

            return response.data;
        } catch (error: any) {
            if (error.response) {
                return error.response.data;
            } else {
                throw new Error('File delete failed');
            }
        }
    }
}

export default Settings;