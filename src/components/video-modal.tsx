import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { X } from 'lucide-react'

interface VideoModalProps {
	isOpen: boolean
	onClose: () => void
	videoUrl: string | null
	videoTitle: string
}

export function VideoModal({ isOpen, onClose, videoUrl, videoTitle }: VideoModalProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-4xl w-full h-auto p-0">
				<DialogHeader className="p-6 pb-0">
					<DialogTitle className="text-lg font-semibold">
						{videoTitle}
					</DialogTitle>
				</DialogHeader>
				<div className="p-6 pt-0">
					{videoUrl && (
						<div className="aspect-video bg-black rounded-lg overflow-hidden">
							<video
								className="w-full h-full"
								controls
								preload="metadata"
								autoPlay
							>
								<source src={videoUrl} type="video/mp4" />
								<source src={videoUrl} type="video/webm" />
								<source src={videoUrl} type="video/ogg" />
								Your browser does not support the video tag.
							</video>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}