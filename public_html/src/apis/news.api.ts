import { api } from "@/lib/api-client";

export const getNews = async (searchParams: {
	[key: string]: any;
}): Promise<any> => {
	const response = await api.get(`/news`, {
		params: searchParams,
	});
	return response;
};

export const getNewsById = async (id: string): Promise<any> => {
	const response = await api.get(`/new/${id}`);
	return response;
};

export const addNews = async (newsData: any): Promise<any> => {
	const response = await api.post(`/news`, newsData);
	return response;
};

export const editNews = async (newsData: any, id: string): Promise<any> => {
	const response = await api.post(`/edit-news/${id}`, newsData);
	return response;
};

export const deleteNews = async (id: string): Promise<any> => {
	const response = await api.delete(`/news/${id}`);
	return response;
};
