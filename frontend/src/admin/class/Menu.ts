import { MenuTranslateDataType } from "@/src/types/data/type";
import { LocaleType } from "@/src/types/general/type";
import axios from "axios";

class Menu {
    private baseURL = process.env.BASE_URL;
    private api = {
        all: `${this.baseURL}/api/site/menu/all`,
        active: `${this.baseURL}/api/site/menu/active`,
        update: `${this.baseURL}/api/site/menu/update`,
        sort: `${this.baseURL}/api/site/menu/sort`,
    }

    public all = async () => {
        try {
            const response = await axios.get(this.api.all, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            if (response.status !== 200) {
                throw new Error('Admin users data fetch Failed');
            }

            return response.data;
        } catch (error: any) {
            if (error.response) {
                return error.response.data;
            } else {
                throw new Error('Admin users data fetch Failed');
            }
        }
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
    public update = async (data: {
        id: number,
        translate: {
            lang: LocaleType[],
            title: string[],
        },
    }) => {
        try {
            const response = await axios.post(this.api.update, {
                data: data,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
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
    public sort = async (data: Array<{
        id: number,
        order: number
    }>) => {
        try {
            const response = await axios.post(this.api.sort, {
                data: data,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
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

    public getTranslate(id: number, activeLocale: LocaleType, key: "title", translateData: MenuTranslateDataType[],) {
        const activeTranslateData: MenuTranslateDataType | undefined = translateData.find((data) => data.menu_id === id && data.lang === activeLocale);
        let title = "";
        if (activeTranslateData) {
            switch (key) {
                case "title":
                    return activeTranslateData.title;
                default:
                    return activeTranslateData.title;
            }
        }
        return title;
    }
}

export default Menu