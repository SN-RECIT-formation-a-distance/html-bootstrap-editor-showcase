import {WebApi as AWebApi} from '../libs/utils/WebApi';
import {JsNx} from '../libs/utils/Utils';
import { Options } from '../Options';

export class WebApi extends AWebApi
{    
    constructor(){
        super(Options.getGateway());
                
        this.http.useCORS = true;
        this.sid = 0;
        this.observers = [];
        this.http.timeout = 30000; // 30 secs
    }

    addObserver(id, update, observables){
        this.observers.push({id:id, update:update, observables: observables});
    }

    removeObserver(id){
        JsNx.removeItem(this.observers, "id", id);
    }

    notifyObservers(observable){
        for(let o of this.observers){
            if(o.observables.includes(observable)){
                o.update();
            }
        }
    }

    getTemplates(onSuccess){
        this.get(`${this.gateway}data.json`, null, onSuccess);
    }
};
