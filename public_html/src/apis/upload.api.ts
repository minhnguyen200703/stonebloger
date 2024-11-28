import { api } from "@/lib/api-client";

export const uploadFile = async (formData: FormData): Promise<any> => {
	const response = await api.post(`/upload-image`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response;
};
