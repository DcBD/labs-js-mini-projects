import AppComponent from "./common/components/AppComponent";

export class App {

    /**
     * Creates an instance of an app.
     */
    constructor() {
        this.render();
    }


    private render = () => {
        const root = document.getElementById("root");

        new AppComponent("div", {
            key: "app",
            parentNode: root,

        }, [

        ]);
    }


}