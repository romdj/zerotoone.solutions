import { readdir } from 'fs/promises';
import { join } from 'path';

export const load = async () => {
	try {
		const headerPath = join(process.cwd(), 'static/assets/Images/Companies identity/Philips/header');
		const files = await readdir(headerPath);

		// Filter for image files
		const imageFiles = files.filter(file =>
			/\.(jpg|jpeg|png|webp)$/i.test(file)
		);

		// Select random image
		const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];

		return {
			headerImage: `/assets/Images/Companies identity/Philips/header/${randomImage}`
		};
	} catch (error) {
		console.error('Error loading Philips header image:', error);
		return {
			headerImage: '/assets/Images/Companies identity/Philips/header/Philips_Ambition_X_MR_with_BlueSeal_technology_at_Southlake_Health.jpg'
		};
	}
};
