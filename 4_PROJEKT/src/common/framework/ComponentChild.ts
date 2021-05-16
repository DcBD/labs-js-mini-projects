import { Component } from "./Component";
import ComponentOptions from "./ComponentOptions";

export default interface ComponentChild {
    ComponentName: typeof Component,
    options: ComponentOptions,
    tagName: keyof HTMLElementTagNameMap
    key: string
}