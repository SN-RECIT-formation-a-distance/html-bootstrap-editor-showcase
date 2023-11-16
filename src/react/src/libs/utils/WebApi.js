export class HttpRequest
{
    static contentType = {
        postData: "application/x-www-form-urlencoded; charset=UTF-8",
        json: 'application/json; charset=utf-8',
        file: 'multipart/form-data'
    }
    
    static responseType = {
        text: 'text',
        json: 'json',
        octetStream: 'octet-stream'
    }

    constructor(){
        this.useCORS = false;
        this.timeout = 0; // in ms
        this.inProgress = false;

        this.onLoad = this.onLoad.bind(this);
        this.onError = this.onError.bind(this);
        this.onLoadEnd = this.onLoadEnd.bind(this);
        this.onTimeOut = this.onTimeOut.bind(this);

        this.xhr = new XMLHttpRequest();
        this.xhr.onload = this.onLoad;
        this.xhr.onerror = this.onError;
        this.xhr.onloadend = this.onLoadEnd;
        this.xhr.ontimeout = this.onTimeOut;

        this.clientOnLoad = null;
        this.clientOnError = null;
        this.clientOnLoadEnd = null
        this.contentType = null;
        this.responseDataType = null;
    }

    send(method, url, data, onSuccess, onError, onComplete, contentType, responseDataType){
        // force to await in order to execute one call at time (multiples calls causes the slowness on PHP)
        if(this.inProgress){
            setTimeout(() => this.send(method, url, data, onSuccess, onError, onComplete, contentType, responseDataType), 500);
            return;
        }
        
        this.clientOnLoad = onSuccess || null;
        this.clientOnError = onError || null;
        this.clientOnLoadEnd = onComplete || null;    
        this.contentType = contentType || HttpRequest.contentType.postData;  
        this.responseDataType = responseDataType || HttpRequest.responseType.text;
        
        this.xhr.open(method, url, true);
        this.xhr.setRequestHeader('Content-Type', contentType); // header sent to the server, specifying a particular format (the content of message body)
        this.xhr.setRequestHeader('Accept', responseDataType); // what kind of response to expect.
        
        if(this.useCORS){
            if ("withCredentials" in this.xhr) {            
                this.xhr.withCredentials = true;
            } 
           /* else if (typeof XDomainRequest !== "undefined") {
                // Otherwise, check if XDomainRequest. XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                this.xhr = new XDomainRequest();
                this.xhr.open(method, url);
            } */
            else {
                throw new Error('CORS not supported');
            }
        }
        
        // In Internet Explorer, the timeout property can only be used after the open () method has been invoked and before the send () method is called.
        if(this.timeout > 0){ 
            this.xhr.timeout = this.timeout; 
        }

        this.inProgress = true;
        this.xhr.send(data);
    }

    onLoad(event){
        if (event.target.readyState === 4) {
            if (event.target.status === 200) {
                let result = null;
        
                try{               
                    switch(this.responseDataType){
                        case HttpRequest.responseType.json: result = JSON.parse(event.target.response); break;
                        default: result = event.target.response; // text
                    }
                }
                catch(error){
                    console.log(error, this);
                }

                if(this.clientOnLoad !== null){
                    this.clientOnLoad.call(this, result);
                }
            } 
            else {
                console.error(event.target.statusText);
            }
        }
    }

    onError(event){
        if(this.clientOnError !== null){
            this.clientOnError.call(this, event.target, event.target.statusText);
        }
        else{
            console.log("Error:" + event.target);
        }
    }

    onLoadEnd(event){
        if(this.clientOnLoadEnd !== null){ 
            this.clientOnLoadEnd.call(event.target);
        }
        this.inProgress = false;
    }

    onTimeOut(event){
        alert("The request was canceled for timeout. Please try again.");
        console.log(event);
    }
};

export class WebApi
{
    constructor(gateway){
        this.gateway = gateway;
        this.http = new HttpRequest();
        this.domVisualFeedback = null;

        this.post = this.post.bind(this);
        this.onError = this.onError.bind(this);
        this.onComplete = this.onComplete.bind(this);
    }
    
    onError = function (jqXHR, textStatus) {
        alert("Error on server communication ("+ textStatus +").\n\nSee console for more details");
        console.log(jqXHR);
    };
    
    post(url, data, callbackSuccess, callbackError, showFeedback){
        showFeedback = (typeof showFeedback === 'undefined' ? true : showFeedback);
        
        if(showFeedback){
            this.showLoadingFeedback();
        }
        
        callbackError = callbackError || this.onError;
        //data.sesskey = M.cfg.sesskey;
        data = JSON.stringify(data);

        this.http.send("post", url, data, callbackSuccess, callbackError, this.onComplete, HttpRequest.contentType.json, HttpRequest.responseType.json);
    }

    onComplete(){
        this.hideLoadingFeedback();
    }

    showLoadingFeedback(){
        if(this.domVisualFeedback === null){ return; }
        this.domVisualFeedback.style.display = "block";
    }

    hideLoadingFeedback(){
        if(this.domVisualFeedback === null){ return; }
        this.domVisualFeedback.style.display = "none";
    }
}
