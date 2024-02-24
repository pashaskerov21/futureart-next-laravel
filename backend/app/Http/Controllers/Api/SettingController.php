<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Setting\UpdateRequest;
use App\Models\SiteSettings;
use App\Models\SiteSettingTranslate;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function active(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);

        $settings = SiteSettings::where(['id' => $request['id']])->first();
        $settingTranslate = SiteSettingTranslate::where(['setting_id' => $request['id']])->get();

        $data = ['main' => $settings, 'translate' => $settingTranslate];
        return response()->json($data, 200);
    }
    public function update(UpdateRequest $request)
    {

        $settings = SiteSettings::where('id', 1)->first();
        $file_data = $request["data"]["file"] ?? null;
        $main_data = $request["data"]["main"];
        $translate_data = $request["data"]["translate"];

        $file_dir = '/storage/uploads/settings/';

        if (isset($file_data['logo']) && $request->hasFile('data.file.logo')) {
            $file = $file_data["logo"];
            if ($file->isValid()) {
                $logo = time() . $file->getClientOriginalName();
                $file->storeAs('public/uploads/settings', $logo);
    
                $logo_url = $file_dir . $logo;
    
                $settings->update([
                    "logo" => $logo_url,
                ]);
            } else {
                return response()->json('invalid_file_type', 400);
            }
        }

        if (isset($file_data['logo_white']) && $request->hasFile('data.file.logo_white')) {
            $file = $file_data["logo_white"];
            if ($file->isValid()) {
                $logo_white = time() . $file->getClientOriginalName();
                $file->storeAs('public/uploads/settings', $logo_white);

                $logo_white_url = $file_dir . $logo_white;

                $settings->update([
                    "logo_white" => $logo_white_url,
                ]);
            } else {
                return response()->json('invalid_file_type', 400);
            }
            
        }
        if (isset($file_data['favicon']) && $request->hasFile('data.file.favicon')) {
            $file = $file_data["favicon"];
            if ($file->isValid()) {
                $favicon = time() . $file->getClientOriginalName();
                $file->storeAs('public/uploads/settings', $favicon);

                $favicon_url = $file_dir . $favicon;

                $settings->update([
                    "favicon" => $favicon_url,
                ]);
            } else {
                return response()->json('invalid_file_type', 400);
            }
            
        }

        if (isset($file_data['pdf']) && $request->hasFile('data.file.pdf')) {
            $file = $file_data["pdf"];
            if ($file->isValid()) {
                $pdf = time() . $file->getClientOriginalName();
                $file->storeAs('public/uploads/settings', $pdf);

                $pdf_url = $file_dir . $pdf;

                $settings->update([
                    "pdf" => $pdf_url,
                ]);
            } else {
                return response()->json('invalid_file_type', 400);
            }
            
        }

        $settings->update([
            "mail" => $main_data["mail"],
            "phone" => $main_data["phone"],
            "hot_line" => $main_data["hot_line"],
            "facebook" => $main_data["facebook"],
            "linkedin" => $main_data["linkedin"],
            "twitter" => $main_data["twitter"],
            "instagram" => $main_data["instagram"],
            "youtube" => $main_data["youtube"],
            "author_url" => $main_data["author_url"],
        ]);
        for ($i = 0; $i < count($translate_data["lang"]); $i++) {
            SiteSettingTranslate::where("setting_id", 1)->where("lang", $translate_data['lang'][$i])->update([
                "title" => $translate_data["title"][$i],
                "description" => $translate_data["description"][$i],
                "author" => $translate_data["author"][$i],
                "keywords" => $translate_data["keywords"][$i],
                "copyright" => $translate_data["copyright"][$i],
            ]);
        };

        return response()->json('update_success', 200);
    }
    public function deleteFile(Request $request)
    {
        $key = $request['key'];

        $updateData = [
            'logo' => null,
            'logo_white' => null,
            'favicon' => null,
            'pdf' => null,
        ];

        if (array_key_exists($key, $updateData)) {
            SiteSettings::where('id', 1)->update([$key => $updateData[$key]]);
            return response()->json('file_delete_success', 200);
        } else {
            return response()->json('invalid_key.', 400);
        }
    }
}
