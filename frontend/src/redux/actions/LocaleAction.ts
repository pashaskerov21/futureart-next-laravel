import { LocaleStateType } from "@/src/types"
import { UPDATE_ADMIN_LOCALE_SLUG, UPDATE_SITE_LOCALE_SLUG } from "../ActionTypes"

const updateSiteLocaleSlug = (data: LocaleStateType[]) => {
    return {
        type: UPDATE_SITE_LOCALE_SLUG,
        payload: data,
    }
}
const updateAdminLocaleSlug = (data: LocaleStateType[]) => {
    return {
        type: UPDATE_ADMIN_LOCALE_SLUG,
        payload: data,
    }
}

export {
    updateAdminLocaleSlug,
    updateSiteLocaleSlug,
}