<?php

namespace Pedidos\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Order extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'client_id',
        'user_deliveryman_id',
        'total',
        'paid_now',
        'status',
        'type',
        'cupom_id',
        'troco',
        'cartao',
        'observacao',
        'link_printer',
        'user_create',
        'user_update',
        'motivo_cancelamento',
        'printer'
    ];

    public function items(){
        return $this->hasMany(OrderItem::class);
    }

    public function deliveryman(){
        return $this->belongsTo(User::class,'user_deliveryman_id','id');
    }

    public function companyApplication(){
        return $this->belongsTo(CompanyApplication::class,'company_application_id','id');
    }

    public function client(){
        return $this->belongsTo(Client::class);
    }

    public function mesa(){
        return $this->belongsTo(Mesa::class);
    }

    public function cupom(){
        return $this->belongsTo(Cupom::class);
    }

    public function paymentOrders(){
        return $this->hasMany(PaymentOrders::class);
    }
}
