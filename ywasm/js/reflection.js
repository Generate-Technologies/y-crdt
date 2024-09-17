// See js.rs #[wasm_bindgen(module = "/js/reflection.js")]

const NON_TRANSACTION = "provided argument was not a ywasm transaction";
const INVALID_TRANSACTION_CTX = "cannot modify transaction in this context";
const REF_DISPOSED = "shared collection has been destroyed";
const ANOTHER_TX = "another transaction is in progress";
const ANOTHER_RW_TX = "another read-write transaction is in progress";
const OUT_OF_BOUNDS = "index outside of the bounds of an array";
const KEY_NOT_FOUND = "key was not found in a map";
const INVALID_PRELIM_OP = "preliminary type doesn't support this operation";
const INVALID_FMT = "given object cannot be used as formatting attributes";
const INVALID_XML_ATTRS = "given object cannot be used as XML attributes";
const NOT_XML_TYPE = "provided object is not a valid XML shared type";
const NOT_PRELIM = "this operation only works on preliminary types";
const NOT_WASM_OBJ = "provided reference is not a WebAssembly object";
const INVALID_DELTA = "invalid delta format";
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
