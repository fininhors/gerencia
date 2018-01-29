<?php

namespace Pedidos\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Pedidos\Repositories\AuditRepository;
use Pedidos\Models\Audit;
use Pedidos\Validators\AuditValidator;

/**
 * Class AuditRepositoryEloquent
 * @package namespace Pedidos\Repositories;
 */
class AuditRepositoryEloquent extends BaseRepository implements AuditRepository
{
    protected $skipPresenter = true;
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Audit::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function presenter()
    {
        return \Pedidos\Presenters\AuditPresenter::class; // TODO: Change the autogenerated stub
    }
}
