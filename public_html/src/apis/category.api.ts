import { api } from "@/lib/api-client";

export const getCategories = async (searchParams: {
	[key: string]: any;
}): Promise<any> => {
	const response = await api.get(`/categories`, {
		params: searchParams,
	});
	return response;
};

export const addCategory = async (catData: any): Promise<any> => {
	const response = await api.post(`/categories`, catData);
	return response;
};

export const editCategory = async (id: string, data: any): Promise<any> => {
	const response = await api.put(`/categories/${id}`, data);
	return response;
};
