<style>
	* {
		margin: 0;
		padding: 0;
	}
	.imgbox {
		display: grid;
		height: 100%;
	}
	.center-fit {
		max-width: 100%;
		max-height: 100vh;
		margin: auto;
	}

	img {
		width: 100%;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>fuad ali</title>
</svelte:head>

<div class="imgbox">
	<img class="center-fit" src="../abstractHeader.png" alt="header">
</div>


<p>Schedule a  ☕️ chat! </p>



<body>


<!-- Calendly inline widget begin -->
<div class="calendly-inline-widget" data-url="https://calendly.com/tofuadmiral" style="min-width:320px;height:630px;"></div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>
<!-- Calendly inline widget end -->
</body>

