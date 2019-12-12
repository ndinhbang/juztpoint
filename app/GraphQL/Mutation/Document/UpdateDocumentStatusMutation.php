<?php
namespace App\GraphQL\Mutation\Document;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class UpdateDocumentStatusMutation extends Mutation {
	protected $attributes = [
		'name' => 'UpdateDocumentStatus',
	];
	public function type(): Type {
		return GraphQL::type('account');
	}
	public function args(): array{
		return [
			'id' => [
				'name' => 'id',
				'type' => Type::int(),
				'rules' => ['required'],
			],
			'name' => [
				'name' => 'name',
				'type' => Type::string(),
				'rules' => ['required'],
			],
			'status' => [
				'name' => 'status',
				'type' => Type::string(),
			],
			'receives' => [
				'name' => 'receives',
				'type' => Type::listOf(GraphQL::type('ItemInput')),
			],
			'properties' => [
				'name' => 'properties',
				'type' => Type::string(),
			],
		];
	}
	public function validationErrorMessages(array $args = []): array
	{
		return [
			'id.required' => 'Id required',
			'name.required' => 'Please enter your full name',
		];
	}
	public function resolve($root, $args) {

		$args['properties'] = json_decode($args['properties']);

		$account = Account::find($args['id']);
		if (!$account->update($args)) {
			return null;
		}
		return $account;
	}
}
