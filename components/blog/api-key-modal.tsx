"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as React from "react";

interface ApiKeyModalProps {
	isOpen: boolean;
	onClose: () => void;
	onApiKeySave: (apiKey: string) => void;
}

export function ApiKeyModal({
	isOpen,
	onClose,
	onApiKeySave,
}: ApiKeyModalProps) {
	const [apiKey, setApiKey] = React.useState("");

	const handleSave = () => {
		onApiKeySave(apiKey);
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Enter Your API Key</DialogTitle>
					<DialogDescription>
						Please enter your Google Gemini API key. This will be used to
						generate blog posts.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="api-key" className="text-right">
							API Key
						</Label>
						<Input
							id="api-key"
							type="password"
							value={apiKey}
							onChange={(e) => setApiKey(e.target.value)}
							className="col-span-3"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={handleSave}>Save API Key</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
