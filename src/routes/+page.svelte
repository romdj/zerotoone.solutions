<script lang="ts">
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
					In the waning years of the nineteenth century, as the Second Industrial Revolution unfolded across Europe, a quiet but profound transformation was taking shape in the world of brewing.
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

<!-- Nike Section - Athletic Performance IR Style -->
<section class="company-section nike-section" style="min-height: 100vh; background: #f8f9fa; color: #1a1a1a; display: flex; align-items: center; padding: 4rem 2rem;">
	<div style="max-width: 1200px; margin: 0 auto; width: 100%;">
		<!-- Corporate Header -->
		<div style="text-align: center; margin-bottom: 4rem;">
			<div style="display: inline-block; padding: 0.5rem 1.5rem; background: #FF6B35; color: white; border-radius: 4px; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem;">
				Nike Inc.
			</div>
			<h2 style="font-size: 2.8rem; font-weight: 300; color: #1a1a1a; margin-bottom: 1rem;">
				Supply Chain Revolution
			</h2>
			<p style="font-size: 1.1rem; color: #666; max-width: 600px; margin: 0 auto;">
				Architecting next-generation supply chain infrastructure for global athletic performance
			</p>
		</div>

		<!-- Content Grid -->
		<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start;">
			<!-- Key Metrics Card -->
			<div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); border-left: 4px solid #FF6B35;">
				<h3 style="font-size: 1.2rem; font-weight: 600; color: #FF6B35; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.5px;">
					Project Impact
				</h3>
				<div style="margin-bottom: 2rem;">
					<div style="display: flex; justify-content: between; margin-bottom: 1rem;">
						<span style="color: #666; font-size: 0.95rem;">Team Size:</span>
						<span style="font-weight: 600; color: #1a1a1a;">12 Engineers</span>
					</div>
					<div style="display: flex; justify-content: between; margin-bottom: 1rem;">
						<span style="color: #666; font-size: 0.95rem;">Architecture:</span>
						<span style="font-weight: 600; color: #1a1a1a;">Event-Driven</span>
					</div>
					<div style="display: flex; justify-content: between;">
						<span style="color: #666; font-size: 0.95rem;">Scale:</span>
						<span style="font-weight: 600; color: #1a1a1a;">Global Operations</span>
					</div>
				</div>
				<div style="padding: 1rem; background: #f8f9fa; border-radius: 4px; border-left: 3px solid #FF6B35;">
					<p style="font-size: 0.9rem; color: #1a1a1a; margin: 0; font-style: italic;">
						"Enabling real-time inventory visibility across Nike's global supply network"
					</p>
				</div>
			</div>

			<!-- Technical Details Card -->
			<div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
				<h3 style="font-size: 1.2rem; font-weight: 600; color: #1a1a1a; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.5px;">
					Technical Excellence
				</h3>
				<ul style="list-style: none; padding: 0; margin: 0;">
					<li style="padding: 0.75rem 0; border-bottom: 1px solid #eee; display: flex; align-items: center;">
						<span style="width: 8px; height: 8px; background: #FF6B35; border-radius: 50%; margin-right: 1rem;"></span>
						<span style="color: #1a1a1a; font-size: 0.95rem;">Microservices Architecture</span>
					</li>
					<li style="padding: 0.75rem 0; border-bottom: 1px solid #eee; display: flex; align-items: center;">
						<span style="width: 8px; height: 8px; background: #FF6B35; border-radius: 50%; margin-right: 1rem;"></span>
						<span style="color: #1a1a1a; font-size: 0.95rem;">Real-time Data Processing</span>
					</li>
					<li style="padding: 0.75rem 0; border-bottom: 1px solid #eee; display: flex; align-items: center;">
						<span style="width: 8px; height: 8px; background: #FF6B35; border-radius: 50%; margin-right: 1rem;"></span>
						<span style="color: #1a1a1a; font-size: 0.95rem;">Global Scalability</span>
					</li>
					<li style="padding: 0.75rem 0; display: flex; align-items: center;">
						<span style="width: 8px; height: 8px; background: #FF6B35; border-radius: 50%; margin-right: 1rem;"></span>
						<span style="color: #1a1a1a; font-size: 0.95rem;">Enterprise Integration</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- IBM Section - Corporate Blue IR Style -->
