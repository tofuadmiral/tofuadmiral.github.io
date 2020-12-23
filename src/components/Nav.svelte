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
		<li2><a rel=prefetch aria-current='{segment === "reads" ? "page" : undefined}' href='https://www.goodreads.com/user/show/32757702-fuad-ali'>reads</a></li2>
		<li2><a rel=prefetch aria-current='{segment === "blog" ? "page" : undefined}' href='http://medium.com/@tofuadmiral'>blog</a></li2>
		<li2><a aria-current='{segment === "resume" ? "page" : undefined}' href='resume.pdf'>resume</a></li2>
		<li2><a rel=prefetch aria-current='{segment === "podcast" ? "page" : undefined}' href='http://bit.ly/adultverse'>podcast</a></li2>
	</ul>

</nav>
