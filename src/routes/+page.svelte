<script lang="ts">
	import { Nike, IBM, Philips, ABVV } from '$lib/components/sections/companies';
	
	let expandedStory: string | null = null;
	
	function toggleStory(storyId: string) {
		if (expandedStory === storyId) {
			expandedStory = null;
		} else {
			expandedStory = storyId;
		}
	}
</script>

<!-- Hero Section -->
<section class="hero-gradient floating-elements animate-gradient" style="min-height: 100vh; display: flex; align-items: center; position: relative;">
	<div class="hero-content">
		<div style="margin-bottom: 3rem;" class="animate-float">
			<img 
				src="/logo.png" 
				alt="Zero to One Solutions" 
				style="width: 32rem; height: auto; margin: 0 auto; display: block; filter: drop-shadow(0 8px 40px rgba(255, 255, 255, 0.4)); max-width: 90vw;"
			/>
		</div>
		<h1 class="hero-title" style="color: white; margin-bottom: 1.5rem; font-size: 3.5rem; line-height: 1.1;">
			The Biggest Risks Aren't Technical—They're Strategic
		</h1>
		<p style="color: rgba(255, 255, 255, 0.8); font-size: 1.4rem; margin-bottom: 4rem; max-width: 700px; margin-left: auto; margin-right: auto; line-height: 1.4;">
			We help you see what others miss and build what others can't
		</p>
		
		<!-- Scroll indicator -->
		<div style="position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); color: rgba(255, 255, 255, 0.6);">
			<div style="animation: bounce 2s infinite;">↓</div>
		</div>
	</div>
</section>

