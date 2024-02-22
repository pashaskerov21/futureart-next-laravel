import { LocaleType } from ".."

type RootStateType = {
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
    RootStateType,
    LocaleStateType,
}