<section class="company-section ibm-section" style="min-height: 100vh; background: #ffffff; color: #1a1a1a; display: flex; align-items: center; padding: 4rem 2rem;">
	<div style="max-width: 1200px; margin: 0 auto; width: 100%;">
		<!-- Corporate Header -->
		<div style="text-align: center; margin-bottom: 4rem;">
			<div style="display: inline-block; padding: 0.5rem 1.5rem; background: #0530AD; color: white; border-radius: 2px; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem; font-family: 'IBM Plex Sans', sans-serif;">
				IBM Corporation
			</div>
			<h2 style="font-size: 2.8rem; font-weight: 300; color: #1a1a1a; margin-bottom: 1rem; font-family: 'IBM Plex Sans', sans-serif;">
				Hybrid Cloud & AI Solutions
			</h2>
			<p style="font-size: 1.1rem; color: #666; max-width: 600px; margin: 0 auto;">
				Enterprise-grade IoT and data pipeline architecture for mission-critical operations
			</p>
		</div>

		<!-- Content Grid -->
		<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; align-items: start;">
			<!-- Main Content Card -->
			<div style="background: #f8f9fa; padding: 2.5rem; border-radius: 2px; border-left: 4px solid #0530AD;">
				<h3 style="font-size: 1.3rem; font-weight: 600; color: #0530AD; margin-bottom: 1.5rem; font-family: 'IBM Plex Sans', sans-serif;">
					ENTERPRISE ARCHITECTURE
				</h3>
				<p style="font-size: 1.1rem; line-height: 1.7; color: #333; margin-bottom: 2rem;">
					Designed and implemented enterprise-grade IoT solutions processing millions of sensor readings daily. Our architecture delivers the scale, reliability, and real-time analytics capabilities required for modern industrial operations.
				</p>
				
				<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
					<div style="background: white; padding: 1.5rem; border-radius: 2px; border-top: 3px solid #0530AD;">
						<h4 style="font-size: 0.9rem; font-weight: 600; color: #0530AD; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px;">
							Scale
						</h4>
						<p style="font-size: 1.4rem; font-weight: 300; color: #1a1a1a; margin: 0;">
							Millions of daily transactions
						</p>
					</div>
					<div style="background: white; padding: 1.5rem; border-radius: 2px; border-top: 3px solid #0530AD;">
						<h4 style="font-size: 0.9rem; font-weight: 600; color: #0530AD; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px;">
							Reliability
						</h4>
						<p style="font-size: 1.4rem; font-weight: 300; color: #1a1a1a; margin: 0;">
							99.9% uptime SLA
						</p>
					</div>
				</div>

				<div style="background: #0530AD; color: white; padding: 1.5rem; border-radius: 2px;">
					<p style="font-size: 0.95rem; margin: 0; font-style: italic;">
						"Powering digital transformation through intelligent infrastructure design"
					</p>
				</div>
			</div>

			<!-- Technical Stack Card -->
			<div style="background: white; padding: 2rem; border-radius: 2px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #e0e0e0;">
				<h3 style="font-size: 1.1rem; font-weight: 600; color: #1a1a1a; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.5px;">
					Technology Stack
				</h3>
				<div style="space-y: 1rem;">
					<div style="padding: 0.75rem 0; border-bottom: 1px solid #f0f0f0;">
						<div style="font-size: 0.85rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.25rem;">Cloud Platform</div>
						<div style="font-size: 0.95rem; color: #1a1a1a; font-weight: 500;">IBM Cloud / Red Hat OpenShift</div>
					</div>
					<div style="padding: 0.75rem 0; border-bottom: 1px solid #f0f0f0;">
						<div style="font-size: 0.85rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.25rem;">Data Processing</div>
						<div style="font-size: 0.95rem; color: #1a1a1a; font-weight: 500;">Real-time Analytics</div>
					</div>
					<div style="padding: 0.75rem 0; border-bottom: 1px solid #f0f0f0;">
						<div style="font-size: 0.85rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.25rem;">Integration</div>
						<div style="font-size: 0.95rem; color: #1a1a1a; font-weight: 500;">Enterprise APIs</div>
					</div>
					<div style="padding: 0.75rem 0;">
						<div style="font-size: 0.85rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.25rem;">Security</div>
						<div style="font-size: 0.95rem; color: #1a1a1a; font-weight: 500;">Zero Trust Architecture</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Philips Section - Healthcare IR Style -->
