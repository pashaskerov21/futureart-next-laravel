<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuTranslate;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    public function all()
    {
        $main = Menu::where('destroy', 0)->orderBy('order')->get();
        $translate = MenuTranslate::all();
        $data = ["main" => $main, "translate" => $translate];
        return response()->json($data, 200);
    }
    public function active(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        $menu = Menu::where('id', $request['id'])->first();
        if ($menu) {
            $translate = MenuTranslate::where('menu_id', $menu->id)->get();
            $data = ["main" => $menu, "translate" => $translate];
            return response()->json($data, 200);
        } else {
            return response()->json('invalid_id', 400);
        }
    }
    public function update(Request $request)
    {
        $this->validate($request, [
            'data.id' => 'required',
        ]);
        $menu = Menu::where("id", $request["data.id"])->first();
        $translate_data = $request["data.translate"];
        if ($menu) {
            for ($i = 0; $i < count($translate_data["lang"]); $i++) {
                MenuTranslate::where("menu_id", $menu->id)->where("lang", $translate_data['lang'][$i])->update([
                    "title" => $translate_data["title"][$i],
                ]);
            }
            return response()->json("update_success", 200);
        } else {
            return response()->json('invalid_id', 400);
        }
    }
    public function sort(Request $request)
    {
        $menuOrders = $request['data'];
        try {
            DB::beginTransaction();

            foreach ($menuOrders as $menuOrder) {
                $menuId = $menuOrder['id'];
                $newOrder = $menuOrder['order'];

                $menu = Menu::findOrFail($menuId);
                $menu->order = $newOrder;
                $menu->save();
            }

            DB::commit();

            return response()->json('success', 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json($e->getMessage(), 500);
        }
    }
}
