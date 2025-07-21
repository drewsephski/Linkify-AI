"use client";

import { useCallback, useState } from "react";

interface SpotlightConfig {
	enabled: boolean;
	size: number;
	className: string;
}

const defaultConfig: SpotlightConfig = {
	enabled: true,
	size: 64,
	className:
		"from-blue-800 via-blue-600 to-blue-400 blur-xl dark:from-blue-900 dark:via-blue-500 dark:to-blue-900",
};

export function useSpotlight(initialConfig?: Partial<SpotlightConfig>) {
	const [config, setConfig] = useState<SpotlightConfig>({
		...defaultConfig,
		...initialConfig,
	});

	const updateConfig = useCallback((updates: Partial<SpotlightConfig>) => {
		setConfig((prev) => ({ ...prev, ...updates }));
	}, []);

	const toggle = useCallback(() => {
		setConfig((prev) => ({ ...prev, enabled: !prev.enabled }));
	}, []);

	const enable = useCallback(() => {
		setConfig((prev) => ({ ...prev, enabled: true }));
	}, []);

	const disable = useCallback(() => {
		setConfig((prev) => ({ ...prev, enabled: false }));
	}, []);

	return {
		config,
		updateConfig,
		toggle,
		enable,
		disable,
	};
}
