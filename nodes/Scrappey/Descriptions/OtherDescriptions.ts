import { INodeProperties } from 'n8n-workflow';

export const OtherOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['other'],
			},
		},
		options: [
			{
				name: 'Get Balance',
				value: 'getBalance',
				action: 'Gets the current user balance',
				description: 'Get the current user balance',
			},

		],
		default: 'getBalance',
	},
];

export const OtherFields: INodeProperties[] = [
	// empty
];
