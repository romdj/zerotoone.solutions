import { readdir } from 'fs/promises';
import { join } from 'path';

export const load = async () => {
	try {
		const headerPath = join(process.cwd(), 'static/assets/Images/Companies identity/Elia/header');
		const files = await readdir(headerPath);

		// Filter for image files
		const imageFiles = files.filter(file =>
			/\.(jpg|jpeg|png|webp)$/i.test(file)
		);

		// Select random image
		const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];

		return {
			headerImage: `/assets/Images/Companies identity/Elia/header/${randomImage}`
		};
	} catch (error) {
		console.error('Error loading Elia header image:', error);
		return {
			headerImage: '/assets/Images/Companies identity/Elia/header/PHNX_STUDIO_ELIAGEMBLOUX_011-scaled-e1762178185271.jpg'
		};
	}
};
