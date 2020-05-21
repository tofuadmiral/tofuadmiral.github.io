<script>
	import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte'
	import FaGithub from 'svelte-icons/fa/FaGithub.svelte'
	import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'
	import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte'
	export let segment;
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(212,63,204,0);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li1 {
		display: block;
		float: left;
		text-decoration-color: #d83ccc
	}

	li2 {
		display: block;
		float: left;
	}

	li3 {
		display: block;
		float: right;
	}

	.links {
    	display: flex;
   		flex-direction: row;
    	justify-content: space-between;
    	align-items: center;
    	width: 12rem;
  	}

	.icon {
		color: black;
		width: 32px;
		height: 32px;
	}


	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(212,63,204);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul>
		<li1><a aria-current='{segment === undefined ? "page" : undefined}' href='.'><strong><span style='color:#d83ccc'>fuad ali</span></strong></a></li1>
		<li2><a rel=prefetch aria-current='{segment === "blog" ? "page" : undefined}' href='blog'>blog</a></li2>
		<li2><a aria-current='{segment === "resume" ? "page" : undefined}' href='resume.pdf'>resume</a></li2>
		<li2><a rel=prefetch aria-current='{segment === "podcast" ? "page" : undefined}' href='http://bit.ly/adultverse'>podcast</a></li2>


		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->

		<li3><a class="icon" rel=prefetch aria-current='{segment === "right" ? "page" : undefined}' href='http://linkedin.com/in/ahmedfuadali'><FaLinkedin /></a></li3>
		<li3><a class="icon" rel=prefetch aria-current='{segment === "right" ? "page" : undefined}' href='http://github.com/tofuadmiral'><FaGithub /></a></li3>
		<li3><a class="icon" rel=prefetch aria-current='{segment === "right" ? "page" : undefined}' href='http://instagram.com/tofuadmiral'><FaInstagram /></a></li3>
		<li3><a class="icon" rel=prefetch aria-current='{segment === "right" ? "page" : undefined}' href='http://twitter.com/tofuadmiral'><FaTwitter /></a></li3>

	</ul>

</nav>