<section class="company-section philips-section" style="min-height: 100vh; background: #f4f7f9; color: #1a1a1a; display: flex; align-items: center; padding: 4rem 2rem;">
	<div style="max-width: 1200px; margin: 0 auto; width: 100%;">
		<!-- Corporate Header -->
		<div style="text-align: center; margin-bottom: 4rem;">
			<div style="display: inline-block; padding: 0.5rem 1.5rem; background: #00A3E0; color: white; border-radius: 4px; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem;">
				Royal Philips
			</div>
			<h2 style="font-size: 2.8rem; font-weight: 300; color: #1a1a1a; margin-bottom: 1rem;">
				HealthSuite Digital Platform
			</h2>
			<p style="font-size: 1.1rem; color: #666; max-width: 600px; margin: 0 auto;">
				Meaningful innovation in health technology - connecting care, patients and data
			</p>
		</div>

		<!-- Content Layout -->
		<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
			<!-- Healthcare Innovation Card -->
			<div style="background: white; padding: 2.5rem; border-radius: 8px; box-shadow: 0 2px 16px rgba(0,163,224,0.1); border-left: 4px solid #00A3E0;">
				<h3 style="font-size: 1.3rem; font-weight: 600; color: #00A3E0; margin-bottom: 2rem; text-transform: uppercase; letter-spacing: 0.5px;">
					Platform Architecture
				</h3>
				
				<div style="margin-bottom: 2rem;">
					<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
						<div style="text-align: center; padding: 1rem; background: #f4f7f9; border-radius: 8px;">
							<div style="font-size: 1.8rem; font-weight: 300; color: #00A3E0; margin-bottom: 0.25rem;">FHIR</div>
							<div style="font-size: 0.85rem; color: #666; text-transform: uppercase;">Compliant</div>
						</div>
						<div style="text-align: center; padding: 1rem; background: #f4f7f9; border-radius: 8px;">
							<div style="font-size: 1.8rem; font-weight: 300; color: #00A3E0; margin-bottom: 0.25rem;">Global</div>
							<div style="font-size: 0.85rem; color: #666; text-transform: uppercase;">Scale</div>
						</div>
					</div>
					
					<ul style="list-style: none; padding: 0; margin: 0;">
						<li style="padding: 0.5rem 0; border-bottom: 1px solid #e8ecef; display: flex; align-items: center; font-size: 0.95rem;">
							<span style="width: 6px; height: 6px; background: #00A3E0; border-radius: 50%; margin-right: 1rem;"></span>
							Cloud-native healthcare architecture
						</li>
						<li style="padding: 0.5rem 0; border-bottom: 1px solid #e8ecef; display: flex; align-items: center; font-size: 0.95rem;">
							<span style="width: 6px; height: 6px; background: #00A3E0; border-radius: 50%; margin-right: 1rem;"></span>
							Medical device connectivity
						</li>
						<li style="padding: 0.5rem 0; border-bottom: 1px solid #e8ecef; display: flex; align-items: center; font-size: 0.95rem;">
							<span style="width: 6px; height: 6px; background: #00A3E0; border-radius: 50%; margin-right: 1rem;"></span>
							Care provider integration
						</li>
						<li style="padding: 0.5rem 0; display: flex; align-items: center; font-size: 0.95rem;">
							<span style="width: 6px; height: 6px; background: #00A3E0; border-radius: 50%; margin-right: 1rem;"></span>
							Patient data management
						</li>
					</ul>
				</div>

				<div style="background: linear-gradient(135deg, #00A3E0, #0077B6); color: white; padding: 1.5rem; border-radius: 8px; text-align: center;">
					<div style="font-size: 0.9rem; margin-bottom: 0.5rem; opacity: 0.9;">"Improving lives through technology that cares"</div>
					<div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">Meaningful Innovation</div>
				</div>
			</div>

			<!-- Healthcare Impact Visual -->
			<div style="text-align: center;">
				<div style="width: 280px; height: 280px; background: linear-gradient(135deg, #00A3E0, #0077B6); border-radius: 12px; margin: 0 auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 40px rgba(0, 163, 224, 0.2); position: relative;">
					<div style="color: white; font-size: 4rem; margin-bottom: 1rem;">🏥</div>
					<div style="position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.9); color: #00A3E0; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.85rem; font-weight: 600; white-space: nowrap;">
						Healthcare Innovation
					</div>
				</div>
				<div style="margin-top: 2rem; text-align: center;">
					<div style="font-size: 1.1rem; color: #666; margin-bottom: 0.5rem;">Serving patients worldwide</div>
					<div style="font-size: 0.9rem; color: #999; text-transform: uppercase; letter-spacing: 0.5px;">Digital Health Platform</div>
				</div>
			</div>
		</div>
	</div>
</section>

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

