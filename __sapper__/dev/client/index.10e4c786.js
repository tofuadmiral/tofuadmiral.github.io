import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, a as space, e as element, t as text, q as query_selector_all, b as detach_dev, c as claim_space, f as claim_element, g as children, h as claim_text, j as attr_dev, k as add_location, l as set_style, m as insert_dev, n as append_dev, o as noop } from './client.7bc42eb3.js';

/* src/routes/index.svelte generated by Svelte v3.22.3 */

const file = "src/routes/index.svelte";

function create_fragment(ctx) {
	let t0;
	let body;
	let p0;
	let img;
	let img_src_value;
	let t1;
	let p1;
	let t2;
	let t3;
	let div;
	let t4;
	let script;
	let script_src_value;
	let t5;
	let a;
	let t6;

	const block = {
		c: function create() {
			t0 = space();
			body = element("body");
			p0 = element("p");
			img = element("img");
			t1 = space();
			p1 = element("p");
			t2 = text("Schedule a ☕️ chat!");
			t3 = space();
			div = element("div");
			t4 = space();
			script = element("script");
			t5 = space();
			a = element("a");
			t6 = text("Image from pngtree.com");
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1aem0xo\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			body = claim_element(nodes, "BODY", {});
			var body_nodes = children(body);
			p0 = claim_element(body_nodes, "P", { class: true });
			var p0_nodes = children(p0);
			img = claim_element(p0_nodes, "IMG", { src: true, alt: true, class: true });
			p0_nodes.forEach(detach_dev);
			t1 = claim_space(body_nodes);
			p1 = claim_element(body_nodes, "P", { class: true });
			var p1_nodes = children(p1);
			t2 = claim_text(p1_nodes, "Schedule a ☕️ chat!");
			p1_nodes.forEach(detach_dev);
			t3 = claim_space(body_nodes);

			div = claim_element(body_nodes, "DIV", {
				class: true,
				"data-url": true,
				style: true
			});

			children(div).forEach(detach_dev);
			t4 = claim_space(body_nodes);
			script = claim_element(body_nodes, "SCRIPT", { type: true, src: true });
			var script_nodes = children(script);
			script_nodes.forEach(detach_dev);
			t5 = claim_space(body_nodes);
			a = claim_element(body_nodes, "A", { href: true });
			var a_nodes = children(a);
			t6 = claim_text(a_nodes, "Image from pngtree.com");
			a_nodes.forEach(detach_dev);
			body_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document.title = "fuad ali";
			if (img.src !== (img_src_value = "abstractHeader.png")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Site Header");
			attr_dev(img, "class", "svelte-1kk9opm");
			add_location(img, file, 42, 4, 446);
			attr_dev(p0, "class", "svelte-1kk9opm");
			add_location(p0, file, 41, 0, 438);
			attr_dev(p1, "class", "svelte-1kk9opm");
			add_location(p1, file, 47, 1, 519);
			attr_dev(div, "class", "calendly-inline-widget");
			attr_dev(div, "data-url", "https://calendly.com/tofuadmiral");
			set_style(div, "min-width", "320px");
			set_style(div, "height", "630px");
			add_location(div, file, 49, 0, 584);
			attr_dev(script, "type", "text/javascript");
			if (script.src !== (script_src_value = "https://assets.calendly.com/assets/external/widget.js")) attr_dev(script, "src", script_src_value);
			add_location(script, file, 50, 0, 709);
			attr_dev(a, "href", "https://pngtree.com/so/abstract");
			add_location(a, file, 52, 0, 881);
			add_location(body, file, 39, 0, 430);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, body, anchor);
			append_dev(body, p0);
			append_dev(p0, img);
			append_dev(body, t1);
			append_dev(body, p1);
			append_dev(p1, t2);
			append_dev(body, t3);
			append_dev(body, div);
			append_dev(body, t4);
			append_dev(body, script);
			append_dev(body, t5);
			append_dev(body, a);
			append_dev(a, t6);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(body);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props) {
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Routes> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Routes", $$slots, []);
	return [];
}

class Routes extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Routes",
			options,
			id: create_fragment.name
		});
	}
}

export default Routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguMTBlNGM3ODYuanMiLCJzb3VyY2VzIjpbXSwic291cmNlc0NvbnRlbnQiOltdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==