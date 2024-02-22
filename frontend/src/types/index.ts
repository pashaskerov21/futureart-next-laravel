import { i18n } from "@/i18n-config";
import { AdminUserDataType } from "./data";
import {
    LocaleStateType,
    RootStateType,
} from './redux'

type LocaleType = (typeof i18n)["locales"][number];
type BreadCrumbType = {
    id: number,
    title: string,
    url: string,
}

export type {
    LocaleType,
    LocaleStateType,
    RootStateType,
    BreadCrumbType,


    AdminUserDataType,
}