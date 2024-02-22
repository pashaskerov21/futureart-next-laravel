<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\LoginRequest;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json($user, 200);
        } else {
            return response()->json('error_login', 401);
        }
    }
    public function active(Request $request)
    {
        $this->validate($request, [
            'api_token' => 'required',
        ]);
        $user = User::where(['api_token' => $request['api_token']])->where('destroy', 0)->first();
        if ($user) {
            return response()->json($user, 200);
        } else {
            return response()->json('error_token', 401);
        }
    }
    public function all(Request $request)
    {
        $this->validate($request, [
            'api_token' => 'required',
        ]);
        $users = User::where('destroy', 0)->get();
        $user = User::where(['api_token' => $request['api_token']])->where('destroy', 0)->first();
        if ($user) {
            return response()->json($users, 200);
        } else {
            return response()->json('error_token', 401);
        }
    }
    public function update(UpdateRequest $request)
    {
        $user = User::find($request->id);

        if (!$user) {
            return response()->json('error_user', 401);
        }

        if (empty($request['current_password']) || !Hash::check($request['current_password'], $user->password)) {
            return response()->json('error_password', 401);
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'email_verified_at' => now(),
            'password' => Hash::make($request['new_password']),
        ]);

        return response()->json($user, 200);
    }
    public function store(StoreRequest $request)
    {
        $email_status = User::where(['email' => $request['email']])->first();
        if($email_status){
            return response()->json('email_exist');
        }
        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'email_verified_at' => now(),
            'password' => Hash::make($request['password']),
            'api_token' => Str::random(60),
        ]);
        return response()->json($user, 200);
    }
    public function delete(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        $user = User::findOrFail($request['id']);
        $user->update([
            'destroy' => 1,
        ]);
        return response()->json('delete_complete', 200);
    }
}
