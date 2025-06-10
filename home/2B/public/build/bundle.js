
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
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
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
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
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
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
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
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
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
        else if (callback) {
            callback();
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
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
            flush_render_callbacks($$.after_update);
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
            ctx: [],
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
            if (!is_function(callback)) {
                return noop;
            }
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
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
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

    /* src/components/Table.svelte generated by Svelte v3.59.2 */

    const file$2 = "src/components/Table.svelte";

    function create_fragment$2(ctx) {
    	let main;
    	let h3;
    	let t1;
    	let table;
    	let thead;
    	let tr0;
    	let th0;
    	let t3;
    	let th1;
    	let t5;
    	let th2;
    	let t7;
    	let th3;
    	let t8;
    	let tbody;
    	let tr1;
    	let td;
    	let button0;
    	let svg0;
    	let path0;
    	let t9;
    	let button1;
    	let svg1;
    	let path1;
    	let t10;
    	let button2;
    	let svg2;
    	let path2;

    	const block = {
    		c: function create() {
    			main = element("main");
    			h3 = element("h3");
    			h3.textContent = "Tarefas Agendadas";
    			t1 = space();
    			table = element("table");
    			thead = element("thead");
    			tr0 = element("tr");
    			th0 = element("th");
    			th0.textContent = "TAREFA";
    			t3 = space();
    			th1 = element("th");
    			th1.textContent = "PRAZO";
    			t5 = space();
    			th2 = element("th");
    			th2.textContent = "PRIORIDADE";
    			t7 = space();
    			th3 = element("th");
    			t8 = space();
    			tbody = element("tbody");
    			tr1 = element("tr");
    			td = element("td");
    			button0 = element("button");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t9 = space();
    			button1 = element("button");
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			t10 = space();
    			button2 = element("button");
    			svg2 = svg_element("svg");
    			path2 = svg_element("path");
    			attr_dev(h3, "class", "svelte-1o2cm5t");
    			add_location(h3, file$2, 5, 4, 33);
    			attr_dev(th0, "class", "svelte-1o2cm5t");
    			add_location(th0, file$2, 9, 16, 121);
    			attr_dev(th1, "class", "svelte-1o2cm5t");
    			add_location(th1, file$2, 10, 16, 153);
    			attr_dev(th2, "class", "svelte-1o2cm5t");
    			add_location(th2, file$2, 11, 16, 184);
    			attr_dev(th3, "class", "svelte-1o2cm5t");
    			add_location(th3, file$2, 12, 16, 220);
    			attr_dev(tr0, "class", "svelte-1o2cm5t");
    			add_location(tr0, file$2, 8, 12, 100);
    			add_location(thead, file$2, 7, 8, 80);
    			attr_dev(path0, "d", "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z");
    			add_location(path0, file$2, 20, 28, 546);
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg0, "width", "20");
    			attr_dev(svg0, "height", "20");
    			attr_dev(svg0, "fill", "#FFF");
    			attr_dev(svg0, "class", "bi bi-check-circle-fill");
    			attr_dev(svg0, "viewBox", "0 0 16 16");
    			add_location(svg0, file$2, 19, 24, 390);
    			attr_dev(button0, "class", "btn-check svelte-1o2cm5t");
    			add_location(button0, file$2, 18, 20, 339);
    			attr_dev(path1, "d", "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2");
    			add_location(path1, file$2, 26, 28, 1028);
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg1, "width", "20");
    			attr_dev(svg1, "height", "20");
    			attr_dev(svg1, "fill", "#FFF");
    			attr_dev(svg1, "class", "bi bi-info-circle-fill");
    			attr_dev(svg1, "viewBox", "0 0 16 16");
    			add_location(svg1, file$2, 25, 24, 873);
    			attr_dev(button1, "class", "btn-info svelte-1o2cm5t");
    			add_location(button1, file$2, 24, 20, 823);
    			attr_dev(path2, "d", "M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5");
    			add_location(path2, file$2, 32, 28, 1596);
    			attr_dev(svg2, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg2, "width", "20");
    			attr_dev(svg2, "height", "20");
    			attr_dev(svg2, "fill", "#FFF");
    			attr_dev(svg2, "class", "bi bi-trash3-fill");
    			attr_dev(svg2, "viewBox", "0 0 16 16");
    			add_location(svg2, file$2, 31, 24, 1446);
    			attr_dev(button2, "class", "btn-remove svelte-1o2cm5t");
    			add_location(button2, file$2, 30, 20, 1394);
    			attr_dev(td, "class", "svelte-1o2cm5t");
    			add_location(td, file$2, 17, 16, 314);
    			attr_dev(tr1, "class", "svelte-1o2cm5t");
    			add_location(tr1, file$2, 16, 12, 293);
    			add_location(tbody, file$2, 15, 8, 273);
    			attr_dev(table, "class", "svelte-1o2cm5t");
    			add_location(table, file$2, 6, 4, 64);
    			add_location(main, file$2, 4, 0, 22);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h3);
    			append_dev(main, t1);
    			append_dev(main, table);
    			append_dev(table, thead);
    			append_dev(thead, tr0);
    			append_dev(tr0, th0);
    			append_dev(tr0, t3);
    			append_dev(tr0, th1);
    			append_dev(tr0, t5);
    			append_dev(tr0, th2);
    			append_dev(tr0, t7);
    			append_dev(tr0, th3);
    			append_dev(table, t8);
    			append_dev(table, tbody);
    			append_dev(tbody, tr1);
    			append_dev(tr1, td);
    			append_dev(td, button0);
    			append_dev(button0, svg0);
    			append_dev(svg0, path0);
    			append_dev(td, t9);
    			append_dev(td, button1);
    			append_dev(button1, svg1);
    			append_dev(svg1, path1);
    			append_dev(td, t10);
    			append_dev(td, button2);
    			append_dev(button2, svg2);
    			append_dev(svg2, path2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
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
    	validate_slots('Table', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Table> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Table extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Table",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/Dialog.svelte generated by Svelte v3.59.2 */

    const file$1 = "src/components/Dialog.svelte";

    function create_fragment$1(ctx) {
    	let main;
    	let div2;
    	let div0;
    	let button;
    	let svg;
    	let path;
    	let t0;
    	let div1;
    	let span0;
    	let b0;
    	let t2;
    	let span1;
    	let b1;
    	let t4;
    	let span2;
    	let b2;
    	let t6;
    	let span3;
    	let b3;
    	let t8;
    	let span4;
    	let b4;
    	let t10;
    	let span5;
    	let b5;

    	const block = {
    		c: function create() {
    			main = element("main");
    			div2 = element("div");
    			div0 = element("div");
    			button = element("button");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			t0 = space();
    			div1 = element("div");
    			span0 = element("span");
    			b0 = element("b");
    			b0.textContent = "ID:";
    			t2 = space();
    			span1 = element("span");
    			b1 = element("b");
    			b1.textContent = "TAREFA:";
    			t4 = space();
    			span2 = element("span");
    			b2 = element("b");
    			b2.textContent = "DESCRIÇÃO:";
    			t6 = space();
    			span3 = element("span");
    			b3 = element("b");
    			b3.textContent = "PRIORIDADE:";
    			t8 = space();
    			span4 = element("span");
    			b4 = element("b");
    			b4.textContent = "PRAZO:";
    			t10 = space();
    			span5 = element("span");
    			b5 = element("b");
    			b5.textContent = "SITUAÇÃO:";
    			attr_dev(path, "d", "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z");
    			add_location(path, file$1, 9, 20, 269);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "24");
    			attr_dev(svg, "height", "24");
    			attr_dev(svg, "fill", "#FFF");
    			attr_dev(svg, "class", "bi bi-x-circle-fill");
    			attr_dev(svg, "viewBox", "0 0 16 16");
    			add_location(svg, file$1, 8, 16, 125);
    			attr_dev(button, "class", "svelte-1r1z2bm");
    			add_location(button, file$1, 7, 12, 100);
    			attr_dev(div0, "class", "top-line svelte-1r1z2bm");
    			add_location(div0, file$1, 6, 8, 65);
    			add_location(b0, file$1, 14, 18, 588);
    			attr_dev(span0, "class", "svelte-1r1z2bm");
    			add_location(span0, file$1, 14, 12, 582);
    			add_location(b1, file$1, 15, 9, 616);
    			attr_dev(span1, "class", "svelte-1r1z2bm");
    			add_location(span1, file$1, 15, 3, 610);
    			add_location(b2, file$1, 16, 9, 648);
    			attr_dev(span2, "class", "svelte-1r1z2bm");
    			add_location(span2, file$1, 16, 3, 642);
    			add_location(b3, file$1, 17, 9, 684);
    			attr_dev(span3, "class", "svelte-1r1z2bm");
    			add_location(span3, file$1, 17, 3, 678);
    			add_location(b4, file$1, 18, 9, 720);
    			attr_dev(span4, "class", "svelte-1r1z2bm");
    			add_location(span4, file$1, 18, 3, 714);
    			add_location(b5, file$1, 19, 9, 751);
    			attr_dev(span5, "class", "svelte-1r1z2bm");
    			add_location(span5, file$1, 19, 3, 745);
    			attr_dev(div1, "class", "content");
    			add_location(div1, file$1, 13, 8, 548);
    			attr_dev(div2, "class", "container svelte-1r1z2bm");
    			add_location(div2, file$1, 5, 4, 32);
    			attr_dev(main, "class", "svelte-1r1z2bm");
    			add_location(main, file$1, 4, 0, 21);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div2);
    			append_dev(div2, div0);
    			append_dev(div0, button);
    			append_dev(button, svg);
    			append_dev(svg, path);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, span0);
    			append_dev(span0, b0);
    			append_dev(div1, t2);
    			append_dev(div1, span1);
    			append_dev(span1, b1);
    			append_dev(div1, t4);
    			append_dev(div1, span2);
    			append_dev(span2, b2);
    			append_dev(div1, t6);
    			append_dev(div1, span3);
    			append_dev(span3, b3);
    			append_dev(div1, t8);
    			append_dev(div1, span4);
    			append_dev(span4, b4);
    			append_dev(div1, t10);
    			append_dev(div1, span5);
    			append_dev(span5, b5);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
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
    	validate_slots('Dialog', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Dialog> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Dialog extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dialog",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.59.2 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let h1;
    	let t1;
    	let div7;
    	let div3;
    	let div0;
    	let label0;
    	let t3;
    	let input0;
    	let t4;
    	let div1;
    	let label1;
    	let t6;
    	let input1;
    	let t7;
    	let div2;
    	let label2;
    	let t9;
    	let select;
    	let option0;
    	let option1;
    	let option2;
    	let t13;
    	let div6;
    	let div4;
    	let label3;
    	let t15;
    	let textarea;
    	let t16;
    	let div5;
    	let button;
    	let svg;
    	let path0;
    	let path1;
    	let t17;
    	let tabela;
    	let t18;
    	let dialogo;
    	let current;
    	tabela = new Table({ $$inline: true });
    	dialogo = new Dialog({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			h1.textContent = "Gerenciador de Tarefas - Svelte";
    			t1 = space();
    			div7 = element("div");
    			div3 = element("div");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Tarefa";
    			t3 = space();
    			input0 = element("input");
    			t4 = space();
    			div1 = element("div");
    			label1 = element("label");
    			label1.textContent = "Prazo";
    			t6 = space();
    			input1 = element("input");
    			t7 = space();
    			div2 = element("div");
    			label2 = element("label");
    			label2.textContent = "Prioridade";
    			t9 = space();
    			select = element("select");
    			option0 = element("option");
    			option0.textContent = "Baixa";
    			option1 = element("option");
    			option1.textContent = "Média";
    			option2 = element("option");
    			option2.textContent = "Alta";
    			t13 = space();
    			div6 = element("div");
    			div4 = element("div");
    			label3 = element("label");
    			label3.textContent = "Descrição";
    			t15 = space();
    			textarea = element("textarea");
    			t16 = space();
    			div5 = element("div");
    			button = element("button");
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			t17 = space();
    			create_component(tabela.$$.fragment);
    			t18 = space();
    			create_component(dialogo.$$.fragment);
    			attr_dev(h1, "class", "svelte-5nqwju");
    			add_location(h1, file, 14, 1, 578);
    			attr_dev(label0, "for", "tarefa");
    			attr_dev(label0, "class", "svelte-5nqwju");
    			add_location(label0, file, 19, 16, 714);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "name", "tarefa");
    			attr_dev(input0, "class", "svelte-5nqwju");
    			add_location(input0, file, 20, 16, 765);
    			add_location(div0, file, 18, 12, 692);
    			attr_dev(label1, "for", "prazo");
    			attr_dev(label1, "class", "svelte-5nqwju");
    			add_location(label1, file, 23, 16, 853);
    			attr_dev(input1, "type", "date");
    			attr_dev(input1, "name", "prazo");
    			attr_dev(input1, "class", "svelte-5nqwju");
    			add_location(input1, file, 24, 16, 902);
    			add_location(div1, file, 22, 12, 831);
    			attr_dev(label2, "for", "prioridade");
    			attr_dev(label2, "class", "svelte-5nqwju");
    			add_location(label2, file, 27, 16, 989);
    			option0.__value = "Baixa";
    			option0.value = option0.__value;
    			add_location(option0, file, 29, 20, 1095);
    			option1.__value = "Média";
    			option1.value = option1.__value;
    			add_location(option1, file, 30, 20, 1152);
    			option2.__value = "Alta";
    			option2.value = option2.__value;
    			add_location(option2, file, 31, 20, 1209);
    			attr_dev(select, "name", "prioridade");
    			attr_dev(select, "class", "svelte-5nqwju");
    			add_location(select, file, 28, 16, 1048);
    			add_location(div2, file, 26, 12, 967);
    			attr_dev(div3, "class", "grid-auto svelte-5nqwju");
    			add_location(div3, file, 17, 8, 656);
    			attr_dev(label3, "for", "descricao");
    			attr_dev(label3, "class", "svelte-5nqwju");
    			add_location(label3, file, 38, 16, 1383);
    			attr_dev(textarea, "name", "descricao");
    			attr_dev(textarea, "class", "svelte-5nqwju");
    			add_location(textarea, file, 39, 16, 1440);
    			add_location(div4, file, 37, 12, 1361);
    			attr_dev(path0, "d", "M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z");
    			add_location(path0, file, 44, 24, 1723);
    			attr_dev(path1, "d", "M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z");
    			add_location(path1, file, 45, 24, 2008);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "32");
    			attr_dev(svg, "height", "32");
    			attr_dev(svg, "fill", "#FFF");
    			attr_dev(svg, "class", "bi bi-floppy-fill");
    			attr_dev(svg, "viewBox", "0 0 16 16");
    			add_location(svg, file, 43, 20, 1577);
    			attr_dev(button, "class", "svelte-5nqwju");
    			add_location(button, file, 42, 16, 1548);
    			attr_dev(div5, "class", "div-btn svelte-5nqwju");
    			add_location(div5, file, 41, 12, 1510);
    			attr_dev(div6, "class", "grid-conf svelte-5nqwju");
    			add_location(div6, file, 36, 8, 1325);
    			attr_dev(div7, "class", "form-inputs svelte-5nqwju");
    			add_location(div7, file, 16, 1, 622);
    			attr_dev(main, "class", "svelte-5nqwju");
    			add_location(main, file, 13, 0, 570);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(main, t1);
    			append_dev(main, div7);
    			append_dev(div7, div3);
    			append_dev(div3, div0);
    			append_dev(div0, label0);
    			append_dev(div0, t3);
    			append_dev(div0, input0);
    			append_dev(div3, t4);
    			append_dev(div3, div1);
    			append_dev(div1, label1);
    			append_dev(div1, t6);
    			append_dev(div1, input1);
    			append_dev(div3, t7);
    			append_dev(div3, div2);
    			append_dev(div2, label2);
    			append_dev(div2, t9);
    			append_dev(div2, select);
    			append_dev(select, option0);
    			append_dev(select, option1);
    			append_dev(select, option2);
    			append_dev(div7, t13);
    			append_dev(div7, div6);
    			append_dev(div6, div4);
    			append_dev(div4, label3);
    			append_dev(div4, t15);
    			append_dev(div4, textarea);
    			append_dev(div6, t16);
    			append_dev(div6, div5);
    			append_dev(div5, button);
    			append_dev(button, svg);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			append_dev(main, t17);
    			mount_component(tabela, main, null);
    			append_dev(main, t18);
    			mount_component(dialogo, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tabela.$$.fragment, local);
    			transition_in(dialogo.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tabela.$$.fragment, local);
    			transition_out(dialogo.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(tabela);
    			destroy_component(dialogo);
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

    	let data = [
    		{
    			id: 1,
    			tarefa: "Fazer compras",
    			descricao: "Comprar frutas, legumes e pão",
    			prioridade: "Média",
    			prazo: "12/06/2025",
    			status: false
    		},
    		{
    			id: 2,
    			tarefa: "Estudar JavaScript",
    			descricao: "Revisar conceitos de Promises e Async/Await",
    			prioridade: "Alta",
    			prazo: "10/06/2025",
    			status: true
    		},
    		{
    			id: 3,
    			tarefa: "Pagar contas",
    			descricao: "Pagar conta de luz e internet",
    			prioridade: "Alta",
    			prazo: "14/06/2025",
    			status: false
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Tabela: Table, Dialogo: Dialog, data });

    	$$self.$inject_state = $$props => {
    		if ('data' in $$props) data = $$props.data;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

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
