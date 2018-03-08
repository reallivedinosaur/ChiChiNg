import { StateBuffer, ChiChiMachine, StateBufferConfig } from "chichi";
import { Wishbone } from "./wishbone";

export interface WishboneState {
    pull: () => () => StateBuffer;
    push: () => (config: StateBuffer) => void;
}

const pullState = (chichi: ChiChiMachine) => (): StateBuffer => {
    return chichi ? chichi.stateBuffer.clone() : new StateBuffer();
}

const pushState = (chichi: ChiChiMachine) => (buffer: StateBuffer): void => {
    chichi ? chichi.stateBuffer.syncBuffer(buffer.data) : () => {}
}

export const createWishboneState = (wb: Wishbone) => {
    return {
        pull: () => pullState(wb.chichi),
        push: () => pushState(wb.chichi) 
    }
}