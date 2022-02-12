
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

    /* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.46.4 */

    function create_fragment$w(ctx) {
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
    		id: create_fragment$w.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$w($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$w, create_fragment$w, safe_not_equal, { basepath: 3, url: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$w.name
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

    /* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.46.4 */

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

    function create_fragment$v(ctx) {
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
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$v, create_fragment$v, safe_not_equal, { path: 8, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$v.name
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

    /* node_modules/svelte-routing/src/Link.svelte generated by Svelte v3.46.4 */
    const file$t = "node_modules/svelte-routing/src/Link.svelte";

    function create_fragment$u(ctx) {
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
    			add_location(a, file$t, 40, 0, 1249);
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
    		id: create_fragment$u.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$u($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$u, create_fragment$u, safe_not_equal, {
    			to: 7,
    			replace: 8,
    			state: 9,
    			getProps: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$u.name
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

    /* src/Wiki.svelte generated by Svelte v3.46.4 */
    const file$s = "src/Wiki.svelte";
    const get_content_slot_changes = dirty => ({});
    const get_content_slot_context = ctx => ({});

    // (174:4) <Link to="/" id="nav-logo">
    function create_default_slot_1$2(ctx) {
    	let t0;
    	let span;

    	const block = {
    		c: function create() {
    			t0 = text("TFHC ");
    			span = element("span");
    			span.textContent = "Wiki";
    			add_location(span, file$s, 173, 36, 3908);
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
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(174:4) <Link to=\\\"/\\\" id=\\\"nav-logo\\\">",
    		ctx
    	});

    	return block;
    }

    // (188:4) <Link to="/" id="return-button">
    function create_default_slot$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Return");
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
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(188:4) <Link to=\\\"/\\\" id=\\\"return-button\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$t(ctx) {
    	let div7;
    	let nav;
    	let link0;
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
    	let link1;
    	let t10;
    	let main;
    	let t11;
    	let footer;
    	let current;

    	link0 = new Link({
    			props: {
    				to: "/",
    				id: "nav-logo",
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link1 = new Link({
    			props: {
    				to: "/",
    				id: "return-button",
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
    			create_component(link0.$$.fragment);
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
    			create_component(link1.$$.fragment);
    			t10 = space();
    			main = element("main");
    			if (content_slot) content_slot.c();
    			t11 = space();
    			footer = element("footer");
    			attr_dev(span, "class", "material-icons svelte-rca6of");
    			add_location(span, file$s, 175, 6, 3965);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "name", "search");
    			attr_dev(input, "placeholder", "Wiki durchsuchen...");
    			attr_dev(input, "class", "svelte-rca6of");
    			add_location(input, file$s, 176, 6, 4014);
    			attr_dev(div0, "id", "nav-search");
    			attr_dev(div0, "class", "svelte-rca6of");
    			add_location(div0, file$s, 174, 4, 3937);
    			attr_dev(div1, "class", "nav-list-title svelte-rca6of");
    			add_location(div1, file$s, 179, 4, 4100);
    			attr_dev(div2, "id", "nav-list-bar-thumb");
    			attr_dev(div2, "class", "svelte-rca6of");
    			add_location(div2, file$s, 182, 8, 4215);
    			attr_dev(div3, "id", "nav-list-bar");
    			attr_dev(div3, "class", "svelte-rca6of");
    			add_location(div3, file$s, 181, 6, 4183);
    			attr_dev(div4, "id", "nav-list");
    			attr_dev(div4, "class", "svelte-rca6of");
    			add_location(div4, file$s, 184, 6, 4266);
    			attr_dev(div5, "id", "nav-list-wrapper");
    			attr_dev(div5, "class", "svelte-rca6of");
    			add_location(div5, file$s, 180, 4, 4149);
    			attr_dev(div6, "class", "nav-list-title svelte-rca6of");
    			add_location(div6, file$s, 186, 4, 4303);
    			attr_dev(nav, "class", "svelte-rca6of");
    			add_location(nav, file$s, 172, 2, 3866);
    			add_location(main, file$s, 190, 2, 4404);
    			add_location(footer, file$s, 193, 2, 4451);
    			attr_dev(div7, "id", "wiki-wrapper");
    			attr_dev(div7, "class", "svelte-rca6of");
    			add_location(div7, file$s, 171, 0, 3840);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, nav);
    			mount_component(link0, nav, null);
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
    			mount_component(link1, nav, null);
    			append_dev(div7, t10);
    			append_dev(div7, main);

    			if (content_slot) {
    				content_slot.m(main, null);
    			}

    			append_dev(div7, t11);
    			append_dev(div7, footer);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
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
    			transition_in(link0.$$.fragment, local);
    			transition_in(link1.$$.fragment, local);
    			transition_in(content_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link0.$$.fragment, local);
    			transition_out(link1.$$.fragment, local);
    			transition_out(content_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			destroy_component(link0);
    			destroy_component(link1);
    			if (content_slot) content_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$t($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Wiki', slots, ['content']);

    	onMount(async () => {
    		document.getElementById("nav-list-bar-thumb");
    		const sections = document.querySelectorAll("section:not(section>section)");
    		const navList = document.getElementById("nav-list");
    		document.getElementById("nav-list-bar");

    		/* create array from "sections" nodelist */
    		var sectionsArr = Array.from(sections);

    		/* for every element of the "sectionsArr" array */
    		sectionsArr.forEach(element => {
    			/* add h2 tag with element's id as content */
    			element.insertAdjacentHTML("afterbegin", "<h2>" + element.id + "</h2>");

    			/* add anchor link to element to navigation list */
    			navList.innerHTML += '<a href="#' + element.id + '">' + element.id + "</a>";
    		});
    	}); /*
    var thumbPercent = (1 / sections.length) * 100;
    if (parseInt(bar.style.paddingTop) - parseInt(thumb.style.height) <= parseInt(window.getComputedStyle(bar).getPropertyValue("height"))) {
      thumb.style.height = parseInt(parseInt(window.getComputedStyle(bar).getPropertyValue("height"))) * (thumbPercent / 100) + "px";
    } else;


    thumb.style.height = 1 / sections.length * 100 + "%";

    window.addEventListener("scroll", (event) => {
    bar.style.paddingTop = window.scrollY / (sections.length * 10) + "rem";
    });

    var sectionHeight = 0;
    sections.forEach((element) => {
      sectionHeight += parseInt(window.getComputedStyle(element).height);
    });

    console.log(sectionHeight);
    */

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Wiki> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ Link, onMount });
    	return [slots, $$scope];
    }

    class Wiki extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$t, create_fragment$t, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Wiki",
    			options,
    			id: create_fragment$t.name
    		});
    	}
    }

    /* src/Wiki/Steuerung.svelte generated by Svelte v3.46.4 */
    const file$r = "src/Wiki/Steuerung.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$q(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Steuerung";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$r, 5, 4, 110);
    			add_location(p, file$r, 8, 6, 167);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$r, 7, 4, 134);
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
    		id: create_content_slot$q.name,
    		type: "slot",
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$s(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$q] },
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
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Steuerung', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Steuerung> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Steuerung extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$s, create_fragment$s, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Steuerung",
    			options,
    			id: create_fragment$s.name
    		});
    	}
    }

    /* src/Wiki/Funk.svelte generated by Svelte v3.46.4 */
    const file$q = "src/Wiki/Funk.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$p(ctx) {
    	let h1;
    	let t1;
    	let section0;
    	let p0;
    	let t3;
    	let section1;
    	let p1;
    	let t4;
    	let i;
    	let t6;
    	let section2;
    	let p2;
    	let t8;
    	let p3;
    	let t10;
    	let p4;
    	let t12;
    	let p5;
    	let t14;
    	let section4;
    	let p6;
    	let t16;
    	let section3;
    	let h30;
    	let t18;
    	let p7;
    	let t20;
    	let h31;
    	let t22;
    	let p8;
    	let t24;
    	let p9;
    	let t26;
    	let section6;
    	let p10;
    	let t28;
    	let section5;
    	let h32;
    	let t30;
    	let p11;
    	let t32;
    	let h33;
    	let t34;
    	let p12;
    	let t36;
    	let h34;
    	let t38;
    	let p13;
    	let t40;
    	let section7;
    	let p14;
    	let t42;
    	let p15;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Funk";
    			t1 = space();
    			section0 = element("section");
    			p0 = element("p");
    			p0.textContent = "Grundvoraussetzung für eine gelungene Missionsdurchführung ist eine gute Kommunikation zwischen allen Kräften. Über längere Strecken und Einheiten hinweg nutzt man den Funk. Die Grundzüge von gutem Funken sollte allen Soldaten bekannt sein.";
    			t3 = space();
    			section1 = element("section");
    			p1 = element("p");
    			t4 = text("Noch bevor man beginnt, Funkkontakt aufzubauen, überlegt man sich genau, was man mitteilen möchte. Ein Sender blockiert für die Dauer seines Funkspruches den Funkkanal und damit möglicherweise andere eilige Meldungen. Darum sollte ein Funkspruch gut formuliert, knapp, aber unmissverständlich gehalten werden. Guter Funk folgt also der Devise: ");
    			i = element("i");
    			i.textContent = "So viel wie nötig, so kurz wie möglich.";
    			t6 = space();
    			section2 = element("section");
    			p2 = element("p");
    			p2.textContent = "Das Herstellen des Funkkontakts nennt man auch Verbindung. Sie folgt einem einfachen Schema: Der Sender identifiziert sich und den Empfänger des Funkspruches. Danach wird in einem Wort erklärt, welchen Zweck die Mitteilung verfolgt. Zum Beispiel:";
    			t8 = space();
    			p3 = element("p");
    			p3.textContent = "„Aufklärung für Truppführung - Information - Infanterie in Gruppenstärke zu Fuß gesichtet nord-west ihrer Aktuellen - Kommen.“";
    			t10 = space();
    			p4 = element("p");
    			p4.textContent = "„Truppführung für Aufklärung - Frage - Panzerabwehrschützen erkannt? Kommen.“";
    			t12 = space();
    			p5 = element("p");
    			p5.textContent = "Dies stellt eine Richtlinie für die Erstverbindung dar. Im weiteren Gesprächsverlauf ist es eventuell nicht mehr nötig, so explizit zu sein, da dann bereits klar ist, worum es geht. Gerade zu Beginn des Funkkontakts kann des dem Gegenüber jedoch das Verständnis erleichtern, wenn man seine Absicht ausspricht.";
    			t14 = space();
    			section4 = element("section");
    			p6 = element("p");
    			p6.textContent = "Der eigentliche Inhalt des Funkspruches folgt den oben beschriebenen Grundsätzen: er sollte knapp, aber eindeutig sein. Besonders Füllwörter und häufiges Versprechen können leicht vermieden werden, indem man sich den Inhalt seines Funkes vor dem Funken kurz überlegt. Abgesehen davon gibt es noch ein paar Konventionen, die das Verständnis erleichtern sollen.";
    			t16 = space();
    			section3 = element("section");
    			h30 = element("h3");
    			h30.textContent = "Zahlen";
    			t18 = space();
    			p7 = element("p");
    			p7.textContent = "Zahlen werden im Funk grundsätzlich Ziffer für Ziffer diktiert, „1278“ also als „eins - zwo - sieben - acht“ gesprochen. „Zwo“ ist dabei dringend zu benutzen, da „zwei“ leicht mit „drei“ verwechselt wird. Ebenso verwendet man „fünnüf“ für „fünf“.";
    			t20 = space();
    			h31 = element("h3");
    			h31.textContent = "Buchstabieren";
    			t22 = space();
    			p8 = element("p");
    			p8.textContent = "Buchstabieren wird oft nötig werden. Einzelne Buchstaben sind dabei selbst bei guter Verbindung kaum zu verstehen. Wir verwendet daher zum Buchstabieren das NATO-Alphabet.";
    			t24 = space();
    			p9 = element("p");
    			p9.textContent = "Da es auch außerhalb des Funkes viel benutzt wird, sollte man sich das NATO-Alphabet dringend aneignen.";
    			t26 = space();
    			section6 = element("section");
    			p10 = element("p");
    			p10.textContent = "Hat man alles gesagt, muss man auch das dem Funkkreis signalisieren. Andere halten das Gespräch ansonsten für unbeendet und halten Funkstille. Hierzu gibt es eine Reihe von Signalwörtern:";
    			t28 = space();
    			section5 = element("section");
    			h32 = element("h3");
    			h32.textContent = "Kommen";
    			t30 = space();
    			p11 = element("p");
    			p11.textContent = "Mit „kommen“ am Ende eines Funkspruches zeigt man an, dass man eine Antwort vom Gegenüber erwartet. Man benutzt es auch nach dem Beantworten einer Frage.";
    			t32 = space();
    			h33 = element("h3");
    			h33.textContent = "Ende";
    			t34 = space();
    			p12 = element("p");
    			p12.textContent = "Mit „ende“ beendet man den Austausch. „Ende“ wird von der Partei gebraucht, die den Austausch begonnen hat.";
    			t36 = space();
    			h34 = element("h3");
    			h34.textContent = "Trennung";
    			t38 = space();
    			p13 = element("p");
    			p13.textContent = "„Trennung“ ist effektiv ein „ende“. Es zeigt dem Funkkreis an, dass der Sprecher das Gespräch mit einer Partei für beendet erklärt, aber direkt zu einer Anderen Kontakt aufnehmen möchte. Es folgt auf „Trennung“ also direkt die Verbindung zum neuen Gesprächspartner.";
    			t40 = space();
    			section7 = element("section");
    			p14 = element("p");
    			p14.textContent = "Grundsätzlich herrscht während eines laufenden Austausches Funkstille für alle anderen. Kommt es jedoch zu Notfällen, kann es sein, dass ein Dritter sich mit Signalwörtern wie „eil“, „sofort“ oder „Blitz“ einschaltet. Dies bedeutet offensichtlich eine Notlage und das laufende Gespräch ist zu unterbrechen.";
    			t42 = space();
    			p15 = element("p");
    			p15.textContent = "Diese Anleitung vermittelt bloß die absoluten Grundlagen des Funkens. Je nach Spezialisierung sind noch weitere Dinge relevant, wie etwa beim Funken im Konvoi und zwischen der Logistik, im Funk unter Truppführern, Sanitätern oder Aufklärern. Dazu finden sich Einträge mit weiterführenden Informationen auf den jeweiligen Unterseiten.";
    			add_location(h1, file$q, 5, 4, 110);
    			add_location(p0, file$q, 8, 6, 161);
    			attr_dev(section0, "id", "Einleitung");
    			add_location(section0, file$q, 7, 4, 129);
    			add_location(i, file$q, 12, 353, 812);
    			add_location(p1, file$q, 12, 6, 465);
    			attr_dev(section1, "id", "Vor dem Funken");
    			add_location(section1, file$q, 11, 4, 429);
    			add_location(p2, file$q, 16, 6, 915);
    			add_location(p3, file$q, 17, 6, 1175);
    			add_location(p4, file$q, 18, 6, 1315);
    			add_location(p5, file$q, 19, 6, 1406);
    			attr_dev(section2, "id", "Verbindung");
    			add_location(section2, file$q, 15, 4, 883);
    			add_location(p6, file$q, 23, 6, 1775);
    			add_location(h30, file$q, 25, 8, 2166);
    			add_location(p7, file$q, 26, 8, 2190);
    			add_location(h31, file$q, 28, 8, 2453);
    			add_location(p8, file$q, 29, 8, 2484);
    			add_location(p9, file$q, 31, 8, 2751);
    			add_location(section3, file$q, 24, 6, 2148);
    			attr_dev(section4, "id", "Funkspruch");
    			add_location(section4, file$q, 22, 4, 1743);
    			add_location(p10, file$q, 36, 6, 2931);
    			add_location(h32, file$q, 39, 8, 3151);
    			add_location(p11, file$q, 40, 8, 3175);
    			add_location(h33, file$q, 42, 8, 3345);
    			add_location(p12, file$q, 43, 8, 3367);
    			add_location(h34, file$q, 45, 8, 3491);
    			add_location(p13, file$q, 46, 8, 3517);
    			add_location(section5, file$q, 38, 6, 3133);
    			attr_dev(section6, "id", "Beendigung");
    			add_location(section6, file$q, 35, 4, 2899);
    			add_location(p14, file$q, 51, 6, 3871);
    			add_location(p15, file$q, 53, 6, 4192);
    			attr_dev(section7, "id", "Außnahmen und Notfälle");
    			add_location(section7, file$q, 50, 4, 3827);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section0, anchor);
    			append_dev(section0, p0);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, section1, anchor);
    			append_dev(section1, p1);
    			append_dev(p1, t4);
    			append_dev(p1, i);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, section2, anchor);
    			append_dev(section2, p2);
    			append_dev(section2, t8);
    			append_dev(section2, p3);
    			append_dev(section2, t10);
    			append_dev(section2, p4);
    			append_dev(section2, t12);
    			append_dev(section2, p5);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, section4, anchor);
    			append_dev(section4, p6);
    			append_dev(section4, t16);
    			append_dev(section4, section3);
    			append_dev(section3, h30);
    			append_dev(section3, t18);
    			append_dev(section3, p7);
    			append_dev(section3, t20);
    			append_dev(section3, h31);
    			append_dev(section3, t22);
    			append_dev(section3, p8);
    			append_dev(section3, t24);
    			append_dev(section3, p9);
    			insert_dev(target, t26, anchor);
    			insert_dev(target, section6, anchor);
    			append_dev(section6, p10);
    			append_dev(section6, t28);
    			append_dev(section6, section5);
    			append_dev(section5, h32);
    			append_dev(section5, t30);
    			append_dev(section5, p11);
    			append_dev(section5, t32);
    			append_dev(section5, h33);
    			append_dev(section5, t34);
    			append_dev(section5, p12);
    			append_dev(section5, t36);
    			append_dev(section5, h34);
    			append_dev(section5, t38);
    			append_dev(section5, p13);
    			insert_dev(target, t40, anchor);
    			insert_dev(target, section7, anchor);
    			append_dev(section7, p14);
    			append_dev(section7, t42);
    			append_dev(section7, p15);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(section1);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(section2);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(section4);
    			if (detaching) detach_dev(t26);
    			if (detaching) detach_dev(section6);
    			if (detaching) detach_dev(t40);
    			if (detaching) detach_dev(section7);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot$p.name,
    		type: "slot",
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$r(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$p] },
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
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Funk', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Funk> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Funk extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$r, create_fragment$r, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Funk",
    			options,
    			id: create_fragment$r.name
    		});
    	}
    }

    /* src/Wiki/Erstehilfe.svelte generated by Svelte v3.46.4 */
    const file$p = "src/Wiki/Erstehilfe.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$o(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Erste Hilfe";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$p, 5, 4, 110);
    			add_location(p, file$p, 8, 6, 169);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$p, 7, 4, 136);
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
    		id: create_content_slot$o.name,
    		type: "slot",
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$q(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$o] },
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
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$q($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Erstehilfe', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Erstehilfe> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Erstehilfe extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$q, create_fragment$q, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Erstehilfe",
    			options,
    			id: create_fragment$q.name
    		});
    	}
    }

    /* src/Wiki/Buddyteam.svelte generated by Svelte v3.46.4 */
    const file$o = "src/Wiki/Buddyteam.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$n(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Buddyteam";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$o, 5, 4, 110);
    			add_location(p, file$o, 8, 6, 167);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$o, 7, 4, 134);
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
    		id: create_content_slot$n.name,
    		type: "slot",
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$p(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$n] },
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
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Buddyteam', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Buddyteam> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Buddyteam extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$p, create_fragment$p, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Buddyteam",
    			options,
    			id: create_fragment$p.name
    		});
    	}
    }

    /* src/Wiki/Sonstiges.svelte generated by Svelte v3.46.4 */
    const file$n = "src/Wiki/Sonstiges.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$m(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Sonstiges";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$n, 5, 4, 110);
    			add_location(p, file$n, 8, 6, 167);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$n, 7, 4, 134);
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
    		id: create_content_slot$m.name,
    		type: "slot",
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$o(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$m] },
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
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Sonstiges', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sonstiges> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Sonstiges extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$o, create_fragment$o, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sonstiges",
    			options,
    			id: create_fragment$o.name
    		});
    	}
    }

    /* src/Wiki/Abteilungsleiter.svelte generated by Svelte v3.46.4 */
    const file$m = "src/Wiki/Abteilungsleiter.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$l(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Abteilungsleiter";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$m, 5, 4, 110);
    			add_location(p, file$m, 8, 6, 174);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$m, 7, 4, 141);
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
    		id: create_content_slot$l.name,
    		type: "slot",
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$n(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$l] },
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
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Abteilungsleiter', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Abteilungsleiter> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Abteilungsleiter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$n, create_fragment$n, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Abteilungsleiter",
    			options,
    			id: create_fragment$n.name
    		});
    	}
    }

    /* src/Wiki/Einsatzleiter.svelte generated by Svelte v3.46.4 */
    const file$l = "src/Wiki/Einsatzleiter.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$k(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Einsatzleiter";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$l, 5, 4, 110);
    			add_location(p, file$l, 8, 6, 171);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$l, 7, 4, 138);
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
    		id: create_content_slot$k.name,
    		type: "slot",
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$m(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$k] },
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
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Einsatzleiter', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Einsatzleiter> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Einsatzleiter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$m, create_fragment$m, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Einsatzleiter",
    			options,
    			id: create_fragment$m.name
    		});
    	}
    }

    /* src/Wiki/Gruppentruppfuehrer.svelte generated by Svelte v3.46.4 */
    const file$k = "src/Wiki/Gruppentruppfuehrer.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$j(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Gruppen-/Truppführer";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$k, 5, 4, 110);
    			add_location(p, file$k, 8, 6, 178);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$k, 7, 4, 145);
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
    		id: create_content_slot$j.name,
    		type: "slot",
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$l(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$j] },
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
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Gruppentruppfuehrer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Gruppentruppfuehrer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Gruppentruppfuehrer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$l, create_fragment$l, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Gruppentruppfuehrer",
    			options,
    			id: create_fragment$l.name
    		});
    	}
    }

    /* src/Wiki/Schuetze.svelte generated by Svelte v3.46.4 */
    const file$j = "src/Wiki/Schuetze.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$i(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Schütze";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$j, 5, 4, 110);
    			add_location(p, file$j, 8, 6, 165);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$j, 7, 4, 132);
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
    		id: create_content_slot$i.name,
    		type: "slot",
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$k(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$i] },
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
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Schuetze', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Schuetze> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Schuetze extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Schuetze",
    			options,
    			id: create_fragment$k.name
    		});
    	}
    }

    /* src/Wiki/Funker.svelte generated by Svelte v3.46.4 */
    const file$i = "src/Wiki/Funker.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$h(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Funker";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$i, 5, 4, 110);
    			add_location(p, file$i, 8, 6, 164);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$i, 7, 4, 131);
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
    		id: create_content_slot$h.name,
    		type: "slot",
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$j(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$h] },
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
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Funker', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Funker> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Funker extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Funker",
    			options,
    			id: create_fragment$j.name
    		});
    	}
    }

    /* src/Wiki/Mgschuetze.svelte generated by Svelte v3.46.4 */
    const file$h = "src/Wiki/Mgschuetze.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$g(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "MG-Schütze";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$h, 5, 4, 110);
    			add_location(p, file$h, 8, 6, 168);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$h, 7, 4, 135);
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
    		id: create_content_slot$g.name,
    		type: "slot",
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$g] },
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
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Mgschuetze', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Mgschuetze> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Mgschuetze extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Mgschuetze",
    			options,
    			id: create_fragment$i.name
    		});
    	}
    }

    /* src/Wiki/Atschuetze.svelte generated by Svelte v3.46.4 */
    const file$g = "src/Wiki/Atschuetze.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$f(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "AT-Schütze";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$g, 5, 4, 110);
    			add_location(p, file$g, 8, 6, 168);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$g, 7, 4, 135);
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
    		id: create_content_slot$f.name,
    		type: "slot",
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$f] },
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
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Atschuetze', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Atschuetze> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Atschuetze extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Atschuetze",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* src/Wiki/Praezisionsschuetze.svelte generated by Svelte v3.46.4 */
    const file$f = "src/Wiki/Praezisionsschuetze.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$e(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Präzisionsschütze";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$f, 5, 4, 110);
    			add_location(p, file$f, 8, 6, 175);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$f, 7, 4, 142);
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
    		id: create_content_slot$e.name,
    		type: "slot",
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$e] },
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
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Praezisionsschuetze', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Praezisionsschuetze> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Praezisionsschuetze extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Praezisionsschuetze",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* src/Wiki/Breacher.svelte generated by Svelte v3.46.4 */
    const file$e = "src/Wiki/Breacher.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$d(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Breacher";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$e, 5, 4, 110);
    			add_location(p, file$e, 8, 6, 166);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$e, 7, 4, 133);
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
    		id: create_content_slot$d.name,
    		type: "slot",
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let wiki;
    	let current;

    	wiki = new Wiki({
    			props: {
    				$$slots: { content: [create_content_slot$d] },
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
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Breacher', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Breacher> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Breacher extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Breacher",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src/Wiki/Grenadier.svelte generated by Svelte v3.46.4 */
    const file$d = "src/Wiki/Grenadier.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$c(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Grenadier";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$d, 5, 4, 110);
    			add_location(p, file$d, 8, 6, 167);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$d, 7, 4, 134);
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
    		id: create_content_slot$c.name,
    		type: "slot",
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
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
    	validate_slots('Grenadier', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Grenadier> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Grenadier extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Grenadier",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src/Wiki/Sanitaeter.svelte generated by Svelte v3.46.4 */
    const file$c = "src/Wiki/Sanitaeter.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$b(ctx) {
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
    			add_location(h1, file$c, 5, 4, 110);
    			add_location(p, file$c, 8, 6, 167);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$c, 7, 4, 134);
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
    		id: create_content_slot$b.name,
    		type: "slot",
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
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
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sanitaeter",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src/Wiki/Medevacsanitaeter.svelte generated by Svelte v3.46.4 */
    const file$b = "src/Wiki/Medevacsanitaeter.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$a(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "MEDEVAC-Sanitäter";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$b, 5, 4, 110);
    			add_location(p, file$b, 8, 6, 175);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$b, 7, 4, 142);
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
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
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
    	validate_slots('Medevacsanitaeter', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Medevacsanitaeter> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Medevacsanitaeter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Medevacsanitaeter",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/Wiki/Kampfpionier.svelte generated by Svelte v3.46.4 */
    const file$a = "src/Wiki/Kampfpionier.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$9(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Kampfpionier";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$a, 5, 4, 110);
    			add_location(p, file$a, 8, 6, 170);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$a, 7, 4, 137);
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
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
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
    	validate_slots('Kampfpionier', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Kampfpionier> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Kampfpionier extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Kampfpionier",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src/Wiki/Pionier.svelte generated by Svelte v3.46.4 */
    const file$9 = "src/Wiki/Pionier.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$8(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Pionier";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$9, 5, 4, 110);
    			add_location(p, file$9, 8, 6, 165);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$9, 7, 4, 132);
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
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
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
    	validate_slots('Pionier', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Pionier> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Pionier extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Pionier",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src/Wiki/Helikopterpiloten.svelte generated by Svelte v3.46.4 */
    const file$8 = "src/Wiki/Helikopterpiloten.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$7(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Helikopterpilot";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$8, 5, 4, 110);
    			add_location(p, file$8, 8, 6, 173);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$8, 7, 4, 140);
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
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
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
    	validate_slots('Helikopterpiloten', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Helikopterpiloten> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Helikopterpiloten extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Helikopterpiloten",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/Wiki/Basislogistiker.svelte generated by Svelte v3.46.4 */
    const file$7 = "src/Wiki/Basislogistiker.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$6(ctx) {
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
    			add_location(h1, file$7, 5, 4, 110);
    			add_location(p, file$7, 8, 6, 174);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$7, 7, 4, 141);
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
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
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
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Basislogistiker",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/Wiki/Jtac.svelte generated by Svelte v3.46.4 */
    const file$6 = "src/Wiki/Jtac.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$5(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "JTAC (Joint Terminal Attack Controller)";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$6, 5, 4, 110);
    			add_location(p, file$6, 8, 6, 197);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$6, 7, 4, 164);
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
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
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
    	validate_slots('Jtac', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Jtac> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Jtac extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Jtac",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/Wiki/Scharfschuetze.svelte generated by Svelte v3.46.4 */
    const file$5 = "src/Wiki/Scharfschuetze.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$4(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Scharfschütze";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$5, 5, 4, 110);
    			add_location(p, file$5, 8, 6, 171);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$5, 7, 4, 138);
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
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
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
    	validate_slots('Scharfschuetze', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Scharfschuetze> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Scharfschuetze extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Scharfschuetze",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/Wiki/Spotter.svelte generated by Svelte v3.46.4 */
    const file$4 = "src/Wiki/Spotter.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$3(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Spotter";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$4, 5, 4, 110);
    			add_location(p, file$4, 8, 6, 165);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$4, 7, 4, 132);
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
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
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
    	validate_slots('Spotter', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Spotter> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Spotter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Spotter",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/Wiki/Eod.svelte generated by Svelte v3.46.4 */
    const file$3 = "src/Wiki/Eod.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$2(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "EOD (Explosive Ordnance Disposal)";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$3, 5, 4, 110);
    			add_location(p, file$3, 8, 6, 191);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$3, 7, 4, 158);
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
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
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
    	validate_slots('Eod', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Eod> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Eod extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Eod",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/Wiki/Bodenfahrzeuge.svelte generated by Svelte v3.46.4 */
    const file$2 = "src/Wiki/Bodenfahrzeuge.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot$1(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Bodenfahrzeuge";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$2, 5, 4, 110);
    			add_location(p, file$2, 8, 6, 172);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$2, 7, 4, 139);
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
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
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
    	validate_slots('Bodenfahrzeuge', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Bodenfahrzeuge> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Bodenfahrzeuge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Bodenfahrzeuge",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/Wiki/Luftfahrzeuge.svelte generated by Svelte v3.46.4 */
    const file$1 = "src/Wiki/Luftfahrzeuge.svelte";

    // (5:2) <svelte:fragment slot="content">
    function create_content_slot(ctx) {
    	let h1;
    	let t1;
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Luftfahrzeuge";
    			t1 = space();
    			section = element("section");
    			p = element("p");
    			add_location(h1, file$1, 5, 4, 110);
    			add_location(p, file$1, 8, 6, 171);
    			attr_dev(section, "id", "Allgemeines");
    			add_location(section, file$1, 7, 4, 138);
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
    		source: "(5:2) <svelte:fragment slot=\\\"content\\\">",
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
    	validate_slots('Luftfahrzeuge', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Luftfahrzeuge> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Wiki });
    	return [];
    }

    class Luftfahrzeuge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Luftfahrzeuge",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/Home.svelte generated by Svelte v3.46.4 */
    const file = "src/Home.svelte";

    // (55:8) <Link to="steuerung">
    function create_default_slot_27$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("steuerung");
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
    		id: create_default_slot_27$1.name,
    		type: "slot",
    		source: "(55:8) <Link to=\\\"steuerung\\\">",
    		ctx
    	});

    	return block;
    }

    // (56:8) <Link to="funk">
    function create_default_slot_26$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("funk");
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
    		id: create_default_slot_26$1.name,
    		type: "slot",
    		source: "(56:8) <Link to=\\\"funk\\\">",
    		ctx
    	});

    	return block;
    }

    // (57:8) <Link to="erstehilfe">
    function create_default_slot_25$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("erste hilfe");
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
    		id: create_default_slot_25$1.name,
    		type: "slot",
    		source: "(57:8) <Link to=\\\"erstehilfe\\\">",
    		ctx
    	});

    	return block;
    }

    // (58:8) <Link to="buddyteam">
    function create_default_slot_24$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("buddyteam");
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
    		id: create_default_slot_24$1.name,
    		type: "slot",
    		source: "(58:8) <Link to=\\\"buddyteam\\\">",
    		ctx
    	});

    	return block;
    }

    // (59:8) <Link to="sonstiges">
    function create_default_slot_23$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("sonstiges");
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
    		id: create_default_slot_23$1.name,
    		type: "slot",
    		source: "(59:8) <Link to=\\\"sonstiges\\\">",
    		ctx
    	});

    	return block;
    }

    // (63:8) <Link to="abteilungsleiter">
    function create_default_slot_22$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("abteilungsleiter");
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
    		id: create_default_slot_22$1.name,
    		type: "slot",
    		source: "(63:8) <Link to=\\\"abteilungsleiter\\\">",
    		ctx
    	});

    	return block;
    }

    // (64:8) <Link to="einsatzleiter">
    function create_default_slot_21$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("einsatzleiter");
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
    		id: create_default_slot_21$1.name,
    		type: "slot",
    		source: "(64:8) <Link to=\\\"einsatzleiter\\\">",
    		ctx
    	});

    	return block;
    }

    // (65:8) <Link to="gruppentruppfuehrer">
    function create_default_slot_20$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("gruppen-/truppführer");
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
    		id: create_default_slot_20$1.name,
    		type: "slot",
    		source: "(65:8) <Link to=\\\"gruppentruppfuehrer\\\">",
    		ctx
    	});

    	return block;
    }

    // (69:8) <Link to="schuetze">
    function create_default_slot_19$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("schütze");
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
    		id: create_default_slot_19$1.name,
    		type: "slot",
    		source: "(69:8) <Link to=\\\"schuetze\\\">",
    		ctx
    	});

    	return block;
    }

    // (70:8) <Link to="funker">
    function create_default_slot_18$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("funker");
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
    		id: create_default_slot_18$1.name,
    		type: "slot",
    		source: "(70:8) <Link to=\\\"funker\\\">",
    		ctx
    	});

    	return block;
    }

    // (71:8) <Link to="mgschuetze">
    function create_default_slot_17$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("mgschütze");
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
    		id: create_default_slot_17$1.name,
    		type: "slot",
    		source: "(71:8) <Link to=\\\"mgschuetze\\\">",
    		ctx
    	});

    	return block;
    }

    // (72:8) <Link to="atschuetze">
    function create_default_slot_16$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("atschütze");
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
    		id: create_default_slot_16$1.name,
    		type: "slot",
    		source: "(72:8) <Link to=\\\"atschuetze\\\">",
    		ctx
    	});

    	return block;
    }

    // (73:8) <Link to="praezisionsschuetze">
    function create_default_slot_15$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("präzisionsschütze");
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
    		id: create_default_slot_15$1.name,
    		type: "slot",
    		source: "(73:8) <Link to=\\\"praezisionsschuetze\\\">",
    		ctx
    	});

    	return block;
    }

    // (74:8) <Link to="breacher">
    function create_default_slot_14$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("breacher");
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
    		id: create_default_slot_14$1.name,
    		type: "slot",
    		source: "(74:8) <Link to=\\\"breacher\\\">",
    		ctx
    	});

    	return block;
    }

    // (75:8) <Link to="grenadier">
    function create_default_slot_13$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("grenadier");
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
    		source: "(75:8) <Link to=\\\"grenadier\\\">",
    		ctx
    	});

    	return block;
    }

    // (79:8) <Link to="sanitaeter">
    function create_default_slot_12$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("sanitäter");
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
    		source: "(79:8) <Link to=\\\"sanitaeter\\\">",
    		ctx
    	});

    	return block;
    }

    // (80:8) <Link to="medevacsanitaeter">
    function create_default_slot_11$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("medevac-sanitäter");
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
    		source: "(80:8) <Link to=\\\"medevacsanitaeter\\\">",
    		ctx
    	});

    	return block;
    }

    // (87:8) <Link to="kampfpionier">
    function create_default_slot_10$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("kampfpionier");
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
    		source: "(87:8) <Link to=\\\"kampfpionier\\\">",
    		ctx
    	});

    	return block;
    }

    // (88:8) <Link to="pionier">
    function create_default_slot_9$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("pionier");
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
    		source: "(88:8) <Link to=\\\"pionier\\\">",
    		ctx
    	});

    	return block;
    }

    // (89:8) <Link to="helikopterpilot">
    function create_default_slot_8$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("helikopterpilot");
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
    		source: "(89:8) <Link to=\\\"helikopterpilot\\\">",
    		ctx
    	});

    	return block;
    }

    // (90:8) <Link to="basislogistiker">
    function create_default_slot_7$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("basislogistiker");
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
    		source: "(90:8) <Link to=\\\"basislogistiker\\\">",
    		ctx
    	});

    	return block;
    }

    // (94:8) <Link to="jtac">
    function create_default_slot_6$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("jtac");
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
    		source: "(94:8) <Link to=\\\"jtac\\\">",
    		ctx
    	});

    	return block;
    }

    // (95:8) <Link to="scharfschuetze">
    function create_default_slot_5$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("scharfschütze");
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
    		source: "(95:8) <Link to=\\\"scharfschuetze\\\">",
    		ctx
    	});

    	return block;
    }

    // (96:8) <Link to="spotter">
    function create_default_slot_4$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("spotter");
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
    		source: "(96:8) <Link to=\\\"spotter\\\">",
    		ctx
    	});

    	return block;
    }

    // (97:8) <Link to="eod">
    function create_default_slot_3$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("eod");
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
    		source: "(97:8) <Link to=\\\"eod\\\">",
    		ctx
    	});

    	return block;
    }

    // (101:8) <Link to="bodenfahrzeuge">
    function create_default_slot_2$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("bodenfahrzeuge");
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
    		source: "(101:8) <Link to=\\\"bodenfahrzeuge\\\">",
    		ctx
    	});

    	return block;
    }

    // (102:8) <Link to="luftfahrzeuge">
    function create_default_slot_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("luftfahrzeuge");
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
    		source: "(102:8) <Link to=\\\"luftfahrzeuge\\\">",
    		ctx
    	});

    	return block;
    }

    // (52:4) <Router {url}>
    function create_default_slot$1(ctx) {
    	let a0;
    	let span0;
    	let t1;
    	let link0;
    	let t2;
    	let link1;
    	let t3;
    	let link2;
    	let t4;
    	let link3;
    	let t5;
    	let link4;
    	let t6;
    	let a1;
    	let span1;
    	let t8;
    	let link5;
    	let t9;
    	let link6;
    	let t10;
    	let link7;
    	let t11;
    	let a2;
    	let span2;
    	let t13;
    	let link8;
    	let t14;
    	let link9;
    	let t15;
    	let link10;
    	let t16;
    	let link11;
    	let t17;
    	let link12;
    	let t18;
    	let link13;
    	let t19;
    	let link14;
    	let t20;
    	let a3;
    	let span3;
    	let t22;
    	let link15;
    	let t23;
    	let link16;
    	let t24;
    	let a4;
    	let span4;
    	let t26;
    	let a5;
    	let span5;
    	let t28;
    	let link17;
    	let t29;
    	let link18;
    	let t30;
    	let link19;
    	let t31;
    	let link20;
    	let t32;
    	let a6;
    	let span6;
    	let t34;
    	let link21;
    	let t35;
    	let link22;
    	let t36;
    	let link23;
    	let t37;
    	let link24;
    	let t38;
    	let a7;
    	let span7;
    	let t40;
    	let link25;
    	let t41;
    	let link26;
    	let current;

    	link0 = new Link({
    			props: {
    				to: "steuerung",
    				$$slots: { default: [create_default_slot_27$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link1 = new Link({
    			props: {
    				to: "funk",
    				$$slots: { default: [create_default_slot_26$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link2 = new Link({
    			props: {
    				to: "erstehilfe",
    				$$slots: { default: [create_default_slot_25$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link3 = new Link({
    			props: {
    				to: "buddyteam",
    				$$slots: { default: [create_default_slot_24$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link4 = new Link({
    			props: {
    				to: "sonstiges",
    				$$slots: { default: [create_default_slot_23$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link5 = new Link({
    			props: {
    				to: "abteilungsleiter",
    				$$slots: { default: [create_default_slot_22$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link6 = new Link({
    			props: {
    				to: "einsatzleiter",
    				$$slots: { default: [create_default_slot_21$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link7 = new Link({
    			props: {
    				to: "gruppentruppfuehrer",
    				$$slots: { default: [create_default_slot_20$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link8 = new Link({
    			props: {
    				to: "schuetze",
    				$$slots: { default: [create_default_slot_19$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link9 = new Link({
    			props: {
    				to: "funker",
    				$$slots: { default: [create_default_slot_18$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link10 = new Link({
    			props: {
    				to: "mgschuetze",
    				$$slots: { default: [create_default_slot_17$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link11 = new Link({
    			props: {
    				to: "atschuetze",
    				$$slots: { default: [create_default_slot_16$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link12 = new Link({
    			props: {
    				to: "praezisionsschuetze",
    				$$slots: { default: [create_default_slot_15$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link13 = new Link({
    			props: {
    				to: "breacher",
    				$$slots: { default: [create_default_slot_14$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link14 = new Link({
    			props: {
    				to: "grenadier",
    				$$slots: { default: [create_default_slot_13$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link15 = new Link({
    			props: {
    				to: "sanitaeter",
    				$$slots: { default: [create_default_slot_12$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link16 = new Link({
    			props: {
    				to: "medevacsanitaeter",
    				$$slots: { default: [create_default_slot_11$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link17 = new Link({
    			props: {
    				to: "kampfpionier",
    				$$slots: { default: [create_default_slot_10$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link18 = new Link({
    			props: {
    				to: "pionier",
    				$$slots: { default: [create_default_slot_9$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link19 = new Link({
    			props: {
    				to: "helikopterpilot",
    				$$slots: { default: [create_default_slot_8$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link20 = new Link({
    			props: {
    				to: "basislogistiker",
    				$$slots: { default: [create_default_slot_7$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link21 = new Link({
    			props: {
    				to: "jtac",
    				$$slots: { default: [create_default_slot_6$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link22 = new Link({
    			props: {
    				to: "scharfschuetze",
    				$$slots: { default: [create_default_slot_5$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link23 = new Link({
    			props: {
    				to: "spotter",
    				$$slots: { default: [create_default_slot_4$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link24 = new Link({
    			props: {
    				to: "eod",
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link25 = new Link({
    			props: {
    				to: "bodenfahrzeuge",
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link26 = new Link({
    			props: {
    				to: "luftfahrzeuge",
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			a0 = element("a");
    			span0 = element("span");
    			span0.textContent = "grundlagen";
    			t1 = space();
    			create_component(link0.$$.fragment);
    			t2 = space();
    			create_component(link1.$$.fragment);
    			t3 = space();
    			create_component(link2.$$.fragment);
    			t4 = space();
    			create_component(link3.$$.fragment);
    			t5 = space();
    			create_component(link4.$$.fragment);
    			t6 = space();
    			a1 = element("a");
    			span1 = element("span");
    			span1.textContent = "führungskräfte";
    			t8 = space();
    			create_component(link5.$$.fragment);
    			t9 = space();
    			create_component(link6.$$.fragment);
    			t10 = space();
    			create_component(link7.$$.fragment);
    			t11 = space();
    			a2 = element("a");
    			span2 = element("span");
    			span2.textContent = "streitkräfte";
    			t13 = space();
    			create_component(link8.$$.fragment);
    			t14 = space();
    			create_component(link9.$$.fragment);
    			t15 = space();
    			create_component(link10.$$.fragment);
    			t16 = space();
    			create_component(link11.$$.fragment);
    			t17 = space();
    			create_component(link12.$$.fragment);
    			t18 = space();
    			create_component(link13.$$.fragment);
    			t19 = space();
    			create_component(link14.$$.fragment);
    			t20 = space();
    			a3 = element("a");
    			span3 = element("span");
    			span3.textContent = "sanitätsdienst";
    			t22 = space();
    			create_component(link15.$$.fragment);
    			t23 = space();
    			create_component(link16.$$.fragment);
    			t24 = space();
    			a4 = element("a");
    			span4 = element("span");
    			span4.textContent = "panzertruppen";
    			t26 = space();
    			a5 = element("a");
    			span5 = element("span");
    			span5.textContent = "logistik";
    			t28 = space();
    			create_component(link17.$$.fragment);
    			t29 = space();
    			create_component(link18.$$.fragment);
    			t30 = space();
    			create_component(link19.$$.fragment);
    			t31 = space();
    			create_component(link20.$$.fragment);
    			t32 = space();
    			a6 = element("a");
    			span6 = element("span");
    			span6.textContent = "aufklärer";
    			t34 = space();
    			create_component(link21.$$.fragment);
    			t35 = space();
    			create_component(link22.$$.fragment);
    			t36 = space();
    			create_component(link23.$$.fragment);
    			t37 = space();
    			create_component(link24.$$.fragment);
    			t38 = space();
    			a7 = element("a");
    			span7 = element("span");
    			span7.textContent = "fuhrpark";
    			t40 = space();
    			create_component(link25.$$.fragment);
    			t41 = space();
    			create_component(link26.$$.fragment);
    			add_location(span0, file, 53, 8, 2164);
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "class", "expandable");
    			add_location(a0, file, 52, 6, 2124);
    			add_location(span1, file, 61, 8, 2468);
    			attr_dev(a1, "href", "/");
    			attr_dev(a1, "class", "expandable");
    			add_location(a1, file, 60, 6, 2428);
    			add_location(span2, file, 67, 8, 2734);
    			attr_dev(a2, "href", "/");
    			attr_dev(a2, "class", "expandable");
    			add_location(a2, file, 66, 6, 2694);
    			add_location(span3, file, 77, 8, 3148);
    			attr_dev(a3, "href", "/");
    			attr_dev(a3, "class", "expandable");
    			add_location(a3, file, 76, 6, 3108);
    			add_location(span4, file, 82, 8, 3342);
    			attr_dev(a4, "href", "/");
    			attr_dev(a4, "class", "expandable");
    			add_location(a4, file, 81, 6, 3302);
    			add_location(span5, file, 85, 8, 3426);
    			attr_dev(a5, "href", "/");
    			attr_dev(a5, "class", "expandable");
    			add_location(a5, file, 84, 6, 3386);
    			add_location(span6, file, 92, 8, 3715);
    			attr_dev(a6, "href", "/");
    			attr_dev(a6, "class", "expandable");
    			add_location(a6, file, 91, 6, 3675);
    			add_location(span7, file, 99, 8, 3962);
    			attr_dev(a7, "href", "/");
    			attr_dev(a7, "class", "expandable");
    			add_location(a7, file, 98, 6, 3922);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a0, anchor);
    			append_dev(a0, span0);
    			append_dev(a0, t1);
    			mount_component(link0, a0, null);
    			append_dev(a0, t2);
    			mount_component(link1, a0, null);
    			append_dev(a0, t3);
    			mount_component(link2, a0, null);
    			append_dev(a0, t4);
    			mount_component(link3, a0, null);
    			append_dev(a0, t5);
    			mount_component(link4, a0, null);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, a1, anchor);
    			append_dev(a1, span1);
    			append_dev(a1, t8);
    			mount_component(link5, a1, null);
    			append_dev(a1, t9);
    			mount_component(link6, a1, null);
    			append_dev(a1, t10);
    			mount_component(link7, a1, null);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, a2, anchor);
    			append_dev(a2, span2);
    			append_dev(a2, t13);
    			mount_component(link8, a2, null);
    			append_dev(a2, t14);
    			mount_component(link9, a2, null);
    			append_dev(a2, t15);
    			mount_component(link10, a2, null);
    			append_dev(a2, t16);
    			mount_component(link11, a2, null);
    			append_dev(a2, t17);
    			mount_component(link12, a2, null);
    			append_dev(a2, t18);
    			mount_component(link13, a2, null);
    			append_dev(a2, t19);
    			mount_component(link14, a2, null);
    			insert_dev(target, t20, anchor);
    			insert_dev(target, a3, anchor);
    			append_dev(a3, span3);
    			append_dev(a3, t22);
    			mount_component(link15, a3, null);
    			append_dev(a3, t23);
    			mount_component(link16, a3, null);
    			insert_dev(target, t24, anchor);
    			insert_dev(target, a4, anchor);
    			append_dev(a4, span4);
    			insert_dev(target, t26, anchor);
    			insert_dev(target, a5, anchor);
    			append_dev(a5, span5);
    			append_dev(a5, t28);
    			mount_component(link17, a5, null);
    			append_dev(a5, t29);
    			mount_component(link18, a5, null);
    			append_dev(a5, t30);
    			mount_component(link19, a5, null);
    			append_dev(a5, t31);
    			mount_component(link20, a5, null);
    			insert_dev(target, t32, anchor);
    			insert_dev(target, a6, anchor);
    			append_dev(a6, span6);
    			append_dev(a6, t34);
    			mount_component(link21, a6, null);
    			append_dev(a6, t35);
    			mount_component(link22, a6, null);
    			append_dev(a6, t36);
    			mount_component(link23, a6, null);
    			append_dev(a6, t37);
    			mount_component(link24, a6, null);
    			insert_dev(target, t38, anchor);
    			insert_dev(target, a7, anchor);
    			append_dev(a7, span7);
    			append_dev(a7, t40);
    			mount_component(link25, a7, null);
    			append_dev(a7, t41);
    			mount_component(link26, a7, null);
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
    			const link13_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link13_changes.$$scope = { dirty, ctx };
    			}

    			link13.$set(link13_changes);
    			const link14_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link14_changes.$$scope = { dirty, ctx };
    			}

    			link14.$set(link14_changes);
    			const link15_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link15_changes.$$scope = { dirty, ctx };
    			}

    			link15.$set(link15_changes);
    			const link16_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link16_changes.$$scope = { dirty, ctx };
    			}

    			link16.$set(link16_changes);
    			const link17_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link17_changes.$$scope = { dirty, ctx };
    			}

    			link17.$set(link17_changes);
    			const link18_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link18_changes.$$scope = { dirty, ctx };
    			}

    			link18.$set(link18_changes);
    			const link19_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link19_changes.$$scope = { dirty, ctx };
    			}

    			link19.$set(link19_changes);
    			const link20_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link20_changes.$$scope = { dirty, ctx };
    			}

    			link20.$set(link20_changes);
    			const link21_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link21_changes.$$scope = { dirty, ctx };
    			}

    			link21.$set(link21_changes);
    			const link22_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link22_changes.$$scope = { dirty, ctx };
    			}

    			link22.$set(link22_changes);
    			const link23_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link23_changes.$$scope = { dirty, ctx };
    			}

    			link23.$set(link23_changes);
    			const link24_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link24_changes.$$scope = { dirty, ctx };
    			}

    			link24.$set(link24_changes);
    			const link25_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link25_changes.$$scope = { dirty, ctx };
    			}

    			link25.$set(link25_changes);
    			const link26_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link26_changes.$$scope = { dirty, ctx };
    			}

    			link26.$set(link26_changes);
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
    			transition_in(link13.$$.fragment, local);
    			transition_in(link14.$$.fragment, local);
    			transition_in(link15.$$.fragment, local);
    			transition_in(link16.$$.fragment, local);
    			transition_in(link17.$$.fragment, local);
    			transition_in(link18.$$.fragment, local);
    			transition_in(link19.$$.fragment, local);
    			transition_in(link20.$$.fragment, local);
    			transition_in(link21.$$.fragment, local);
    			transition_in(link22.$$.fragment, local);
    			transition_in(link23.$$.fragment, local);
    			transition_in(link24.$$.fragment, local);
    			transition_in(link25.$$.fragment, local);
    			transition_in(link26.$$.fragment, local);
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
    			transition_out(link13.$$.fragment, local);
    			transition_out(link14.$$.fragment, local);
    			transition_out(link15.$$.fragment, local);
    			transition_out(link16.$$.fragment, local);
    			transition_out(link17.$$.fragment, local);
    			transition_out(link18.$$.fragment, local);
    			transition_out(link19.$$.fragment, local);
    			transition_out(link20.$$.fragment, local);
    			transition_out(link21.$$.fragment, local);
    			transition_out(link22.$$.fragment, local);
    			transition_out(link23.$$.fragment, local);
    			transition_out(link24.$$.fragment, local);
    			transition_out(link25.$$.fragment, local);
    			transition_out(link26.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a0);
    			destroy_component(link0);
    			destroy_component(link1);
    			destroy_component(link2);
    			destroy_component(link3);
    			destroy_component(link4);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(a1);
    			destroy_component(link5);
    			destroy_component(link6);
    			destroy_component(link7);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(a2);
    			destroy_component(link8);
    			destroy_component(link9);
    			destroy_component(link10);
    			destroy_component(link11);
    			destroy_component(link12);
    			destroy_component(link13);
    			destroy_component(link14);
    			if (detaching) detach_dev(t20);
    			if (detaching) detach_dev(a3);
    			destroy_component(link15);
    			destroy_component(link16);
    			if (detaching) detach_dev(t24);
    			if (detaching) detach_dev(a4);
    			if (detaching) detach_dev(t26);
    			if (detaching) detach_dev(a5);
    			destroy_component(link17);
    			destroy_component(link18);
    			destroy_component(link19);
    			destroy_component(link20);
    			if (detaching) detach_dev(t32);
    			if (detaching) detach_dev(a6);
    			destroy_component(link21);
    			destroy_component(link22);
    			destroy_component(link23);
    			destroy_component(link24);
    			if (detaching) detach_dev(t38);
    			if (detaching) detach_dev(a7);
    			destroy_component(link25);
    			destroy_component(link26);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(52:4) <Router {url}>",
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
    			add_location(br, file, 42, 45, 1782);
    			add_location(span0, file, 42, 51, 1788);
    			attr_dev(div0, "id", "home-nav-logo");
    			add_location(div0, file, 42, 2, 1739);
    			attr_dev(span1, "class", "material-icons");
    			add_location(span1, file, 44, 4, 1845);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "name", "search");
    			attr_dev(input, "placeholder", "Wiki durchsuchen...");
    			add_location(input, file, 45, 4, 1892);
    			attr_dev(div1, "id", "home-nav-search");
    			add_location(div1, file, 43, 2, 1814);
    			attr_dev(div2, "id", "home-nav-list");
    			add_location(div2, file, 50, 2, 2074);
    			attr_dev(div3, "id", "home-overlay");
    			add_location(div3, file, 41, 0, 1713);
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

    		/* creates array from "expandable" nodelist */
    		var expandableArr = Array.from(expandable);

    		expandableArr.forEach(element => {
    			/* adds  "arrow" to any span in "expandableArr" array */
    			element.querySelector("span").insertAdjacentHTML("beforeend", '<span class="material-icons-round">expand_more</span>');

    			let open = false; // used for toggeling

    			/* add onclick function */
    			element.onclick = event => {
    				open = !open;

    				/* prevent default action on html elements */
    				event.preventDefault();

    				/* collapse all expandables */
    				expandableArr.forEach(element => {
    					element.querySelector(".material-icons-round").style.transform = "rotate(0deg)";

    					/* add display:none to every a (Link) tag */
    					element.querySelectorAll("a").forEach(element => {
    						element.style.display = "none";
    					});
    				});

    				/* expand the span clicked on given it has been closed, else just toggle */
    				if (open) {
    					/* rotate arrow 90deg */
    					element.querySelector(".material-icons-round").style.transform = "rotate(90deg)";

    					/* add display:flex to every a (Link) tag */
    					element.querySelectorAll("a").forEach(element => {
    						element.style.display = "flex";
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

    	$$self.$capture_state = () => ({ Router, Link, onMount, url });

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

    /* src/App.svelte generated by Svelte v3.46.4 */

    // (35:2) <Route path="/">
    function create_default_slot_28(ctx) {
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
    		id: create_default_slot_28.name,
    		type: "slot",
    		source: "(35:2) <Route path=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (38:2) <Route path="steuerung">
    function create_default_slot_27(ctx) {
    	let steuerung;
    	let current;
    	steuerung = new Steuerung({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(steuerung.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(steuerung, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(steuerung.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(steuerung.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(steuerung, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_27.name,
    		type: "slot",
    		source: "(38:2) <Route path=\\\"steuerung\\\">",
    		ctx
    	});

    	return block;
    }

    // (39:2) <Route path="funk">
    function create_default_slot_26(ctx) {
    	let funk;
    	let current;
    	funk = new Funk({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(funk.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(funk, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(funk.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(funk.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(funk, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_26.name,
    		type: "slot",
    		source: "(39:2) <Route path=\\\"funk\\\">",
    		ctx
    	});

    	return block;
    }

    // (40:2) <Route path="erstehilfe">
    function create_default_slot_25(ctx) {
    	let erstehilfe;
    	let current;
    	erstehilfe = new Erstehilfe({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(erstehilfe.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(erstehilfe, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(erstehilfe.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(erstehilfe.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(erstehilfe, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_25.name,
    		type: "slot",
    		source: "(40:2) <Route path=\\\"erstehilfe\\\">",
    		ctx
    	});

    	return block;
    }

    // (41:2) <Route path="buddyteam">
    function create_default_slot_24(ctx) {
    	let buddyteam;
    	let current;
    	buddyteam = new Buddyteam({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(buddyteam.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(buddyteam, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(buddyteam.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(buddyteam.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(buddyteam, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_24.name,
    		type: "slot",
    		source: "(41:2) <Route path=\\\"buddyteam\\\">",
    		ctx
    	});

    	return block;
    }

    // (42:2) <Route path="sonstiges">
    function create_default_slot_23(ctx) {
    	let sonstiges;
    	let current;
    	sonstiges = new Sonstiges({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(sonstiges.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sonstiges, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sonstiges.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sonstiges.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sonstiges, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_23.name,
    		type: "slot",
    		source: "(42:2) <Route path=\\\"sonstiges\\\">",
    		ctx
    	});

    	return block;
    }

    // (44:2) <Route path="abteilungsleiter">
    function create_default_slot_22(ctx) {
    	let abteilungsleiter;
    	let current;
    	abteilungsleiter = new Abteilungsleiter({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(abteilungsleiter.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(abteilungsleiter, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(abteilungsleiter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(abteilungsleiter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(abteilungsleiter, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_22.name,
    		type: "slot",
    		source: "(44:2) <Route path=\\\"abteilungsleiter\\\">",
    		ctx
    	});

    	return block;
    }

    // (45:2) <Route path="einsatzleiter">
    function create_default_slot_21(ctx) {
    	let einsatzleiter;
    	let current;
    	einsatzleiter = new Einsatzleiter({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(einsatzleiter.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(einsatzleiter, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(einsatzleiter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(einsatzleiter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(einsatzleiter, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_21.name,
    		type: "slot",
    		source: "(45:2) <Route path=\\\"einsatzleiter\\\">",
    		ctx
    	});

    	return block;
    }

    // (46:2) <Route path="gruppentruppfuehrer">
    function create_default_slot_20(ctx) {
    	let gruppentruppfuehrer;
    	let current;
    	gruppentruppfuehrer = new Gruppentruppfuehrer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(gruppentruppfuehrer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(gruppentruppfuehrer, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gruppentruppfuehrer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gruppentruppfuehrer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(gruppentruppfuehrer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_20.name,
    		type: "slot",
    		source: "(46:2) <Route path=\\\"gruppentruppfuehrer\\\">",
    		ctx
    	});

    	return block;
    }

    // (48:2) <Route path="schuetze">
    function create_default_slot_19(ctx) {
    	let schuetze;
    	let current;
    	schuetze = new Schuetze({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(schuetze.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(schuetze, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(schuetze.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(schuetze.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(schuetze, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_19.name,
    		type: "slot",
    		source: "(48:2) <Route path=\\\"schuetze\\\">",
    		ctx
    	});

    	return block;
    }

    // (49:2) <Route path="funker">
    function create_default_slot_18(ctx) {
    	let funker;
    	let current;
    	funker = new Funker({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(funker.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(funker, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(funker.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(funker.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(funker, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_18.name,
    		type: "slot",
    		source: "(49:2) <Route path=\\\"funker\\\">",
    		ctx
    	});

    	return block;
    }

    // (50:2) <Route path="mgschuetze">
    function create_default_slot_17(ctx) {
    	let mgschuetze;
    	let current;
    	mgschuetze = new Mgschuetze({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(mgschuetze.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(mgschuetze, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mgschuetze.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mgschuetze.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(mgschuetze, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_17.name,
    		type: "slot",
    		source: "(50:2) <Route path=\\\"mgschuetze\\\">",
    		ctx
    	});

    	return block;
    }

    // (51:2) <Route path="atschuetze">
    function create_default_slot_16(ctx) {
    	let atschuetze;
    	let current;
    	atschuetze = new Atschuetze({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(atschuetze.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(atschuetze, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(atschuetze.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(atschuetze.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(atschuetze, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_16.name,
    		type: "slot",
    		source: "(51:2) <Route path=\\\"atschuetze\\\">",
    		ctx
    	});

    	return block;
    }

    // (52:2) <Route path="praezisionsschuetze">
    function create_default_slot_15(ctx) {
    	let praezisionsschuetze;
    	let current;
    	praezisionsschuetze = new Praezisionsschuetze({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(praezisionsschuetze.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(praezisionsschuetze, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(praezisionsschuetze.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(praezisionsschuetze.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(praezisionsschuetze, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_15.name,
    		type: "slot",
    		source: "(52:2) <Route path=\\\"praezisionsschuetze\\\">",
    		ctx
    	});

    	return block;
    }

    // (53:2) <Route path="breacher">
    function create_default_slot_14(ctx) {
    	let breacher;
    	let current;
    	breacher = new Breacher({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(breacher.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(breacher, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(breacher.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(breacher.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(breacher, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_14.name,
    		type: "slot",
    		source: "(53:2) <Route path=\\\"breacher\\\">",
    		ctx
    	});

    	return block;
    }

    // (54:2) <Route path="grenadier">
    function create_default_slot_13(ctx) {
    	let grenadier;
    	let current;
    	grenadier = new Grenadier({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(grenadier.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(grenadier, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(grenadier.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(grenadier.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(grenadier, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_13.name,
    		type: "slot",
    		source: "(54:2) <Route path=\\\"grenadier\\\">",
    		ctx
    	});

    	return block;
    }

    // (56:2) <Route path="sanitaeter">
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
    		source: "(56:2) <Route path=\\\"sanitaeter\\\">",
    		ctx
    	});

    	return block;
    }

    // (57:2) <Route path="medevacsanitaeter">
    function create_default_slot_11(ctx) {
    	let medevacsanitaeter;
    	let current;
    	medevacsanitaeter = new Medevacsanitaeter({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(medevacsanitaeter.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(medevacsanitaeter, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(medevacsanitaeter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(medevacsanitaeter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(medevacsanitaeter, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11.name,
    		type: "slot",
    		source: "(57:2) <Route path=\\\"medevacsanitaeter\\\">",
    		ctx
    	});

    	return block;
    }

    // (59:2) <Route path="kampfpionier">
    function create_default_slot_10(ctx) {
    	let kampfpionier;
    	let current;
    	kampfpionier = new Kampfpionier({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(kampfpionier.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(kampfpionier, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(kampfpionier.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(kampfpionier.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(kampfpionier, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(59:2) <Route path=\\\"kampfpionier\\\">",
    		ctx
    	});

    	return block;
    }

    // (60:2) <Route path="pionier">
    function create_default_slot_9(ctx) {
    	let pionier;
    	let current;
    	pionier = new Pionier({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(pionier.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(pionier, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pionier.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pionier.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(pionier, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(60:2) <Route path=\\\"pionier\\\">",
    		ctx
    	});

    	return block;
    }

    // (61:2) <Route path="helikopterpilot">
    function create_default_slot_8(ctx) {
    	let helikopterpilot;
    	let current;
    	helikopterpilot = new Helikopterpiloten({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(helikopterpilot.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(helikopterpilot, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(helikopterpilot.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(helikopterpilot.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(helikopterpilot, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(61:2) <Route path=\\\"helikopterpilot\\\">",
    		ctx
    	});

    	return block;
    }

    // (62:2) <Route path="basislogistiker">
    function create_default_slot_7(ctx) {
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
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(62:2) <Route path=\\\"basislogistiker\\\">",
    		ctx
    	});

    	return block;
    }

    // (64:2) <Route path="jtac">
    function create_default_slot_6(ctx) {
    	let jtac;
    	let current;
    	jtac = new Jtac({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(jtac.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(jtac, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(jtac.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(jtac.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(jtac, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(64:2) <Route path=\\\"jtac\\\">",
    		ctx
    	});

    	return block;
    }

    // (65:2) <Route path="scharfschuetze">
    function create_default_slot_5(ctx) {
    	let scharfschuetze;
    	let current;
    	scharfschuetze = new Scharfschuetze({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(scharfschuetze.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(scharfschuetze, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(scharfschuetze.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(scharfschuetze.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(scharfschuetze, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(65:2) <Route path=\\\"scharfschuetze\\\">",
    		ctx
    	});

    	return block;
    }

    // (66:2) <Route path="spotter">
    function create_default_slot_4(ctx) {
    	let spotter;
    	let current;
    	spotter = new Spotter({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(spotter.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(spotter, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(spotter.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(spotter.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(spotter, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(66:2) <Route path=\\\"spotter\\\">",
    		ctx
    	});

    	return block;
    }

    // (67:2) <Route path="eod">
    function create_default_slot_3(ctx) {
    	let eod;
    	let current;
    	eod = new Eod({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(eod.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(eod, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(eod.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(eod.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(eod, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(67:2) <Route path=\\\"eod\\\">",
    		ctx
    	});

    	return block;
    }

    // (69:2) <Route path="bodenfahrzeuge">
    function create_default_slot_2(ctx) {
    	let bodenfahrzeuge;
    	let current;
    	bodenfahrzeuge = new Bodenfahrzeuge({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(bodenfahrzeuge.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(bodenfahrzeuge, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bodenfahrzeuge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bodenfahrzeuge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(bodenfahrzeuge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(69:2) <Route path=\\\"bodenfahrzeuge\\\">",
    		ctx
    	});

    	return block;
    }

    // (70:2) <Route path="luftfahrzeuge">
    function create_default_slot_1(ctx) {
    	let luftfahrzeuge;
    	let current;
    	luftfahrzeuge = new Luftfahrzeuge({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(luftfahrzeuge.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(luftfahrzeuge, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(luftfahrzeuge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(luftfahrzeuge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(luftfahrzeuge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(70:2) <Route path=\\\"luftfahrzeuge\\\">",
    		ctx
    	});

    	return block;
    }

    // (33:0) <Router {url}>
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
    	let t17;
    	let route18;
    	let t18;
    	let route19;
    	let t19;
    	let route20;
    	let t20;
    	let route21;
    	let t21;
    	let route22;
    	let t22;
    	let route23;
    	let t23;
    	let route24;
    	let t24;
    	let route25;
    	let t25;
    	let route26;
    	let t26;
    	let route27;
    	let current;

    	route0 = new Route({
    			props: {
    				path: "/",
    				$$slots: { default: [create_default_slot_28] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route1 = new Route({
    			props: {
    				path: "steuerung",
    				$$slots: { default: [create_default_slot_27] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route2 = new Route({
    			props: {
    				path: "funk",
    				$$slots: { default: [create_default_slot_26] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route3 = new Route({
    			props: {
    				path: "erstehilfe",
    				$$slots: { default: [create_default_slot_25] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route4 = new Route({
    			props: {
    				path: "buddyteam",
    				$$slots: { default: [create_default_slot_24] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route5 = new Route({
    			props: {
    				path: "sonstiges",
    				$$slots: { default: [create_default_slot_23] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route6 = new Route({
    			props: {
    				path: "abteilungsleiter",
    				$$slots: { default: [create_default_slot_22] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route7 = new Route({
    			props: {
    				path: "einsatzleiter",
    				$$slots: { default: [create_default_slot_21] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route8 = new Route({
    			props: {
    				path: "gruppentruppfuehrer",
    				$$slots: { default: [create_default_slot_20] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route9 = new Route({
    			props: {
    				path: "schuetze",
    				$$slots: { default: [create_default_slot_19] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route10 = new Route({
    			props: {
    				path: "funker",
    				$$slots: { default: [create_default_slot_18] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route11 = new Route({
    			props: {
    				path: "mgschuetze",
    				$$slots: { default: [create_default_slot_17] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route12 = new Route({
    			props: {
    				path: "atschuetze",
    				$$slots: { default: [create_default_slot_16] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route13 = new Route({
    			props: {
    				path: "praezisionsschuetze",
    				$$slots: { default: [create_default_slot_15] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route14 = new Route({
    			props: {
    				path: "breacher",
    				$$slots: { default: [create_default_slot_14] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route15 = new Route({
    			props: {
    				path: "grenadier",
    				$$slots: { default: [create_default_slot_13] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route16 = new Route({
    			props: {
    				path: "sanitaeter",
    				$$slots: { default: [create_default_slot_12] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route17 = new Route({
    			props: {
    				path: "medevacsanitaeter",
    				$$slots: { default: [create_default_slot_11] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route18 = new Route({
    			props: {
    				path: "kampfpionier",
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route19 = new Route({
    			props: {
    				path: "pionier",
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route20 = new Route({
    			props: {
    				path: "helikopterpilot",
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route21 = new Route({
    			props: {
    				path: "basislogistiker",
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route22 = new Route({
    			props: {
    				path: "jtac",
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route23 = new Route({
    			props: {
    				path: "scharfschuetze",
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route24 = new Route({
    			props: {
    				path: "spotter",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route25 = new Route({
    			props: {
    				path: "eod",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route26 = new Route({
    			props: {
    				path: "bodenfahrzeuge",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route27 = new Route({
    			props: {
    				path: "luftfahrzeuge",
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
    			t17 = space();
    			create_component(route18.$$.fragment);
    			t18 = space();
    			create_component(route19.$$.fragment);
    			t19 = space();
    			create_component(route20.$$.fragment);
    			t20 = space();
    			create_component(route21.$$.fragment);
    			t21 = space();
    			create_component(route22.$$.fragment);
    			t22 = space();
    			create_component(route23.$$.fragment);
    			t23 = space();
    			create_component(route24.$$.fragment);
    			t24 = space();
    			create_component(route25.$$.fragment);
    			t25 = space();
    			create_component(route26.$$.fragment);
    			t26 = space();
    			create_component(route27.$$.fragment);
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
    			insert_dev(target, t17, anchor);
    			mount_component(route18, target, anchor);
    			insert_dev(target, t18, anchor);
    			mount_component(route19, target, anchor);
    			insert_dev(target, t19, anchor);
    			mount_component(route20, target, anchor);
    			insert_dev(target, t20, anchor);
    			mount_component(route21, target, anchor);
    			insert_dev(target, t21, anchor);
    			mount_component(route22, target, anchor);
    			insert_dev(target, t22, anchor);
    			mount_component(route23, target, anchor);
    			insert_dev(target, t23, anchor);
    			mount_component(route24, target, anchor);
    			insert_dev(target, t24, anchor);
    			mount_component(route25, target, anchor);
    			insert_dev(target, t25, anchor);
    			mount_component(route26, target, anchor);
    			insert_dev(target, t26, anchor);
    			mount_component(route27, target, anchor);
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
    			const route18_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route18_changes.$$scope = { dirty, ctx };
    			}

    			route18.$set(route18_changes);
    			const route19_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route19_changes.$$scope = { dirty, ctx };
    			}

    			route19.$set(route19_changes);
    			const route20_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route20_changes.$$scope = { dirty, ctx };
    			}

    			route20.$set(route20_changes);
    			const route21_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route21_changes.$$scope = { dirty, ctx };
    			}

    			route21.$set(route21_changes);
    			const route22_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route22_changes.$$scope = { dirty, ctx };
    			}

    			route22.$set(route22_changes);
    			const route23_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route23_changes.$$scope = { dirty, ctx };
    			}

    			route23.$set(route23_changes);
    			const route24_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route24_changes.$$scope = { dirty, ctx };
    			}

    			route24.$set(route24_changes);
    			const route25_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route25_changes.$$scope = { dirty, ctx };
    			}

    			route25.$set(route25_changes);
    			const route26_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route26_changes.$$scope = { dirty, ctx };
    			}

    			route26.$set(route26_changes);
    			const route27_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				route27_changes.$$scope = { dirty, ctx };
    			}

    			route27.$set(route27_changes);
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
    			transition_in(route18.$$.fragment, local);
    			transition_in(route19.$$.fragment, local);
    			transition_in(route20.$$.fragment, local);
    			transition_in(route21.$$.fragment, local);
    			transition_in(route22.$$.fragment, local);
    			transition_in(route23.$$.fragment, local);
    			transition_in(route24.$$.fragment, local);
    			transition_in(route25.$$.fragment, local);
    			transition_in(route26.$$.fragment, local);
    			transition_in(route27.$$.fragment, local);
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
    			transition_out(route18.$$.fragment, local);
    			transition_out(route19.$$.fragment, local);
    			transition_out(route20.$$.fragment, local);
    			transition_out(route21.$$.fragment, local);
    			transition_out(route22.$$.fragment, local);
    			transition_out(route23.$$.fragment, local);
    			transition_out(route24.$$.fragment, local);
    			transition_out(route25.$$.fragment, local);
    			transition_out(route26.$$.fragment, local);
    			transition_out(route27.$$.fragment, local);
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
    			if (detaching) detach_dev(t17);
    			destroy_component(route18, detaching);
    			if (detaching) detach_dev(t18);
    			destroy_component(route19, detaching);
    			if (detaching) detach_dev(t19);
    			destroy_component(route20, detaching);
    			if (detaching) detach_dev(t20);
    			destroy_component(route21, detaching);
    			if (detaching) detach_dev(t21);
    			destroy_component(route22, detaching);
    			if (detaching) detach_dev(t22);
    			destroy_component(route23, detaching);
    			if (detaching) detach_dev(t23);
    			destroy_component(route24, detaching);
    			if (detaching) detach_dev(t24);
    			destroy_component(route25, detaching);
    			if (detaching) detach_dev(t25);
    			destroy_component(route26, detaching);
    			if (detaching) detach_dev(t26);
    			destroy_component(route27, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(33:0) <Router {url}>",
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
    		Steuerung,
    		Funk,
    		Erstehilfe,
    		Buddyteam,
    		Sonstiges,
    		Abteilungsleiter,
    		Einsatzleiter,
    		Gruppentruppfuehrer,
    		Schuetze,
    		Funker,
    		Mgschuetze,
    		Atschuetze,
    		Praezisionsschuetze,
    		Breacher,
    		Grenadier,
    		Sanitaeter,
    		Medevacsanitaeter,
    		Kampfpionier,
    		Pionier,
    		Helikopterpilot: Helikopterpiloten,
    		Basislogistiker,
    		Jtac,
    		Scharfschuetze,
    		Spotter,
    		Eod,
    		Bodenfahrzeuge,
    		Luftfahrzeuge,
    		Home,
    		Router,
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
