// See js.rs #[wasm_bindgen(module = "/js/reflection.js")]

export function getTypeJs(target) {
    const tag = target.type;
    if (typeof tag === 'number') {
        return tag & 0xff;
    } else {
        return 255;
    }
}