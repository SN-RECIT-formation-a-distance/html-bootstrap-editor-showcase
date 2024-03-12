export class TagLang{
    constructor(name, en, fr){
        this.name = name;
        this.en = en;
        this.fr = fr;
    }
};

/**
 * Internationalization and localization
 */
export class I18n{
    static languageList = [
        { "text": "English", "value": "en", "locale": "en-ca" },
        { "text": "Français", "value": "fr", "locale": "fr" }
    ]; 

    constructor(){
        this.tagTable = []; // all tags (array)
        this._tags = {}; // current tags (object)
        this.lang = 'en';
        this._currency = "$";
    }
    
    get tags(){return this._tags;}
    get locale(){return I18n.languageList.nxGetItem("value",this.lang).locale;}
    get currency(){ return this._currency; }
    
    getLanguageList(options){
        return I18n.languageList;
    }

    eraseAll(){
        this.tagTable = [];
        this._tags = {};
    }

    setLang(lang){
        this.lang = lang;
        this.loadTags();
    }

    getLangDesc(){return I18n.languageList.nxGetItem("value", this.lang).text}

    addTag(name, en, fr){
        this.tagTable.push(new TagLang(name, en, fr));
    }

    translateTo(name, lang){
        let tag = this.tagTable.nxGetItem("name", name, null);
        return (tag === null ? "" : tag[lang]);
    }

    loadTags(){
        this._tags = {};
        for(let tag of this.tagTable){
            this._tags[tag.name] = tag[this.lang];
        }
    }
};

