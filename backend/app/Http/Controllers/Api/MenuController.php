<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuTranslate;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function all()
    {
        $main = Menu::where('destroy', 0)->orderBy('order')->get();
        $translate = MenuTranslate::all();
        $data = ["main" => $main, "translate" => $translate];
        return response()->json($data, 200);
    }
    public function update(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        $menu = Menu::where("id", $request["id"])->first();
        $translate_data = $request["translate"];
        if ($menu) {
            for ($i = 0; $i < count($translate_data["lang"]); $i++) {
                MenuTranslate::where("menu_id", $menu->id)->where("lang", $translate_data['lang'][$i])->update([
                    "title" => $translate_data["title"],
                ]);
            }
            return response()->json("update_success", 200);
        } else {
            return response()->json('invalid_id', 400);
        }
    }
    public function sort()
    {

    }
}
