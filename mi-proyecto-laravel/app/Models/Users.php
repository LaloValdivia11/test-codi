<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Users extends Model
{
    use SoftDeletes;

    protected $table = 'Users';

    protected $primaryKey = 'id';

    protected $fillable = [
        'Name',
        'PaternalSurname',
        'MaternalSurname',
        'PhoneNumber',
        'Address',
        'Password',
        'email',
        'created_id',
        'deleted_id',
        'updated_id'
    ];
}
