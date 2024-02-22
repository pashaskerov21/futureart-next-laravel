<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSettings extends Model
{
    use HasFactory;
    protected $fillable = [
        "logo",
        "logo_white",
        "favicon",
        "mail",
        "phone",
        "hot_line",
        "facebook",
        "linkedin",
        "twitter",
        "instagram",
        "youtube",
        "author_url",
        "pdf"
    ];
}
