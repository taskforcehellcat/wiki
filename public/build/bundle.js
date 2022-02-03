
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
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
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
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
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
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
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
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
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
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

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
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
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.3' }, detail), true));
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
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
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

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const LOCATION = {};
    const ROUTER = {};

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    function getLocation(source) {
      return {
        ...source.location,
        state: source.history.state,
        key: (source.history.state && source.history.state.key) || "initial"
      };
    }

    function createHistory(source, options) {
      const listeners = [];
      let location = getLocation(source);

      return {
        get location() {
          return location;
        },

        listen(listener) {
          listeners.push(listener);

          const popstateListener = () => {
            location = getLocation(source);
            listener({ location, action: "POP" });
          };

          source.addEventListener("popstate", popstateListener);

          return () => {
            source.removeEventListener("popstate", popstateListener);

            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
          };
        },

        navigate(to, { state, replace = false } = {}) {
          state = { ...state, key: Date.now() + "" };
          // try...catch iOS Safari limits to 100 pushState calls
          try {
            if (replace) {
              source.history.replaceState(state, null, to);
            } else {
              source.history.pushState(state, null, to);
            }
          } catch (e) {
            source.location[replace ? "replace" : "assign"](to);
          }

          location = getLocation(source);
          listeners.forEach(listener => listener({ location, action: "PUSH" }));
        }
      };
    }

    // Stores history entries in memory for testing or other platforms like Native
    function createMemorySource(initialPathname = "/") {
      let index = 0;
      const stack = [{ pathname: initialPathname, search: "" }];
      const states = [];

      return {
        get location() {
          return stack[index];
        },
        addEventListener(name, fn) {},
        removeEventListener(name, fn) {},
        history: {
          get entries() {
            return stack;
          },
          get index() {
            return index;
          },
          get state() {
            return states[index];
          },
          pushState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            index++;
            stack.push({ pathname, search });
            states.push(state);
          },
          replaceState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            stack[index] = { pathname, search };
            states[index] = state;
          }
        }
      };
    }

    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const canUseDOM = Boolean(
      typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );
    const globalHistory = createHistory(canUseDOM ? window : createMemorySource());
    const { navigate } = globalHistory;

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    const paramRe = /^:(.+)/;

    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Check if `string` starts with `search`
     * @param {string} string
     * @param {string} search
     * @return {boolean}
     */
    function startsWith(string, search) {
      return string.substr(0, search.length) === search;
    }

    /**
     * Check if `segment` is a root segment
     * @param {string} segment
     * @return {boolean}
     */
    function isRootSegment(segment) {
      return segment === "";
    }

    /**
     * Check if `segment` is a dynamic segment
     * @param {string} segment
     * @return {boolean}
     */
    function isDynamic(segment) {
      return paramRe.test(segment);
    }

    /**
     * Check if `segment` is a splat
     * @param {string} segment
     * @return {boolean}
     */
    function isSplat(segment) {
      return segment[0] === "*";
    }

    /**
     * Split up the URI into segments delimited by `/`
     * @param {string} uri
     * @return {string[]}
     */
    function segmentize(uri) {
      return (
        uri
          // Strip starting/ending `/`
          .replace(/(^\/+|\/+$)/g, "")
          .split("/")
      );
    }

    /**
     * Strip `str` of potential start and end `/`
     * @param {string} str
     * @return {string}
     */
    function stripSlashes(str) {
      return str.replace(/(^\/+|\/+$)/g, "");
    }

    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    function rankRoute(route, index) {
      const score = route.default
        ? 0
        : segmentize(route.path).reduce((score, segment) => {
            score += SEGMENT_POINTS;

            if (isRootSegment(segment)) {
              score += ROOT_POINTS;
            } else if (isDynamic(segment)) {
              score += DYNAMIC_POINTS;
            } else if (isSplat(segment)) {
              score -= SEGMENT_POINTS + SPLAT_PENALTY;
            } else {
              score += STATIC_POINTS;
            }

            return score;
          }, 0);

      return { route, score, index };
    }

    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */
    function rankRoutes(routes) {
      return (
        routes
          .map(rankRoute)
          // If two routes have the exact same score, we go by index instead
          .sort((a, b) =>
            a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
          )
      );
    }

    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { path, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    function pick(routes, uri) {
      let match;
      let default_;

      const [uriPathname] = uri.split("?");
      const uriSegments = segmentize(uriPathname);
      const isRootUri = uriSegments[0] === "";
      const ranked = rankRoutes(routes);

      for (let i = 0, l = ranked.length; i < l; i++) {
        const route = ranked[i].route;
        let missed = false;

        if (route.default) {
          default_ = {
            route,
            params: {},
            uri
          };
          continue;
        }

        const routeSegments = segmentize(route.path);
        const params = {};
        const max = Math.max(uriSegments.length, routeSegments.length);
        let index = 0;

        for (; index < max; index++) {
          const routeSegment = routeSegments[index];
          const uriSegment = uriSegments[index];

          if (routeSegment !== undefined && isSplat(routeSegment)) {
            // Hit a splat, just grab the rest, and return a match
            // uri:   /files/documents/work
            // route: /files/* or /files/*splatname
            const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

            params[splatName] = uriSegments
              .slice(index)
              .map(decodeURIComponent)
              .join("/");
            break;
          }

          if (uriSegment === undefined) {
            // URI is shorter than the route, no match
            // uri:   /users
            // route: /users/:userId
            missed = true;
            break;
          }

          let dynamicMatch = paramRe.exec(routeSegment);

          if (dynamicMatch && !isRootUri) {
            const value = decodeURIComponent(uriSegment);
            params[dynamicMatch[1]] = value;
          } else if (routeSegment !== uriSegment) {
            // Current segments don't match, not dynamic, not splat, so no match
            // uri:   /users/123/settings
            // route: /users/:id/profile
            missed = true;
            break;
          }
        }

        if (!missed) {
          match = {
            route,
            params,
            uri: "/" + uriSegments.slice(0, index).join("/")
          };
          break;
        }
      }

      return match || default_ || null;
    }

    /**
     * Check if the `path` matches the `uri`.
     * @param {string} path
     * @param {string} uri
     * @return {?object}
     */
    function match(route, uri) {
      return pick([route], uri);
    }

    /**
     * Add the query to the pathname if a query is given
     * @param {string} pathname
     * @param {string} [query]
     * @return {string}
     */
    function addQuery(pathname, query) {
      return pathname + (query ? `?${query}` : "");
    }

    /**
     * Resolve URIs as though every path is a directory, no files. Relative URIs
     * in the browser can feel awkward because not only can you be "in a directory",
     * you can be "at a file", too. For example:
     *
     *  browserSpecResolve('foo', '/bar/') => /bar/foo
     *  browserSpecResolve('foo', '/bar') => /foo
     *
     * But on the command line of a file system, it's not as complicated. You can't
     * `cd` from a file, only directories. This way, links have to know less about
     * their current path. To go deeper you can do this:
     *
     *  <Link to="deeper"/>
     *  // instead of
     *  <Link to=`{${props.uri}/deeper}`/>
     *
     * Just like `cd`, if you want to go deeper from the command line, you do this:
     *
     *  cd deeper
     *  # not
     *  cd $(pwd)/deeper
     *
     * By treating every path as a directory, linking to relative paths should
     * require less contextual information and (fingers crossed) be more intuitive.
     * @param {string} to
     * @param {string} base
     * @return {string}
     */
    function resolve(to, base) {
      // /foo/bar, /baz/qux => /foo/bar
      if (startsWith(to, "/")) {
        return to;
      }

      const [toPathname, toQuery] = to.split("?");
      const [basePathname] = base.split("?");
      const toSegments = segmentize(toPathname);
      const baseSegments = segmentize(basePathname);

      // ?a=b, /users?b=c => /users?a=b
      if (toSegments[0] === "") {
        return addQuery(basePathname, toQuery);
      }

      // profile, /users/789 => /users/789/profile
      if (!startsWith(toSegments[0], ".")) {
        const pathname = baseSegments.concat(toSegments).join("/");

        return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
      }

      // ./       , /users/123 => /users/123
      // ../      , /users/123 => /users
      // ../..    , /users/123 => /
      // ../../one, /a/b/c/d   => /a/b/one
      // .././one , /a/b/c/d   => /a/b/c/one
      const allSegments = baseSegments.concat(toSegments);
      const segments = [];

      allSegments.forEach(segment => {
        if (segment === "..") {
          segments.pop();
        } else if (segment !== ".") {
          segments.push(segment);
        }
      });

      return addQuery("/" + segments.join("/"), toQuery);
    }

    /**
     * Combines the `basepath` and the `path` into one path.
     * @param {string} basepath
     * @param {string} path
     */
    function combinePaths(basepath, path) {
      return `${stripSlashes(
    path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
  )}/`;
    }

    /**
     * Decides whether a given `event` should result in a navigation or not.
     * @param {object} event
     */
    function shouldNavigate(event) {
      return (
        !event.defaultPrevented &&
        event.button === 0 &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
      );
    }

    /* node_modules\svelte-routing\src\Router.svelte generated by Svelte v3.46.3 */

    function create_fragment$8(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let $location;
    	let $routes;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, ['default']);
    	let { basepath = "/" } = $$props;
    	let { url = null } = $$props;
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const routes = writable([]);
    	validate_store(routes, 'routes');
    	component_subscribe($$self, routes, value => $$invalidate(6, $routes = value));
    	const activeRoute = writable(null);
    	let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

    	// If locationContext is not set, this is the topmost Router in the tree.
    	// If the `url` prop is given we force the location to it.
    	const location = locationContext || writable(url ? { pathname: url } : globalHistory.location);

    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(5, $location = value));

    	// If routerContext is set, the routerBase of the parent Router
    	// will be the base for this Router's descendants.
    	// If routerContext is not set, the path and resolved uri will both
    	// have the value of the basepath prop.
    	const base = routerContext
    	? routerContext.routerBase
    	: writable({ path: basepath, uri: basepath });

    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(7, $base = value));

    	const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
    		// If there is no activeRoute, the routerBase will be identical to the base.
    		if (activeRoute === null) {
    			return base;
    		}

    		const { path: basepath } = base;
    		const { route, uri } = activeRoute;

    		// Remove the potential /* or /*splatname from
    		// the end of the child Routes relative paths.
    		const path = route.default
    		? basepath
    		: route.path.replace(/\*.*$/, "");

    		return { path, uri };
    	});

    	function registerRoute(route) {
    		const { path: basepath } = $base;
    		let { path } = route;

    		// We store the original path in the _path property so we can reuse
    		// it when the basepath changes. The only thing that matters is that
    		// the route reference is intact, so mutation is fine.
    		route._path = path;

    		route.path = combinePaths(basepath, path);

    		if (typeof window === "undefined") {
    			// In SSR we should set the activeRoute immediately if it is a match.
    			// If there are more Routes being registered after a match is found,
    			// we just skip them.
    			if (hasActiveRoute) {
    				return;
    			}

    			const matchingRoute = match(route, $location.pathname);

    			if (matchingRoute) {
    				activeRoute.set(matchingRoute);
    				hasActiveRoute = true;
    			}
    		} else {
    			routes.update(rs => {
    				rs.push(route);
    				return rs;
    			});
    		}
    	}

    	function unregisterRoute(route) {
    		routes.update(rs => {
    			const index = rs.indexOf(route);
    			rs.splice(index, 1);
    			return rs;
    		});
    	}

    	if (!locationContext) {
    		// The topmost Router in the tree is responsible for updating
    		// the location store and supplying it through context.
    		onMount(() => {
    			const unlisten = globalHistory.listen(history => {
    				location.set(history.location);
    			});

    			return unlisten;
    		});

    		setContext(LOCATION, location);
    	}

    	setContext(ROUTER, {
    		activeRoute,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute
    	});

    	const writable_props = ['basepath', 'url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('$$scope' in $$props) $$invalidate(8, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		setContext,
    		onMount,
    		writable,
    		derived,
    		LOCATION,
    		ROUTER,
    		globalHistory,
    		pick,
    		match,
    		stripSlashes,
    		combinePaths,
    		basepath,
    		url,
    		locationContext,
    		routerContext,
    		routes,
    		activeRoute,
    		hasActiveRoute,
    		location,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute,
    		$location,
    		$routes,
    		$base
    	});

    	$$self.$inject_state = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('hasActiveRoute' in $$props) hasActiveRoute = $$props.hasActiveRoute;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$base*/ 128) {
    			// This reactive statement will update all the Routes' path when
    			// the basepath changes.
    			{
    				const { path: basepath } = $base;

    				routes.update(rs => {
    					rs.forEach(r => r.path = combinePaths(basepath, r._path));
    					return rs;
    				});
    			}
    		}

    		if ($$self.$$.dirty & /*$routes, $location*/ 96) {
    			// This reactive statement will be run when the Router is created
    			// when there are no Routes and then again the following tick, so it
    			// will not find an active Route in SSR and in the browser it will only
    			// pick an active Route after all Routes have been registered.
    			{
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}
    	};

    	return [
    		routes,
    		location,
    		base,
    		basepath,
    		url,
    		$location,
    		$routes,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { basepath: 3, url: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-routing\src\Route.svelte generated by Svelte v3.46.3 */

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*routeParams*/ 4,
    	location: dirty & /*$location*/ 16
    });

    const get_default_slot_context = ctx => ({
    	params: /*routeParams*/ ctx[2],
    	location: /*$location*/ ctx[4]
    });

    // (40:0) {#if $activeRoute !== null && $activeRoute.route === route}
    function create_if_block(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0] !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(40:0) {#if $activeRoute !== null && $activeRoute.route === route}",
    		ctx
    	});

    	return block;
    }

    // (43:2) {:else}
    function create_else_block(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, routeParams, $location*/ 532)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(43:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:2) {#if component !== null}
    function create_if_block_1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ location: /*$location*/ ctx[4] },
    		/*routeParams*/ ctx[2],
    		/*routeProps*/ ctx[3]
    	];

    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$location, routeParams, routeProps*/ 28)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*$location*/ 16 && { location: /*$location*/ ctx[4] },
    					dirty & /*routeParams*/ 4 && get_spread_object(/*routeParams*/ ctx[2]),
    					dirty & /*routeProps*/ 8 && get_spread_object(/*routeProps*/ ctx[3])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(41:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$activeRoute*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let $activeRoute;
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, ['default']);
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe($$self, activeRoute, value => $$invalidate(1, $activeRoute = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(4, $location = value));

    	const route = {
    		path,
    		// If no path prop is given, this Route will act as the default Route
    		// that is rendered if no other Route in the Router is a match.
    		default: path === ""
    	};

    	let routeParams = {};
    	let routeProps = {};
    	registerRoute(route);

    	// There is no need to unregister Routes in SSR since it will all be
    	// thrown away anyway.
    	if (typeof window !== "undefined") {
    		onDestroy(() => {
    			unregisterRoute(route);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('path' in $$new_props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ('$$scope' in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		onDestroy,
    		ROUTER,
    		LOCATION,
    		path,
    		component,
    		registerRoute,
    		unregisterRoute,
    		activeRoute,
    		location,
    		route,
    		routeParams,
    		routeProps,
    		$activeRoute,
    		$location
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    		if ('path' in $$props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$props) $$invalidate(0, component = $$new_props.component);
    		if ('routeParams' in $$props) $$invalidate(2, routeParams = $$new_props.routeParams);
    		if ('routeProps' in $$props) $$invalidate(3, routeProps = $$new_props.routeProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$activeRoute*/ 2) {
    			if ($activeRoute && $activeRoute.route === route) {
    				$$invalidate(2, routeParams = $activeRoute.params);
    			}
    		}

    		{
    			const { path, component, ...rest } = $$props;
    			$$invalidate(3, routeProps = rest);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		component,
    		$activeRoute,
    		routeParams,
    		routeProps,
    		$location,
    		activeRoute,
    		location,
    		route,
    		path,
    		$$scope,
    		slots
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { path: 8, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-routing\src\Link.svelte generated by Svelte v3.46.3 */
    const file$6 = "node_modules\\svelte-routing\\src\\Link.svelte";

    function create_fragment$6(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[16].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);

    	let a_levels = [
    		{ href: /*href*/ ctx[0] },
    		{ "aria-current": /*ariaCurrent*/ ctx[2] },
    		/*props*/ ctx[1],
    		/*$$restProps*/ ctx[6]
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file$6, 40, 0, 1249);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*onClick*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] },
    				(!current || dirty & /*ariaCurrent*/ 4) && { "aria-current": /*ariaCurrent*/ ctx[2] },
    				dirty & /*props*/ 2 && /*props*/ ctx[1],
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let ariaCurrent;
    	const omit_props_names = ["to","replace","state","getProps"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $location;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Link', slots, ['default']);
    	let { to = "#" } = $$props;
    	let { replace = false } = $$props;
    	let { state = {} } = $$props;
    	let { getProps = () => ({}) } = $$props;
    	const { base } = getContext(ROUTER);
    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(14, $base = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(13, $location = value));
    	const dispatch = createEventDispatcher();
    	let href, isPartiallyCurrent, isCurrent, props;

    	function onClick(event) {
    		dispatch("click", event);

    		if (shouldNavigate(event)) {
    			event.preventDefault();

    			// Don't push another entry to the history stack when the user
    			// clicks on a Link to the page they are currently on.
    			const shouldReplace = $location.pathname === href || replace;

    			navigate(href, { state, replace: shouldReplace });
    		}
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('to' in $$new_props) $$invalidate(7, to = $$new_props.to);
    		if ('replace' in $$new_props) $$invalidate(8, replace = $$new_props.replace);
    		if ('state' in $$new_props) $$invalidate(9, state = $$new_props.state);
    		if ('getProps' in $$new_props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ('$$scope' in $$new_props) $$invalidate(15, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		createEventDispatcher,
    		ROUTER,
    		LOCATION,
    		navigate,
    		startsWith,
    		resolve,
    		shouldNavigate,
    		to,
    		replace,
    		state,
    		getProps,
    		base,
    		location,
    		dispatch,
    		href,
    		isPartiallyCurrent,
    		isCurrent,
    		props,
    		onClick,
    		ariaCurrent,
    		$location,
    		$base
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('to' in $$props) $$invalidate(7, to = $$new_props.to);
    		if ('replace' in $$props) $$invalidate(8, replace = $$new_props.replace);
    		if ('state' in $$props) $$invalidate(9, state = $$new_props.state);
    		if ('getProps' in $$props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ('href' in $$props) $$invalidate(0, href = $$new_props.href);
    		if ('isPartiallyCurrent' in $$props) $$invalidate(11, isPartiallyCurrent = $$new_props.isPartiallyCurrent);
    		if ('isCurrent' in $$props) $$invalidate(12, isCurrent = $$new_props.isCurrent);
    		if ('props' in $$props) $$invalidate(1, props = $$new_props.props);
    		if ('ariaCurrent' in $$props) $$invalidate(2, ariaCurrent = $$new_props.ariaCurrent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*to, $base*/ 16512) {
    			$$invalidate(0, href = to === "/" ? $base.uri : resolve(to, $base.uri));
    		}

    		if ($$self.$$.dirty & /*$location, href*/ 8193) {
    			$$invalidate(11, isPartiallyCurrent = startsWith($location.pathname, href));
    		}

    		if ($$self.$$.dirty & /*href, $location*/ 8193) {
    			$$invalidate(12, isCurrent = href === $location.pathname);
    		}

    		if ($$self.$$.dirty & /*isCurrent*/ 4096) {
    			$$invalidate(2, ariaCurrent = isCurrent ? "page" : undefined);
    		}

    		if ($$self.$$.dirty & /*getProps, $location, href, isPartiallyCurrent, isCurrent*/ 15361) {
    			$$invalidate(1, props = getProps({
    				location: $location,
    				href,
    				isPartiallyCurrent,
    				isCurrent
    			}));
    		}
    	};

    	return [
    		href,
    		props,
    		ariaCurrent,
    		base,
    		location,
    		onClick,
    		$$restProps,
    		to,
    		replace,
    		state,
    		getProps,
    		isPartiallyCurrent,
    		isCurrent,
    		$location,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Link extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
    			to: 7,
    			replace: 8,
    			state: 9,
    			getProps: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get to() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set to(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get replace() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set replace(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get state() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getProps() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set getProps(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Home.svelte generated by Svelte v3.46.3 */

    const file$5 = "src\\Home.svelte";

    function create_fragment$5(ctx) {
    	let h1;
    	let t1;
    	let h2;
    	let t3;
    	let br0;
    	let br1;
    	let t4;
    	let h3;
    	let t6;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Willkommen!";
    			t1 = space();
    			h2 = element("h2");
    			h2.textContent = "Etwas über uns:";
    			t3 = space();
    			br0 = element("br");
    			br1 = element("br");
    			t4 = space();
    			h3 = element("h3");
    			h3.textContent = "Wir sind eine deutsche ArmA 3 Milsim Unit!";
    			t6 = space();
    			p = element("p");
    			p.textContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore vitae explicabo animi ex? Corporis culpa eligendi tenetur nemo amet consequatur maiores? Nulla voluptatum nihil, amet, laboriosam officia praesentium impedit corporis, molestias distinctio necessitatibus deserunt! Voluptas cum cumque magni, numquam maiores temporibus nostrum, quisquam voluptate odio eius error doloremque in obcaecati harum ipsa accusantium at delectus quae nulla odit officia. In?";
    			attr_dev(h1, "class", "text-centered");
    			add_location(h1, file$5, 0, 0, 0);
    			attr_dev(h2, "class", "text-centered");
    			add_location(h2, file$5, 4, 0, 54);
    			add_location(br0, file$5, 6, 0, 104);
    			add_location(br1, file$5, 6, 4, 108);
    			add_location(h3, file$5, 8, 0, 116);
    			attr_dev(p, "class", "text-justified text-boxed");
    			add_location(p, file$5, 10, 0, 171);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, br0, anchor);
    			insert_dev(target, br1, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, h3, anchor);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(br1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\Wiki.svelte generated by Svelte v3.46.3 */

    const file$4 = "src\\Wiki.svelte";

    function create_fragment$4(ctx) {
    	let h1;
    	let t1;
    	let div;
    	let a0;
    	let t3;
    	let a1;
    	let t5;
    	let a2;
    	let t7;
    	let a3;
    	let t9;
    	let a4;
    	let t11;
    	let a5;
    	let t13;
    	let a6;
    	let t15;
    	let a7;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "WIKI";
    			t1 = space();
    			div = element("div");
    			a0 = element("a");
    			a0.textContent = "grundlagen";
    			t3 = space();
    			a1 = element("a");
    			a1.textContent = "führungskräfte";
    			t5 = space();
    			a2 = element("a");
    			a2.textContent = "logistiker";
    			t7 = space();
    			a3 = element("a");
    			a3.textContent = "streitkräfte";
    			t9 = space();
    			a4 = element("a");
    			a4.textContent = "panzertruppen";
    			t11 = space();
    			a5 = element("a");
    			a5.textContent = "sanitäter";
    			t13 = space();
    			a6 = element("a");
    			a6.textContent = "aufklärer";
    			t15 = space();
    			a7 = element("a");
    			a7.textContent = "fuhrpark";
    			add_location(h1, file$4, 0, 0, 0);
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "id", "wiki-grundlagen");
    			add_location(a0, file$4, 2, 4, 44);
    			attr_dev(a1, "href", "/");
    			attr_dev(a1, "id", "wiki-fuehrungskraefte");
    			add_location(a1, file$4, 5, 4, 113);
    			attr_dev(a2, "href", "/");
    			attr_dev(a2, "id", "wiki-logistiker");
    			add_location(a2, file$4, 8, 4, 192);
    			attr_dev(a3, "href", "/");
    			attr_dev(a3, "id", "wiki-streitkraefte");
    			add_location(a3, file$4, 11, 4, 261);
    			attr_dev(a4, "href", "/");
    			attr_dev(a4, "id", "wiki-panzertruppen");
    			add_location(a4, file$4, 14, 4, 335);
    			attr_dev(a5, "href", "/");
    			attr_dev(a5, "id", "wiki-sanitaeter");
    			add_location(a5, file$4, 17, 4, 410);
    			attr_dev(a6, "href", "/");
    			attr_dev(a6, "id", "wiki-aufklaerer");
    			add_location(a6, file$4, 20, 4, 478);
    			attr_dev(a7, "href", "/");
    			attr_dev(a7, "id", "wiki-fuhrpark");
    			add_location(a7, file$4, 23, 4, 546);
    			attr_dev(div, "id", "wiki-content");
    			add_location(div, file$4, 1, 0, 15);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, a0);
    			append_dev(div, t3);
    			append_dev(div, a1);
    			append_dev(div, t5);
    			append_dev(div, a2);
    			append_dev(div, t7);
    			append_dev(div, a3);
    			append_dev(div, t9);
    			append_dev(div, a4);
    			append_dev(div, t11);
    			append_dev(div, a5);
    			append_dev(div, t13);
    			append_dev(div, a6);
    			append_dev(div, t15);
    			append_dev(div, a7);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Wiki', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Wiki> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Wiki extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Wiki",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\Gallery.svelte generated by Svelte v3.46.3 */

    const file$3 = "src\\Gallery.svelte";

    function create_fragment$3(ctx) {
    	let div12;
    	let div2;
    	let div1;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let div0;
    	let t2;
    	let div5;
    	let div4;
    	let img1;
    	let img1_src_value;
    	let t3;
    	let div3;
    	let t5;
    	let div8;
    	let div7;
    	let img2;
    	let img2_src_value;
    	let t6;
    	let div6;
    	let t8;
    	let div11;
    	let div10;
    	let img3;
    	let img3_src_value;
    	let t9;
    	let div9;

    	const block = {
    		c: function create() {
    			div12 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			img0 = element("img");
    			t0 = space();
    			div0 = element("div");
    			div0.textContent = "Übungsmission vom 28.01.2021";
    			t2 = space();
    			div5 = element("div");
    			div4 = element("div");
    			img1 = element("img");
    			t3 = space();
    			div3 = element("div");
    			div3.textContent = "Übungsmission vom 00.00.0000";
    			t5 = space();
    			div8 = element("div");
    			div7 = element("div");
    			img2 = element("img");
    			t6 = space();
    			div6 = element("div");
    			div6.textContent = "Übungsmission vom 00.00.0000";
    			t8 = space();
    			div11 = element("div");
    			div10 = element("div");
    			img3 = element("img");
    			t9 = space();
    			div9 = element("div");
    			div9.textContent = "Übungsmission vom 00.00.0000";
    			if (!src_url_equal(img0.src, img0_src_value = "./images/triangle.svg")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file$3, 4, 12, 97);
    			attr_dev(div0, "class", "nointeract");
    			add_location(div0, file$3, 5, 12, 144);
    			attr_dev(div1, "href", "");
    			attr_dev(div1, "class", "gallery-item");
    			add_location(div1, file$3, 3, 8, 49);
    			add_location(div2, file$3, 2, 4, 34);
    			if (!src_url_equal(img1.src, img1_src_value = "./images/triangle.svg")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file$3, 10, 12, 299);
    			attr_dev(div3, "class", "nointeract");
    			add_location(div3, file$3, 11, 12, 346);
    			attr_dev(div4, "href", "");
    			attr_dev(div4, "class", "gallery-item");
    			add_location(div4, file$3, 9, 8, 251);
    			add_location(div5, file$3, 8, 4, 236);
    			if (!src_url_equal(img2.src, img2_src_value = "./images/triangle.svg")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file$3, 16, 12, 501);
    			attr_dev(div6, "class", "nointeract");
    			add_location(div6, file$3, 17, 12, 548);
    			attr_dev(div7, "href", "");
    			attr_dev(div7, "class", "gallery-item");
    			add_location(div7, file$3, 15, 8, 453);
    			add_location(div8, file$3, 14, 4, 438);
    			if (!src_url_equal(img3.src, img3_src_value = "./images/triangle.svg")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file$3, 22, 12, 703);
    			attr_dev(div9, "class", "nointeract");
    			add_location(div9, file$3, 23, 12, 750);
    			attr_dev(div10, "href", "");
    			attr_dev(div10, "class", "gallery-item");
    			add_location(div10, file$3, 21, 8, 655);
    			add_location(div11, file$3, 20, 4, 640);
    			attr_dev(div12, "id", "gallery-wrapper");
    			add_location(div12, file$3, 1, 0, 2);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div12, anchor);
    			append_dev(div12, div2);
    			append_dev(div2, div1);
    			append_dev(div1, img0);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div12, t2);
    			append_dev(div12, div5);
    			append_dev(div5, div4);
    			append_dev(div4, img1);
    			append_dev(div4, t3);
    			append_dev(div4, div3);
    			append_dev(div12, t5);
    			append_dev(div12, div8);
    			append_dev(div8, div7);
    			append_dev(div7, img2);
    			append_dev(div7, t6);
    			append_dev(div7, div6);
    			append_dev(div12, t8);
    			append_dev(div12, div11);
    			append_dev(div11, div10);
    			append_dev(div10, img3);
    			append_dev(div10, t9);
    			append_dev(div10, div9);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div12);
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
    	validate_slots('Gallery', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Gallery> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Gallery extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Gallery",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\Contact.svelte generated by Svelte v3.46.3 */

    const file$2 = "src\\Contact.svelte";

    function create_fragment$2(ctx) {
    	let form;
    	let div0;
    	let t1;
    	let div3;
    	let div1;
    	let p0;
    	let t3;
    	let p1;
    	let t5;
    	let div2;
    	let input0;
    	let t6;
    	let input1;
    	let t7;
    	let div5;
    	let div4;
    	let p2;
    	let t9;
    	let p3;
    	let t11;
    	let input2;
    	let t12;
    	let div7;
    	let div6;
    	let p4;
    	let t14;
    	let p5;
    	let t16;
    	let textarea;

    	const block = {
    		c: function create() {
    			form = element("form");
    			div0 = element("div");
    			div0.textContent = "Schreib uns eine E-Mail!";
    			t1 = space();
    			div3 = element("div");
    			div1 = element("div");
    			p0 = element("p");
    			p0.textContent = "Name";
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = "Vor- und Nachname";
    			t5 = space();
    			div2 = element("div");
    			input0 = element("input");
    			t6 = space();
    			input1 = element("input");
    			t7 = space();
    			div5 = element("div");
    			div4 = element("div");
    			p2 = element("p");
    			p2.textContent = "Betreff";
    			t9 = space();
    			p3 = element("p");
    			p3.textContent = "Kurz fassen";
    			t11 = space();
    			input2 = element("input");
    			t12 = space();
    			div7 = element("div");
    			div6 = element("div");
    			p4 = element("p");
    			p4.textContent = "Nachricht";
    			t14 = space();
    			p5 = element("p");
    			p5.textContent = "5 bis 10.000 Zeichen";
    			t16 = space();
    			textarea = element("textarea");
    			attr_dev(div0, "class", "form_category_title");
    			add_location(div0, file$2, 1, 4, 30);
    			attr_dev(p0, "class", "input_title");
    			add_location(p0, file$2, 5, 12, 191);
    			attr_dev(p1, "class", "input_subline");
    			add_location(p1, file$2, 6, 12, 236);
    			attr_dev(div1, "class", "input_desc");
    			add_location(div1, file$2, 4, 8, 153);
    			attr_dev(input0, "name", "name");
    			attr_dev(input0, "class", "smallbutton");
    			attr_dev(input0, "placeholder", "Vorname");
    			add_location(input0, file$2, 9, 12, 351);
    			attr_dev(input1, "name", "name");
    			attr_dev(input1, "class", "smallbutton");
    			attr_dev(input1, "placeholder", "Nachname");
    			add_location(input1, file$2, 10, 12, 426);
    			attr_dev(div2, "class", "input-container");
    			add_location(div2, file$2, 8, 8, 308);
    			attr_dev(div3, "class", "form_inputfield form_general");
    			add_location(div3, file$2, 3, 4, 101);
    			attr_dev(p2, "class", "input_title");
    			add_location(p2, file$2, 16, 12, 614);
    			attr_dev(p3, "class", "input_subline");
    			add_location(p3, file$2, 17, 12, 662);
    			attr_dev(div4, "class", "input_desc");
    			add_location(div4, file$2, 15, 8, 576);
    			attr_dev(input2, "name", "subject");
    			attr_dev(input2, "placeholder", "Blablabla...");
    			attr_dev(input2, "maxlength", "1000");
    			add_location(input2, file$2, 19, 8, 728);
    			attr_dev(div5, "class", "form_inputfield form_general");
    			add_location(div5, file$2, 14, 4, 524);
    			attr_dev(p4, "class", "input_title");
    			add_location(p4, file$2, 24, 12, 904);
    			attr_dev(p5, "class", "input_subline");
    			add_location(p5, file$2, 25, 12, 954);
    			attr_dev(div6, "class", "input_desc");
    			add_location(div6, file$2, 23, 8, 866);
    			attr_dev(textarea, "name", "message");
    			attr_dev(textarea, "placeholder", "Blablabla...");
    			attr_dev(textarea, "minlength", "5");
    			attr_dev(textarea, "maxlength", "10000");
    			attr_dev(textarea, "class", "bigbox");
    			add_location(textarea, file$2, 27, 8, 1029);
    			attr_dev(div7, "class", "form_inputfield form_general");
    			add_location(div7, file$2, 22, 4, 814);
    			attr_dev(form, "id", "contact-form");
    			add_location(form, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form, anchor);
    			append_dev(form, div0);
    			append_dev(form, t1);
    			append_dev(form, div3);
    			append_dev(div3, div1);
    			append_dev(div1, p0);
    			append_dev(div1, t3);
    			append_dev(div1, p1);
    			append_dev(div3, t5);
    			append_dev(div3, div2);
    			append_dev(div2, input0);
    			append_dev(div2, t6);
    			append_dev(div2, input1);
    			append_dev(form, t7);
    			append_dev(form, div5);
    			append_dev(div5, div4);
    			append_dev(div4, p2);
    			append_dev(div4, t9);
    			append_dev(div4, p3);
    			append_dev(div5, t11);
    			append_dev(div5, input2);
    			append_dev(form, t12);
    			append_dev(form, div7);
    			append_dev(div7, div6);
    			append_dev(div6, p4);
    			append_dev(div6, t14);
    			append_dev(div6, p5);
    			append_dev(div7, t16);
    			append_dev(div7, textarea);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form);
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
    	validate_slots('Contact', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Contact> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Contact extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Contact",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\Mlg.svelte generated by Svelte v3.46.3 */

    const file$1 = "src\\Mlg.svelte";

    function create_fragment$1(ctx) {
    	let h1;
    	let t1;
    	let form;
    	let div0;
    	let t3;
    	let div2;
    	let div1;
    	let p0;
    	let t5;
    	let p1;
    	let t7;
    	let input0;
    	let t8;
    	let div4;
    	let div3;
    	let p2;
    	let t10;
    	let p3;
    	let t12;
    	let input1;
    	let t13;
    	let div6;
    	let div5;
    	let p4;
    	let t15;
    	let p5;
    	let t17;
    	let input2;
    	let t18;
    	let div8;
    	let div7;
    	let p6;
    	let t20;
    	let p7;
    	let t22;
    	let input3;
    	let t23;
    	let div10;
    	let div9;
    	let p8;
    	let t25;
    	let p9;
    	let t27;
    	let textarea0;
    	let t28;
    	let div12;
    	let div11;
    	let p10;
    	let t30;
    	let p11;
    	let t32;
    	let select0;
    	let option0;
    	let option1;
    	let option2;
    	let t36;
    	let div14;
    	let div13;
    	let p12;
    	let t38;
    	let p13;
    	let t40;
    	let input4;
    	let t41;
    	let div16;
    	let div15;
    	let p14;
    	let t43;
    	let p15;
    	let t45;
    	let input5;
    	let t46;
    	let div18;
    	let div17;
    	let p16;
    	let t48;
    	let p17;
    	let t50;
    	let input6;
    	let t51;
    	let div20;
    	let div19;
    	let p18;
    	let t53;
    	let p19;
    	let t55;
    	let input7;
    	let t56;
    	let div22;
    	let div21;
    	let p20;
    	let t58;
    	let p21;
    	let t60;
    	let select1;
    	let option3;
    	let option4;
    	let option5;
    	let t64;
    	let div25;
    	let div23;
    	let p22;
    	let t66;
    	let p23;
    	let t68;
    	let div24;
    	let input8;
    	let t69;
    	let input9;
    	let t70;
    	let div27;
    	let div26;
    	let p24;
    	let t72;
    	let p25;
    	let t74;
    	let textarea1;
    	let t75;
    	let div28;
    	let t77;
    	let div30;
    	let div29;
    	let p26;
    	let t79;
    	let p27;
    	let t81;
    	let input10;
    	let t82;
    	let div32;
    	let div31;
    	let p28;
    	let t84;
    	let p29;
    	let t86;
    	let input11;
    	let t87;
    	let div34;
    	let div33;
    	let t88;
    	let button;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "mission log generator";
    			t1 = space();
    			form = element("form");
    			div0 = element("div");
    			div0.textContent = "General";
    			t3 = space();
    			div2 = element("div");
    			div1 = element("div");
    			p0 = element("p");
    			p0.textContent = "Missionstitel";
    			t5 = space();
    			p1 = element("p");
    			p1.textContent = "0-30 Zeichen";
    			t7 = space();
    			input0 = element("input");
    			t8 = space();
    			div4 = element("div");
    			div3 = element("div");
    			p2 = element("p");
    			p2.textContent = "Eigene KIA";
    			t10 = space();
    			p3 = element("p");
    			p3.textContent = "0-3 Zeichen";
    			t12 = space();
    			input1 = element("input");
    			t13 = space();
    			div6 = element("div");
    			div5 = element("div");
    			p4 = element("p");
    			p4.textContent = "Zivile KIA";
    			t15 = space();
    			p5 = element("p");
    			p5.textContent = "0-3 Zeichen";
    			t17 = space();
    			input2 = element("input");
    			t18 = space();
    			div8 = element("div");
    			div7 = element("div");
    			p6 = element("p");
    			p6.textContent = "Einsatzgebiet";
    			t20 = space();
    			p7 = element("p");
    			p7.textContent = "0-30 Zeichen";
    			t22 = space();
    			input3 = element("input");
    			t23 = space();
    			div10 = element("div");
    			div9 = element("div");
    			p8 = element("p");
    			p8.textContent = "Missionsziel";
    			t25 = space();
    			p9 = element("p");
    			p9.textContent = "0-50 Zeichen";
    			t27 = space();
    			textarea0 = element("textarea");
    			t28 = space();
    			div12 = element("div");
    			div11 = element("div");
    			p10 = element("p");
    			p10.textContent = "Missionsstatus";
    			t30 = space();
    			p11 = element("p");
    			p11.textContent = "wählen...";
    			t32 = space();
    			select0 = element("select");
    			option0 = element("option");
    			option0.textContent = "Abgeschlossen";
    			option1 = element("option");
    			option1.textContent = "Abgebrochen";
    			option2 = element("option");
    			option2.textContent = "In Planung";
    			t36 = space();
    			div14 = element("div");
    			div13 = element("div");
    			p12 = element("p");
    			p12.textContent = "Gefangene";
    			t38 = space();
    			p13 = element("p");
    			p13.textContent = "0-100 Zeichen";
    			t40 = space();
    			input4 = element("input");
    			t41 = space();
    			div16 = element("div");
    			div15 = element("div");
    			p14 = element("p");
    			p14.textContent = "Finale CivRep";
    			t43 = space();
    			p15 = element("p");
    			p15.textContent = "0-100 Zeichen";
    			t45 = space();
    			input5 = element("input");
    			t46 = space();
    			div18 = element("div");
    			div17 = element("div");
    			p16 = element("p");
    			p16.textContent = "Finale Intel";
    			t48 = space();
    			p17 = element("p");
    			p17.textContent = "0-100 Zeichen";
    			t50 = space();
    			input6 = element("input");
    			t51 = space();
    			div20 = element("div");
    			div19 = element("div");
    			p18 = element("p");
    			p18.textContent = "Finale Attention";
    			t53 = space();
    			p19 = element("p");
    			p19.textContent = "0-100 Zeichen";
    			t55 = space();
    			input7 = element("input");
    			t56 = space();
    			div22 = element("div");
    			div21 = element("div");
    			p20 = element("p");
    			p20.textContent = "Gruppenführung";
    			t58 = space();
    			p21 = element("p");
    			p21.textContent = "wählen...";
    			t60 = space();
    			select1 = element("select");
    			option3 = element("option");
    			option3.textContent = "OStFw Leon";
    			option4 = element("option");
    			option4.textContent = "HptFw Mav";
    			option5 = element("option");
    			option5.textContent = "StUffz ptolemy";
    			t64 = space();
    			div25 = element("div");
    			div23 = element("div");
    			p22 = element("p");
    			p22.textContent = "Missionszeit";
    			t66 = space();
    			p23 = element("p");
    			p23.textContent = "Datum & Uhrzeit";
    			t68 = space();
    			div24 = element("div");
    			input8 = element("input");
    			t69 = space();
    			input9 = element("input");
    			t70 = space();
    			div27 = element("div");
    			div26 = element("div");
    			p24 = element("p");
    			p24.textContent = "Ergänzungen";
    			t72 = space();
    			p25 = element("p");
    			p25.textContent = "0-1000 Zeichen";
    			t74 = space();
    			textarea1 = element("textarea");
    			t75 = space();
    			div28 = element("div");
    			div28.textContent = "Map-Daten";
    			t77 = space();
    			div30 = element("div");
    			div29 = element("div");
    			p26 = element("p");
    			p26.textContent = "Planquadrat";
    			t79 = space();
    			p27 = element("p");
    			p27.textContent = "6 Zeichen";
    			t81 = space();
    			input10 = element("input");
    			t82 = space();
    			div32 = element("div");
    			div31 = element("div");
    			p28 = element("p");
    			p28.textContent = "Radius";
    			t84 = space();
    			p29 = element("p");
    			p29.textContent = "0-100 Zeichen";
    			t86 = space();
    			input11 = element("input");
    			t87 = space();
    			div34 = element("div");
    			div33 = element("div");
    			t88 = space();
    			button = element("button");
    			button.textContent = "Einreichen";
    			attr_dev(h1, "id", "title");
    			add_location(h1, file$1, 0, 0, 0);
    			attr_dev(div0, "class", "form_category_title");
    			add_location(div0, file$1, 3, 4, 164);
    			attr_dev(p0, "class", "input_title");
    			add_location(p0, file$1, 7, 12, 417);
    			attr_dev(p1, "class", "input_subline");
    			add_location(p1, file$1, 8, 12, 471);
    			attr_dev(div1, "class", "input_desc");
    			add_location(div1, file$1, 6, 8, 379);
    			attr_dev(input0, "name", "title");
    			attr_dev(input0, "placeholder", "Steelhammer 123...");
    			attr_dev(input0, "maxlength", "30");
    			add_location(input0, file$1, 10, 8, 538);
    			attr_dev(div2, "id", "form_title");
    			attr_dev(div2, "class", "form_inputfield form_general");
    			add_location(div2, file$1, 5, 4, 311);
    			attr_dev(p2, "class", "input_title");
    			add_location(p2, file$1, 15, 12, 827);
    			attr_dev(p3, "class", "input_subline");
    			add_location(p3, file$1, 16, 12, 878);
    			attr_dev(div3, "class", "input_desc");
    			add_location(div3, file$1, 14, 8, 789);
    			attr_dev(input1, "name", "own_kia");
    			attr_dev(input1, "placeholder", "1/2/3...");
    			attr_dev(input1, "maxlength", "3");
    			add_location(input1, file$1, 18, 8, 944);
    			attr_dev(div4, "id", "form_own_kia");
    			attr_dev(div4, "class", "form_inputfield form_general");
    			add_location(div4, file$1, 13, 4, 719);
    			attr_dev(p4, "class", "input_title");
    			add_location(p4, file$1, 23, 12, 1224);
    			attr_dev(p5, "class", "input_subline");
    			add_location(p5, file$1, 24, 12, 1275);
    			attr_dev(div5, "class", "input_desc");
    			add_location(div5, file$1, 22, 8, 1186);
    			attr_dev(input2, "name", "civ_kia");
    			attr_dev(input2, "placeholder", "1/2/3...");
    			attr_dev(input2, "maxlength", "3");
    			add_location(input2, file$1, 26, 8, 1341);
    			attr_dev(div6, "id", "form_civ_kia");
    			attr_dev(div6, "class", "form_inputfield form_general");
    			add_location(div6, file$1, 21, 4, 1116);
    			attr_dev(p6, "class", "input_title");
    			add_location(p6, file$1, 31, 12, 1622);
    			attr_dev(p7, "class", "input_subline");
    			add_location(p7, file$1, 32, 12, 1676);
    			attr_dev(div7, "class", "input_desc");
    			add_location(div7, file$1, 30, 8, 1584);
    			attr_dev(input3, "name", "location");
    			attr_dev(input3, "placeholder", "Wiesbaden...");
    			attr_dev(input3, "maxlength", "30");
    			add_location(input3, file$1, 34, 8, 1743);
    			attr_dev(div8, "id", "form_location");
    			attr_dev(div8, "class", "form_inputfield form_general");
    			add_location(div8, file$1, 29, 4, 1513);
    			attr_dev(p8, "class", "input_title");
    			add_location(p8, file$1, 39, 12, 2031);
    			attr_dev(p9, "class", "input_subline");
    			add_location(p9, file$1, 40, 12, 2084);
    			attr_dev(div9, "class", "input_desc");
    			add_location(div9, file$1, 38, 8, 1993);
    			attr_dev(textarea0, "name", "objective");
    			attr_dev(textarea0, "placeholder", "Einsatzgebiet befreien... ");
    			attr_dev(textarea0, "maxlength", "50");
    			attr_dev(textarea0, "class", "bigbox");
    			add_location(textarea0, file$1, 42, 8, 2151);
    			attr_dev(div10, "id", "form_objective");
    			attr_dev(div10, "class", "form_inputfield form_general");
    			add_location(div10, file$1, 37, 4, 1921);
    			attr_dev(p10, "class", "input_title");
    			add_location(p10, file$1, 47, 12, 2480);
    			attr_dev(p11, "class", "input_subline");
    			add_location(p11, file$1, 48, 12, 2535);
    			attr_dev(div11, "class", "input_desc");
    			add_location(div11, file$1, 46, 8, 2442);
    			option0.__value = "completed";
    			option0.value = option0.__value;
    			add_location(option0, file$1, 51, 8, 2658);
    			option1.__value = "cancelled";
    			option1.value = option1.__value;
    			add_location(option1, file$1, 52, 8, 2716);
    			option2.__value = "planning";
    			option2.value = option2.__value;
    			add_location(option2, file$1, 53, 8, 2772);
    			attr_dev(select0, "name", "status");
    			attr_dev(select0, "placeholder", "auswählen...");
    			add_location(select0, file$1, 50, 8, 2599);
    			attr_dev(div12, "id", "form_status");
    			attr_dev(div12, "class", "form_inputfield form_general");
    			add_location(div12, file$1, 45, 4, 2373);
    			attr_dev(p12, "class", "input_title ");
    			add_location(p12, file$1, 59, 12, 3056);
    			attr_dev(p13, "class", "input_subline ");
    			add_location(p13, file$1, 60, 12, 3107);
    			attr_dev(div13, "class", "input_desc ");
    			add_location(div13, file$1, 58, 8, 3017);
    			attr_dev(input4, "name", "captives");
    			attr_dev(input4, "placeholder", "1/2/3...");
    			attr_dev(input4, "maxlength", "100");
    			add_location(input4, file$1, 62, 8, 3176);
    			attr_dev(div14, "id", "form_captives ");
    			attr_dev(div14, "class", "form_inputfield form_general");
    			add_location(div14, file$1, 57, 4, 2945);
    			attr_dev(p14, "class", "input_title ");
    			add_location(p14, file$1, 67, 12, 3461);
    			attr_dev(p15, "class", "input_subline ");
    			add_location(p15, file$1, 68, 12, 3516);
    			attr_dev(div15, "class", "input_desc ");
    			add_location(div15, file$1, 66, 8, 3422);
    			attr_dev(input5, "name", "civrep");
    			attr_dev(input5, "placeholder", "-20/0/20...");
    			attr_dev(input5, "maxlength", "100");
    			add_location(input5, file$1, 70, 8, 3585);
    			attr_dev(div16, "id", "form_civrep ");
    			attr_dev(div16, "class", "form_inputfield form_general");
    			add_location(div16, file$1, 65, 4, 3352);
    			attr_dev(p16, "class", "input_title ");
    			add_location(p16, file$1, 75, 12, 3870);
    			attr_dev(p17, "class", "input_subline ");
    			add_location(p17, file$1, 76, 12, 3924);
    			attr_dev(div17, "class", "input_desc ");
    			add_location(div17, file$1, 74, 8, 3831);
    			attr_dev(input6, "name", "intel");
    			attr_dev(input6, "placeholder", "0/10/20...");
    			attr_dev(input6, "maxlength", "100");
    			add_location(input6, file$1, 78, 8, 3993);
    			attr_dev(div18, "id", "form_intel ");
    			attr_dev(div18, "class", "form_inputfield form_general");
    			add_location(div18, file$1, 73, 4, 3762);
    			attr_dev(p18, "class", "input_title ");
    			add_location(p18, file$1, 83, 12, 4280);
    			attr_dev(p19, "class", "input_subline ");
    			add_location(p19, file$1, 84, 12, 4338);
    			attr_dev(div19, "class", "input_desc ");
    			add_location(div19, file$1, 82, 8, 4241);
    			attr_dev(input7, "name", "attention");
    			attr_dev(input7, "placeholder", "30%/40%/50%... ");
    			attr_dev(input7, "maxlength", "100");
    			add_location(input7, file$1, 86, 8, 4407);
    			attr_dev(div20, "id", "form_attention ");
    			attr_dev(div20, "class", "form_inputfield form_general");
    			add_location(div20, file$1, 81, 4, 4168);
    			attr_dev(p20, "class", "input_title ");
    			add_location(p20, file$1, 91, 12, 4700);
    			attr_dev(p21, "class", "input_subline ");
    			add_location(p21, file$1, 92, 12, 4756);
    			attr_dev(div21, "class", "input_desc ");
    			add_location(div21, file$1, 90, 8, 4661);
    			option3.__value = "leon";
    			option3.value = option3.__value;
    			add_location(option3, file$1, 95, 8, 4883);
    			option4.__value = "mav";
    			option4.value = option4.__value;
    			add_location(option4, file$1, 96, 8, 4933);
    			option5.__value = "ptolemy";
    			option5.value = option5.__value;
    			add_location(option5, file$1, 97, 8, 4981);
    			attr_dev(select1, "name", "leader");
    			attr_dev(select1, "placeholder", "OStFw Hallat...");
    			add_location(select1, file$1, 94, 8, 4821);
    			attr_dev(div22, "id", "form_leader ");
    			attr_dev(div22, "class", "form_inputfield form_general");
    			add_location(div22, file$1, 89, 4, 4591);
    			attr_dev(p22, "class", "input_title ");
    			add_location(p22, file$1, 103, 12, 5264);
    			attr_dev(p23, "class", "input_subline ");
    			add_location(p23, file$1, 104, 12, 5318);
    			attr_dev(div23, "class", "input_desc ");
    			add_location(div23, file$1, 102, 8, 5225);
    			attr_dev(input8, "name", "time");
    			attr_dev(input8, "type", "date");
    			attr_dev(input8, "class", "smallbutton");
    			add_location(input8, file$1, 107, 12, 5432);
    			attr_dev(input9, "name", "time");
    			attr_dev(input9, "type", "time");
    			attr_dev(input9, "class", "smallbutton");
    			add_location(input9, file$1, 108, 12, 5497);
    			attr_dev(div24, "class", "input-container");
    			add_location(div24, file$1, 106, 8, 5389);
    			attr_dev(div25, "id", "form_time ");
    			attr_dev(div25, "class", "form_inputfield form_general");
    			add_location(div25, file$1, 101, 4, 5157);
    			attr_dev(p24, "class", "input_title ");
    			add_location(p24, file$1, 114, 12, 5792);
    			attr_dev(p25, "class", "input_subline ");
    			add_location(p25, file$1, 115, 12, 5845);
    			attr_dev(div26, "class", "input_desc ");
    			add_location(div26, file$1, 113, 8, 5753);
    			attr_dev(textarea1, "name", "additional");
    			attr_dev(textarea1, "placeholder", "... ");
    			attr_dev(textarea1, "maxlength", "1000");
    			attr_dev(textarea1, "class", "bigbox");
    			add_location(textarea1, file$1, 117, 8, 5915);
    			attr_dev(div27, "id", "form_additional ");
    			attr_dev(div27, "class", "form_inputfield form_general");
    			add_location(div27, file$1, 112, 4, 5679);
    			attr_dev(div28, "class", "form_category_title");
    			add_location(div28, file$1, 120, 4, 6120);
    			attr_dev(p26, "class", "input_title ");
    			add_location(p26, file$1, 124, 12, 6384);
    			attr_dev(p27, "class", "input_subline ");
    			add_location(p27, file$1, 125, 12, 6437);
    			attr_dev(div29, "class", "input_desc ");
    			add_location(div29, file$1, 123, 8, 6345);
    			attr_dev(input10, "name", "gridquare");
    			attr_dev(input10, "placeholder", "585735... ");
    			attr_dev(input10, "maxlength", "6");
    			add_location(input10, file$1, 127, 8, 6502);
    			attr_dev(div30, "id", "form_gridsquare ");
    			attr_dev(div30, "class", "form_inputfield form_general");
    			add_location(div30, file$1, 122, 4, 6271);
    			attr_dev(p28, "class", "input_title ");
    			add_location(p28, file$1, 132, 12, 6785);
    			attr_dev(p29, "class", "input_subline ");
    			add_location(p29, file$1, 133, 12, 6833);
    			attr_dev(div31, "class", "input_desc ");
    			add_location(div31, file$1, 131, 8, 6746);
    			attr_dev(input11, "name", "radius");
    			attr_dev(input11, "placeholder", "300/500/... in Metern ");
    			attr_dev(input11, "maxlength", "100");
    			add_location(input11, file$1, 135, 8, 6902);
    			attr_dev(div32, "id", "form_radius ");
    			attr_dev(div32, "class", "form_inputfield form_map");
    			add_location(div32, file$1, 130, 4, 6680);
    			attr_dev(div33, "class", "input_desc ");
    			add_location(div33, file$1, 139, 8, 7157);
    			attr_dev(button, "type", "submit");
    			attr_dev(button, "class", "nav-gridcell highlight-anim");
    			attr_dev(button, "id", "submit_btn");
    			add_location(button, file$1, 141, 8, 7208);
    			attr_dev(div34, "id", "form_submit");
    			attr_dev(div34, "class", "form_inputfield form_map");
    			add_location(div34, file$1, 138, 4, 7092);
    			attr_dev(form, "id", "mlg-form");
    			add_location(form, file$1, 1, 0, 43);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, form, anchor);
    			append_dev(form, div0);
    			append_dev(form, t3);
    			append_dev(form, div2);
    			append_dev(div2, div1);
    			append_dev(div1, p0);
    			append_dev(div1, t5);
    			append_dev(div1, p1);
    			append_dev(div2, t7);
    			append_dev(div2, input0);
    			append_dev(form, t8);
    			append_dev(form, div4);
    			append_dev(div4, div3);
    			append_dev(div3, p2);
    			append_dev(div3, t10);
    			append_dev(div3, p3);
    			append_dev(div4, t12);
    			append_dev(div4, input1);
    			append_dev(form, t13);
    			append_dev(form, div6);
    			append_dev(div6, div5);
    			append_dev(div5, p4);
    			append_dev(div5, t15);
    			append_dev(div5, p5);
    			append_dev(div6, t17);
    			append_dev(div6, input2);
    			append_dev(form, t18);
    			append_dev(form, div8);
    			append_dev(div8, div7);
    			append_dev(div7, p6);
    			append_dev(div7, t20);
    			append_dev(div7, p7);
    			append_dev(div8, t22);
    			append_dev(div8, input3);
    			append_dev(form, t23);
    			append_dev(form, div10);
    			append_dev(div10, div9);
    			append_dev(div9, p8);
    			append_dev(div9, t25);
    			append_dev(div9, p9);
    			append_dev(div10, t27);
    			append_dev(div10, textarea0);
    			append_dev(form, t28);
    			append_dev(form, div12);
    			append_dev(div12, div11);
    			append_dev(div11, p10);
    			append_dev(div11, t30);
    			append_dev(div11, p11);
    			append_dev(div12, t32);
    			append_dev(div12, select0);
    			append_dev(select0, option0);
    			append_dev(select0, option1);
    			append_dev(select0, option2);
    			append_dev(form, t36);
    			append_dev(form, div14);
    			append_dev(div14, div13);
    			append_dev(div13, p12);
    			append_dev(div13, t38);
    			append_dev(div13, p13);
    			append_dev(div14, t40);
    			append_dev(div14, input4);
    			append_dev(form, t41);
    			append_dev(form, div16);
    			append_dev(div16, div15);
    			append_dev(div15, p14);
    			append_dev(div15, t43);
    			append_dev(div15, p15);
    			append_dev(div16, t45);
    			append_dev(div16, input5);
    			append_dev(form, t46);
    			append_dev(form, div18);
    			append_dev(div18, div17);
    			append_dev(div17, p16);
    			append_dev(div17, t48);
    			append_dev(div17, p17);
    			append_dev(div18, t50);
    			append_dev(div18, input6);
    			append_dev(form, t51);
    			append_dev(form, div20);
    			append_dev(div20, div19);
    			append_dev(div19, p18);
    			append_dev(div19, t53);
    			append_dev(div19, p19);
    			append_dev(div20, t55);
    			append_dev(div20, input7);
    			append_dev(form, t56);
    			append_dev(form, div22);
    			append_dev(div22, div21);
    			append_dev(div21, p20);
    			append_dev(div21, t58);
    			append_dev(div21, p21);
    			append_dev(div22, t60);
    			append_dev(div22, select1);
    			append_dev(select1, option3);
    			append_dev(select1, option4);
    			append_dev(select1, option5);
    			append_dev(form, t64);
    			append_dev(form, div25);
    			append_dev(div25, div23);
    			append_dev(div23, p22);
    			append_dev(div23, t66);
    			append_dev(div23, p23);
    			append_dev(div25, t68);
    			append_dev(div25, div24);
    			append_dev(div24, input8);
    			append_dev(div24, t69);
    			append_dev(div24, input9);
    			append_dev(form, t70);
    			append_dev(form, div27);
    			append_dev(div27, div26);
    			append_dev(div26, p24);
    			append_dev(div26, t72);
    			append_dev(div26, p25);
    			append_dev(div27, t74);
    			append_dev(div27, textarea1);
    			append_dev(form, t75);
    			append_dev(form, div28);
    			append_dev(form, t77);
    			append_dev(form, div30);
    			append_dev(div30, div29);
    			append_dev(div29, p26);
    			append_dev(div29, t79);
    			append_dev(div29, p27);
    			append_dev(div30, t81);
    			append_dev(div30, input10);
    			append_dev(form, t82);
    			append_dev(form, div32);
    			append_dev(div32, div31);
    			append_dev(div31, p28);
    			append_dev(div31, t84);
    			append_dev(div31, p29);
    			append_dev(div32, t86);
    			append_dev(div32, input11);
    			append_dev(form, t87);
    			append_dev(form, div34);
    			append_dev(div34, div33);
    			append_dev(div34, t88);
    			append_dev(div34, button);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(form);
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
    	validate_slots('Mlg', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Mlg> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Mlg extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Mlg",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.46.3 */
    const file = "src\\App.svelte";

    // (20:3) <Link to="/" class="nav-gridcell highlight-anim highlight-anim-blue">
    function create_default_slot_8(ctx) {
    	let span0;
    	let span1;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			span0.textContent = "home";
    			span1 = element("span");
    			span1.textContent = "home";
    			attr_dev(span0, "class", "material-icons");
    			add_location(span0, file, 20, 4, 485);
    			attr_dev(span1, "class", "text");
    			add_location(span1, file, 20, 44, 525);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			insert_dev(target, span1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(20:3) <Link to=\\\"/\\\" class=\\\"nav-gridcell highlight-anim highlight-anim-blue\\\">",
    		ctx
    	});

    	return block;
    }

    // (23:3) <Link to="wiki" class="nav-gridcell highlight-anim highlight-anim-green">
    function create_default_slot_7(ctx) {
    	let span0;
    	let span1;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			span0.textContent = "book";
    			span1 = element("span");
    			span1.textContent = "wiki";
    			attr_dev(span0, "class", "material-icons");
    			add_location(span0, file, 23, 4, 651);
    			attr_dev(span1, "class", "text");
    			add_location(span1, file, 23, 44, 691);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			insert_dev(target, span1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(23:3) <Link to=\\\"wiki\\\" class=\\\"nav-gridcell highlight-anim highlight-anim-green\\\">",
    		ctx
    	});

    	return block;
    }

    // (26:3) <Link to="/">
    function create_default_slot_6(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "alt", "hellcat logo");
    			if (!src_url_equal(img.src, img_src_value = "./images/hellcat.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "id", "nav-logo");
    			attr_dev(img, "class", "nointeract");
    			add_location(img, file, 26, 4, 757);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(26:3) <Link to=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (30:3) <Link to="gallery" class="nav-gridcell highlight-anim highlight-anim-orange">
    function create_default_slot_5(ctx) {
    	let span0;
    	let span1;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			span0.textContent = "collections";
    			span1 = element("span");
    			span1.textContent = "gallerie";
    			attr_dev(span0, "class", "material-icons");
    			add_location(span0, file, 30, 4, 943);
    			attr_dev(span1, "class", "text");
    			add_location(span1, file, 30, 51, 990);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			insert_dev(target, span1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(30:3) <Link to=\\\"gallery\\\" class=\\\"nav-gridcell highlight-anim highlight-anim-orange\\\">",
    		ctx
    	});

    	return block;
    }

    // (33:3) <Link to="contact" class="nav-gridcell highlight-anim highlight-anim-purple">
    function create_default_slot_4(ctx) {
    	let span0;
    	let span1;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			span0.textContent = "alternate_email";
    			span1 = element("span");
    			span1.textContent = "kontakt";
    			attr_dev(span0, "class", "material-icons");
    			add_location(span0, file, 33, 4, 1124);
    			attr_dev(span1, "class", "text");
    			add_location(span1, file, 33, 55, 1175);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			insert_dev(target, span1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(33:3) <Link to=\\\"contact\\\" class=\\\"nav-gridcell highlight-anim highlight-anim-purple\\\">",
    		ctx
    	});

    	return block;
    }

    // (16:2) <Router url="{url}">
    function create_default_slot_3(ctx) {
    	let link0;
    	let t0;
    	let link1;
    	let t1;
    	let link2;
    	let t2;
    	let link3;
    	let t3;
    	let link4;
    	let current;

    	link0 = new Link({
    			props: {
    				to: "/",
    				class: "nav-gridcell highlight-anim highlight-anim-blue",
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link1 = new Link({
    			props: {
    				to: "wiki",
    				class: "nav-gridcell highlight-anim highlight-anim-green",
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link2 = new Link({
    			props: {
    				to: "/",
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link3 = new Link({
    			props: {
    				to: "gallery",
    				class: "nav-gridcell highlight-anim highlight-anim-orange",
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link4 = new Link({
    			props: {
    				to: "contact",
    				class: "nav-gridcell highlight-anim highlight-anim-purple",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(link0.$$.fragment);
    			t0 = space();
    			create_component(link1.$$.fragment);
    			t1 = space();
    			create_component(link2.$$.fragment);
    			t2 = space();
    			create_component(link3.$$.fragment);
    			t3 = space();
    			create_component(link4.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(link0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(link1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(link2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(link3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(link4, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const link0_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link0_changes.$$scope = { dirty, ctx };
    			}

    			link0.$set(link0_changes);
    			const link1_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link1_changes.$$scope = { dirty, ctx };
    			}

    			link1.$set(link1_changes);
    			const link2_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link2_changes.$$scope = { dirty, ctx };
    			}

    			link2.$set(link2_changes);
    			const link3_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link3_changes.$$scope = { dirty, ctx };
    			}

    			link3.$set(link3_changes);
    			const link4_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link4_changes.$$scope = { dirty, ctx };
    			}

    			link4.$set(link4_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link0.$$.fragment, local);
    			transition_in(link1.$$.fragment, local);
    			transition_in(link2.$$.fragment, local);
    			transition_in(link3.$$.fragment, local);
    			transition_in(link4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link0.$$.fragment, local);
    			transition_out(link1.$$.fragment, local);
    			transition_out(link2.$$.fragment, local);
    			transition_out(link3.$$.fragment, local);
    			transition_out(link4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(link0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(link1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(link2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(link3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(link4, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(16:2) <Router url=\\\"{url}\\\">",
    		ctx
    	});

    	return block;
    }

    // (46:2) <Route path="home">
    function create_default_slot_2(ctx) {
    	let home;
    	let current;
    	home = new Home({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(home.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(home, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(home.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(home.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(home, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(46:2) <Route path=\\\"home\\\">",
    		ctx
    	});

    	return block;
    }

    // (47:2) <Route path="/">
    function create_default_slot_1(ctx) {
    	let home;
    	let current;
    	home = new Home({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(home.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(home, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(home.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(home.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(home, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(47:2) <Route path=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (41:1) <Router url="{url}">
    function create_default_slot(ctx) {
    	let route0;
    	let t0;
    	let route1;
    	let t1;
    	let route2;
    	let t2;
    	let route3;
    	let t3;
    	let route4;
    	let t4;
    	let route5;
    	let current;

    	route0 = new Route({
    			props: { path: "mlg", component: Mlg },
    			$$inline: true
    		});

    	route1 = new Route({
    			props: { path: "contact", component: Contact },
    			$$inline: true
    		});

    	route2 = new Route({
    			props: { path: "gallery", component: Gallery },
    			$$inline: true
    		});

    	route3 = new Route({
    			props: { path: "wiki", component: Wiki },
    			$$inline: true
    		});

    	route4 = new Route({
    			props: {
    				path: "home",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route5 = new Route({
    			props: {
    				path: "/",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(route0.$$.fragment);
    			t0 = space();
    			create_component(route1.$$.fragment);
    			t1 = space();
    			create_component(route2.$$.fragment);
    			t2 = space();
    			create_component(route3.$$.fragment);
    			t3 = space();
    			create_component(route4.$$.fragment);
    			t4 = space();
    			create_component(route5.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(route0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(route1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(route2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(route3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(route4, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(route5, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const route4_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route4_changes.$$scope = { dirty, ctx };
    			}

    			route4.$set(route4_changes);
    			const route5_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route5_changes.$$scope = { dirty, ctx };
    			}

    			route5.$set(route5_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(route2.$$.fragment, local);
    			transition_in(route3.$$.fragment, local);
    			transition_in(route4.$$.fragment, local);
    			transition_in(route5.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			transition_out(route3.$$.fragment, local);
    			transition_out(route4.$$.fragment, local);
    			transition_out(route5.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(route0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(route1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(route2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(route3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(route4, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(route5, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(41:1) <Router url=\\\"{url}\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let div0;
    	let router0;
    	let t0;
    	let div1;
    	let t2;
    	let router1;
    	let t3;
    	let footer;
    	let div4;
    	let a0;
    	let div2;
    	let img0;
    	let img0_src_value;
    	let t4;
    	let a1;
    	let div3;
    	let img1;
    	let img1_src_value;
    	let t5;
    	let span1;
    	let t6;
    	let br;
    	let span0;
    	let current;

    	router0 = new Router({
    			props: {
    				url: /*url*/ ctx[0],
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	router1 = new Router({
    			props: {
    				url: /*url*/ ctx[0],
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			div0 = element("div");
    			create_component(router0.$$.fragment);
    			t0 = space();
    			div1 = element("div");
    			div1.textContent = "Task Force Hellcat";
    			t2 = space();
    			create_component(router1.$$.fragment);
    			t3 = space();
    			footer = element("footer");
    			div4 = element("div");
    			a0 = element("a");
    			div2 = element("div");
    			img0 = element("img");
    			t4 = space();
    			a1 = element("a");
    			div3 = element("div");
    			img1 = element("img");
    			t5 = space();
    			span1 = element("span");
    			t6 = text("© Task Force Hellcat");
    			br = element("br");
    			span0 = element("span");
    			span0.textContent = "All rights reserverd.";
    			attr_dev(div0, "id", "navigation");
    			add_location(div0, file, 14, 1, 307);
    			attr_dev(div1, "id", "logo-title");
    			attr_dev(div1, "class", "nointeract");
    			add_location(div1, file, 38, 1, 1247);
    			add_location(main, file, 13, 0, 298);
    			attr_dev(img0, "alt", "arma units logo");
    			if (!src_url_equal(img0.src, img0_src_value = "https://units.arma3.com/assets/img/units/header_icon.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 53, 4, 1748);
    			add_location(div2, file, 52, 3, 1737);
    			attr_dev(a0, "title", "Visit our ArmA 3 Units Profile!");
    			attr_dev(a0, "href", "https://units.arma3.com/");
    			attr_dev(a0, "target", "_blank");
    			add_location(a0, file, 51, 2, 1641);
    			attr_dev(img1, "alt", "discord logo");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/discord.svg")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 58, 4, 1959);
    			add_location(div3, file, 57, 3, 1948);
    			attr_dev(a1, "title", "Join our Discord!");
    			attr_dev(a1, "href", "https://discord.gg/Ap3bEmBgXw");
    			attr_dev(a1, "target", "_blank");
    			add_location(a1, file, 56, 2, 1861);
    			add_location(div4, file, 50, 1, 1632);
    			add_location(br, file, 62, 32, 2072);
    			add_location(span0, file, 62, 36, 2076);
    			add_location(span1, file, 62, 1, 2041);
    			add_location(footer, file, 49, 0, 1621);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div0);
    			mount_component(router0, div0, null);
    			append_dev(main, t0);
    			append_dev(main, div1);
    			append_dev(main, t2);
    			mount_component(router1, main, null);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div4);
    			append_dev(div4, a0);
    			append_dev(a0, div2);
    			append_dev(div2, img0);
    			append_dev(div4, t4);
    			append_dev(div4, a1);
    			append_dev(a1, div3);
    			append_dev(div3, img1);
    			append_dev(footer, t5);
    			append_dev(footer, span1);
    			append_dev(span1, t6);
    			append_dev(span1, br);
    			append_dev(span1, span0);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router0_changes = {};
    			if (dirty & /*url*/ 1) router0_changes.url = /*url*/ ctx[0];

    			if (dirty & /*$$scope*/ 2) {
    				router0_changes.$$scope = { dirty, ctx };
    			}

    			router0.$set(router0_changes);
    			const router1_changes = {};
    			if (dirty & /*url*/ 1) router1_changes.url = /*url*/ ctx[0];

    			if (dirty & /*$$scope*/ 2) {
    				router1_changes.$$scope = { dirty, ctx };
    			}

    			router1.$set(router1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router0.$$.fragment, local);
    			transition_in(router1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router0.$$.fragment, local);
    			transition_out(router1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(router0);
    			destroy_component(router1);
    			if (detaching) detach_dev(t3);
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
    	let { url = "" } = $$props;
    	const writable_props = ['url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    	};

    	$$self.$capture_state = () => ({
    		Router,
    		Link,
    		Route,
    		Home,
    		Wiki,
    		Gallery,
    		Contact,
    		Mlg,
    		url
    	});

    	$$self.$inject_state = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [url];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { url: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get url() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
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
