<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class abilities extends Model
{
    protected $table = 'abilities';
    protected $fillable = ['id', 'name', 'description'];
    public $timestamps = false;
}
