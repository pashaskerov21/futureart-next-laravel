'use client'
import React from 'react'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import Swal from 'sweetalert2'
import { User } from '../../class'
import { LocaleType } from '@/src/types/general/type'
import { AdminUserDataType } from '@/src/types/data/type'

type FormProps = {
    activeLocale: LocaleType,
    adminDictionary: { [key: string]: string },
    adminUsers: AdminUserDataType[],
}

type UserAddFormType = {
    name: string,
    email: string,
    password: string,
    password_confirm: string,
}

const UserAddForm: React.FC<FormProps> = ({
    activeLocale,
    adminDictionary,
    adminUsers,
}) => {
    const router = useRouter();
    const user = new User();
    const initialValues: UserAddFormType = {
        name: '',
        email: '',
        password: '',
        password_confirm: '',
    }
    const validationSchema = Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
        password_confirm: Yup.string().oneOf([Yup.ref('password')]).required(),
    });

    const onSubmit = async (values: UserAddFormType, actions: FormikHelpers<UserAddFormType>) => {
        const emailStatus: AdminUserDataType | undefined = adminUsers.find((data) => data.email === values.email);
        if (emailStatus) {
            Swal.fire({
                icon: "warning",
                title: adminDictionary["attention"],
                text: adminDictionary["email_exist"],
            });
        } else {
            const data: {
                name: string,
                email: string,
                password: string,
            } = {
                name: values.name,
                email: values.email,
                password: values.password_confirm,
            }
            const response: AdminUserDataType | 'email_exist' = await user.add(data);
            if (response === 'email_exist') {
                Swal.fire({
                    icon: "warning",
                    title: adminDictionary["attention"],
                    text: adminDictionary["email_exist"],
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: adminDictionary["congratulations"],
                    text: adminDictionary["add_message"],
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.back();
                    }
                });
            }
        }
    }
    return (
        <div className="card">
            <div className="card-body">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {
                        formik => (
                            <Form>
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">{adminDictionary['name']} *</label>
                                            <Field
                                                type="text"
                                                name="name"
                                                id="name"
                                                className={`form-control ${formik.errors['name'] && formik.touched['name'] ? 'is-invalid' : ''}`}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="emailaddress" className="form-label">{adminDictionary['email']} *</label>
                                            <Field
                                                type="email"
                                                name="email"
                                                id="emailaddress"
                                                className={`form-control ${formik.errors['email'] && formik.touched['email'] ? 'is-invalid' : ''}`}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">{adminDictionary['password']} *</label>
                                            <Field
                                                type="password"
                                                name="password"
                                                id="password"
                                                className={`form-control ${formik.errors['password'] && formik.touched['password'] ? 'is-invalid' : ''}`}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password_confirm" className="form-label">{adminDictionary['password_confirm']} *</label>
                                            <Field
                                                type="password"
                                                name="password_confirm"
                                                id="password_confirm"
                                                className={`form-control ${formik.errors['password_confirm'] && formik.touched['password_confirm'] ? 'is-invalid' : ''}`}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-3 mb-0">
                                            <button className="btn btn-primary" type="submit"> {adminDictionary['save']} </button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default React.memo(UserAddForm)
