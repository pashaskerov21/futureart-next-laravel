import axios from "axios";

class User {
    private baseURL = process.env.BASE_URL;
    private api = {
        login: `${this.baseURL}/api/admin/users/login`,
        all: `${this.baseURL}/api/admin/users`,
        active: `${this.baseURL}/api/admin/users/active`,
        edit: `${this.baseURL}/api/admin/users/edit`,
        add: `${this.baseURL}/api/admin/users/add`,
        delete: `${this.baseURL}/api/admin/users/delete`,
    };

    public login = async (email: string, password: string) => {
        try {
            const response = await axios.post(this.api.login, {
                email: email,
                password: password,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            if (response.status !== 200) {
                throw new Error('Failed to login');
            }

            return response.data;
        } catch (error: any) {
            if (error.response) {
                return error.response.data;
            } else {
                throw new Error('Admin user data login Failed');
            }
        }
    }
    public all = async (token: string) => {
        try {
            const response = await axios.post(this.api.all, {
                api_token: token
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
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
    public active = async (token: string) => {
        try {
            const response = await axios.post(this.api.active, {
                api_token: token
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
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
    public edit = async (data: {
        id: number,
        name: string,
        email: string,
        current_password: string,
        new_password: string,
    }) => {
        try {
            const response = await axios.post(this.api.edit, {
                id: data.id,
                name: data.name,
                email: data.email,
                current_password: data.current_password,
                new_password: data.new_password,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            if (response.status !== 200) {
                throw new Error('Failed to login');
            }

            return response.data;
        } catch (error: any) {
            if (error.response) {
                return error.response.data
            } else {
                throw new Error('User Edit Failed');
            }
        }
    }
    public add = async (data: {
        name: string,
        email: string,
        password: string,
    }) => {
        try {
            const response = await axios.post(this.api.add, {
                name: data.name,
                email: data.email,
                password: data.password,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            if (response.status !== 200) {
                throw new Error('Failed to login');
            }

            return response.data;
        } catch (error: any) {
            if (error.response) {
                return error.response.data
            } else {
                throw new Error('User Add Failed');
            }
        }
    }
    public delete = async (id: number) => {
        try {
            const response = await axios.post(this.api.delete, {
                id: id,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            if (response.status !== 200) {
                throw new Error('Failed to login');
            }

            return response.data;
        } catch (error: any) {
            if (error.response) {
                return error.response.data
            } else {
                throw new Error('User Delete Failed');
            }
        }
    }
}

export default User;