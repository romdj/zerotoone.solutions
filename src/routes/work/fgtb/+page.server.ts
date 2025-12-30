import { readdir } from 'fs/promises';
import { join } from 'path';

export const load = async () => {
	try {
		const headerPath = join(process.cwd(), 'static/assets/fgtb');
		const files = await readdir(headerPath);

		// Filter for image files
		const imageFiles = files.filter(file =>
			/\.(jpg|jpeg|png|webp)$/i.test(file)
		);

		// Select random image
		const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];

		return {
			headerImage: `/assets/fgtb/${randomImage}`
		};
	} catch (error) {
		console.error('Error loading FGTB header image:', error);
		return {
			headerImage: '/assets/fgtb/fgtb_LaurieDieffembacqBELGA.jpg'
		};
	}
};
