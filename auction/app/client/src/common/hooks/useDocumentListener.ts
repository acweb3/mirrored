import { DependencyList, useEffect } from "react";

export const useDocumentListener = <K extends keyof DocumentEventMap>(
	eventListenerTypes: K | K[],
	callback: (this: Document, ev: DocumentEventMap[K]) => any, // eslint-disable-line
	deps: DependencyList,
	options?: AddEventListenerOptions
): void => {
	// On event listener types or callback change, append event listeners to document
	// and remove stale event listeners.
	useEffect(() => {
		if (Array.isArray(eventListenerTypes)) {
			eventListenerTypes.forEach((eventListenerType) => {
				document.addEventListener(eventListenerType, callback, options);
			});
		} else {
			document.addEventListener(eventListenerTypes, callback, options);
		}

		// Remove stale event listeners on unmount.
		return (): void => {
			if (Array.isArray(eventListenerTypes)) {
				eventListenerTypes.forEach((eventListenerType) => {
					document.removeEventListener(eventListenerType, callback);
				});
			} else {
				document.removeEventListener(eventListenerTypes, callback);
			}
		};
		/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventListenerTypes, callback, ...deps, options]);
};
