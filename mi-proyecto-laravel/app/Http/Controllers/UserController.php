<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function registerUser(Request $request){
        try{
            $status = 200;
            $message = "successfully registered user";
            $response = true;
    
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'paternalSurname' => 'required|string|max:255',
                'maternalSurname' => 'required|string|max:255',
                'phoneNumber' => 'required|string|max:20',
                'address' => 'required|string|max:255',
                'password' => 'required|string|min:8|confirmed', 
                'email' => 'required|string|email|max:255|unique:users',
            ]);
    
            $name = $validatedData['name'];
            $paternalSurname = $validatedData['paternalSurname'];
            $maternalSurname = $validatedData['maternalSurname'];
            $phoneNumber = $validatedData['phoneNumber'];
            $address = $validatedData['address'];
            $password = $validatedData['password'];
            $email  = $validatedData['email'];
            
            $registerUser = new Users;
            $registerUser->Name =  $name;
            $registerUser->PaternalSurname = $paternalSurname;
            $registerUser->MaternalSurname  = $maternalSurname;
            $registerUser->PhoneNumber = $phoneNumber;       
            $registerUser->Address = $address;
            $registerUser->Password = Hash::make($password); 
            $registerUser->Email = $email;
            $registerUser->save();
    
            return response()->json([
                'message' => $message,
                'status' => $status,
                'response' => $response,
                'data' => $registerUser
            ]);
    
        } catch(\Exception $e) {
            return response()->json([
                'message' => 'error on ' . $e->getMessage(),
                'status' => 403,
                'response' => false
            ]);
        }
    }
    

    public function editUser($id, Request $request){
        try{
            $status = 200;
            $message = 'successfully updated user';
            $response = true;

            $updated_id = $request->get('updated_id');

            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'paternalSurname' => 'required|string|max:255',
                'maternalSurname' => 'required|string|max:255',
                'phoneNumber' => 'required|string|max:20',
                'address' => 'required|string|max:255',
                'password' => 'required|string|min:8|confirmed', 
                'email' => 'required|string|email|max:255|unique:users',
            ]);

            $name = $validatedData['name'];
            $paternalSurname = $validatedData['paternalSurname'];
            $maternalSurname = $validatedData['maternalSurname'];
            $phoneNumber = $validatedData['phoneNumber'];
            $address = $validatedData['address'];
            $password = $validatedData['password'];
            $email  = $validatedData['email'];

            $updateUser = Users::where('id', $id)->first();


            $updateUser->Name = $name;
            $updateUser->PaternalSurname = $paternalSurname;
            $updateUser->MaternalSurname  = $maternalSurname;
            $updateUser->PhoneNumber = $phoneNumber;
            $updateUser->Address =  $address;
            $updateUser->Password =Hash::make($password);
            $updateUser->Email =  $email;
            $updateUser->update();

            return response()->json([
                'message' => $message,
                'status' => $status,
                'response' => $response,
                'data' => $updateUser
            ]);

        }catch(\Exception $e){
            return response()->json([
                'message' => 'error on register user ' . $e,
                'status' => 403,
                'response' => false
            ]);
        }
    }

    public function deleteUser($id){
        try{
            $status = 200;
            $message = 'successfully deleted user';
            $response = true;

            $deleteUser = Users::where('id', $id)->first();
            $deleteUser->delete();

            return response()->json([
                'message' => $message,
                'status' => $status,
                'response' => $response
            ]);
        }
        catch(\Exception $e){
            return response()->json([
                'message' => 'error on delete user ' . $e,
                'status' => 403,
                'response' => false
            ]);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (! $token = $this->attemptLogin($credentials)) {
            return response()->json(['error' => 'Unauthorizedd'], 401);
        }

        return response()->json(['status' => 200, 'token' => $token]);
    }

    protected function attemptLogin(array $credentials)
    {
      
        $user = Users::where('Email', $credentials['email'])->first();
        
        
        if (!$user || !Hash::check($credentials['password'], $user->Password)) {
            return false;
        }

        return $this->generateToken($user);
    }

    protected function generateToken(Users $user)
    {
        $payload = [
            'id' => $user->id,
            'email' => $user->email,
            'exp' => strtotime('+1 week')
        ];
        
        $jwt_secret = env('JWT_SECRET'); 

        return JWT::encode($payload, "dddddjdj", 'HS256');
    }

    public function allUser(){
        try{
            $status = 200;
            $message = 'successfully get users';
            $response = true;

            $users = Users::select('id','Name', 'Email')->get();

            if(!empty($users)){
                return response()->json([
                    'message' => $message,
                    'status' => $status,
                    'response' => $response,
                    'data'     => $users
                ]);
            }

            return response()->json([
                'message' => 'Empty data',
                'status' => 200,
                'response' => $response
            ]);


        }
        catch(\Exception $e){
            return response()->json([
                'message' => 'error on get users ' . $e,
                'status' => 403,
                'response' => false
            ]);
        }
    }
}


