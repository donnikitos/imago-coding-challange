import { ImageIcon, ShoppingBasket } from 'lucide-react';

function Header() {
	return (
		<header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
			<div className="flex items-center gap-3">
				<div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
					<ImageIcon className="w-6 h-6" />
				</div>
				<div>
					<h1 className="text-xl font-bold text-gray-900 leading-tight">
						Image Overview
					</h1>
					<p className="text-xs text-gray-500 font-medium">
						Digital Asset Management
					</p>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-bold">
					<ShoppingBasket className="w-4 h-4" />
					Cart (0)
				</button>
			</div>
		</header>
	);
}

export default Header;
