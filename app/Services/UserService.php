<?php
/**
 * Created by PhpStorm.
 * User: Leiviton
 * Date: 11/01/2018
 * Time: 19:18
 */

namespace Pedidos\Services;


use Pedidos\Repositories\UserRepository;

class UserService
{
    /**
     * @var UserRepository
     */
    private $repository;

    public function __construct(UserRepository $repository)
    {

        $this->repository = $repository;
    }

    public function create($data)
    {
        \DB::beginTransaction();

        try {

            $data['password'] = bcrypt($data['password']);

            $user = $this->repository->create($data);

            foreach ($data['roles'] as $d)
            {
                $user->assignRole($d['name']);
            }
            \DB::commit();

            return $user;
        } catch (\Exception $e){
            \DB::rollback();
            throw $e;
        }
    }

    public function update($data,$id)
    {
        \DB::beginTransaction();

        try {

            $user = $this->repository->find($id);

            if($data['password'] && $data['password'] != null && $data['password'] != '')
            {
                $data['password'] = bcrypt($data['password']);
            }else{
                $data['password'] = $user->password;
            }

            $user = $this->repository->update($data,$id);

            \DB::commit();

            return $user;

        } catch (\Exception $e){
            \DB::rollback();
            throw $e;
        }
    }
}