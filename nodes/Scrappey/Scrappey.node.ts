import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { IExecuteFunctions } from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { RequestOperations, RequestFields } from './Descriptions/RequestDescriptions';
import { SessionFields, SessionOperations } from './Descriptions/SessionDescription';
import { OtherFields, OtherOperations } from './Descriptions/OtherDescriptions';
export class Scrappey implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Scrappey',
		name: 'Scrappey',
		group: ['transform'],
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		version: 1,
		description: 'N8N wrapper for Scrappey',
		defaults: {
			name: 'Scrappey',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'scrappeyApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Request',
						value: 'request'
					},
					{
						name: 'Session',
						value: 'session',
					},
					{
						name: 'Other',
						value: 'other',
					},
				],
				default: 'other',
				noDataExpression: true,
				required: true,
				description: 'The resource that you want to use',
			},
			...RequestOperations,
			...RequestFields,

			...SessionOperations,
			...SessionFields,

			...OtherOperations,
			...OtherFields,

		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		const credentials = await this.getCredentials('scrappeyApi');
		const endpoint = credentials.endpoint;
		const apiKey = credentials.apiKey;

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {

			// REQUEST
			if (resource === 'request') {
				if (operation === 'request.get') {
					const requestUrl = this.getNodeParameter('url', 0) as string;

					const includeImages = this.getNodeParameter('includeImages', 0) as string;
					const includeLinks = this.getNodeParameter('includeLinks', 0) as string;

					const session = this.getNodeParameter('session', 0) as string | null; // optional
					const proxyCountry = this.getNodeParameter('proxyCountry', 0) as string | null; // optional
					const autoparsePrompt = this.getNodeParameter('autoparsePrompt', 0) as string | null; // optional
					console.log(proxyCountry)

					const options: OptionsWithUri = {
						headers: {
							Accept: 'application/json',
						},
						method: 'POST',
						body: {
							"cmd": operation,
							"url": requestUrl,
							"includeImages": includeImages,
							"includeLinks": includeLinks,
						},
						uri: `https://${endpoint}?key=${apiKey}`,
						json: true,
					};

					// add optional arguments to the request body
					if (session !== null) options.body.session = session;

					if (autoparsePrompt !== null) {
						options.body.autoparse = true
						options.body.properties = autoparsePrompt
					}

					responseData = await this.helpers.requestWithAuthentication.call(this, 'scrappeyApi',	options);
					returnData.push(responseData);
				}

				if (operation === 'request.post') {

				}
			}

			if (resource === 'session') {
				if (operation === 'createSession') {
					const whitelistedDomains = this.getNodeParameter('whitelistedDomains', 0) as string | null;
					const useDatacenter = this.getNodeParameter('useDatacenter', 0) as string;
					const devices = this.getNodeParameter('deviceList', 0) as Array<string>;
					const os = this.getNodeParameter('operatingSystemList', 0) as Array<string>;
					const browserNames = this.getNodeParameter('browser', 0) as Array<string>;
					const browserMinVersion = this.getNodeParameter('browserMinVersion', 0) as string;
					const browserMaxVersion = this.getNodeParameter('browserMaxVersion', 0) as string;
					const proxy = this.getNodeParameter('proxy', 0) as string;

					const otherBody: Record<string, any> = {};
					if (whitelistedDomains) otherBody.whitelistedDomains = whitelistedDomains.split(',').map(domain => domain.trim());
					if (proxy) otherBody.proxy = proxy;

					if (browserNames.length > 0) {
						otherBody.browser = browserNames.map(name => ({
							name,
							minVersion: browserMinVersion || undefined,
							maxVersion: browserMaxVersion || undefined,
						}));
					}

					const options: OptionsWithUri = {
						headers: {
							Accept: 'application/json',
						},
						method: 'POST',
						body: {
							"cmd": "sessions.create",
							"datacenter": useDatacenter.toString(),
							"device": devices,
							"operatingSystem": os,
							...otherBody
						},
						uri: `https://${endpoint}?key=${apiKey}`,
						json: true,
					};

					responseData = await this.helpers.requestWithAuthentication.call(this, 'scrappeyApi',	options, );
					returnData.push(responseData);
				}

				if (operation === 'destroySession') {
					const sessionId = this.getNodeParameter('sessionId', 0) as string;
					const options: OptionsWithUri = {
						headers: {
							Accept: 'application/json',
						},
						method: 'POST',
						body: {
							"cmd": "sessions.destroy",
							"session": sessionId,
						},
						uri: `https://${endpoint}?key=${apiKey}`,
						json: true,
					};
					responseData = await this.helpers.requestWithAuthentication.call(this, 'scrappeyApi',	options, );
					returnData.push(responseData);
				}

				if (operation === 'checkSession') {
					const sessionId = this.getNodeParameter('sessionId', 0) as string;
					const options: OptionsWithUri = {
						headers: {
							Accept: 'application/json',
						},
						method: 'POST',
						body: {
							"cmd": "sessions.active",
							"session": sessionId,
						},
						uri: `https://${endpoint}?key=${apiKey}`,
						json: true,
					};
					responseData = await this.helpers.requestWithAuthentication.call(this, 'scrappeyApi',	options, );
					returnData.push(responseData);
				}
			}

			// OTHER
			if (resource === 'other') {
				if (operation === 'getBalance') {
					const options: OptionsWithUri = {
						headers: {
							Accept: 'application/json',
						},
						method: 'GET',
						body: {},
						uri: `https://${endpoint}/balance?key=${apiKey}`,
						json: true,
					};
					responseData = await this.helpers.requestWithAuthentication.call(this, 'scrappeyApi',	options, );
					returnData.push(responseData);
				}
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
