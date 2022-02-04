
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
    	let section0;
    	let h1;
    	let t1;
    	let p0;
    	let t3;
    	let p1;
    	let t5;
    	let section1;
    	let h20;
    	let t7;
    	let p2;
    	let t9;
    	let p3;
    	let t11;
    	let img;
    	let img_src_value;
    	let t12;
    	let section2;
    	let h21;
    	let t14;
    	let p4;
    	let t16;
    	let p5;

    	const block = {
    		c: function create() {
    			section0 = element("section");
    			h1 = element("h1");
    			h1.textContent = "Sanitäter";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "Sanitäter (von lat. sanitas „Gesundheit“) ist im Allgemeinen eine Bezeichnung für nichtärztliches Personal im Sanitäts-/Rettungsdienst oder des militärischen Sanitätswesens sowie im Speziellen für eine Person, die eine Sanitätsausbildung absolviert hat.";
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = "Similique ut sequi labore suscipit! Doloremque nihil sapiente, at excepturi obcaecati similique fuga ut soluta veniam officiis, iste rerum provident amet dignissimos magnam nisi debitis id qui nemo sit aspernatur vitae. Cum asperiores, ullam in facere, corrupti.";
    			t5 = space();
    			section1 = element("section");
    			h20 = element("h2");
    			h20.textContent = "Allgemein";
    			t7 = space();
    			p2 = element("p");
    			p2.textContent = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos praesentium sit, ut debitis mollitia natus dolorum nulla aliquid quia, eligendi quibusdam eum quos asperiores possimus recusandae vero saepe odio vel quam quidem. Natus minus similique inventore, rem tempore in velit eveniet placeat. Aliquam optio nihil ducimus totam vitae obcaecati officiis ab quas ipsa doloremque! Quod molestias, optio maiores sit fugit explicabo asperiores! Beatae doloremque neque eum, veniam rem et.";
    			t9 = space();
    			p3 = element("p");
    			p3.textContent = "similique ut sequi labore suscipit! Doloremque nihil sapiente, at excepturi obcaecati similique fuga ut soluta veniam officiis, iste rerum provident amet dignissimos magnam nisi debitis id qui nemo sit aspernatur vitae. Cum asperiores, ullam in facere, corrupti.";
    			t11 = space();
    			img = element("img");
    			t12 = space();
    			section2 = element("section");
    			h21 = element("h2");
    			h21.textContent = "Ziele";
    			t14 = space();
    			p4 = element("p");
    			p4.textContent = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos praesentium sit, ut debitis mollitia natus dolorum nulla aliquid quia, eligendi quibusdam eum quos asperiores possimus recusandae vero saepe odio vel quam quidem. Natus minus similique inventore, rem tempore in velit eveniet placeat. Aliquam optio nihil ducimus totam vitae obcaecati officiis ab quas ipsa doloremque! Quod molestias, optio maiores sit fugit explicabo asperiores! Beatae doloremque neque eum, veniam rem et.";
    			t16 = space();
    			p5 = element("p");
    			p5.textContent = "similique ut sequi labore suscipit! Doloremque nihil sapiente, at excepturi obcaecati similique fuga ut soluta veniam officiis, iste rerum provident amet dignissimos magnam nisi debitis id qui nemo sit aspernatur vitae. Cum asperiores, ullam in facere, corrupti.";
    			add_location(h1, file$3, 1, 4, 15);
    			add_location(p0, file$3, 2, 4, 39);
    			add_location(p1, file$3, 3, 4, 305);
    			add_location(section0, file$3, 0, 0, 0);
    			add_location(h20, file$3, 7, 4, 605);
    			add_location(p2, file$3, 8, 4, 629);
    			add_location(p3, file$3, 9, 4, 1135);
    			attr_dev(img, "alt", "sanitäter bild");
    			if (!src_url_equal(img.src, img_src_value = "./img/sani.jpg")) attr_dev(img, "src", img_src_value);
    			add_location(img, file$3, 10, 4, 1410);
    			add_location(section1, file$3, 6, 0, 590);
    			add_location(h21, file$3, 14, 4, 1488);
    			add_location(p4, file$3, 15, 4, 1508);
    			add_location(p5, file$3, 16, 4, 2014);
    			add_location(section2, file$3, 13, 0, 1473);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section0, anchor);
    			append_dev(section0, h1);
    			append_dev(section0, t1);
    			append_dev(section0, p0);
    			append_dev(section0, t3);
    			append_dev(section0, p1);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, section1, anchor);
    			append_dev(section1, h20);
    			append_dev(section1, t7);
    			append_dev(section1, p2);
    			append_dev(section1, t9);
    			append_dev(section1, p3);
    			append_dev(section1, t11);
    			append_dev(section1, img);
    			insert_dev(target, t12, anchor);
    			insert_dev(target, section2, anchor);
    			append_dev(section2, h21);
    			append_dev(section2, t14);
    			append_dev(section2, p4);
    			append_dev(section2, t16);
    			append_dev(section2, p5);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section0);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(section1);
    			if (detaching) detach_dev(t12);
    			if (detaching) detach_dev(section2);
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
    			if (!src_url_equal(img.src, img_src_value = "./img/enjoyer.png")) attr_dev(img, "src", img_src_value);
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
    	let header;
    	let div0;
    	let a;
    	let span0;
    	let t1;
    	let t2;
    	let div1;
    	let span1;
    	let span2;
    	let t5;
    	let main;
    	let div5;
    	let div2;
    	let img;
    	let img_src_value;
    	let t6;
    	let div4;
    	let div3;
    	let t8;
    	let template_nav;
    	let t9;
    	let div6;
    	let template;
    	let t10;
    	let div7;
    	let template_img;
    	let t11;
    	let footer;
    	let current;
    	template_nav = new Template_nav({ $$inline: true });
    	template = new Template({ $$inline: true });
    	template_img = new Template_img({ $$inline: true });

    	const block = {
    		c: function create() {
    			header = element("header");
    			div0 = element("div");
    			a = element("a");
    			span0 = element("span");
    			span0.textContent = "arrow_back_ios_new";
    			t1 = text("back to homepage");
    			t2 = space();
    			div1 = element("div");
    			span1 = element("span");
    			span1.textContent = "Suchen...";
    			span2 = element("span");
    			span2.textContent = "search";
    			t5 = space();
    			main = element("main");
    			div5 = element("div");
    			div2 = element("div");
    			img = element("img");
    			t6 = space();
    			div4 = element("div");
    			div3 = element("div");
    			div3.textContent = "contents";
    			t8 = space();
    			create_component(template_nav.$$.fragment);
    			t9 = space();
    			div6 = element("div");
    			create_component(template.$$.fragment);
    			t10 = space();
    			div7 = element("div");
    			create_component(template_img.$$.fragment);
    			t11 = space();
    			footer = element("footer");
    			attr_dev(span0, "class", "material-icons");
    			add_location(span0, file, 10, 14, 207);
    			attr_dev(a, "href", "/");
    			add_location(a, file, 10, 2, 195);
    			add_location(div0, file, 9, 1, 186);
    			attr_dev(span1, "id", "searchbar");
    			add_location(span1, file, 14, 2, 320);
    			attr_dev(span2, "class", "material-icons icon-big");
    			add_location(span2, file, 14, 39, 357);
    			attr_dev(div1, "id", "searcharea");
    			add_location(div1, file, 13, 1, 295);
    			add_location(header, file, 8, 0, 175);
    			attr_dev(img, "alt", "Task Force Hellcat Wiki");
    			if (!src_url_equal(img.src, img_src_value = "./img/tfhc wiki logo clean.png")) attr_dev(img, "src", img_src_value);
    			add_location(img, file, 21, 22, 535);
    			attr_dev(div2, "id", "wiki-logo");
    			add_location(div2, file, 21, 2, 515);
    			add_location(div3, file, 23, 3, 644);
    			attr_dev(div4, "id", "article-nav");
    			add_location(div4, file, 22, 2, 617);
    			attr_dev(div5, "id", "left-bar");
    			add_location(div5, file, 20, 1, 492);
    			attr_dev(div6, "id", "content");
    			add_location(div6, file, 28, 1, 745);
    			attr_dev(div7, "id", "right-bar");
    			add_location(div7, file, 32, 1, 821);
    			add_location(main, file, 18, 0, 432);
    			add_location(footer, file, 37, 0, 882);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div0);
    			append_dev(div0, a);
    			append_dev(a, span0);
    			append_dev(a, t1);
    			append_dev(header, t2);
    			append_dev(header, div1);
    			append_dev(div1, span1);
    			append_dev(div1, span2);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, div5);
    			append_dev(div5, div2);
    			append_dev(div2, img);
    			append_dev(div5, t6);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			append_dev(div4, t8);
    			mount_component(template_nav, div4, null);
    			append_dev(main, t9);
    			append_dev(main, div6);
    			mount_component(template, div6, null);
    			append_dev(main, t10);
    			append_dev(main, div7);
    			mount_component(template_img, div7, null);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, footer, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(template_nav.$$.fragment, local);
    			transition_in(template.$$.fragment, local);
    			transition_in(template_img.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(template_nav.$$.fragment, local);
    			transition_out(template.$$.fragment, local);
    			transition_out(template_img.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(main);
    			destroy_component(template_nav);
    			destroy_component(template);
    			destroy_component(template_img);
    			if (detaching) detach_dev(t11);
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
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Template, Template_nav, Template_img });
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
