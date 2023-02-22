import { useEffect, useRef } from 'react';
import { Sortable } from 'sortablejs';

export default function useSortableCreateRef(options) {
	const ref = useRef(null);

	useEffect(() => {
		Sortable.create(ref.current, options);
	}, [options]);

	return ref;
}
