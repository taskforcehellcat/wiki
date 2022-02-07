
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\Template.svelte generated by Svelte v3.46.4 */

    const file$3 = "src\\Template.svelte";

    function create_fragment$3(ctx) {
    	let h1;
    	let t1;
    	let section0;
    	let p0;
    	let t3;
    	let section1;
    	let p1;
    	let t5;
    	let section2;
    	let p2;
    	let t7;
    	let section3;
    	let p3;
    	let t9;
    	let section4;
    	let p4;
    	let t11;
    	let section5;
    	let p5;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Sanitäter";
    			t1 = space();
    			section0 = element("section");
    			p0 = element("p");
    			p0.textContent = "Sanitäter (von lat. sanitas „Gesundheit“) ist im Allgemeinen eine Bezeichnung für nichtärztliches Personal im Sanitäts-/Rettungsdienst oder des militärischen Sanitätswesens sowie im Speziellen für eine Person, die eine Sanitätsausbildung absolviert hat. libero ipsum ipsam quos natus error corrupti officia, animi exercitationem provident, voluptas vitae autem quis cum impedit expedita atque amet dignissimos! Sequi, labore corrupti nulla exercitationem amet nostrum? Possimus Similique ut sequi labore suscipit!";
    			t3 = space();
    			section1 = element("section");
    			p1 = element("p");
    			p1.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores necessitatibus repellendus sit perspiciatis! Pariatur impedit voluptate, nam inventore consequuntur corporis voluptates qui blanditiis repudiandae provident dolorum eveniet ipsam recusandae beatae sunt assumenda itaque, natus harum? Impedit quibusdam eaque, omnis consectetur enim rerum porro perferendis eius beatae eum tempore maxime est ea vero? Aperiam, amet nobis? Delectus voluptas alias, nostrum sint nulla exercitationem accusantium assumenda? Molestias quaerat eius fuga aut est!";
    			t5 = space();
    			section2 = element("section");
    			p2 = element("p");
    			p2.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores necessitatibus repellendus sit perspiciatis! Pariatur impedit voluptate, nam inventore consequuntur corporis voluptates qui blanditiis repudiandae provident dolorum eveniet ipsam recusandae beatae sunt assumenda itaque, natus harum? Impedit quibusdam eaque, omnis consectetur enim rerum porro perferendis eius beatae eum tempore maxime est ea vero? Aperiam, amet nobis? Delectus voluptas alias, nostrum sint nulla exercitationem accusantium assumenda? Molestias quaerat eius fuga aut est!";
    			t7 = space();
    			section3 = element("section");
    			p3 = element("p");
    			p3.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores necessitatibus repellendus sit perspiciatis! Pariatur impedit voluptate, nam inventore consequuntur corporis voluptates qui blanditiis repudiandae provident dolorum eveniet ipsam recusandae beatae sunt assumenda itaque, natus harum? Impedit quibusdam eaque, omnis consectetur enim rerum porro perferendis eius beatae eum tempore maxime est ea vero? Aperiam, amet nobis? Delectus voluptas alias, nostrum sint nulla exercitationem accusantium assumenda? Molestias quaerat eius fuga aut est!";
    			t9 = space();
    			section4 = element("section");
    			p4 = element("p");
    			p4.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores necessitatibus repellendus sit perspiciatis! Pariatur impedit voluptate, nam inventore consequuntur corporis voluptates qui blanditiis repudiandae provident dolorum eveniet ipsam recusandae beatae sunt assumenda itaque, natus harum? Impedit quibusdam eaque, omnis consectetur enim rerum porro perferendis eius beatae eum tempore maxime est ea vero? Aperiam, amet nobis? Delectus voluptas alias, nostrum sint nulla exercitationem accusantium assumenda? Molestias quaerat eius fuga aut est!";
    			t11 = space();
    			section5 = element("section");
    			p5 = element("p");
    			p5.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores necessitatibus repellendus sit perspiciatis! Pariatur impedit voluptate, nam inventore consequuntur corporis voluptates qui blanditiis repudiandae provident dolorum eveniet ipsam recusandae beatae sunt assumenda itaque, natus harum? Impedit quibusdam eaque, omnis consectetur enim rerum porro perferendis eius beatae eum tempore maxime est ea vero? Aperiam, amet nobis? Delectus voluptas alias, nostrum sint nulla exercitationem accusantium assumenda? Molestias quaerat eius fuga aut est!";
    			add_location(h1, file$3, 0, 0, 0);
    			add_location(p0, file$3, 3, 4, 54);
    			attr_dev(section0, "id", "Allgemeines");
    			add_location(section0, file$3, 2, 0, 22);
    			add_location(p1, file$3, 7, 4, 623);
    			attr_dev(section1, "id", "Rollenprofil");
    			add_location(section1, file$3, 6, 0, 590);
    			add_location(p2, file$3, 11, 4, 1230);
    			attr_dev(section2, "id", "Ausrüstung");
    			add_location(section2, file$3, 10, 0, 1199);
    			add_location(p3, file$3, 15, 4, 1843);
    			attr_dev(section3, "id", "Aufgabenbereiche");
    			add_location(section3, file$3, 14, 0, 1806);
    			add_location(p4, file$3, 19, 4, 2454);
    			attr_dev(section4, "id", "Einsatzgebiete");
    			add_location(section4, file$3, 18, 0, 2419);
    			add_location(p5, file$3, 23, 4, 3062);
    			attr_dev(section5, "id", "Kompetenzen");
    			add_location(section5, file$3, 22, 0, 3030);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section0, anchor);
    			append_dev(section0, p0);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, section1, anchor);
    			append_dev(section1, p1);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, section2, anchor);
    			append_dev(section2, p2);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, section3, anchor);
    			append_dev(section3, p3);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, section4, anchor);
    			append_dev(section4, p4);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, section5, anchor);
    			append_dev(section5, p5);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(section1);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(section2);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(section3);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(section4);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(section5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Template', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Template> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Template extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Template",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\Template_nav.svelte generated by Svelte v3.46.4 */

    const file$2 = "src\\Template_nav.svelte";

    function create_fragment$2(ctx) {
    	let a0;
    	let t1;
    	let a1;
    	let t3;
    	let a2;
    	let t5;
    	let a3;
    	let t7;
    	let a4;
    	let t9;
    	let a5;
    	let t11;
    	let a6;
    	let t13;
    	let a7;

    	const block = {
    		c: function create() {
    			a0 = element("a");
    			a0.textContent = "Allgemein";
    			t1 = space();
    			a1 = element("a");
    			a1.textContent = "Rollenprofil";
    			t3 = space();
    			a2 = element("a");
    			a2.textContent = "Ausrüstung";
    			t5 = space();
    			a3 = element("a");
    			a3.textContent = "Aufgabenbereiche";
    			t7 = space();
    			a4 = element("a");
    			a4.textContent = "Einsatzgebiete";
    			t9 = space();
    			a5 = element("a");
    			a5.textContent = "Kompetenzen";
    			t11 = space();
    			a6 = element("a");
    			a6.textContent = "Ausbildungsgehalt";
    			t13 = space();
    			a7 = element("a");
    			a7.textContent = "Kanonenfuttergrad";
    			attr_dev(a0, "href", "/");
    			add_location(a0, file$2, 0, 0, 0);
    			attr_dev(a1, "href", "/");
    			add_location(a1, file$2, 1, 0, 27);
    			attr_dev(a2, "href", "/");
    			add_location(a2, file$2, 2, 0, 57);
    			attr_dev(a3, "href", "/");
    			add_location(a3, file$2, 3, 0, 85);
    			attr_dev(a4, "href", "/");
    			add_location(a4, file$2, 4, 0, 119);
    			attr_dev(a5, "href", "/");
    			add_location(a5, file$2, 5, 0, 151);
    			attr_dev(a6, "href", "/");
    			add_location(a6, file$2, 6, 0, 180);
    			attr_dev(a7, "href", "/");
    			add_location(a7, file$2, 7, 0, 215);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, a1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, a2, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, a3, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, a4, anchor);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, a5, anchor);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, a6, anchor);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, a7, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(a1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(a2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(a3);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(a4);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(a5);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(a6);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(a7);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Template_nav', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Template_nav> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Template_nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Template_nav",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\Template_img.svelte generated by Svelte v3.46.4 */

    const file$1 = "src\\Template_img.svelte";

    function create_fragment$1(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t = text("\r\n    ein average Sanitäter enjoyer");
    			attr_dev(img, "alt", "enjoyer");
    			if (!src_url_equal(img.src, img_src_value = "./images/enjoyer.png")) attr_dev(img, "src", img_src_value);
    			add_location(img, file$1, 1, 4, 11);
    			add_location(div, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Template_img', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Template_img> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Template_img extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Template_img",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.46.4 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let nav;
    	let div0;
    	let t0;
    	let span0;
    	let t2;
    	let div1;
    	let span1;
    	let t4;
    	let input;
    	let t5;
    	let div2;
    	let t7;
    	let div6;
    	let div4;
    	let div3;
    	let t8;
    	let div5;
    	let t9;
    	let div7;
    	let t11;
    	let a;
    	let t13;
    	let main;
    	let template;
    	let t14;
    	let footer;
    	let current;
    	template = new Template({ $$inline: true });

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			div0 = element("div");
    			t0 = text("TFHC ");
    			span0 = element("span");
    			span0.textContent = "Wiki";
    			t2 = space();
    			div1 = element("div");
    			span1 = element("span");
    			span1.textContent = "search";
    			t4 = space();
    			input = element("input");
    			t5 = space();
    			div2 = element("div");
    			div2.textContent = "navigation";
    			t7 = space();
    			div6 = element("div");
    			div4 = element("div");
    			div3 = element("div");
    			t8 = space();
    			div5 = element("div");
    			t9 = space();
    			div7 = element("div");
    			div7.textContent = "wiki";
    			t11 = space();
    			a = element("a");
    			a.textContent = "Return";
    			t13 = space();
    			main = element("main");
    			create_component(template.$$.fragment);
    			t14 = space();
    			footer = element("footer");
    			add_location(span0, file, 32, 26, 1070);
    			attr_dev(div0, "id", "nav-logo");
    			add_location(div0, file, 32, 2, 1046);
    			attr_dev(span1, "class", "material-icons");
    			add_location(span1, file, 34, 3, 1123);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "name", "search");
    			attr_dev(input, "placeholder", "Wiki durchsuchen...");
    			add_location(input, file, 35, 3, 1170);
    			attr_dev(div1, "id", "nav-search");
    			add_location(div1, file, 33, 2, 1097);
    			attr_dev(div2, "class", "nav-list-title");
    			add_location(div2, file, 40, 2, 1264);
    			attr_dev(div3, "id", "nav-list-bar-thumb");
    			add_location(div3, file, 43, 4, 1373);
    			attr_dev(div4, "id", "nav-list-bar");
    			add_location(div4, file, 42, 3, 1344);
    			attr_dev(div5, "id", "nav-list");
    			add_location(div5, file, 46, 2, 1429);
    			attr_dev(div6, "id", "nav-list-wrapper");
    			add_location(div6, file, 41, 2, 1312);
    			attr_dev(div7, "class", "nav-list-title");
    			add_location(div7, file, 49, 2, 1472);
    			attr_dev(a, "id", "return-button");
    			add_location(a, file, 50, 2, 1514);
    			add_location(nav, file, 31, 1, 1037);
    			add_location(main, file, 55, 1, 1569);
    			add_location(footer, file, 65, 0, 1618);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, div0);
    			append_dev(div0, t0);
    			append_dev(div0, span0);
    			append_dev(nav, t2);
    			append_dev(nav, div1);
    			append_dev(div1, span1);
    			append_dev(div1, t4);
    			append_dev(div1, input);
    			append_dev(nav, t5);
    			append_dev(nav, div2);
    			append_dev(nav, t7);
    			append_dev(nav, div6);
    			append_dev(div6, div4);
    			append_dev(div4, div3);
    			append_dev(div6, t8);
    			append_dev(div6, div5);
    			append_dev(nav, t9);
    			append_dev(nav, div7);
    			append_dev(nav, t11);
    			append_dev(nav, a);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(template, main, null);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, footer, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(template.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(template.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(main);
    			destroy_component(template);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(footer);
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

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);

    	onMount(() => {
    		const thumb = document.getElementById("nav-list-bar-thumb");
    		const sections = document.querySelectorAll("section");
    		const navList = document.getElementById('nav-list');
    		var sectionsArr = [];

    		/* Konvertiert "Sections" NodeList zu Array (falls man's mal brauch x) */
    		for (var i = sections.length; i--; sectionsArr.unshift(sections[i])) ;

    		/* Fügt h2 zu allen elementen der NodeList */
    		sectionsArr.forEach(element => {
    			element.insertAdjacentHTML("afterBegin", "<h2>" + element.id + "</h2>");
    			navList.innerHTML += '<a href="#' + element.id + '">' + element.id + '</a>';
    		});

    		/* setzt nav-list-bar-thumb auf genaue höhe von einem navi punkt */
    		thumb.style.height = 1 / sections.length * 100 + "%";
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		Template,
    		Template_nav,
    		Template_img,
    		element
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
