import { INodeProperties } from 'n8n-workflow';

export const RequestOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['request'],
			},
		},
		options: [
			{
				name: 'GET',
				value: 'request.get',
				action: 'Request a website (GET)',
				description: 'Create a GET request',
			},
			{
				name: 'POST',
				value: 'request.post',
				action: 'Post data to a website',
				description: 'Create a POST request',
			},
		],
		default: 'request.get',
	},
];

export const RequestFields: INodeProperties[] = [
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		default: 'https://google.com',
		description: 'The URL / link that you want to request',
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['request.get', 'request.post'],
			},
		},
	},
];
