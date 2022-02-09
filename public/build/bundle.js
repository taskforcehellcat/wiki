
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

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

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

    /* node_modules\svelte-routing\src\Router.svelte generated by Svelte v3.46.4 */

    function create_fragment$i(ctx) {
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
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { basepath: 3, url: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$i.name
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

    /* node_modules\svelte-routing\src\Route.svelte generated by Svelte v3.46.4 */

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

    function create_fragment$h(ctx) {
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
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, { path: 8, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$h.name
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

    /* node_modules\svelte-routing\src\Link.svelte generated by Svelte v3.46.4 */
    const file$f = "node_modules\\svelte-routing\\src\\Link.svelte";

    function create_fragment$g(ctx) {
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
    			add_location(a, file$f, 40, 0, 1249);
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
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {
    			to: 7,
    			replace: 8,
    			state: 9,
    			getProps: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$g.name
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

    /* src\Wiki.svelte generated by Svelte v3.46.4 */

    const { console: console_1 } = globals;
    const file$e = "src\\Wiki.svelte";
    const get_content_slot_changes = dirty => ({});
    const get_content_slot_context = ctx => ({});

    // (183:4) <Link to="/" id="nav-logo">
    function create_default_slot$2(ctx) {
    	let t0;
    	let span;

    	const block = {
    		c: function create() {
    			t0 = text("TFHC ");
    			span = element("span");
    			span.textContent = "Wiki";
    			add_location(span, file$e, 182, 36, 4293);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(183:4) <Link to=\\\"/\\\" id=\\\"nav-logo\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let div7;
    	let nav;
    	let link;
    	let t0;
    	let div0;
    	let span;
    	let t2;
    	let input;
    	let t3;
    	let div1;
    	let t5;
    	let div5;
    	let div3;
    	let div2;
    	let t6;
    	let div4;
    	let t7;
    	let div6;
    	let t9;
    	let a;
    	let t11;
    	let main;
    	let t12;
    	let footer;
    	let current;

    	link = new Link({
    			props: {
    				to: "/",
    				id: "nav-logo",
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const content_slot_template = /*#slots*/ ctx[0].content;
    	const content_slot = create_slot(content_slot_template, ctx, /*$$scope*/ ctx[1], get_content_slot_context);

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			nav = element("nav");
    			create_component(link.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			span = element("span");
    			span.textContent = "search";
    			t2 = space();
    			input = element("input");
    			t3 = space();
    			div1 = element("div");
    			div1.textContent = "navigation";
    			t5 = space();
    			div5 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			t6 = space();
    			div4 = element("div");
    			t7 = space();
    			div6 = element("div");
    			div6.textContent = "wiki";
    			t9 = space();
    			a = element("a");
    			a.textContent = "Return";
    			t11 = space();
    			main = element("main");
    			if (content_slot) content_slot.c();
    			t12 = space();
    			footer = element("footer");
    			attr_dev(span, "class", "material-icons svelte-rz3gbl");
    			add_location(span, file$e, 184, 6, 4352);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "name", "search");
    			attr_dev(input, "placeholder", "Wiki durchsuchen...");
    			attr_dev(input, "class", "svelte-rz3gbl");
    			add_location(input, file$e, 185, 6, 4402);
    			attr_dev(div0, "id", "nav-search");
    			attr_dev(div0, "class", "svelte-rz3gbl");
    			add_location(div0, file$e, 183, 4, 4323);
    			attr_dev(div1, "class", "nav-list-title svelte-rz3gbl");
    			add_location(div1, file$e, 188, 4, 4491);
    			attr_dev(div2, "id", "nav-list-bar-thumb");
    			attr_dev(div2, "class", "svelte-rz3gbl");
    			add_location(div2, file$e, 191, 8, 4609);
    			attr_dev(div3, "id", "nav-list-bar");
    			attr_dev(div3, "class", "svelte-rz3gbl");
    			add_location(div3, file$e, 190, 6, 4576);
    			attr_dev(div4, "id", "nav-list");
    			attr_dev(div4, "class", "svelte-rz3gbl");
    			add_location(div4, file$e, 193, 6, 4662);
    			attr_dev(div5, "id", "nav-list-wrapper");
    			attr_dev(div5, "class", "svelte-rz3gbl");
    			add_location(div5, file$e, 189, 4, 4541);
    			attr_dev(div6, "class", "nav-list-title svelte-rz3gbl");
    			add_location(div6, file$e, 195, 4, 4701);
    			attr_dev(a, "href", "/");
    			attr_dev(a, "id", "return-button");
    			attr_dev(a, "class", "svelte-rz3gbl");
    			add_location(a, file$e, 196, 4, 4745);
    			attr_dev(nav, "class", "svelte-rz3gbl");
    			add_location(nav, file$e, 181, 2, 4250);
    			add_location(main, file$e, 199, 2, 4804);
    			add_location(footer, file$e, 202, 2, 4854);
    			attr_dev(div7, "id", "wiki-wrapper");
    			attr_dev(div7, "class", "svelte-rz3gbl");
    			add_location(div7, file$e, 180, 0, 4223);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, nav);
    			mount_component(link, nav, null);
    			append_dev(nav, t0);
    			append_dev(nav, div0);
    			append_dev(div0, span);
    			append_dev(div0, t2);
    			append_dev(div0, input);
    			append_dev(nav, t3);
    			append_dev(nav, div1);
    			append_dev(nav, t5);
    			append_dev(nav, div5);
    			append_dev(div5, div3);
    			append_dev(div3, div2);
    			append_dev(div5, t6);
    			append_dev(div5, div4);
    			append_dev(nav, t7);
    			append_dev(nav, div6);
    			append_dev(nav, t9);
    			append_dev(nav, a);
    			append_dev(div7, t11);
    			append_dev(div7, main);

    			if (content_slot) {
    				content_slot.m(main, null);
    			}

    			append_dev(div7, t12);
    			append_dev(div7, footer);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const link_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);

    			if (content_slot) {
    				if (content_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						content_slot,
    						content_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(content_slot_template, /*$$scope*/ ctx[1], dirty, get_content_slot_changes),
    						get_content_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			transition_in(content_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			transition_out(content_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			destroy_component(link);
    			if (content_slot) content_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Wiki', slots, ['content']);

    	onMount(async () => {
    		const thumb = document.getElementById("nav-list-bar-thumb");
    		const sections = document.querySelectorAll("section");
    		const navList = document.getElementById("nav-list");
    		const bar = document.getElementById("nav-list-bar");
    		var sectionsArr = Array.from(sections);

    		/* Konvertiert "Sections" NodeList zu Array (falls man's mal brauch x) */
    		// for(var i = sections.length; i--; sectionsArr.unshift(sections[i]));
    		/* Fügt h2 zu allen elementen der NodeList */
    		sectionsArr.forEach(element => {
    			element.insertAdjacentHTML("afterBegin", "<h2>" + element.id + "</h2>");
    			navList.innerHTML += '<a href="#' + element.id + '">' + element.id + "</a>";
    		});

    		/* setzt nav-list-bar-thumb auf genaue höhe von einem navi punkt */
    		var thumbPercent = 1 / sections.length * 100;

    		if (parseInt(bar.style.paddingTop) - parseInt(thumb.style.height) <= parseInt(window.getComputedStyle(bar).getPropertyValue("height"))) {
    			thumb.style.height = parseInt(parseInt(window.getComputedStyle(bar).getPropertyValue("height"))) * (thumbPercent / 100) + "px";
    		}

    		//	thumb.style.height = 1 / sections.length * 100 + "%";
    		//  window.addEventListener("scroll", (event) => {
    		//    bar.style.paddingTop = window.scrollY / (sections.length * 10) + "rem";
    		//  });
    		var sectionHeight = 0;

    		sections.forEach(element => {
    			sectionHeight += parseInt(window.getComputedStyle(element).height);
    		});

    		console.log(sectionHeight);
    		document.getElementById("wiki-wrapper").minHeight = sectionHeight;
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Wiki> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ Router, Link, Route, onMount });
    	return [slots, $$scope];
    }

    class Wiki extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Wiki",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src\Wiki\Grundlagen.svelte generated by Svelte v3.46.4 */
    const file$d = "src\\Wiki\\Grundlagen.svelte";

    // (6:2) <svelte:fragment slot="content">
    function create_content_slot$c(ctx) {
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
    			h1.textContent = "Grundlagen";
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
    			add_location(h1, file$d, 6, 4, 109);
    			add_location(p0, file$d, 9, 6, 170);
    			attr_dev(section0, "id", "Allgemeines");
    			add_location(section0, file$d, 8, 4, 136);
    			add_location(p1, file$d, 13, 6, 749);
    			attr_dev(section1, "id", "Rollenprofil");
    			add_location(section1, file$d, 12, 4, 714);
    			add_location(p2, file$d, 17, 6, 1366);
    			attr_dev(section2, "id", "Ausrüstung");
    			add_location(section2, file$d, 16, 4, 1333);
    			add_location(p3, file$d, 21, 6, 1989);
    			attr_dev(section3, "id", "Aufgabenbereiche");
    			add_location(section3, file$d, 20, 4, 1950);
    			add_location(p4, file$d, 25, 6, 2610);
    			attr_dev(section4, "id", "Einsatzgebiete");
    			add_location(section4, file$d, 24, 4, 2573);
    			add_location(p5, file$d, 29, 6, 3228);
    			attr_dev(section5, "id", "Kompetenzen");
    			add_location(section5, file$d, 28, 4, 3194);
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
    		id: create_content_slot$c.name,
    		type: "slot",
    		source: "(6:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$c] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(wiki.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(wiki, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const wiki_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				wiki_changes.$$scope = { dirty, ctx };
    			}

    			wiki.$set(wiki_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(wiki.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(wiki.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(wiki, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Grundlagen', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Grundlagen> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Grundlagen extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Grundlagen",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src\Wiki\Panzertruppen.svelte generated by Svelte v3.46.4 */
    const file$c = "src\\Wiki\\Panzertruppen.svelte";

    // (6:2) <svelte:fragment slot="content">
    function create_content_slot$b(ctx) {
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
    	let p5;
    	let t13;
    	let section5;
    	let p6;
    	let t15;
    	let p7;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Panzertruppen";
    			t1 = space();
    			section0 = element("section");
    			p0 = element("p");
    			p0.textContent = "Die Abteilung der Panzertruppen ist eine Zusammensetzung aus Panzerbesatzungen bestehend aus Kommandanten, Richtschützen und Fahrern sowie vielfältigen Fahrzeugklassen und Waffensystemen. Ihre Anforderungsbereiche reichen vom modernen Panzerkampf über den Orts- und Häuserkampf mit den Streitkräften bis hin zur Feuerunterstützung der Streitkräfte durch Artilleriefeuer. Alle Spieler der Panzertruppen durchlaufen Ausbildungen, die jeweils auf bestimmte Fahrzeugklassen ausgerichtet sind. Nach Beendigung der Ausbildung können die Spieler an Events mit ihrer Fahrzeugklasse teilnehmen. Neben den Ausbildungen und den Events finden Übungen statt, die speziell für die Panzerbesatzungen der Panzertruppen vorgesehen sind.";
    			t3 = space();
    			section1 = element("section");
    			p1 = element("p");
    			p1.textContent = "Die Panzertruppen verfügen über unterschiedlichste Fahrzeugklassen mit vielfältigen Spezialisierungen, wie den Kampfpanzer (KPz/MBT), den Schützenpanzer (SPz/IFV), den Flugabwehrpanzer (FlakPz/SPAAG), die Panzerartillerie (PzAr/SPG) und die Raketenartillerie (RkAr/MS). Jede Fahrzeugklasse ist für die unterschiedlichsten Anwendungsbereiche vorgesehen, wodurch sich das Spielerlebnis massiv unterscheidet. Je nach Auftrag eines Einsatzes können die Fahrzeugklassen auch gemeinsam agieren, um die höchstmögliche Kampfeffizienz zu erzielen.";
    			t5 = space();
    			section2 = element("section");
    			p2 = element("p");
    			p2.textContent = "Die Panzerbesatzungen der Panzertruppen setzen sich im Normalfall aus jeweils drei Spielern zusammen. Der Kommandant hat die Befehlsgewalt und trägt die Verantwortung für sein Fahrzeug und seine Besatzung. Die Erfüllung des Einsatzauftrages ist durch den Informationsfluss mit verbündeten Kräften, der Befehlserteilung und der Einhaltung von Befehlen des Panzerzugführers durch ihn zu erreichen. Die Kraftfahrer der Panzertruppen nehmen unmittelbaren Einfluss auf die Bewegung ihres Fahrzeuges. Ihre Aufgabe ist das Manövrieren des Fahrzeuges entsprechend der Anweisungen ihrer Kommandanten. Die Richtschützen der Panzertruppen bedienen die Waffenanlage ihrer Fahrzeuge entsprechend der Anweisungen ihres Kommandanten. Sie sind unmittelbar an der Aufklärung und Bekämpfung von Feindkräften sowie der Deckung eigener Truppen beteiligt.";
    			t7 = space();
    			section3 = element("section");
    			p3 = element("p");
    			p3.textContent = "Zur Wahrung von Struktur und Ordnung während eines Einsatzes gibt es bei den Panzertruppen eine klare Hierarchie. Alle Fahrer und Richtschützen der Panzertruppen sind das unterste Glied der Führungskette. Ihr Vorgesetzter ist ihr Kommandant, der ihnen Befehle erteilt. Alle Kommandanten eines Panzerzuges unterstehen dem jeweiligen Panzerzugführer. Seine Verantwortung liegt in der Koordination und Führung des ganzen Panzerzuges, während er eine Funkverbindung zu den Führungselementen und anderen unterstützenden Elementen hält. Die Kommunikation der Führungskette ist intuitiv: Die Befehle werden von der Führungsebene bis zum unterstem Glied der Führungskette weitergegeben. Aus der entgegengesetzten Richtung stammen Meldungen, Fragen, Statusberichte, etc. der Panzerbesatzungen.";
    			t9 = space();
    			section4 = element("section");
    			p4 = element("p");
    			p4.textContent = "Feindliche Kräfte werden innerhalb der Panzertruppen gemäß der REZ-Regel gemeldet. Eine Feindmeldung erfolgt durch die Richtungsangabe, Entfernungsangabe und der Zieldefinition des Feindes. Die Richtungsangabe erfolgt im Normalfall entsprechend einer Uhrzeit relativ zur Fahrzeugwanne oder in Gradzahlen. Die Entfernungsangabe wird in Hundert übergeben, also wird \"1200 Meter\" zu \"Zwölfhundert Meter\". Ausnahmen sind hierbei Tausenderzahlen wie 1000, 2000, usw. Die Zieldefinition erfolgt als Typdefinition des Feindes. Eine feindliche Infanteriegruppe wird als solche gemeldet und ein Fahrzeug wird entsprechend der vorgesehenen Akronyme durchgegeben.";
    			t11 = space();
    			p5 = element("p");
    			p5.textContent = "Die im Normalfall aus vier Fahrzeugen derselben Fahrzeugklasse bestehenden Panzerzüge der Panzertruppen können in den unterschiedlichsten Formen vorkommen. Neben der Formierung von verminderten oder verstärkten Panzerzügen kann die Bildung eines Sonderzuges erfolgen. Ein Sonderzug ist ein Kampfverband, der aus unterschiedlichen Fahrzeugklassen zusammengesetzt ist. Die Zusammenschließung oder Neubildung von Panzerzügen kann während des Einsatzes durch die Führungskraft der Panzertruppen erfolgen.";
    			t13 = space();
    			section5 = element("section");
    			p6 = element("p");
    			p6.textContent = "Die Kommunikation der Panzertruppen hat einen immensen Einfluss auf ihre Effizienz und Wirkung. Der Funk muss nach dem Leitsatz \"So viel wie nötig, so wenig wie möglich\" erfolgen. Das konkrete Ziel eines Kampfverbandes ist die Bündelung der Feuerkraft und das gegenseitige Schützen.";
    			t15 = space();
    			p7 = element("p");
    			p7.textContent = "Die Kommunikation der Panzertruppen erfolgt über drei Funkkanäle. Der Bordfunk ist ein interner Funkkanal innerhalb eines Fahrzeuges, in dem alle Besatzungsmitglieder miteinander kommunizieren können. Der taktische Funkkanal wird von jedem Besatzungsmitglied eines Zuges genutzt. Der taktische Funkkanal wird vom Zugführer genutzt um möglichst schnell Befehle an Fahrer oder Schützen aller Fahrzeuge seines Zuges zu erteilen. In ihm können Formationswechsel, Geschwindigkeitsjustierungen, Feindmeldungen, Primärziele und Feuerkoordinationen übergeben werden. Der Kommandantenfunkkanal wird von den Kommandanten eines Panzerzuges genutzt, um die Panzerbesatzungen zu entlasten und ein Funkchaos zu vermeiden. Über ihn werden Informationen vermittelt, die keinen unmittelbaren Einfluss auf den aktiven Kampf haben. Dazu zählen Informationen zur Missionsentwicklung, zum Munitionsstand, Schadensberichte an Fahrzeugen, Treibstoffvorräte, Abschüsse, Einzelbefehle, Statusmeldungen, Melden der Einsatzbereitschaft oder Vorschläge.";
    			add_location(h1, file$c, 6, 4, 109);
    			add_location(p0, file$c, 9, 6, 173);
    			attr_dev(section0, "id", "Allgemeines");
    			add_location(section0, file$c, 8, 4, 139);
    			add_location(p1, file$c, 13, 6, 961);
    			attr_dev(section1, "id", "Fahrzeugklassen");
    			add_location(section1, file$c, 12, 4, 923);
    			add_location(p2, file$c, 17, 6, 1573);
    			attr_dev(section2, "id", "Besatzungsmitglieder");
    			add_location(section2, file$c, 16, 4, 1530);
    			add_location(p3, file$c, 21, 6, 2474);
    			attr_dev(section3, "id", "Führungskette");
    			add_location(section3, file$c, 20, 4, 2438);
    			add_location(p4, file$c, 25, 6, 3324);
    			add_location(p5, file$c, 26, 6, 3991);
    			attr_dev(section4, "id", "Formalitäten");
    			add_location(section4, file$c, 24, 4, 3289);
    			add_location(p6, file$c, 30, 6, 4549);
    			add_location(p7, file$c, 31, 6, 4846);
    			attr_dev(section5, "id", "Funk");
    			add_location(section5, file$c, 29, 4, 4522);
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
    			append_dev(section4, t11);
    			append_dev(section4, p5);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, section5, anchor);
    			append_dev(section5, p6);
    			append_dev(section5, t15);
    			append_dev(section5, p7);
    		},
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
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(section5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot$b.name,
    		type: "slot",
    		source: "(6:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$b] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(wiki.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(wiki, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const wiki_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				wiki_changes.$$scope = { dirty, ctx };
    			}

    			wiki.$set(wiki_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(wiki.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(wiki.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(wiki, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Panzertruppen', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Panzertruppen> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Panzertruppen extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Panzertruppen",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src\Wiki\Sanitaeter.svelte generated by Svelte v3.46.4 */
    const file$b = "src\\Wiki\\Sanitaeter.svelte";

    // (6:2) <svelte:fragment slot="content">
    function create_content_slot$a(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Sanitäter";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$b, 6, 4, 109);
    			add_location(p, file$b, 9, 6, 169);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$b, 8, 4, 135);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, p);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot$a.name,
    		type: "slot",
    		source: "(6:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$a] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(wiki.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(wiki, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const wiki_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				wiki_changes.$$scope = { dirty, ctx };
    			}

    			wiki.$set(wiki_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(wiki.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(wiki.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(wiki, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Sanitaeter', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sanitaeter> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Sanitaeter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sanitaeter",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src\Wiki\Aufklaerer.svelte generated by Svelte v3.46.4 */
    const file$a = "src\\Wiki\\Aufklaerer.svelte";

    // (6:2) <svelte:fragment slot="content">
    function create_content_slot$9(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Aufklärer";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$a, 6, 4, 109);
    			add_location(p, file$a, 9, 6, 169);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$a, 8, 4, 135);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, p);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot$9.name,
    		type: "slot",
    		source: "(6:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(wiki.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(wiki, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const wiki_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				wiki_changes.$$scope = { dirty, ctx };
    			}

    			wiki.$set(wiki_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(wiki.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(wiki.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(wiki, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Aufklaerer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Aufklaerer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Aufklaerer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Aufklaerer",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src\Wiki\Basislogistiker.svelte generated by Svelte v3.46.4 */
    const file$9 = "src\\Wiki\\Basislogistiker.svelte";

    // (6:2) <svelte:fragment slot="content">
    function create_content_slot$8(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Basis-Logistiker";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$9, 6, 4, 109);
    			add_location(p, file$9, 9, 6, 176);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$9, 8, 4, 142);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, p);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot$8.name,
    		type: "slot",
    		source: "(6:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(wiki.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(wiki, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const wiki_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				wiki_changes.$$scope = { dirty, ctx };
    			}

    			wiki.$set(wiki_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(wiki.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(wiki.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(wiki, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Basislogistiker', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Basislogistiker> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Basislogistiker extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Basislogistiker",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src\Wiki\Fahrzeuge.svelte generated by Svelte v3.46.4 */
    const file$8 = "src\\Wiki\\Fahrzeuge.svelte";

    // (6:2) <svelte:fragment slot="content">
    function create_content_slot$7(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Fahrzeuge";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$8, 6, 4, 109);
    			add_location(p, file$8, 9, 6, 169);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$8, 8, 4, 135);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, p);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot$7.name,
    		type: "slot",
    		source: "(6:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(wiki.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(wiki, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const wiki_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				wiki_changes.$$scope = { dirty, ctx };
    			}

    			wiki.$set(wiki_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(wiki.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(wiki.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(wiki, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Fahrzeuge', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Fahrzeuge> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Fahrzeuge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Fahrzeuge",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src\Wiki\Fusstruppen.svelte generated by Svelte v3.46.4 */
    const file$7 = "src\\Wiki\\Fusstruppen.svelte";

    // (6:2) <svelte:fragment slot="content">
    function create_content_slot$6(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Fußtruppen";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$7, 6, 4, 109);
    			add_location(p, file$7, 9, 6, 170);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$7, 8, 4, 136);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, p);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot$6.name,
    		type: "slot",
    		source: "(6:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(wiki.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(wiki, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const wiki_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				wiki_changes.$$scope = { dirty, ctx };
    			}

    			wiki.$set(wiki_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(wiki.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(wiki.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(wiki, detaching);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Fusstruppen', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Fusstruppen> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Fusstruppen extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Fusstruppen",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src\Wiki\Helikopter.svelte generated by Svelte v3.46.4 */
    const file$6 = "src\\Wiki\\Helikopter.svelte";

    // (6:2) <svelte:fragment slot="content">
    function create_content_slot$5(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Helikopter";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$6, 6, 4, 109);
    			add_location(p, file$6, 9, 6, 170);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$6, 8, 4, 136);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, p);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot$5.name,
    		type: "slot",
    		source: "(6:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(wiki.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(wiki, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const wiki_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				wiki_changes.$$scope = { dirty, ctx };
    			}

    			wiki.$set(wiki_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(wiki.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(wiki.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(wiki, detaching);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Helikopter', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Helikopter> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Helikopter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Helikopter",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\Wiki\Hubschrauberpiloten.svelte generated by Svelte v3.46.4 */
    const file$5 = "src\\Wiki\\Hubschrauberpiloten.svelte";

    // (6:2) <svelte:fragment slot="content">
    function create_content_slot$4(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Hubschrauberpiloten";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$5, 6, 4, 109);
    			add_location(p, file$5, 9, 6, 179);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$5, 8, 4, 145);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, p);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot$4.name,
    		type: "slot",
    		source: "(6:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(wiki.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(wiki, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const wiki_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				wiki_changes.$$scope = { dirty, ctx };
    			}

    			wiki.$set(wiki_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(wiki.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(wiki.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(wiki, detaching);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Hubschrauberpiloten', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Hubschrauberpiloten> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Hubschrauberpiloten extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Hubschrauberpiloten",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\Wiki\Kampfpioniere.svelte generated by Svelte v3.46.4 */
    const file$4 = "src\\Wiki\\Kampfpioniere.svelte";

    // (6:2) <svelte:fragment slot="content">
    function create_content_slot$3(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Kampfpioniere";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$4, 6, 4, 109);
    			add_location(p, file$4, 9, 6, 173);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$4, 8, 4, 139);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, p);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot$3.name,
    		type: "slot",
    		source: "(6:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(wiki.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(wiki, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const wiki_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				wiki_changes.$$scope = { dirty, ctx };
    			}

    			wiki.$set(wiki_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(wiki.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(wiki.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(wiki, detaching);
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

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Kampfpioniere', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Kampfpioniere> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Kampfpioniere extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Kampfpioniere",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\Wiki\Truppfuehrer.svelte generated by Svelte v3.46.4 */
    const file$3 = "src\\Wiki\\Truppfuehrer.svelte";

    // (6:2) <svelte:fragment slot="content">
    function create_content_slot$2(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Truppführer";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$3, 6, 4, 109);
    			add_location(p, file$3, 9, 6, 171);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$3, 8, 4, 137);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, p);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot$2.name,
    		type: "slot",
    		source: "(6:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(wiki.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(wiki, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const wiki_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				wiki_changes.$$scope = { dirty, ctx };
    			}

    			wiki.$set(wiki_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(wiki.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(wiki.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(wiki, detaching);
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

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Truppfuehrer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Truppfuehrer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Truppfuehrer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Truppfuehrer",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\Wiki\Truppfunker.svelte generated by Svelte v3.46.4 */
    const file$2 = "src\\Wiki\\Truppfunker.svelte";

    // (6:2) <svelte:fragment slot="content">
    function create_content_slot$1(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Truppfunker";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$2, 6, 4, 109);
    			add_location(p, file$2, 9, 6, 171);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$2, 8, 4, 137);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, p);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot$1.name,
    		type: "slot",
    		source: "(6:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(wiki.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(wiki, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const wiki_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				wiki_changes.$$scope = { dirty, ctx };
    			}

    			wiki.$set(wiki_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(wiki.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(wiki.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(wiki, detaching);
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

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Truppfunker', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Truppfunker> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Truppfunker extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Truppfunker",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\Wiki\Uavs.svelte generated by Svelte v3.46.4 */
    const file$1 = "src\\Wiki\\Uavs.svelte";

    // (6:2) <svelte:fragment slot="content">
    function create_content_slot(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "UAVs";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$1, 6, 4, 109);
    			add_location(p, file$1, 9, 6, 164);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$1, 8, 4, 130);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, p);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot.name,
    		type: "slot",
    		source: "(6:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(wiki.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(wiki, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const wiki_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				wiki_changes.$$scope = { dirty, ctx };
    			}

    			wiki.$set(wiki_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(wiki.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(wiki.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(wiki, detaching);
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

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Uavs', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Uavs> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Uavs extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Uavs",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\Home.svelte generated by Svelte v3.46.4 */
    const file = "src\\Home.svelte";

    // (46:6) <Link to="grundlagen">
    function create_default_slot_13$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("GRUNDLAGEN");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_13$1.name,
    		type: "slot",
    		source: "(46:6) <Link to=\\\"grundlagen\\\">",
    		ctx
    	});

    	return block;
    }

    // (49:8) <Link to="truppfuehrer">
    function create_default_slot_12$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("TRUPPFÜHRER");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_12$1.name,
    		type: "slot",
    		source: "(49:8) <Link to=\\\"truppfuehrer\\\">",
    		ctx
    	});

    	return block;
    }

    // (50:8) <Link to="truppfunker">
    function create_default_slot_11$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("TRUPPFUNKER");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11$1.name,
    		type: "slot",
    		source: "(50:8) <Link to=\\\"truppfunker\\\">",
    		ctx
    	});

    	return block;
    }

    // (54:8) <Link to="fusstruppen">
    function create_default_slot_10$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("FUẞTRUPPEN");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10$1.name,
    		type: "slot",
    		source: "(54:8) <Link to=\\\"fusstruppen\\\">",
    		ctx
    	});

    	return block;
    }

    // (55:8) <Link to="panzertruppen">
    function create_default_slot_9$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("PANZERTRUPPEN");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9$1.name,
    		type: "slot",
    		source: "(55:8) <Link to=\\\"panzertruppen\\\">",
    		ctx
    	});

    	return block;
    }

    // (59:8) <Link to="kampfpioniere">
    function create_default_slot_8$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("KAMPFPIONIERE");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8$1.name,
    		type: "slot",
    		source: "(59:8) <Link to=\\\"kampfpioniere\\\">",
    		ctx
    	});

    	return block;
    }

    // (60:8) <Link to="hubschrauberpiloten">
    function create_default_slot_7$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("HUBSCHRAUBERPILOTEN");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7$1.name,
    		type: "slot",
    		source: "(60:8) <Link to=\\\"hubschrauberpiloten\\\">",
    		ctx
    	});

    	return block;
    }

    // (61:8) <Link to="basis-logistiker">
    function create_default_slot_6$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("BASIS-LOGISTIKER");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$1.name,
    		type: "slot",
    		source: "(61:8) <Link to=\\\"basis-logistiker\\\">",
    		ctx
    	});

    	return block;
    }

    // (64:6) <Link to="sanitaeter">
    function create_default_slot_5$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("SANITÄTER");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$1.name,
    		type: "slot",
    		source: "(64:6) <Link to=\\\"sanitaeter\\\">",
    		ctx
    	});

    	return block;
    }

    // (65:6) <Link to="aufklaerer">
    function create_default_slot_4$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("AUFKLÄRER");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(65:6) <Link to=\\\"aufklaerer\\\">",
    		ctx
    	});

    	return block;
    }

    // (68:8) <Link to="fahrzeuge">
    function create_default_slot_3$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("FAHRZEUGE");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(68:8) <Link to=\\\"fahrzeuge\\\">",
    		ctx
    	});

    	return block;
    }

    // (69:8) <Link to="helikopter">
    function create_default_slot_2$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("HELIKOPTER");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(69:8) <Link to=\\\"helikopter\\\">",
    		ctx
    	});

    	return block;
    }

    // (70:8) <Link to="uavs">
    function create_default_slot_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("UAVs");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(70:8) <Link to=\\\"uavs\\\">",
    		ctx
    	});

    	return block;
    }

    // (45:4) <Router {url}>
    function create_default_slot$1(ctx) {
    	let link0;
    	let t0;
    	let a0;
    	let span0;
    	let t2;
    	let link1;
    	let t3;
    	let link2;
    	let t4;
    	let a1;
    	let span1;
    	let t6;
    	let link3;
    	let t7;
    	let link4;
    	let t8;
    	let a2;
    	let span2;
    	let t10;
    	let link5;
    	let t11;
    	let link6;
    	let t12;
    	let link7;
    	let t13;
    	let link8;
    	let t14;
    	let link9;
    	let t15;
    	let a3;
    	let span3;
    	let t17;
    	let link10;
    	let t18;
    	let link11;
    	let t19;
    	let link12;
    	let current;

    	link0 = new Link({
    			props: {
    				to: "grundlagen",
    				$$slots: { default: [create_default_slot_13$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link1 = new Link({
    			props: {
    				to: "truppfuehrer",
    				$$slots: { default: [create_default_slot_12$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link2 = new Link({
    			props: {
    				to: "truppfunker",
    				$$slots: { default: [create_default_slot_11$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link3 = new Link({
    			props: {
    				to: "fusstruppen",
    				$$slots: { default: [create_default_slot_10$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link4 = new Link({
    			props: {
    				to: "panzertruppen",
    				$$slots: { default: [create_default_slot_9$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link5 = new Link({
    			props: {
    				to: "kampfpioniere",
    				$$slots: { default: [create_default_slot_8$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link6 = new Link({
    			props: {
    				to: "hubschrauberpiloten",
    				$$slots: { default: [create_default_slot_7$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link7 = new Link({
    			props: {
    				to: "basis-logistiker",
    				$$slots: { default: [create_default_slot_6$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link8 = new Link({
    			props: {
    				to: "sanitaeter",
    				$$slots: { default: [create_default_slot_5$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link9 = new Link({
    			props: {
    				to: "aufklaerer",
    				$$slots: { default: [create_default_slot_4$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link10 = new Link({
    			props: {
    				to: "fahrzeuge",
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link11 = new Link({
    			props: {
    				to: "helikopter",
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link12 = new Link({
    			props: {
    				to: "uavs",
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(link0.$$.fragment);
    			t0 = space();
    			a0 = element("a");
    			span0 = element("span");
    			span0.textContent = "FÜHRUNGSKRÄFTE";
    			t2 = space();
    			create_component(link1.$$.fragment);
    			t3 = space();
    			create_component(link2.$$.fragment);
    			t4 = space();
    			a1 = element("a");
    			span1 = element("span");
    			span1.textContent = "STREITKRÄFTE";
    			t6 = space();
    			create_component(link3.$$.fragment);
    			t7 = space();
    			create_component(link4.$$.fragment);
    			t8 = space();
    			a2 = element("a");
    			span2 = element("span");
    			span2.textContent = "LOGISTIKER";
    			t10 = space();
    			create_component(link5.$$.fragment);
    			t11 = space();
    			create_component(link6.$$.fragment);
    			t12 = space();
    			create_component(link7.$$.fragment);
    			t13 = space();
    			create_component(link8.$$.fragment);
    			t14 = space();
    			create_component(link9.$$.fragment);
    			t15 = space();
    			a3 = element("a");
    			span3 = element("span");
    			span3.textContent = "FUHRPARK";
    			t17 = space();
    			create_component(link10.$$.fragment);
    			t18 = space();
    			create_component(link11.$$.fragment);
    			t19 = space();
    			create_component(link12.$$.fragment);
    			add_location(span0, file, 47, 9, 1632);
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "class", "expandable");
    			add_location(a0, file, 46, 6, 1591);
    			add_location(span1, file, 52, 9, 1823);
    			attr_dev(a1, "href", "/");
    			attr_dev(a1, "class", "expandable");
    			add_location(a1, file, 51, 6, 1782);
    			add_location(span2, file, 57, 9, 2014);
    			attr_dev(a2, "href", "/");
    			attr_dev(a2, "class", "expandable");
    			add_location(a2, file, 56, 6, 1973);
    			add_location(span3, file, 66, 9, 2375);
    			attr_dev(a3, "href", "/");
    			attr_dev(a3, "class", "expandable");
    			add_location(a3, file, 65, 6, 2334);
    		},
    		m: function mount(target, anchor) {
    			mount_component(link0, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, a0, anchor);
    			append_dev(a0, span0);
    			append_dev(a0, t2);
    			mount_component(link1, a0, null);
    			append_dev(a0, t3);
    			mount_component(link2, a0, null);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, a1, anchor);
    			append_dev(a1, span1);
    			append_dev(a1, t6);
    			mount_component(link3, a1, null);
    			append_dev(a1, t7);
    			mount_component(link4, a1, null);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, a2, anchor);
    			append_dev(a2, span2);
    			append_dev(a2, t10);
    			mount_component(link5, a2, null);
    			append_dev(a2, t11);
    			mount_component(link6, a2, null);
    			append_dev(a2, t12);
    			mount_component(link7, a2, null);
    			insert_dev(target, t13, anchor);
    			mount_component(link8, target, anchor);
    			insert_dev(target, t14, anchor);
    			mount_component(link9, target, anchor);
    			insert_dev(target, t15, anchor);
    			insert_dev(target, a3, anchor);
    			append_dev(a3, span3);
    			append_dev(a3, t17);
    			mount_component(link10, a3, null);
    			append_dev(a3, t18);
    			mount_component(link11, a3, null);
    			append_dev(a3, t19);
    			mount_component(link12, a3, null);
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
    			const link5_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link5_changes.$$scope = { dirty, ctx };
    			}

    			link5.$set(link5_changes);
    			const link6_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link6_changes.$$scope = { dirty, ctx };
    			}

    			link6.$set(link6_changes);
    			const link7_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link7_changes.$$scope = { dirty, ctx };
    			}

    			link7.$set(link7_changes);
    			const link8_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link8_changes.$$scope = { dirty, ctx };
    			}

    			link8.$set(link8_changes);
    			const link9_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link9_changes.$$scope = { dirty, ctx };
    			}

    			link9.$set(link9_changes);
    			const link10_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link10_changes.$$scope = { dirty, ctx };
    			}

    			link10.$set(link10_changes);
    			const link11_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link11_changes.$$scope = { dirty, ctx };
    			}

    			link11.$set(link11_changes);
    			const link12_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link12_changes.$$scope = { dirty, ctx };
    			}

    			link12.$set(link12_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link0.$$.fragment, local);
    			transition_in(link1.$$.fragment, local);
    			transition_in(link2.$$.fragment, local);
    			transition_in(link3.$$.fragment, local);
    			transition_in(link4.$$.fragment, local);
    			transition_in(link5.$$.fragment, local);
    			transition_in(link6.$$.fragment, local);
    			transition_in(link7.$$.fragment, local);
    			transition_in(link8.$$.fragment, local);
    			transition_in(link9.$$.fragment, local);
    			transition_in(link10.$$.fragment, local);
    			transition_in(link11.$$.fragment, local);
    			transition_in(link12.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link0.$$.fragment, local);
    			transition_out(link1.$$.fragment, local);
    			transition_out(link2.$$.fragment, local);
    			transition_out(link3.$$.fragment, local);
    			transition_out(link4.$$.fragment, local);
    			transition_out(link5.$$.fragment, local);
    			transition_out(link6.$$.fragment, local);
    			transition_out(link7.$$.fragment, local);
    			transition_out(link8.$$.fragment, local);
    			transition_out(link9.$$.fragment, local);
    			transition_out(link10.$$.fragment, local);
    			transition_out(link11.$$.fragment, local);
    			transition_out(link12.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(link0, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(a0);
    			destroy_component(link1);
    			destroy_component(link2);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(a1);
    			destroy_component(link3);
    			destroy_component(link4);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(a2);
    			destroy_component(link5);
    			destroy_component(link6);
    			destroy_component(link7);
    			if (detaching) detach_dev(t13);
    			destroy_component(link8, detaching);
    			if (detaching) detach_dev(t14);
    			destroy_component(link9, detaching);
    			if (detaching) detach_dev(t15);
    			if (detaching) detach_dev(a3);
    			destroy_component(link10);
    			destroy_component(link11);
    			destroy_component(link12);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(45:4) <Router {url}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div3;
    	let div0;
    	let t0;
    	let br;
    	let span0;
    	let t2;
    	let div1;
    	let span1;
    	let t4;
    	let input;
    	let t5;
    	let div2;
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				url: /*url*/ ctx[0],
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			t0 = text("Task Force Hellcat ");
    			br = element("br");
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
    			create_component(router.$$.fragment);
    			add_location(br, file, 35, 45, 1192);
    			add_location(span0, file, 35, 51, 1198);
    			attr_dev(div0, "id", "home-nav-logo");
    			add_location(div0, file, 35, 2, 1149);
    			attr_dev(span1, "class", "material-icons");
    			add_location(span1, file, 37, 4, 1257);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "name", "search");
    			attr_dev(input, "placeholder", "Wiki durchsuchen...");
    			add_location(input, file, 38, 4, 1305);
    			attr_dev(div1, "id", "home-nav-search");
    			add_location(div1, file, 36, 2, 1225);
    			attr_dev(div2, "id", "home-nav-list");
    			add_location(div2, file, 43, 2, 1492);
    			attr_dev(div3, "id", "home-overlay");
    			add_location(div3, file, 34, 0, 1122);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div0, t0);
    			append_dev(div0, br);
    			append_dev(div0, span0);
    			append_dev(div3, t2);
    			append_dev(div3, div1);
    			append_dev(div1, span1);
    			append_dev(div1, t4);
    			append_dev(div1, input);
    			append_dev(div3, t5);
    			append_dev(div3, div2);
    			mount_component(router, div2, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};
    			if (dirty & /*url*/ 1) router_changes.url = /*url*/ ctx[0];

    			if (dirty & /*$$scope*/ 2) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_component(router);
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

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	let { url = "" } = $$props;

    	onMount(async () => {
    		const expandable = document.getElementsByClassName("expandable");
    		var expandableArr = Array.from(expandable);

    		expandableArr.forEach(element => {
    			var open = false;
    			element.querySelector("span").insertAdjacentHTML("beforeend", '<span class="material-icons-round">expand_more</span>');

    			element.onclick = function (event) {
    				event.preventDefault();
    				open = !open;

    				if (open == true) {
    					element.querySelector(".material-icons-round").style.transform = "rotate(90deg)";

    					element.querySelectorAll("a").forEach(element => {
    						element.style.display = "flex";
    					});
    				} else {
    					element.querySelector(".material-icons-round").style.transform = "rotate(0deg)";

    					element.querySelectorAll("a").forEach(element => {
    						element.style.display = "none";
    					});
    				}
    			};
    		});
    	});

    	const writable_props = ['url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    	};

    	$$self.$capture_state = () => ({ Router, Link, Route, onMount, url });

    	$$self.$inject_state = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [url];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { url: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get url() {
    		throw new Error("<Home>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Home>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.46.4 */

    // (27:2) <Route path="/">
    function create_default_slot_18(ctx) {
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
    		id: create_default_slot_18.name,
    		type: "slot",
    		source: "(27:2) <Route path=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (28:2) <Route path="grundlagen">
    function create_default_slot_17(ctx) {
    	let grundlagen;
    	let current;
    	grundlagen = new Grundlagen({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(grundlagen.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(grundlagen, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(grundlagen.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(grundlagen.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(grundlagen, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_17.name,
    		type: "slot",
    		source: "(28:2) <Route path=\\\"grundlagen\\\">",
    		ctx
    	});

    	return block;
    }

    // (29:2) <Route path="fuehrungskraefte">
    function create_default_slot_16(ctx) {
    	let fuehrungskraefte;
    	let current;
    	fuehrungskraefte = new Fuehrungskraefte({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(fuehrungskraefte.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(fuehrungskraefte, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(fuehrungskraefte.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(fuehrungskraefte.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(fuehrungskraefte, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_16.name,
    		type: "slot",
    		source: "(29:2) <Route path=\\\"fuehrungskraefte\\\">",
    		ctx
    	});

    	return block;
    }

    // (30:2) <Route path="streitkraefte">
    function create_default_slot_15(ctx) {
    	let streitkraefte;
    	let current;
    	streitkraefte = new Streitkraefte({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(streitkraefte.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(streitkraefte, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(streitkraefte.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(streitkraefte.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(streitkraefte, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_15.name,
    		type: "slot",
    		source: "(30:2) <Route path=\\\"streitkraefte\\\">",
    		ctx
    	});

    	return block;
    }

    // (31:2) <Route path="logistiker">
    function create_default_slot_14(ctx) {
    	let logistiker;
    	let current;
    	logistiker = new Logistiker({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(logistiker.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(logistiker, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(logistiker.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(logistiker.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(logistiker, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_14.name,
    		type: "slot",
    		source: "(31:2) <Route path=\\\"logistiker\\\">",
    		ctx
    	});

    	return block;
    }

    // (32:2) <Route path="panzertruppen">
    function create_default_slot_13(ctx) {
    	let panzertruppen;
    	let current;
    	panzertruppen = new Panzertruppen({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(panzertruppen.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(panzertruppen, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(panzertruppen.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(panzertruppen.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(panzertruppen, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_13.name,
    		type: "slot",
    		source: "(32:2) <Route path=\\\"panzertruppen\\\">",
    		ctx
    	});

    	return block;
    }

    // (33:2) <Route path="sanitaeter">
    function create_default_slot_12(ctx) {
    	let sanitaeter;
    	let current;
    	sanitaeter = new Sanitaeter({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(sanitaeter.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sanitaeter, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sanitaeter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sanitaeter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sanitaeter, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_12.name,
    		type: "slot",
    		source: "(33:2) <Route path=\\\"sanitaeter\\\">",
    		ctx
    	});

    	return block;
    }

    // (34:2) <Route path="aufklaerer">
    function create_default_slot_11(ctx) {
    	let aufklaerer;
    	let current;
    	aufklaerer = new Aufklaerer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(aufklaerer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(aufklaerer, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(aufklaerer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(aufklaerer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(aufklaerer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11.name,
    		type: "slot",
    		source: "(34:2) <Route path=\\\"aufklaerer\\\">",
    		ctx
    	});

    	return block;
    }

    // (36:2) <Route path="basis-logistiker">
    function create_default_slot_10(ctx) {
    	let basislogistiker;
    	let current;
    	basislogistiker = new Basislogistiker({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(basislogistiker.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(basislogistiker, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(basislogistiker.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(basislogistiker.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(basislogistiker, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(36:2) <Route path=\\\"basis-logistiker\\\">",
    		ctx
    	});

    	return block;
    }

    // (37:2) <Route path="fahrzeuge">
    function create_default_slot_9(ctx) {
    	let fahrzeuge;
    	let current;
    	fahrzeuge = new Fahrzeuge({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(fahrzeuge.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(fahrzeuge, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(fahrzeuge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(fahrzeuge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(fahrzeuge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(37:2) <Route path=\\\"fahrzeuge\\\">",
    		ctx
    	});

    	return block;
    }

    // (38:2) <Route path="fusstruppen">
    function create_default_slot_8(ctx) {
    	let fusstruppen;
    	let current;
    	fusstruppen = new Fusstruppen({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(fusstruppen.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(fusstruppen, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(fusstruppen.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(fusstruppen.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(fusstruppen, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(38:2) <Route path=\\\"fusstruppen\\\">",
    		ctx
    	});

    	return block;
    }

    // (39:2) <Route path="helikopter">
    function create_default_slot_7(ctx) {
    	let helikopter;
    	let current;
    	helikopter = new Helikopter({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(helikopter.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(helikopter, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(helikopter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(helikopter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(helikopter, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(39:2) <Route path=\\\"helikopter\\\">",
    		ctx
    	});

    	return block;
    }

    // (40:2) <Route path="hubschrauberpiloten">
    function create_default_slot_6(ctx) {
    	let hubschrauberpiloten;
    	let current;
    	hubschrauberpiloten = new Hubschrauberpiloten({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(hubschrauberpiloten.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(hubschrauberpiloten, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(hubschrauberpiloten.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(hubschrauberpiloten.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(hubschrauberpiloten, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(40:2) <Route path=\\\"hubschrauberpiloten\\\">",
    		ctx
    	});

    	return block;
    }

    // (41:2) <Route path="kampfpioniere">
    function create_default_slot_5(ctx) {
    	let kampfpioniere;
    	let current;
    	kampfpioniere = new Kampfpioniere({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(kampfpioniere.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(kampfpioniere, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(kampfpioniere.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(kampfpioniere.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(kampfpioniere, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(41:2) <Route path=\\\"kampfpioniere\\\">",
    		ctx
    	});

    	return block;
    }

    // (42:2) <Route path="truppfuehrer">
    function create_default_slot_4(ctx) {
    	let truppfuehrer;
    	let current;
    	truppfuehrer = new Truppfuehrer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(truppfuehrer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(truppfuehrer, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(truppfuehrer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(truppfuehrer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(truppfuehrer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(42:2) <Route path=\\\"truppfuehrer\\\">",
    		ctx
    	});

    	return block;
    }

    // (43:2) <Route path="truppfunker">
    function create_default_slot_3(ctx) {
    	let truppfunker;
    	let current;
    	truppfunker = new Truppfunker({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(truppfunker.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(truppfunker, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(truppfunker.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(truppfunker.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(truppfunker, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(43:2) <Route path=\\\"truppfunker\\\">",
    		ctx
    	});

    	return block;
    }

    // (44:2) <Route path="uavs">
    function create_default_slot_2(ctx) {
    	let uavs;
    	let current;
    	uavs = new Uavs({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(uavs.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(uavs, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(uavs.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(uavs.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(uavs, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(44:2) <Route path=\\\"uavs\\\">",
    		ctx
    	});

    	return block;
    }

    // (46:2) <Route path="fuhrpark">
    function create_default_slot_1(ctx) {
    	let fuhrpark;
    	let current;
    	fuhrpark = new Fuhrpark({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(fuhrpark.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(fuhrpark, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(fuhrpark.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(fuhrpark.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(fuhrpark, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(46:2) <Route path=\\\"fuhrpark\\\">",
    		ctx
    	});

    	return block;
    }

    // (26:0) <Router {url}>
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
    	let t5;
    	let route6;
    	let t6;
    	let route7;
    	let t7;
    	let route8;
    	let t8;
    	let route9;
    	let t9;
    	let route10;
    	let t10;
    	let route11;
    	let t11;
    	let route12;
    	let t12;
    	let route13;
    	let t13;
    	let route14;
    	let t14;
    	let route15;
    	let t15;
    	let route16;
    	let t16;
    	let route17;
    	let current;

    	route0 = new Route({
    			props: {
    				path: "/",
    				$$slots: { default: [create_default_slot_18] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route1 = new Route({
    			props: {
    				path: "grundlagen",
    				$$slots: { default: [create_default_slot_17] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route2 = new Route({
    			props: {
    				path: "fuehrungskraefte",
    				$$slots: { default: [create_default_slot_16] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route3 = new Route({
    			props: {
    				path: "streitkraefte",
    				$$slots: { default: [create_default_slot_15] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route4 = new Route({
    			props: {
    				path: "logistiker",
    				$$slots: { default: [create_default_slot_14] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route5 = new Route({
    			props: {
    				path: "panzertruppen",
    				$$slots: { default: [create_default_slot_13] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route6 = new Route({
    			props: {
    				path: "sanitaeter",
    				$$slots: { default: [create_default_slot_12] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route7 = new Route({
    			props: {
    				path: "aufklaerer",
    				$$slots: { default: [create_default_slot_11] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route8 = new Route({
    			props: {
    				path: "basis-logistiker",
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route9 = new Route({
    			props: {
    				path: "fahrzeuge",
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route10 = new Route({
    			props: {
    				path: "fusstruppen",
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route11 = new Route({
    			props: {
    				path: "helikopter",
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route12 = new Route({
    			props: {
    				path: "hubschrauberpiloten",
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route13 = new Route({
    			props: {
    				path: "kampfpioniere",
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route14 = new Route({
    			props: {
    				path: "truppfuehrer",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route15 = new Route({
    			props: {
    				path: "truppfunker",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route16 = new Route({
    			props: {
    				path: "uavs",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route17 = new Route({
    			props: {
    				path: "fuhrpark",
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
    			t5 = space();
    			create_component(route6.$$.fragment);
    			t6 = space();
    			create_component(route7.$$.fragment);
    			t7 = space();
    			create_component(route8.$$.fragment);
    			t8 = space();
    			create_component(route9.$$.fragment);
    			t9 = space();
    			create_component(route10.$$.fragment);
    			t10 = space();
    			create_component(route11.$$.fragment);
    			t11 = space();
    			create_component(route12.$$.fragment);
    			t12 = space();
    			create_component(route13.$$.fragment);
    			t13 = space();
    			create_component(route14.$$.fragment);
    			t14 = space();
    			create_component(route15.$$.fragment);
    			t15 = space();
    			create_component(route16.$$.fragment);
    			t16 = space();
    			create_component(route17.$$.fragment);
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
    			insert_dev(target, t5, anchor);
    			mount_component(route6, target, anchor);
    			insert_dev(target, t6, anchor);
    			mount_component(route7, target, anchor);
    			insert_dev(target, t7, anchor);
    			mount_component(route8, target, anchor);
    			insert_dev(target, t8, anchor);
    			mount_component(route9, target, anchor);
    			insert_dev(target, t9, anchor);
    			mount_component(route10, target, anchor);
    			insert_dev(target, t10, anchor);
    			mount_component(route11, target, anchor);
    			insert_dev(target, t11, anchor);
    			mount_component(route12, target, anchor);
    			insert_dev(target, t12, anchor);
    			mount_component(route13, target, anchor);
    			insert_dev(target, t13, anchor);
    			mount_component(route14, target, anchor);
    			insert_dev(target, t14, anchor);
    			mount_component(route15, target, anchor);
    			insert_dev(target, t15, anchor);
    			mount_component(route16, target, anchor);
    			insert_dev(target, t16, anchor);
    			mount_component(route17, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const route0_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route0_changes.$$scope = { dirty, ctx };
    			}

    			route0.$set(route0_changes);
    			const route1_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route1_changes.$$scope = { dirty, ctx };
    			}

    			route1.$set(route1_changes);
    			const route2_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route2_changes.$$scope = { dirty, ctx };
    			}

    			route2.$set(route2_changes);
    			const route3_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route3_changes.$$scope = { dirty, ctx };
    			}

    			route3.$set(route3_changes);
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
    			const route6_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route6_changes.$$scope = { dirty, ctx };
    			}

    			route6.$set(route6_changes);
    			const route7_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route7_changes.$$scope = { dirty, ctx };
    			}

    			route7.$set(route7_changes);
    			const route8_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route8_changes.$$scope = { dirty, ctx };
    			}

    			route8.$set(route8_changes);
    			const route9_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route9_changes.$$scope = { dirty, ctx };
    			}

    			route9.$set(route9_changes);
    			const route10_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route10_changes.$$scope = { dirty, ctx };
    			}

    			route10.$set(route10_changes);
    			const route11_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route11_changes.$$scope = { dirty, ctx };
    			}

    			route11.$set(route11_changes);
    			const route12_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route12_changes.$$scope = { dirty, ctx };
    			}

    			route12.$set(route12_changes);
    			const route13_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route13_changes.$$scope = { dirty, ctx };
    			}

    			route13.$set(route13_changes);
    			const route14_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route14_changes.$$scope = { dirty, ctx };
    			}

    			route14.$set(route14_changes);
    			const route15_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route15_changes.$$scope = { dirty, ctx };
    			}

    			route15.$set(route15_changes);
    			const route16_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route16_changes.$$scope = { dirty, ctx };
    			}

    			route16.$set(route16_changes);
    			const route17_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route17_changes.$$scope = { dirty, ctx };
    			}

    			route17.$set(route17_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(route2.$$.fragment, local);
    			transition_in(route3.$$.fragment, local);
    			transition_in(route4.$$.fragment, local);
    			transition_in(route5.$$.fragment, local);
    			transition_in(route6.$$.fragment, local);
    			transition_in(route7.$$.fragment, local);
    			transition_in(route8.$$.fragment, local);
    			transition_in(route9.$$.fragment, local);
    			transition_in(route10.$$.fragment, local);
    			transition_in(route11.$$.fragment, local);
    			transition_in(route12.$$.fragment, local);
    			transition_in(route13.$$.fragment, local);
    			transition_in(route14.$$.fragment, local);
    			transition_in(route15.$$.fragment, local);
    			transition_in(route16.$$.fragment, local);
    			transition_in(route17.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			transition_out(route3.$$.fragment, local);
    			transition_out(route4.$$.fragment, local);
    			transition_out(route5.$$.fragment, local);
    			transition_out(route6.$$.fragment, local);
    			transition_out(route7.$$.fragment, local);
    			transition_out(route8.$$.fragment, local);
    			transition_out(route9.$$.fragment, local);
    			transition_out(route10.$$.fragment, local);
    			transition_out(route11.$$.fragment, local);
    			transition_out(route12.$$.fragment, local);
    			transition_out(route13.$$.fragment, local);
    			transition_out(route14.$$.fragment, local);
    			transition_out(route15.$$.fragment, local);
    			transition_out(route16.$$.fragment, local);
    			transition_out(route17.$$.fragment, local);
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
    			if (detaching) detach_dev(t5);
    			destroy_component(route6, detaching);
    			if (detaching) detach_dev(t6);
    			destroy_component(route7, detaching);
    			if (detaching) detach_dev(t7);
    			destroy_component(route8, detaching);
    			if (detaching) detach_dev(t8);
    			destroy_component(route9, detaching);
    			if (detaching) detach_dev(t9);
    			destroy_component(route10, detaching);
    			if (detaching) detach_dev(t10);
    			destroy_component(route11, detaching);
    			if (detaching) detach_dev(t11);
    			destroy_component(route12, detaching);
    			if (detaching) detach_dev(t12);
    			destroy_component(route13, detaching);
    			if (detaching) detach_dev(t13);
    			destroy_component(route14, detaching);
    			if (detaching) detach_dev(t14);
    			destroy_component(route15, detaching);
    			if (detaching) detach_dev(t15);
    			destroy_component(route16, detaching);
    			if (detaching) detach_dev(t16);
    			destroy_component(route17, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(26:0) <Router {url}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				url: /*url*/ ctx[0],
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};
    			if (dirty & /*url*/ 1) router_changes.url = /*url*/ ctx[0];

    			if (dirty & /*$$scope*/ 2) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
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
    		Grundlagen,
    		Panzertruppen,
    		Sanitaeter,
    		Aufklaerer,
    		Basislogistiker,
    		Fahrzeuge,
    		Fusstruppen,
    		Helikopter,
    		Hubschrauberpiloten,
    		Kampfpioniere,
    		Truppfuehrer,
    		Truppfunker,
    		Uavs,
    		Home,
    		Router,
    		Link,
    		Route,
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
