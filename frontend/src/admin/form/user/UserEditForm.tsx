'use client'
import React from 'react'
import * as Yup from 'yup'
import { AdminUserDataType, LocaleType } from '@/src/types'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { User } from '../../class'


type FormProps = {
    activeLocale: LocaleType,
    adminDictionary: { [key: string]: string },
    userData: AdminUserDataType,
}

type UserEditFormType = {
    name: string,
    email: string,
    current_password: string,
    new_password: string,
}

const UserEditForm: React.FC<FormProps> = ({
    activeLocale,
    adminDictionary,
    userData,
}) => {
    const router = useRouter();
    const user = new User();
    const initialValues: UserEditFormType = {
        name: userData.name,
        email: userData.email,
        current_password: '',
        new_password: '',
    }
    const validationSchema = Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        current_password: Yup.string().required(),
        new_password: Yup.string(),
    })
    const onSubmit = async (values: UserEditFormType, actions: FormikHelpers<UserEditFormType>) => {
        const data: {
            id: number,
            name: string,
            email: string,
            current_password: string,
            new_password: string,
        } = {
            id: userData.id,
            name: values.name,
            email: values.email,
            current_password: values.current_password,
            new_password: values.new_password && values.new_password !== '' ? values.new_password : values.current_password,
        }
        const response: AdminUserDataType | 'error_user' | 'error_password' = await user.edit(data);
        if (response === 'error_user') {
            router.push(`/${activeLocale}/admin/login`);
        } else if (response === 'error_password') {
            Swal.fire({
                icon: "error",
                title: adminDictionary["error"],
                text: adminDictionary["incorrect_password"],
            });
        } else {
            Swal.fire({
                icon: "success",
                title: adminDictionary["congratulations"],
                text: adminDictionary["save_message"],
            }).then((result) => {
                if (result.isConfirmed) {
                    if (values.new_password && values.new_password !== '') {
                        router.push(`/${activeLocale}/admin/login`);
                    } else {
                        router.back();
                    }
                }
            });
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
                                            <label htmlFor="current_password" className="form-label">{adminDictionary['current_password']} *</label>
                                            <Field
                                                type="password"
                                                name="current_password"
                                                id="current_password"
                                                className={`form-control ${formik.errors['current_password'] && formik.touched['current_password'] ? 'is-invalid' : ''}`}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="new_password" className="form-label">{adminDictionary['new_password']}</label>
                                            <Field
                                                type="password"
                                                name="new_password"
                                                id="new_password"
                                                className={`form-control ${formik.errors['new_password'] && formik.touched['new_password'] ? 'is-invalid' : ''}`}
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

export default React.memo(UserEditForm)
