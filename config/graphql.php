<?php

declare (strict_types = 1);

return [

	// The prefix for routes
	'prefix' => 'graphql',

	// The routes to make GraphQL request. Either a string that will apply
	// to both query and mutation or an array containing the key 'query' and/or
	// 'mutation' with the according Route
	//
	// Example:
	//
	// Same route for both query and mutation
	//
	// 'routes' => 'path/to/query/{graphql_schema?}',
	//
	// or define each route
	//
	// 'routes' => [
	//     'query' => 'query/{graphql_schema?}',
	//     'mutation' => 'mutation/{graphql_schema?}',
	// ]
	//
	'routes' => '{graphql_schema?}',

	// The controller to use in GraphQL request. Either a string that will apply
	// to both query and mutation or an array containing the key 'query' and/or
	// 'mutation' with the according Controller and method
	//
	// Example:
	//
	// 'controllers' => [
	//     'query' => '\Rebing\GraphQL\GraphQLController@query',
	//     'mutation' => '\Rebing\GraphQL\GraphQLController@mutation'
	// ]
	//
	'controllers' => \Rebing\GraphQL\GraphQLController::class . '@query',

	// Any middleware for the graphql route group
	'middleware' => [],

	// Additional route group attributes
	//
	// Example:
	//
	// 'route_group_attributes' => ['guard' => 'api']
	//
	'route_group_attributes' => [],

	// The name of the default schema used when no argument is provided
	// to GraphQL::schema() or when the route is used without the graphql_schema
	// parameter.
	'default_schema' => 'default',

	// The schemas for query and/or mutation. It expects an array of schemas to provide
	// both the 'query' fields and the 'mutation' fields.
	//
	// You can also provide a middleware that will only apply to the given schema
	//
	// Example:
	//
	//  'schema' => 'default',
	//
	//  'schemas' => [
	//      'default' => [
	//          'query' => [
	//              'users' => 'App\GraphQL\Query\UsersQuery'
	//          ],
	//          'mutation' => [
	//
	//          ]
	//      ],
	//      'user' => [
	//          'query' => [
	//              'profile' => 'App\GraphQL\Query\ProfileQuery'
	//          ],
	//          'mutation' => [
	//
	//          ],
	//          'middleware' => ['auth'],
	//      ],
	//      'user/me' => [
	//          'query' => [
	//              'profile' => 'App\GraphQL\Query\MyProfileQuery'
	//          ],
	//          'mutation' => [
	//
	//          ],
	//          'middleware' => ['auth'],
	//      ],
	//  ]
	//
	'schemas' => [
		'default' => [
			'query' => [
				// 'example_query' => ExampleQuery::class,
				'users' => App\GraphQL\Query\UsersQuery::class,
				'settings' => App\GraphQL\Query\SettingsQuery::class,
				'accounts' => App\GraphQL\Query\AccountsQuery::class,
				'products' => App\GraphQL\Query\ProductsQuery::class,
				'receipts' => App\GraphQL\Query\ReceiptsQuery::class,
				'appointments' => App\GraphQL\Query\AppointmentsQuery::class,
				'reports' => App\GraphQL\Query\ReportsQuery::class,
			],
			'mutation' => [
				// 'example_mutation'  => ExampleMutation::class,
				'newCustomer' => App\GraphQL\Mutation\NewCustomerMutation::class,
				'newReceipt' => App\GraphQL\Mutation\NewReceiptMutation::class,
				'newAppointment' => App\GraphQL\Mutation\NewAppointmentMutation::class,
				'voidReceipt' => App\GraphQL\Mutation\VoidReceiptMutation::class,
				'shift' => App\GraphQL\Mutation\ShiftMutation::class,

				//USER
				'newUser' => App\GraphQL\Mutation\User\NewUserMutation::class,
				'updateUser' => App\GraphQL\Mutation\User\UpdateUserMutation::class,
				'trashUser' => App\GraphQL\Mutation\User\TrashUserMutation::class,
				'assignPin' => App\GraphQL\Mutation\User\AssignPinMutation::class,

				//ACCOUNT
				'newAccount' => App\GraphQL\Mutation\Account\NewAccountMutation::class,
				'updateAccount' => App\GraphQL\Mutation\Account\UpdateAccountMutation::class,
				'trashAccount' => App\GraphQL\Mutation\Account\TrashAccountMutation::class,

				//ACCOUNT
				'newProduct' => App\GraphQL\Mutation\Product\NewProductMutation::class,
				'updateProduct' => App\GraphQL\Mutation\Product\UpdateProductMutation::class,
				'trashProduct' => App\GraphQL\Mutation\Product\TrashProductMutation::class,

				//DOCUMENT
				'newDocument' => App\GraphQL\Mutation\Document\NewDocumentMutation::class,
				'updateDocument' => App\GraphQL\Mutation\Document\UpdateDocumentMutation::class,
				'updateDocumentStatus' => App\GraphQL\Mutation\Document\UpdateDocumentStatusMutation::class,
				'removeDocumentStatus' => App\GraphQL\Mutation\Document\RemoveDocumentStatusMutation::class,
				'UpdateAppointmentStatus' => App\GraphQL\Mutation\Document\UpdateAppointmentStatusMutation::class,
				'trashDocument' => App\GraphQL\Mutation\Document\TrashDocumentMutation::class,

				//SETTING
				'newSetting' => App\GraphQL\Mutation\Setting\NewSettingMutation::class,
				'updateSetting' => App\GraphQL\Mutation\Setting\UpdateSettingMutation::class,
				'trashSetting' => App\GraphQL\Mutation\Setting\TrashSettingMutation::class,

			],
			'middleware' => ['auth:api'],
			'method' => ['get', 'post'],
		],
	],

	// The types available in the application. You can then access it from the
	// facade like this: GraphQL::type('user')
	//
	// Example:
	//
	// 'types' => [
	//     'user' => 'App\GraphQL\Type\UserType'
	// ]
	//
	'types' => [

		'Upload' => \Rebing\GraphQL\Support\UploadType::class,
		// 'example'           => ExampleType::class,
		// 'relation_example'  => ExampleRelationType::class,
		// \Rebing\GraphQL\Support\UploadType::class,
		'user' => App\GraphQL\Type\UserType::class,
		'setting' => App\GraphQL\Type\SettingType::class,
		'account' => App\GraphQL\Type\AccountType::class,
		'product' => App\GraphQL\Type\ProductType::class,
		'property' => App\GraphQL\Type\PropertyType::class,
		'discount' => App\GraphQL\Type\DiscountType::class,
		'variant' => App\GraphQL\Type\VariantType::class,
		'variant_stock' => App\GraphQL\Type\VariantStockType::class,
		'receipt' => App\GraphQL\Type\ReceiptType::class,
		'services_by' => App\GraphQL\Type\ServicesByType::class,
		'item' => App\GraphQL\Type\ItemType::class,
		'ItemInput' => App\GraphQL\Input\ItemInput::class,

		//Pagination Type
		'accounts' => App\GraphQL\Pagination\AccountsPagination::class,
		'items' => App\GraphQL\Pagination\ItemsPagination::class,
		'products' => App\GraphQL\Pagination\ProductsPagination::class,
		'receipts' => App\GraphQL\Pagination\ReceiptsPagination::class,
		'settings' => App\GraphQL\Pagination\SettingsPagination::class,
		'users' => App\GraphQL\Pagination\UsersPagination::class,

		'reports' => App\GraphQL\Pagination\ReportsPagination::class,
		'report' => App\GraphQL\Type\ReportType::class,
		'summary' => App\GraphQL\Type\SummaryType::class,

	],

	// The types will be loaded on demand. Default is to load all types on each request
	// Can increase performance on schemes with many types
	// Presupposes the config type key to match the type class name property
	'lazyload_types' => false,

	// This callable will be passed the Error object for each errors GraphQL catch.
	// The method should return an array representing the error.
	// Typically:
	// [
	//     'message' => '',
	//     'locations' => []
	// ]
	'error_formatter' => ['\Rebing\GraphQL\GraphQL', 'formatError'],

	/*
		     * Custom Error Handling
		     *
		     * Expected handler signature is: function (array $errors, callable $formatter): array
		     *
		     * The default handler will pass exceptions to laravel Error Handling mechanism
	*/
	'errors_handler' => ['\Rebing\GraphQL\GraphQL', 'handleErrors'],

	// You can set the key, which will be used to retrieve the dynamic variables
	'params_key' => 'variables',

	/*
		     * Options to limit the query complexity and depth. See the doc
		     * @ https://github.com/webonyx/graphql-php#security
		     * for details. Disabled by default.
	*/
	'security' => [
		'query_max_complexity' => null,
		'query_max_depth' => null,
		'disable_introspection' => false,
	],

	/*
		     * You can define your own pagination type.
		     * Reference \Rebing\GraphQL\Support\PaginationType::class
	*/
	'pagination_type' => \Rebing\GraphQL\Support\PaginationType::class,

	/*
		     * Config for GraphiQL (see (https://github.com/graphql/graphiql).
	*/
	'graphiql' => [
		'prefix' => '/graphiql',
		'controller' => \Rebing\GraphQL\GraphQLController::class . '@graphiql',
		'middleware' => [],
		'view' => 'graphql::graphiql',
		'display' => env('ENABLE_GRAPHIQL', true),
	],

	/*
		     * Overrides the default field resolver
		     * See http://webonyx.github.io/graphql-php/data-fetching/#default-field-resolver
		     *
		     * Example:
		     *
		     * ```php
		     * 'defaultFieldResolver' => function ($root, $args, $context, $info) {
		     * },
		     * ```
		     * or
		     * ```php
		     * 'defaultFieldResolver' => [SomeKlass::class, 'someMethod'],
		     * ```
	*/
	'defaultFieldResolver' => null,

	/*
		     * Any headers that will be added to the response returned by the default controller
	*/
	'headers' => ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],

	/*
		     * Any JSON encoding options when returning a response from the default controller
		     * See http://php.net/manual/function.json-encode.php for the full list of options
	*/
	'json_encoding_options' => JSON_UNESCAPED_UNICODE,
];
