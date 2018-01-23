<?php

namespace Pedidos\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class MovimentoCaixa extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'movimento_caixa';

    protected $fillable = [
        'tipo_movimento',
        'valor',
        'usuario'
    ];

    public function caixa()
    {
        return $this->belongsTo(Caixa::class);
    }
}
