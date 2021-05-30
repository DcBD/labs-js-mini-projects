import { Component } from "./Component";


export default interface ComponentChild {
    ComponentName: typeof Component,
    props: any
}