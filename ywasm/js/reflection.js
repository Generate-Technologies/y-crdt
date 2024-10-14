// See js.rs #[wasm_bindgen(module = "/js/reflection.js")]

const JS_PTR = "__wbg_ptr";

export function getWasmPtr(target) {
    const ptr = target[JS_PTR];

    if (typeof ptr !== 'number') {
        throw new Error(NOT_WASM_OBJ);
    }

    return ptr;
}

export function getTypeJs(target) {
    const tag = target.type;
    if (typeof tag === 'number') {
        return tag & 0xff;
    } else {
        return 255;
    }
}

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.buffer !== wasm.memory.buffer) {
        let wasm = globalThis.__wasm;

        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
        console.log(Date.now() + ": " + "getUint8Memory0: created wasm memory view");
    }
    return cachedUint8Memory0;
}


let last_string_buffer = null;

export function fillAsValueString(ptr_raw) {
    const ptr = ptr_raw >>> 0;
    getUint8Memory0().subarray(ptr, ptr + last_string_buffer.length).set(last_string_buffer);
    console.log(Date.now() + ": " + "fillAsValueString: set memory of ptr " + ptr + " to " + last_string_buffer.length);
    last_string_buffer = null;
}

export function handleAsValue(target, functor) {

    console.log("this function");
    let resultEnum = -1;
    let resultNumber = 0.0;

    if (target === undefined) {
        resultEnum = 0;
    } else if (target === null) {
        resultEnum = 1;
    } else if (typeof target === 'number') {
        resultEnum = 2;
        resultNumber = target;
    } else if (typeof target === 'boolean') {
        resultEnum = 3;
        resultNumber = target ? 1.0 : 0.0;
    } else if (typeof target === 'bigint') {
        resultEnum = 4;
        resultNumber = Number(target);
    } else if (typeof target === 'string') {
        last_string_buffer = cachedTextEncoder.encode(target);
        resultNumber = last_string_buffer.length;
        resultEnum = 5;
        console.log(Date.now() + ": " + "handleAsValue: encoded, capacity is " + last_string_buffer.length);
    } else if (Array.isArray(target)) {
        resultEnum = 6;
    } else if (typeof(target) === 'object') {
        resultEnum = 7;
    }

    functor(resultEnum, resultNumber);
}