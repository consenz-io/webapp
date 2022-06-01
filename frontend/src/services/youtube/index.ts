import { getRequest } from 'services/base';

export const isVideoExist = async(url: string) => {
	try {
		return await getRequest(url);
	} catch (err) {
		console.log('err', err);
	} 
	
	return '';
};