<!-- ABVV-FGTB Section - Institutional IR Style -->
<section class="company-section abvv-section" style="min-height: 100vh; background: #f9f9f9; color: #1a1a1a; display: flex; align-items: center; padding: 4rem 2rem;">
	<div style="max-width: 1200px; margin: 0 auto; width: 100%;">
		<!-- Corporate Header -->
		<div style="text-align: center; margin-bottom: 4rem;">
			<div style="display: inline-block; padding: 0.5rem 1.5rem; background: #e75420; color: white; border-radius: 4px; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem;">
				ABVV-FGTB
			</div>
			<h2 style="font-size: 2.8rem; font-weight: 300; color: #1a1a1a; margin-bottom: 1rem;">
				Legacy System Transformation
			</h2>
			<p style="font-size: 1.1rem; color: #666; max-width: 600px; margin: 0 auto;">
				Three decades of institutional knowledge modernized for the digital age
			</p>
		</div>

		<!-- Content Grid -->
		<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 4rem; align-items: start;">
			<!-- Transformation Story Card -->
			<div style="background: white; padding: 2.5rem; border-radius: 8px; box-shadow: 0 2px 12px rgba(231,84,32,0.08); border-left: 4px solid #e75420;">
				<h3 style="font-size: 1.3rem; font-weight: 600; color: #e75420; margin-bottom: 2rem; text-transform: uppercase; letter-spacing: 0.5px;">
					Modernization Impact
				</h3>
				
				<p style="font-size: 1.1rem; line-height: 1.7; color: #333; margin-bottom: 2rem;">
					Successfully transformed three decades of AS400 mainframe systems into modern, secure architecture. This comprehensive modernization preserved critical institutional knowledge while enabling digital transformation for Belgium's largest trade union.
				</p>

				<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
					<div style="background: #f9f9f9; padding: 1.5rem; border-radius: 8px; border-top: 3px solid #e75420;">
						<h4 style="font-size: 0.9rem; font-weight: 600; color: #e75420; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px;">
							Legacy Systems
						</h4>
						<p style="font-size: 1.2rem; font-weight: 300; color: #1a1a1a; margin: 0;">
							30+ Years AS400
						</p>
					</div>
					<div style="background: #f9f9f9; padding: 1.5rem; border-radius: 8px; border-top: 3px solid #e75420;">
						<h4 style="font-size: 0.9rem; font-weight: 600; color: #e75420; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px;">
							Transformation
						</h4>
						<p style="font-size: 1.2rem; font-weight: 300; color: #1a1a1a; margin: 0;">
							Modern Architecture
						</p>
					</div>
				</div>

				<div style="background: #e75420; color: white; padding: 1.5rem; border-radius: 8px; text-align: center;">
					<div style="font-size: 0.95rem; margin-bottom: 0.5rem; font-style: italic;">
						"Bridging generations of institutional knowledge with modern technology"
					</div>
					<div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">
						Solidarity & Progress
					</div>
				</div>
			</div>

			<!-- Organization Profile Card -->
			<div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.05); border: 1px solid #e8e8e8;">
				<h3 style="font-size: 1.1rem; font-weight: 600; color: #1a1a1a; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.5px;">
					Organization Profile
				</h3>
				
				<div style="margin-bottom: 2rem;">
					<div style="padding: 0.75rem 0; border-bottom: 1px solid #f0f0f0;">
						<div style="font-size: 0.85rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.25rem;">Sector</div>
						<div style="font-size: 0.95rem; color: #1a1a1a; font-weight: 500;">Trade Union Federation</div>
					</div>
					<div style="padding: 0.75rem 0; border-bottom: 1px solid #f0f0f0;">
						<div style="font-size: 0.85rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.25rem;">Members</div>
						<div style="font-size: 0.95rem; color: #1a1a1a; font-weight: 500;">1.5+ Million</div>
					</div>
					<div style="padding: 0.75rem 0; border-bottom: 1px solid #f0f0f0;">
						<div style="font-size: 0.85rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.25rem;">Founded</div>
						<div style="font-size: 0.95rem; color: #1a1a1a; font-weight: 500;">1945</div>
					</div>
					<div style="padding: 0.75rem 0;">
						<div style="font-size: 0.85rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.25rem;">Scope</div>
						<div style="font-size: 0.95rem; color: #1a1a1a; font-weight: 500;">National (Belgium)</div>
					</div>
				</div>

				<div style="background: #f9f9f9; padding: 1.5rem; border-radius: 8px; border-left: 3px solid #e75420;">
					<div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">Key Challenge</div>
					<div style="font-size: 0.95rem; color: #1a1a1a; line-height: 1.4;">
						Modernizing critical systems while preserving decades of institutional knowledge and member data integrity
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

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
