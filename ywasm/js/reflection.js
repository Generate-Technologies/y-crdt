// See js.rs #[wasm_bindgen(module = "/js/reflection.js")]

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

export function handleAsValue(target, functor) {
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
        resultEnum = 5;
    } else if (Array.isArray(target)) {
        resultEnum = 6;
    } else if (typeof(target) === 'object') {
        resultEnum = 7;
    }

    functor(resultEnum, resultNumber);
}