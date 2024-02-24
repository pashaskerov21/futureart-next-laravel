'use client'
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSessionStorage } from 'usehooks-ts';
import { User } from '../../class';
import { LocaleType } from '@/src/types/general/type';
import { AdminUserDataType } from '@/src/types/data/type';


type FormProps = {
    activeLocale: LocaleType,
    adminDictionary: { [key: string]: string },
}
type LoginFormValueType = {
    email: string,
    password: string,
}
const UserLoginForm: React.FC<FormProps> = ({ activeLocale, adminDictionary }) => {
    const router = useRouter();
    const user = new User();
    const [apiToken, setApiToken] = useSessionStorage<string | null>('token', null);
    const [passwordShow, setPasswordShow] = useState<boolean>(false);
    const handlePasswordShow = () => {
        setPasswordShow(!passwordShow);
    };

    const initialValues: LoginFormValueType = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    });

    const onSubmit = async (values: LoginFormValueType, actions: FormikHelpers<LoginFormValueType>) => {
        const response: AdminUserDataType | 'error_login' = await user.login(values.email, values.password);
        if (response === 'error_login') {
            Swal.fire({
                icon: "error",
                title: adminDictionary["error"],
                text: adminDictionary["login_error"],
            });
        } else {
            actions.resetForm();
            router.push(`/${activeLocale}/admin/dashboard`);
            setApiToken(response.api_token)
        }
    }
    return (
        <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xxl-4 col-lg-5">
                        <div className="card">


                            <div className="card-header py-4 text-center bg-primary">
                                <h2 style={{ color: '#fff' }}>Admin Panel</h2>
                            </div>

                            <div className="card-body p-4">

                                <div className="text-center w-75 m-auto">
                                    <h4 className="text-dark-50 text-center pb-0 fw-bold">Sign In</h4>
                                    <p className="text-muted mb-4">Enter your email address and password to access admin panel.</p>
                                </div>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {
                                        formik => (
                                            <Form>
                                                <div className="mb-3">
                                                    <label htmlFor="emailaddress" className="form-label">Email address</label>
                                                    <Field type="email" name="email" className={`form-control ${formik.errors['email'] && formik.touched['email'] ? 'is-invalid' : ''}`} id="emailaddress" placeholder="Enter your email" />
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                    <div className="input-group input-group-merge">
                                                        <Field type={passwordShow ? 'text' : 'password'} name="password" id="password" className={`form-control ${formik.errors['password'] && formik.touched['password'] ? 'is-invalid' : ''}`} placeholder="Enter your password" />                                                        <div className="input-group-text" onClick={handlePasswordShow}>
                                                            {passwordShow ? <FaEyeSlash /> : <FaEye />}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-3 mb-0 text-center">
                                                    <button className="btn btn-primary" type="submit"> Log In </button>
                                                </div>
                                            </Form>
                                        )
                                    }
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(UserLoginForm)
