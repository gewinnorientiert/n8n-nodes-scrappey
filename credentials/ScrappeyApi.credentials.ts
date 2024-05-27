import {
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ScrappeyApi implements ICredentialType {
	name = 'scrappeyApi';
	displayName = 'Scrappey API';
	properties: INodeProperties[] = [
		{
			displayName: 'Endpoint',
			name: 'endpoint',
			required: true,
			description: 'The current endpoint of Scrappey. There is no need to add the ?key parameter!',
			type: 'string',
			default: 'publisher.scrappey.com/api/v1',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			required: true,
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: '=https://{{$credentials.endpoint}}',
			url: '=/balance?key={{$credentials.apiKey}}',
		},
	};
}
