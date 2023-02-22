import { useEffect, useRef, useContext, createContext } from 'react';

const DropZoneTimersContext = createContext(null);

function useDropZoneHoverEffect(id, setState) {
	const nodeEl = useRef(null);
	const dropZoneTimers = useContext(DropZoneTimersContext);

	useEffect(() => {
		const current = nodeEl.current;
		// note: runs once for parent and once for child
		current.addEventListener('dropZoneHover', handelDropZoneHover, false);
		current.addEventListener('sortFrameHover', removeTimers, false);
		current.addEventListener('invalidDragOver', removeTimers, false);
		return () => {
			current.removeEventListener('dropZoneHover', handelDropZoneHover, false);
			current.removeEventListener('sortFrameHover', removeTimers, false);
			current.removeEventListener('invalidDragOver', removeTimers, false);
		};

		function handelDropZoneHover() {
			dropZoneTimers.current.push(
				setTimeout(() => {
					chrome.storage.local.set({ [id]: true });
					setState(true);
				}, 600)
			);
		}

		function removeTimers() {
			dropZoneTimers.current.forEach((timerId) => {
				clearTimeout(timerId);
			});
			dropZoneTimers.current = [];
		}
	}, [id, setState, dropZoneTimers]);

	return nodeEl;
}

function useDropZoneTimersRef() {
	return useRef([]);
}

export { DropZoneTimersContext, useDropZoneHoverEffect, useDropZoneTimersRef };
