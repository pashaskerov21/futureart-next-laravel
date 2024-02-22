import { Reducer } from "react"
import { UPDATE_ADMIN_LOCALE_SLUG, UPDATE_SITE_LOCALE_SLUG } from "../ActionTypes"
import { LocaleStateType } from "@/src/types"
import { i18n } from "@/i18n-config"

type InitialStateType = {
    admin: LocaleStateType[],
    site: LocaleStateType[],
}

const initialState: InitialStateType = {
    admin: i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: "",
        }
    }),
    site: i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: "",
        }
    })
}

const LocaleReducer: Reducer<InitialStateType, any> = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ADMIN_LOCALE_SLUG:
            return {
                ...state,
                admin: action.payload,
            }
        case UPDATE_SITE_LOCALE_SLUG:
            return {
                ...state,
                site: action.payload,
            }
        default:
            return state;
    }
}
export default LocaleReducer;