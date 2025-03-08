<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class type extends Model
{
    protected $table = 'type';
    protected $fillable = ['id', 'name'];
    public $timestamps = false;
}
