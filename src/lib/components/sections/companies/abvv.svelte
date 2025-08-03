<script lang="ts">
	import { onMount } from 'svelte';
	
	// Bilingual switching for FGTB/ABVV
	onMount(() => {
		const unionNameElement = document.getElementById('union-name');
		if (unionNameElement) {
			const names = ['FGTB', 'ABVV'];
			let currentIndex = 0;
			
			// Set initial name
			unionNameElement.textContent = names[currentIndex];
			
			// Switch every 10 seconds
			setInterval(() => {
				currentIndex = (currentIndex + 1) % names.length;
				unionNameElement.textContent = names[currentIndex];
			}, 10000);
		}
	});
</script>

<!-- ABVV-FGTB Section - Authentic Union Design -->
<section class="company-section abvv-section" style="min-height: 100vh; background: #ffffff; color: #1a1a1a; display: flex; align-items: center; padding: 4rem 2rem; border-top: 1px solid #e8e8e8;">
	<div style="max-width: 1200px; margin: 0 auto; width: 100%;">
		<!-- Bilingual Header -->
		<div style="text-align: center; margin-bottom: 4rem;">
			<div id="union-name" style="display: inline-block; padding: 0.75rem 2rem; background: #333; color: white; border-radius: 2px; font-size: 1.1rem; font-weight: 600; letter-spacing: 1px; margin-bottom: 1.5rem; font-family: system-ui;">
				FGTB
			</div>
			<h2 style="font-size: 2.6rem; font-weight: 400; color: #1a1a1a; margin-bottom: 1rem; font-family: system-ui;">
				Modernisation des Systèmes Legacy
			</h2>
			<p style="font-size: 1.1rem; color: #666; max-width: 650px; margin: 0 auto; line-height: 1.5;">
				Transformation numérique de trois décennies de connaissances institutionnelles pour le plus grand syndicat de Belgique
			</p>
		</div>

		<!-- Clean Content Layout -->
		<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start;">
			<!-- Project Overview -->
			<div style="background: #f8f9fa; padding: 2.5rem; border-radius: 2px; border-left: 4px solid #333;">
				<h3 style="font-size: 1.2rem; font-weight: 600; color: #333; margin-bottom: 2rem; text-transform: uppercase; letter-spacing: 0.5px; font-family: system-ui;">
					Transformation Institutionnelle
				</h3>
				
				<p style="font-size: 1.05rem; line-height: 1.6; color: #444; margin-bottom: 2rem;">
					Modernisation complète de trois décennies de systèmes AS400 vers une architecture moderne et sécurisée. Cette transformation préserve les connaissances institutionnelles cruciales tout en permettant la digitalisation du plus grand syndicat de Belgique.
				</p>

				<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
					<div style="background: white; padding: 1.5rem; border-radius: 2px; border: 1px solid #e8e8e8;">
						<h4 style="font-size: 0.85rem; font-weight: 600; color: #666; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px;">
							Systèmes Legacy
						</h4>
						<p style="font-size: 1.1rem; font-weight: 400; color: #1a1a1a; margin: 0;">
							30+ Années AS400
						</p>
					</div>
					<div style="background: white; padding: 1.5rem; border-radius: 2px; border: 1px solid #e8e8e8;">
						<h4 style="font-size: 0.85rem; font-weight: 600; color: #666; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px;">
							Modernisation
						</h4>
						<p style="font-size: 1.1rem; font-weight: 400; color: #1a1a1a; margin: 0;">
							Architecture Moderne
						</p>
					</div>
				</div>

				<div style="background: #333; color: white; padding: 1.5rem; border-radius: 2px;">
					<p style="font-size: 0.9rem; margin: 0; font-style: italic; text-align: center;">
						"Préserver les connaissances, moderniser l'avenir"
					</p>
				</div>
			</div>

			<!-- Organizational Profile -->
			<div style="background: white; padding: 2.5rem; border-radius: 2px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #e8e8e8;">
				<h3 style="font-size: 1.1rem; font-weight: 600; color: #333; margin-bottom: 2rem; text-transform: uppercase; letter-spacing: 0.5px; font-family: system-ui;">
					Profil Organisationnel
				</h3>
				
				<div style="margin-bottom: 2rem;">
					<div style="padding: 1rem 0; border-bottom: 1px solid #f0f0f0;">
						<div style="font-size: 0.85rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.5rem;">Secteur</div>
						<div style="font-size: 0.95rem; color: #1a1a1a; font-weight: 500;">Syndicat National</div>
					</div>
					<div style="padding: 1rem 0; border-bottom: 1px solid #f0f0f0;">
						<div style="font-size: 0.85rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.5rem;">Membres</div>
						<div style="font-size: 0.95rem; color: #1a1a1a; font-weight: 500;">1.5+ Million</div>
					</div>
					<div style="padding: 1rem 0; border-bottom: 1px solid #f0f0f0;">
						<div style="font-size: 0.85rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.5rem;">Couverture</div>
						<div style="font-size: 0.95rem; color: #1a1a1a; font-weight: 500;">Belgique Nationale</div>
					</div>
					<div style="padding: 1rem 0;">
						<div style="font-size: 0.85rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.5rem;">Mission</div>
						<div style="font-size: 0.95rem; color: #1a1a1a; font-weight: 500;">Protection des Travailleurs</div>
					</div>
				</div>

				<!-- Union Badge -->
				<div style="background: linear-gradient(135deg, #333, #1a1a1a); color: white; padding: 1rem; border-radius: 2px; text-align: center;">
					<div style="font-size: 0.8rem; opacity: 0.9; margin-bottom: 0.25rem;">Plus Grand Syndicat</div>
					<div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px;">Fédération Générale du Travail</div>
				</div>
			</div>
		</div>
	</div>
</section>