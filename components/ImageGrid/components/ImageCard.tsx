import { ImageWithFallback } from '@/components/ImageWithFallback';
import { IImageEntry } from '@/interfaces/image-entry';
import { Calendar, Hash, User } from 'lucide-react';

interface ImageCardProps {
	image: IImageEntry;
	searchQuery: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, searchQuery }) => {
	const highlightText = (text: string, query: string) => {
		if (!query) return text;
		const parts = text.split(new RegExp(`(${query})`, 'gi'));
		return (
			<>
				{parts.map((part, i) =>
					part.toLowerCase() === query.toLowerCase() ? (
						<span
							key={i}
							className="bg-yellow-200 text-yellow-900 rounded-sm px-0.5"
						>
							{part}
						</span>
					) : (
						part
					),
				)}
			</>
		);
	};

	return (
		<div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
			<div className="relative aspect-4/3 overflow-hidden bg-gray-100">
				<ImageWithFallback
					src={image.bildnummer}
					alt={image.suchtext}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
				/>
				<div className="absolute top-4 left-4 flex items-center gap-1.5 text-xs font-mono text-blue-600 font-bold bg-blue-50 border border-blue-200 px-2 py-1 rounded">
					<Hash className="w-3 h-3" />
					{highlightText(image.bildnummer, searchQuery)}
				</div>
			</div>

			<div className="p-4 flex flex-col flex-1 gap-3 border-t border-gray-200">
				<div className="mt-auto grid grid-cols-2 gap-2">
					<div className="flex items-center gap-1.5 min-w-0">
						<User className="w-3.5 h-3.5 text-gray-400 shrink-0" />
						<span className="text-xs text-gray-500 truncate">
							{highlightText(image.fotografen, searchQuery)}
						</span>
					</div>
					<div className="flex items-center gap-1.5 justify-end">
						<Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
						<span className="text-xs text-gray-500">
							{image.datum}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageCard;
