import React, { useState, useMemo, useEffect } from "react";
import debounce from "lodash/debounce";
import { Select, Spin, SelectProps } from "antd";

interface DebounceSelectProps extends SelectProps<any> {
	fetchOptions: (value: string) => Promise<any>;
	debounceTimeout?: number;
	onClear?: () => void;
	refetchOptions?: boolean;
}

const DebounceSelect: React.FC<DebounceSelectProps> = ({
	fetchOptions,
	debounceTimeout = 400,
	onClear,
	refetchOptions = false,
	...props
}) => {
	const [fetching, setFetching] = useState(false);
	const [options, setOptions] = useState([]);
  console.log('options: ', options);

	const debounceFetcher = useMemo(() => {
		const loadOptions = (value: string) => {
			setOptions([]);
			setFetching(true);
			fetchOptions(value).then((newOptions: any) => {
				setOptions(newOptions);
				setFetching(false);
			});
		};
		return debounce(loadOptions, debounceTimeout);
	}, [fetchOptions, debounceTimeout]);

	const fetchOnFocus = () => {
		if (!options.length || refetchOptions) {
			debounceFetcher("");
		}
	};

	return (
		<Select
			showSearch
			allowClear
			labelInValue={true}
			filterOption={false}
			onSearch={debounceFetcher}
			onClear={() => {
				debounceFetcher("");
				!!onClear && onClear();
			}}
			notFoundContent={fetching ? <Spin size="small" /> : "no results"}
			{...props}
			options={options}
			onFocus={fetchOnFocus}
      style={{ height: '45px', minWidth: 100 }}
		/>
	);
};

export default DebounceSelect;
