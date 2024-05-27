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
	{
		displayName: 'Include Images',
		name: 'includeImages',
		type: 'boolean',
		default: false,
		description: 'Whether or not you want to retrieve a list of all image URLs',
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['request.get'],
			},
		},
	},
	{
		displayName: 'Include Links',
		name: 'includeLinks',
		type: 'boolean',
		default: false,
		description: 'Whether or not you want to retrieve a list of all links on the website',
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['request.get'],
			},
		},
	},
	{
		displayName: 'Session',
		name: 'session',
		type: 'string',
		default: '',
		description: 'Set the session that you want to use for the request',
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['request.get', 'request.post'],
			},
		},
	},
	// proxy county has wayyyy to much countries, I cant list all of 'em. Add them as needed.
	{
		displayName: 'Proxy Country',
		name: 'proxyCountry',
		type: 'options',
		options: [
			{
				name: 'Albania',
				value: 'Albania'
			},
			{
				name: 'Argentina',
				value: 'Argentina'
			},
			{
				name: 'Australia',
				value: 'Australia'
			},
			{
				name: 'Austria',
				value: 'Austria'
			},
			{
				name: 'Canada',
				value: 'Canda'
			},
			{
				name: 'China',
				value: 'China'
			},
			{
				name: 'Denmark',
				value: 'Denmark'
			},
			{
				name: 'France',
				value: 'France'
			},
			{
				name: 'Germany',
				value: 'Germany'
			},
			{
				name: 'Netherlands',
				value: 'Netherlands'
			},
			{
				name: 'Norway',
				value: 'Norway'
			},
			{
				name: 'Russia',
				value: 'Russia'
			},
			{
				name: 'Switzerland',
				value: 'Switzerland'
			},
			{
				name: 'Turkey',
				value: 'Turkey'
			},
			{
				name: 'Ukraine',
				value: 'Ukraine'
			},
			{
				name: 'United States',
				value: 'UnitedStates'
			},
		],
		default: 'Switzerland',
		description: 'Set the country of the proxy that will be used for the request',
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['request.get', 'request.post'],
			},
		},
	},
];