<!-- Story Section 1: Focus on making your beer taste better -->
<section class="story-section" style="min-height: 100vh; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: white; display: flex; align-items: center; padding: 4rem 2rem; position: relative; overflow: hidden;">
	<!-- Background illustration -->
	<div style="position: absolute; right: -10%; top: 50%; transform: translateY(-50%); opacity: 0.15; z-index: 0;">
		<img src="/orval.png" alt="Orval Beer" style="width: 600px; height: auto; filter: sepia(20%) saturate(150%) hue-rotate(320deg);" />
	</div>
	
	<div style="max-width: 1200px; margin: 0 auto; width: 100%; position: relative; z-index: 1;">
		<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 4rem; align-items: center;">
			<!-- Main content -->
			<div class="story-content">
				<h2 style="font-size: 4rem; font-weight: 700; margin-bottom: 2rem; background: linear-gradient(135deg, #F11759, #8333C5); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
					Focus on making your beer taste better
				</h2>
				<p style="font-size: 1.3rem; line-height: 1.6; margin-bottom: 3rem; color: rgba(255, 255, 255, 0.8);">
					In the late 1800s, as the Second Industrial Revolution unfolded across Europe, a quiet but profound transformation was taking shape in the world of brewing.
				</p>
				
				<button 
					class="expand-btn"
					style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); color: white; padding: 1rem 2rem; border-radius: 8px; cursor: pointer; font-size: 1.1rem; transition: all 0.3s ease;"
					on:click={() => toggleStory('beer')}
				>
					{expandedStory === 'beer' ? 'Hide Story' : 'Explore the Story'}
				</button>
				
				{#if expandedStory === 'beer'}
					<div class="expanded-story" style="margin-top: 3rem; padding: 2rem; background: rgba(0, 0, 0, 0.5); border-radius: 12px; border-left: 4px solid #F11759;">
						<div style="font-size: 1.1rem; line-height: 1.7; color: rgba(255, 255, 255, 0.9);">
							
							<h4 style="color: #F11759; margin: 2rem 0 1rem 0; font-size: 1.3rem;">The First Wave: In-House Generation</h4>
							<p style="margin-bottom: 1.5rem;">The earliest adopters of electrical power in their breweries invested heavily in on-site generators. They installed dynamos in darkened cellars, wired their mash tuns and centrifuges into bespoke circuits, and watched production volumes climb. Yet the promise was double-edged: while output soared, so too did capital expenditures, maintenance burdens, and technical headaches.</p>
							
							<h4 style="color: #8333C5; margin: 2rem 0 1rem 0; font-size: 1.3rem;">The Rise of the Utility Model</h4>
							<p style="margin-bottom: 1.5rem;">Suddenly, a new class of enterprises emerged: electric utilities. These companies specialized solely in generating and distributing power, spreading costs across many customers and mastering economies of scale. Rather than trying to tame the arc of generators themselves, a second generation of brewers simply plugged into the grid, paying for what they used and leaving reliability concerns to dedicated experts.</p>
							
							<h4 style="color: #D67D21; margin: 2rem 0 1rem 0; font-size: 1.3rem;">Why the Shift Mattered</h4>
							<p style="margin-bottom: 1.5rem; font-weight: 600; color: #F11759;">From a consumer's standpoint, there was no discernible difference in the quality or taste of beer produced by an on-site power plant versus a remote utility. Electricity, as an undifferentiated input, affected neither flavor nor character.</p>
							
							<h4 style="color: #F11759; margin: 2rem 0 1rem 0; font-size: 1.3rem;">Two Enduring Lessons</h4>
							<div style="background: rgba(241, 23, 89, 0.1); padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
								<p style="margin-bottom: 1rem;"><strong style="color: #F11759;">Focus on Differentiation:</strong> Just as brewers should channel investment into the nuances that shape taste—yeast strains, barrel aging, water chemistry—modern innovators must concentrate on the attributes that customers will notice and cherish.</p>
								<p style="margin-bottom: 0;"><strong style="color: #8333C5;">The Power of the Invisible Backbone:</strong> Those electric utilities occupied an enviable strategic position. They provided mission-critical infrastructure with minimal threat of substitution—owning that kind of "pipe" or platform can yield enduring defensibility and profitability.</p>
							</div>
							
							<p style="font-style: italic; color: rgba(255, 255, 255, 0.7); margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.2);">The brewery-electricity saga offers more than a quaint parable—it reveals the anatomy of competitive advantage. By distinguishing between what must be bespoke and what can be commoditized, enterprises find a clearer path to growth, resilience, and lasting impact.</p>
						</div>
					</div>
				{/if}
			</div>
			
			<!-- Side illustration -->
			<div style="display: flex; justify-content: center; align-items: center;">
				<div style="position: relative;">
					<img src="/orval.png" alt="Orval Trappist Beer" style="width: 300px; height: auto; border-radius: 12px; box-shadow: 0 20px 60px rgba(241, 23, 89, 0.3); filter: brightness(1.1) contrast(1.1);" />
					<div style="position: absolute; -bottom: 1rem; left: 50%; transform: translateX(-50%); background: rgba(0, 0, 0, 0.8); color: white; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.9rem; white-space: nowrap;">
						Orval Trappist Ale
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Narrative Bridge -->
<section style="min-height: 40vh; background: linear-gradient(135deg, #2d2d2d 0%, #0f1419 100%); color: white; display: flex; align-items: center; justify-content: center; padding: 3rem 2rem;">
	<div style="max-width: 800px; text-align: center;">
		<p style="font-size: 1.6rem; line-height: 1.5; color: rgba(255, 255, 255, 0.9); font-weight: 300;">
			But knowing <em style="color: #F11759;">where to focus</em> is only half the battle.
		</p>
		<p style="font-size: 1.4rem; line-height: 1.5; color: rgba(255, 255, 255, 0.7); margin-top: 1rem;">
			Sometimes winning means doing the <strong style="color: #8333C5;">opposite</strong> of everyone else...
		</p>
	</div>
</section>

<!-- Story Section 2: Counter Positioning -->
<section class="story-section" style="min-height: 100vh; background: linear-gradient(135deg, #0f1419 0%, #1a2332 100%); color: white; display: flex; align-items: center; padding: 4rem 2rem;">
	<div style="max-width: 1200px; margin: 0 auto; width: 100%;">
		<div class="story-content">
			<h2 style="font-size: 3.2rem; font-weight: 700; margin-bottom: 1rem; background: linear-gradient(135deg, #8333C5, #D67D21); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
				Counter Positioning
			</h2>
			<h3 style="font-size: 1.8rem; font-weight: 400; margin-bottom: 2rem; color: rgba(255, 255, 255, 0.9); font-style: italic;">
				Competing on everyone's terms means playing to lose
			</h3>
			<p style="font-size: 1.5rem; line-height: 1.6; margin-bottom: 3rem; color: rgba(255, 255, 255, 0.8);">
				Sometimes the best move is to go against conventional wisdom. Dropbox's bold migration from AWS to their own infrastructure shows how counter-positioning can create competitive advantage at scale.
			</p>
			
			<button 
				class="expand-btn"
				style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); color: white; padding: 1rem 2rem; border-radius: 8px; cursor: pointer; font-size: 1.1rem; transition: all 0.3s ease;"
				on:click={() => toggleStory('counter')}
			>
				{expandedStory === 'counter' ? 'Hide Story' : 'Explore the Story'}
			</button>
			
			{#if expandedStory === 'counter'}
				<div class="expanded-story" style="margin-top: 3rem; padding: 2rem; background: rgba(0, 0, 0, 0.5); border-radius: 12px; border-left: 4px solid #8333C5;">
					<h3 style="color: #8333C5; margin-bottom: 1.5rem; font-size: 1.5rem;">Dropbox's Move from Public Cloud to On-Prem ("Magic Pocket")</h3>
					<div style="font-size: 1.1rem; line-height: 1.7; color: rgba(255, 255, 255, 0.9);">
						<p style="margin-bottom: 1.5rem;">Dropbox, once a major customer of AWS, spent years developing its own custom in-house infrastructure to store and manage user files ("Magic Pocket"). They migrated most of their workloads off AWS to their purpose-built data centers.</p>
						<h4 style="color: #D67D21; margin: 2rem 0 1rem 0;">Business results included:</h4>
						<ul style="margin-bottom: 2rem; padding-left: 1.5rem;">
							<li style="margin-bottom: 1rem;">Significant reduction in storage costs, after the initial CapEx investment, due to custom hardware tailored for their workload at scale.</li>
							<li style="margin-bottom: 1rem;">Greater control over performance and optimization for their unique file storage needs.</li>
							<li style="margin-bottom: 1rem;">Enhanced security and compliance capabilities through internal control, directly tied to Dropbox's responsibility to enterprise customers.</li>
						</ul>
						<p style="margin-bottom: 1.5rem; background: rgba(211, 125, 33, 0.2); padding: 1rem; border-radius: 8px;">Dropbox's move was successful largely because of its scale — billions of files, predictable workloads, and the resources to invest in infrastructure engineering.</p>
						<p style="font-style: italic; color: rgba(255, 255, 255, 0.7);">Organizations should weigh up-front migration costs, lost cloud flexibility, and required in-house talent against promises of savings or control.</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Second Narrative Bridge -->
<section style="min-height: 40vh; background: linear-gradient(135deg, #1a2332 0%, #2d1b4e 100%); color: white; display: flex; align-items: center; justify-content: center; padding: 3rem 2rem;">
	<div style="max-width: 800px; text-align: center;">
		<p style="font-size: 1.6rem; line-height: 1.5; color: rgba(255, 255, 255, 0.9); font-weight: 300;">
			Bold moves create advantage, but <em style="color: #D67D21;">every choice</em> has consequences.
		</p>
		<p style="font-size: 1.4rem; line-height: 1.5; color: rgba(255, 255, 255, 0.7); margin-top: 1rem;">
			The question isn't <em>whether</em> to change—it's <strong style="color: #F11759;">when and how</strong>.
		</p>
	</div>
</section>

<!-- Story Section 3: Switching Costs -->
<section class="story-section" style="min-height: 100vh; background: linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 100%); color: white; display: flex; align-items: center; padding: 4rem 2rem;">
	<div style="max-width: 1200px; margin: 0 auto; width: 100%;">
		<div class="story-content">
			<h2 style="font-size: 4rem; font-weight: 700; margin-bottom: 2rem; background: linear-gradient(135deg, #D67D21, #F11759); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
				Switching costs do and will impact your business
			</h2>
			<p style="font-size: 1.5rem; line-height: 1.6; margin-bottom: 3rem; color: rgba(255, 255, 255, 0.8);">
				Every technology decision carries switching costs. The question isn't whether to switch, but when and how. Learn from SAP's massive cloud migration and Netflix's continuous evolution strategy.
			</p>
			
			<button 
				class="expand-btn"
				style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); color: white; padding: 1rem 2rem; border-radius: 8px; cursor: pointer; font-size: 1.1rem; transition: all 0.3s ease;"
				on:click={() => toggleStory('switching')}
			>
				{expandedStory === 'switching' ? 'Hide Stories' : 'Explore the Stories'}
			</button>
			
			{#if expandedStory === 'switching'}
				<div class="expanded-story" style="margin-top: 3rem;">
					<div style="padding: 2rem; background: rgba(0, 0, 0, 0.5); border-radius: 12px; border-left: 4px solid #D67D21; margin-bottom: 2rem;">
						<h3 style="color: #D67D21; margin-bottom: 1.5rem; font-size: 1.5rem;">Success Story: SAP's Massive Cloud Migration</h3>
						<div style="font-size: 1.1rem; line-height: 1.7; color: rgba(255, 255, 255, 0.9);">
							<p style="margin-bottom: 1.5rem;">SAP made a bold decision to move from on-premises to cloud by migrating nine large data centers onto a resilient, scalable cloud platform over a short timeframe.</p>
							<h4 style="color: #F11759; margin: 2rem 0 1rem 0;">Business Impact:</h4>
							<ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
								<li style="margin-bottom: 1rem;">Post-migration, complexity dropped drastically from nine data centers to three cloud platforms, streamlining operations.</li>
								<li style="margin-bottom: 1rem;">SAP significantly improved scalability, security, and performance, enabling rapid innovation in their SuccessFactors cloud HR applications.</li>
								<li style="margin-bottom: 1rem;">Despite short-term switching costs, this long-term move ensured SAP remained a market leader and innovation driver.</li>
							</ul>
						</div>
					</div>
					
					<div style="padding: 2rem; background: rgba(0, 0, 0, 0.5); border-radius: 12px; border-left: 4px solid #F11759;">
						<h3 style="color: #F11759; margin-bottom: 1.5rem; font-size: 1.5rem;">Alternative Success: Netflix's Continuous Investment</h3>
						<div style="font-size: 1.1rem; line-height: 1.7; color: rgba(255, 255, 255, 0.9);">
							<p style="margin-bottom: 1.5rem;">Netflix chose continuous investment over switching, developing advanced proprietary tools (Chaos Monkey, Spinnaker, Atlas) that made their cloud infrastructure highly resilient and scalable.</p>
							<h4 style="color: #8333C5; margin: 2rem 0 1rem 0;">Business Impact:</h4>
							<ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
								<li style="margin-bottom: 1rem;">Continuous investments significantly improved deployment speed, service reliability, and customer experience without disruption.</li>
								<li style="margin-bottom: 1rem;">This approach reduced technical debt by incrementally evolving architecture with new technologies.</li>
								<li style="margin-bottom: 1rem;">Led Netflix to dominate streaming services globally, continuously innovating with high ROI on their cloud investment.</li>
							</ul>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Strategic Synthesis Section -->
<section style="min-height: 80vh; background: linear-gradient(135deg, #1a1a2e 0%, #000 50%, #1a1a1a 100%); color: white; display: flex; align-items: center; padding: 4rem 2rem;">
	<div style="max-width: 1000px; margin: 0 auto; text-align: center;">
		<h2 style="font-size: 3.5rem; font-weight: 700; margin-bottom: 3rem; background: linear-gradient(135deg, #F11759, #8333C5, #D67D21); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
			Three Strategic Principles That Separate Winners from Everyone Else
		</h2>
		
		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; margin-bottom: 4rem;">
			<div style="padding: 2rem; background: rgba(241, 23, 89, 0.1); border-radius: 12px; border-left: 4px solid #F11759;">
				<h3 style="color: #F11759; font-size: 1.4rem; margin-bottom: 1rem;">Focus Relentlessly</h3>
				<p style="color: rgba(255, 255, 255, 0.8); line-height: 1.6;">Distinguish between what must be bespoke and what can be commoditized. Invest only in what customers notice and value.</p>
			</div>
			<div style="padding: 2rem; background: rgba(131, 51, 197, 0.1); border-radius: 12px; border-left: 4px solid #8333C5;">
				<h3 style="color: #8333C5; font-size: 1.4rem; margin-bottom: 1rem;">Think Differently</h3>
				<p style="color: rgba(255, 255, 255, 0.8); line-height: 1.6;">Counter-positioning creates advantage. Sometimes the winning move is doing the opposite of conventional wisdom.</p>
			</div>
			<div style="padding: 2rem; background: rgba(214, 125, 33, 0.1); border-radius: 12px; border-left: 4px solid #D67D21;">
				<h3 style="color: #D67D21; font-size: 1.4rem; margin-bottom: 1rem;">Choose Wisely</h3>
				<p style="color: rgba(255, 255, 255, 0.8); line-height: 1.6;">Every decision has switching costs. Success comes from knowing when to evolve and when to revolutionize.</p>
			</div>
		</div>
		
		<p style="font-size: 1.3rem; color: rgba(255, 255, 255, 0.7); margin-bottom: 3rem; font-style: italic;">
			We've applied these principles across Fortune 500 companies and emerging startups alike
		</p>
		
		<div style="color: rgba(255, 255, 255, 0.5); animation: bounce 2s infinite;">
			See these principles in action ↓
		</div>
	</div>
</section>

<!-- Company Sections Start Here -->
<section id="companies-intro" style="min-height: 30vh; background: #000; color: white; display: flex; align-items: center; justify-content: center; text-align: center; padding: 2rem;">
	<div>
		<h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: rgba(255, 255, 255, 0.9);">
			Trusted by Industry Leaders
		</h2>
	</div>
</section>


<Nike />
<IBM />
<Philips />

<!-- Transition back to main navigation -->
<section style="min-height: 50vh; background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); color: white; display: flex; align-items: center; justify-content: center; text-align: center; padding: 4rem 2rem;">
	<div>
		<div style="margin-bottom: 3rem;">
			<p class="brand-gradient-text" style="font-size: 1.2rem; opacity: 0.8; font-weight: 500; margin-bottom: 2rem;">
				Zero to One Solutions
			</p>
		</div>
	</div>
</section>

<ABVV />


<!-- Transition back to main navigation -->
<section style="min-height: 50vh; background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); color: white; display: flex; align-items: center; justify-content: center; text-align: center; padding: 4rem 2rem;">
	<div>
		<div style="margin-bottom: 3rem;">
			<p class="brand-gradient-text" style="font-size: 1.2rem; opacity: 0.8; font-weight: 500; margin-bottom: 2rem;">
				Zero to One Solutions
			</p>
		</div>
		<h2 style="font-size: 2.5rem; margin-bottom: 2rem; color: white;">
			Ready to write your story?
		</h2>
		<nav style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
			<a href="/solutions" class="btn btn-primary" style="background: linear-gradient(135deg, #F11759, #8333C5); color: white; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: transform 0.3s ease;">
				Solutions
			</a>
			<a href="/portfolio" class="btn btn-secondary" style="background: rgba(255, 255, 255, 0.1); color: white; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; border: 1px solid rgba(255, 255, 255, 0.3); transition: all 0.3s ease;">
				Portfolio
			</a>
			<a href="/about" class="btn btn-secondary" style="background: rgba(255, 255, 255, 0.1); color: white; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; border: 1px solid rgba(255, 255, 255, 0.3); transition: all 0.3s ease;">
				About
			</a>
		</nav>
	</div>
</section>

<style>
	@keyframes bounce {
		0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
		40% { transform: translateY(-10px); }
		60% { transform: translateY(-5px); }
	}
	
	.expand-btn:hover {
		background: rgba(255, 255, 255, 0.2) !important;
		transform: translateY(-2px);
	}
	
	
	:global(html) {
		scroll-behavior: smooth;
	}
	
	.expanded-story {
		animation: fadeIn 0.5s ease-out;
	}
	
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
