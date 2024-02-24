import { LocaleType } from "@/src/types/general/type";
import axios from "axios";

class Menu {
    private baseURL = process.env.BASE_URL;
    private api = {
        all: `${this.baseURL}/api/site/menu/all`,
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
    public sort = async (data: number[]) => {
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
}

export default Menu