import { LocaleType } from "../general/type";

// setting
type SettingFileDataKeyType = "logo" | "logo_white" | "favicon" | "pdf";
type SettingMainDataKeyType = "mail" | "phone" | "hot_line" | "facebook" | "linkedin" | "twitter" | "instagram" | "youtube" | "author_url";
type SettingTranslateDataKeyType = "lang" | "title" | "description" | "author" | "keywords" | "copyright";
type SettingFileDataType = {
    logo?: File,
    logo_white?: File,
    favicon?: File,
    pdf?: File,
}
type SettingMainDataType = {
    mail: string,
    phone: string,
    hot_line: string,
    facebook: string,
    linkedin: string,
    twitter: string,
    instagram: string,
    youtube: string,
    author_url: string,
}
type SettingTranslateDataType = {
    lang: LocaleType[],
    title: string[],
    description: string[],
    author: string[],
    keywords: string[],
    copyright: string[],
}

export type {
    SettingFileDataKeyType,
    SettingMainDataKeyType,
    SettingTranslateDataKeyType,
    SettingFileDataType,
    SettingMainDataType,
    SettingTranslateDataType,
}