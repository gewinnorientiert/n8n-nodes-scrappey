import { INodeProperties } from 'n8n-workflow';

export const SessionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['session'],
			},
		},
		options: [
			{
				name: 'Create A Session',
				value: 'createSession',
				action: 'Creates a new session',
				description: 'Create a new session',
			},
			{
				name: 'Destroy A Session',
				value: 'destroySession',
				action: 'Destroys a session',
				description: 'Destroy a session by ID',
			},
			{
				name: 'Session Active?',
				value: 'checkSession',
				action: 'Checks if the session is active',
				description: 'Check if a session is active',
			},
		],
		default: 'createSession',
	},
];

export const SessionFields: INodeProperties[] = [
	{
		displayName: 'Session ID (Required)',
		name: 'sessionId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the session',
		displayOptions: {
			show: {
				resource: ['session'],
				operation: ['checkSession', 'destroySession'],
			},
		},
	},
	{
		displayName: 'Proxy (Optional)',
		name: 'proxy',
		type: 'string',
		default: '',
		description: 'Example: http://username:password@ip:port or socks4://, or socks5://',
		displayOptions: {
			show: {
				resource: ['session'],
				operation: ['createSession'],
			},
		},
	},
	{
		displayName: 'Whitelisted Domains > ARRAY (Optional)',
		name: 'whitelistedDomains',
		type: 'string',
		placeholder: '["https://google.com"]',
		default: '',
		description: 'Allows you to whitelist certain domains. Example: ["https://google.com"].',
		displayOptions: {
			show: {
				resource: ['session'],
				operation: ['createSession'],
			},
		},
	},
	{
		displayName: 'Use Datacenter IP? (Optional)',
		name: 'useDatacenter',
		type: 'boolean',
		default: false,
		description: 'Whether or not a datacenter IP should be used instead of a residential IP',
		displayOptions: {
			show: {
				resource: ['session'],
				operation: ['createSession'],
			},
		},
	},
	{
		displayName: 'Device (Optional)',
		name: 'deviceList',
		type: 'multiOptions',
		options: [
			{
				name: 'Desktop',
				value: 'desktop',
			},
			{
				name: 'Mobile',
				value: 'mobile',
			}
		],
		default: ['desktop', 'mobile'],
		description: 'Setting the device, min version and max version',
		displayOptions: {
			show: {
				resource: ['session'],
				operation: ['createSession'],
			},
		},
	},
	{
		displayName: 'Operating System (Optional)',
		name: 'operatingSystemList',
		type: 'multiOptions',
		options: [
			{
				name: 'Android',
				value: 'android',
			},
			{
				name: 'IOS',
				value: 'ios',
			},
			{
				name: 'Linux',
				value: 'linux',
			},
			{
				name: 'MacOS',
				value: 'macos',
			},
			{
				name: 'Windows',
				value: 'windows',
			},
	],
		default: ['android', 'ios', 'linux', 'macos', 'windows'],
		description: 'Setting the operating system, min version and max version',
		displayOptions: {
			show: {
				resource: ['session'],
				operation: ['createSession'],
			},
		},
	},
	{
		displayName: 'Browser (Optional)',
		name: 'browser',
		type: 'multiOptions',
		options: [
			{
				name: 'Chrome',
				value: 'chrome',
			},
			{
				name: 'Firefox',
				value: 'firefox',
			}
	],
		default: ['chrome', 'firefox'],
		description: 'Set the browser that should be used. Note: CF is only solving captchas on Firefox.',
		displayOptions: {
			show: {
				resource: ['session'],
				operation: ['createSession'],
			},
		},
	},
	{
		displayName: 'Browser > Min Version (Optional)',
		name: 'browserMinVersion',
		placeholder: '116',
		type: 'string',
		default: '',
		description: 'Set the browsers minimum version',
		displayOptions: {
			show: {
				resource: ['session'],
				operation: ['createSession'],
			},
		},
	},
	{
		displayName: 'Browser > Max Version (Optional)',
		name: 'browserMaxVersion',
		placeholder: '117',
		type: 'string',
		default: '',
		description: 'Set the browsers maximum version',
		displayOptions: {
			show: {
				resource: ['session'],
				operation: ['createSession'],
			},
		},
	}
];
