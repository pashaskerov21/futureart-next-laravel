import { i18n } from "@/i18n-config";

type LocaleType = (typeof i18n)["locales"][number];

type BreadCrumbType = {
    id: number,
    title: string,
    url: string,
}

type ReduxRootStateType = {
    localeState: {
        admin: LocaleStateType[],
        site: LocaleStateType[]
    },
}

type LocaleStateType = {
    locale: LocaleType,
    slug: string,
}

export type {
    LocaleType,
    BreadCrumbType,
    ReduxRootStateType,
    LocaleStateType,
}