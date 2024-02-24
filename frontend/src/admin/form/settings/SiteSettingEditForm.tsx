'use client'
import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { Settings } from '../../class'
import { SiteSettingDataType, SiteSettingTranslateDataType } from '@/src/types/data/type'
import { SettingFileDataKeyType, SettingFileDataType, SettingMainDataKeyType, SettingMainDataType, SettingTranslateDataKeyType, SettingTranslateDataType } from '@/src/types/form/type'
import { LocaleType } from '@/src/types/general/type'
import { FaTrash } from 'react-icons/fa'
import { FaFilePdf } from "react-icons/fa6";

type FormProps = {
  activeLocale: LocaleType,
  adminDictionary: { [key: string]: string },
  settingsData: SiteSettingDataType,
  settingsTranslateData: SiteSettingTranslateDataType[],
}

const SiteSettingEditForm: React.FC<FormProps> = ({
  activeLocale,
  adminDictionary,
  settingsData,
  settingsTranslateData,
}) => {
  const router = useRouter();
  const setting = new Settings();
  const imageExtension = "image/png, image/jpeg, image/svg, image/webp";
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);
  const baseURL = process.env.BASE_URL;


  const [fileData, setFileData] = useState<SettingFileDataType>({
    logo: undefined,
    logo_white: undefined,
    favicon: undefined,
    pdf: undefined,
  });
  const [mainData, setMainData] = useState<SettingMainDataType>({
    mail: settingsData.mail ?? '',
    phone: settingsData.phone ?? '',
    hot_line: settingsData.hot_line ?? '',
    facebook: settingsData.facebook ?? '',
    linkedin: settingsData.linkedin ?? '',
    twitter: settingsData.twitter ?? '',
    instagram: settingsData.instagram ?? '',
    youtube: settingsData.youtube ?? '',
    author_url: settingsData.author_url ?? '',
  });
  const [translateData, setTranslateData] = useState<SettingTranslateDataType>({
    lang: settingsTranslateData.map((data) => data.lang),
    title: settingsTranslateData.map((data) => data.title ?? ''),
    description: settingsTranslateData.map((data) => data.description ?? ''),
    author: settingsTranslateData.map((data) => data.author ?? ''),
    keywords: settingsTranslateData.map((data) => data.keywords ?? ''),
    copyright: settingsTranslateData.map((data) => data.copyright ?? ''),
  });

  const handleChangeFileData = useCallback((event: React.ChangeEvent<HTMLInputElement>, key: SettingFileDataKeyType) => {
    const file = event.currentTarget.files?.[0];
    setFileData((prev) => {
      return {
        ...prev,
        [key]: file,
      }
    })
  }, [setFileData]);

  const handleChangeMainData = useCallback((event: React.ChangeEvent<HTMLInputElement>, key: SettingMainDataKeyType) => {
    const value = event.target.value;
    setMainData((prev) => {
      return {
        ...prev,
        [key]: value
      }
    })
  }, [setMainData]);

  const handleChangeTranslateData = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: SettingTranslateDataKeyType, activeIndex: number) => {
    const value = event.target.value;
    setTranslateData(prev => ({
      ...prev,
      [key]: prev[key].map((item, index) => index === activeIndex ? value : item)
    }));
  }, [setTranslateData]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: {
      file: SettingFileDataType,
      main: SettingMainDataType,
      translate: SettingTranslateDataType,
    } = {
      file: fileData ?? {},
      main: mainData,
      translate: translateData,
    };

    const response = await setting.update(data);

    if (response === 'update_success') {
      setButtonDisable(true);
      Swal.fire({
        icon: "success",
        title: adminDictionary["congratulations"],
        text: adminDictionary["save_message"],
      }).then((result) => {
        if (result.isConfirmed) {
          router.refresh();
        }
      });
    }
  };

  const handleDeleteFile = async (key: SettingFileDataKeyType) => {
    Swal.fire({
      icon: "warning",
      title: adminDictionary["attention"],
      text: adminDictionary["delete_warning"],
      showDenyButton: true,
      showCancelButton: false,
      showCloseButton: true,
      confirmButtonText: adminDictionary["yes"],
      denyButtonText: adminDictionary["no"],
      cancelButtonText: adminDictionary["cancel"]
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await setting.deleteFile(key);
        if (response === 'file_delete_success') {
          Swal.fire({
            icon: "success",
            title: adminDictionary["congratulations"],
            text: adminDictionary["delete_message"],
          }).then((result) => {
            if (result.isConfirmed) {
              router.refresh();
            }
          });
        }
      }
    });
  }

  return (
    <div className='card'>
      <div className="card-body">
        <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => onSubmit(event)} encType="multipart/form-data">
          <div className="row">
            <div className="col-12 col-lg-6">
              <ul className="nav nav-pills bg-nav-pills nav-justified mb-3">
                {
                  settingsTranslateData.map((data, index) => (
                    <li className="nav-item" key={data.lang}>
                      <a href={`#tab_${data.lang}`} data-bs-toggle="tab" className={`nav-link rounded-0 ${index === 0 ? 'active' : ''}`}>
                        <span>{data.lang}</span>
                      </a>
                    </li>
                  ))
                }
              </ul>
              <div className="tab-content">
                {
                  settingsTranslateData.map((data, index) => (
                    <div key={index} className={`tab-pane show ${index === 0 ? 'active' : ''}`} id={`tab_${data.lang}`}>
                      <div className="mb-3">
                        <label htmlFor={`title_${index}`} className="form-label">Title {data.lang}</label>
                        <input
                          id={`title_${index}`}
                          type="text"
                          className='form-control'
                          value={translateData.title[index]}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeTranslateData(event, "title", index)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor={`author_${index}`} className="form-label">Author {data.lang}</label>
                        <input
                          id={`author_${index}`}
                          type="text"
                          className='form-control'
                          value={translateData.author[index]}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeTranslateData(event, "author", index)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor={`copyright_${index}`} className="form-label">Copyright {data.lang}</label>
                        <input
                          id={`copyright_${index}`}
                          type="text"
                          className='form-control'
                          value={translateData.copyright[index]}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeTranslateData(event, "copyright", index)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor={`description_${index}`} className="form-label">Description {data.lang}</label>
                        <textarea
                          id={`description_${index}`}
                          className='form-control'
                          defaultValue={translateData.description[index]}
                          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleChangeTranslateData(event, "description", index)}
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor={`keywords_${index}`} className="form-label">Keywords {data.lang}</label>
                        <textarea
                          id={`keywords_${index}`}
                          className='form-control'
                          defaultValue={translateData.keywords[index]}
                          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleChangeTranslateData(event, "keywords", index)}
                        ></textarea>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="mb-3">
                <label htmlFor='logo' className="form-label">Logo</label>
                <input
                  id='logo'
                  type="file"
                  className='form-control'
                  accept={imageExtension}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFileData(event, "logo")}
                />
              </div>
              {
                settingsData.logo && (
                  <div className='row border my-3 py-2 w-100 mx-auto'>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <Image src={baseURL + settingsData.logo} width={100} height={100} alt='' className='image_value' />
                    </div>
                    <div className="col-6 d-flex justify-content-end align-items-center">
                      <button type='button' className='btn btn-danger' onClick={() => handleDeleteFile('logo')}><FaTrash /></button>
                    </div>
                  </div>
                )
              }
              <div className="mb-3">
                <label htmlFor='logo_white' className="form-label">Logo white</label>
                <input
                  id='logo_white'
                  type="file"
                  className='form-control'
                  accept={imageExtension}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFileData(event, "logo_white")}
                />
              </div>
              {
                settingsData.logo_white && (
                  <div className='row border my-3 py-2 w-100 mx-auto'>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <Image src={baseURL + settingsData.logo_white} width={100} height={100} alt='' className='image_value' />
                    </div>
                    <div className="col-6 d-flex justify-content-end align-items-center">
                      <button type='button' className='btn btn-danger' onClick={() => handleDeleteFile('logo_white')}><FaTrash /></button>
                    </div>
                  </div>
                )
              }
              <div className="mb-3">
                <label htmlFor='favicon' className="form-label">Favicon</label>
                <input
                  id='favicon'
                  type="file"
                  className='form-control'
                  accept={imageExtension}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFileData(event, "favicon")}
                />
              </div>
              {
                settingsData.favicon && (
                  <div className='row border my-3 py-2 w-100 mx-auto'>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <Image src={baseURL + settingsData.favicon} width={100} height={100} alt='' className='image_value' />
                    </div>
                    <div className="col-6 d-flex justify-content-end align-items-center">
                      <button type='button' className='btn btn-danger' onClick={() => handleDeleteFile('favicon')}><FaTrash /></button>
                    </div>
                  </div>
                )
              }
              <div className="mb-3">
                <label htmlFor='pdf' className="form-label">Pdf</label>
                <input
                  id='pdf'
                  type="file"
                  className='form-control'
                  accept="application/pdf"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeFileData(event, "pdf")}
                />
              </div>
              {
                settingsData.pdf && (
                  <div className='row border my-3 py-2 w-100 mx-auto'>
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <Link href={baseURL + settingsData.pdf} className='btn btn-primary btn-lg' style={{ fontSize: '22px' }} target='_blank'>
                        <FaFilePdf />
                      </Link>
                    </div>
                    <div className="col-6 d-flex justify-content-end align-items-center">
                      <button type='button' className='btn btn-danger' onClick={() => handleDeleteFile('pdf')}><FaTrash /></button>
                    </div>
                  </div>
                )
              }
              <div className="mb-3">
                <label htmlFor='email' className="form-label">Email</label>
                <input
                  id='email'
                  type="email"
                  className='form-control'
                  value={mainData.mail}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeMainData(event, "mail")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor='phone' className="form-label">Phone</label>
                <input
                  id='phone'
                  type="text"
                  className='form-control'
                  value={mainData.phone}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeMainData(event, "phone")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor='hot_line' className="form-label">Hot line</label>
                <input
                  id='hot_line'
                  type="text"
                  className='form-control'
                  value={mainData.hot_line}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeMainData(event, "hot_line")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor='facebook' className="form-label">Facebook url</label>
                <input
                  id='facebook'
                  type="text"
                  className='form-control'
                  value={mainData.facebook}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeMainData(event, "facebook")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor='linkedin' className="form-label">Linkedin url</label>
                <input
                  id='linkedin'
                  type="text"
                  className='form-control'
                  value={mainData.linkedin}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeMainData(event, "linkedin")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor='twitter' className="form-label">Twitter url</label>
                <input
                  id='twitter'
                  type="text"
                  className='form-control'
                  value={mainData.twitter}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeMainData(event, "twitter")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor='instagram' className="form-label">Instagram url</label>
                <input
                  id='instagram'
                  type="text"
                  className='form-control'
                  value={mainData.instagram}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeMainData(event, "instagram")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor='youtube' className="form-label">Youtube url</label>
                <input
                  id='youtube'
                  type="text"
                  className='form-control'
                  value={mainData.youtube}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeMainData(event, "youtube")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor='author_url' className="form-label">Author url</label>
                <input
                  id='author_url'
                  type="text"
                  className='form-control'
                  value={mainData.author_url}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeMainData(event, "author_url")}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3 mb-0">
                <button disabled={buttonDisable} className="btn btn-primary" type="submit"> {adminDictionary['save']} </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default React.memo(SiteSettingEditForm)