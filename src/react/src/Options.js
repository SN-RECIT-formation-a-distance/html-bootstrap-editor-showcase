
import packageJson from "../package.json";

export class Options
{
    static appName(){ return packageJson.description; }
    
    static appVersion(){ return packageJson.version; }

    static appTitle(){
        return this.appName() + " | v" + this.appVersion();
    }

    static getGateway(){
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') { 
            return 'http://devserver/shared/new-showcase/templates/';
        }
        else{
            return 'https://sn-recit-formation-a-distance.github.io/new-showcase/';
        }
    }
}