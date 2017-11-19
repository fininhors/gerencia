<?php

namespace Pedidos\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            'Pedidos\Repositories\CategoryRepository',
            'Pedidos\Repositories\CategoryRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\ClientRepository',
            'Pedidos\Repositories\ClientRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\OrderItemRepository',
            'Pedidos\Repositories\OrderItemRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\OrderRepository',
            'Pedidos\Repositories\OrderRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\ProductRepository',
            'Pedidos\Repositories\ProductRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\UserRepository',
            'Pedidos\Repositories\UserRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\CupomRepository',
            'Pedidos\Repositories\CupomRepositoryEloquent'
        );
        $this->app->bind(
            'Pedidos\Repositories\SubgroupRepository',
            'Pedidos\Repositories\SubgroupRepositoryEloquent'
        );
    }
}

