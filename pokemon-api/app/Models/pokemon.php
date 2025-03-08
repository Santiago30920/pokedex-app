<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class pokemon extends Model
{
    use HasFactory;
    protected $table = 'pokemon';
    protected $fillable = ['id', 'name', 'types', 'abilities', 'sprite_url'];
    public $timestamps = false;
}
