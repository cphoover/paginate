;
Paginator = function(_selector, _paginationSelector, _options){
    
    _options = typeof _options === "object" ? _options : {};

/*      
 * Testing callbacks
 */

/*
    _options.onInit    = function(){console.log('initialized');};
    _options.onBefore  = function(){console.log('Before page change');};
    _options.onAfter   = function(){console.log('After page change');};
*/

    //         
    this.initialized = false;

    //config                                                                        //default values
    this.pagerClass = typeof _options.pagerClass === "string" ? _options.pagerClass : "paginate";
    this.numItems   = typeof _options.numItems   === "number" ? _options.numItems   : 10;
    this.activePage = typeof _options.activePage === "number" ? _options.activePage : 1;
    this.perPage    = typeof _options.perPage    === "number" ? _options.perPage    : 5;
    
    //callbacks
    this.onInit      = typeof _options.onInit   === "function" ? _options.onInit    : false;  //fires after the pagination has been created
    this.onBefore    = typeof _options.onBefore === "function" ? _options.onBefore  : false;  //fires before the page is changed
    this.onAfter     = typeof _options.onAfter  === "function" ? _options.onAfter   : false;  //fires after the page is changed
   
    //@todo implement these callbacks
//  this.onStart     = typeof _options.onStart  === "function" ? _options.onStart   : false;  //fires after the pagination has set the active page to the first slide
//  this.onEnd       = typeof _options.onEnd    === "function" ? _options.onEnd     : false;  //fires after the pagination has set the active page to the last slide
    
    this.articlesContainer   = document.getElementById(_selector);
    this.paginationContainer = document.getElementById(_paginationSelector);

    this.pages = new Array();

    this.init();
};

Paginator.prototype.addEvent = function( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj['e'+type+fn] = fn;
    obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
    obj.attachEvent( 'on'+type, obj[type+fn] );
  } else
    obj.addEventListener( type, fn, false );
}

Paginator.prototype.removeEvent = function( obj, type, fn ) {
  if ( obj.detachEvent ) {
    obj.detachEvent( 'on'+type, obj[type+fn] );
    obj[type+fn] = null;
  } else
    obj.removeEventListener( type, fn, false );
}

Paginator.prototype.setHandlers = function(){
        var self = this;
        this.addEvent(this.paginationContainer, 'click', function(e){
                        var linkContents = (e.target || e.srcElement).innerHTML.replace(/(<([^>]+)>)/ig,"");

                        if(linkContents === 'Start'){
                                self.setActivePage(1);
                                return true;
                        }

                        if(linkContents === "End"){
                                self.setActivePage(self.pages.length);
                                return true;
                        }
                        
                        var newPage =parseInt(linkContents);                       

                        if(!isNaN(newPage)) self.setActivePage(newPage);

                        return true;
        });
};

Paginator.prototype.chunk = function(arr, len) {
   
   // convert what we are passed to array if it is not one (ex. nodeList, string... etc)
   if(!(arr instanceof Array)){
        tempArray = new Array();
        for(var i=0; i<arr.length; i++){
                tempArray[i] = arr[i];
        }
        arr = tempArray;
   }

  var chunks = [],
      i = 0,
      n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }

  return chunks;
};

Paginator.prototype.createItem = function(_contents, _class){
        var classStr = (typeof _class !== "undefined" && _class != "") ? _class : false;
        var item = document.createElement('li');

        if(classStr) item.className = classStr;

        var link = document.createElement('a');
        link.innerHTML = _contents;
        item.appendChild(link);
        return item;
};

//@todo refactor the shit out of this stinky ass function.
Paginator.prototype.displayPagination = function(){
        //if there is isn't more than 1 page we don't need to show the pager.
        if(this.pages.length <= 1){
                 this.paginationContainer.innerHTML = ""
                return true;
        };

        var numPageLinks = (this.pages.length < this.numItems) ? this.pages.length : this.numItems;

        var pager = document.createElement('ul');
        //@todo make this a configurable option
        pager.className = this.pagerClass;

        var middle = Math.round(numPageLinks / 2);

        var left =  numPageLinks;

 
        var counter=0;
        var start = (this.activePage - middle);
        //beginning
        while( counter  < middle){
                var pageNum =  (this.activePage - (middle - counter));
                var tehPage = this.pages[pageNum - 1] ;
                if(typeof tehPage !== "undefined"){
                        //append it to the pager list
                        pager.appendChild(this.createItem(pageNum));
                        left --;
                }
                counter++;

        }
        //append to pager
        pager.appendChild(this.createItem(this.activePage, 'active'));
        left --;

        //end
        var counter = 1;
        while(left > 0){
               var pageNum =  (this.activePage + counter); 
               var tehPage = this.pages[pageNum - 1] ;
               // if the specified page doesn't exist break from the loop
               if(typeof tehPage === "undefined") break;
               pager.appendChild(this.createItem(pageNum)); 
               left --;
               counter ++;

        }

        //leftovers...
        var counter = start -1;
        while(left > 0){
                var tehPage = this.pages[counter] ;  
                if(typeof tehPage === "undefined") break;
                        pager.insertBefore(this.createItem(counter), pager.firstChild);

                counter --;
                left --;

        }

        pager.appendChild(this.createItem('End', 'text-link'));
        pager.insertBefore(this.createItem('Start', 'text-link'), pager.firstChild);

        var tempPaginationContainer = document.createElement('div');
        tempPaginationContainer.appendChild(pager);        

        this.paginationContainer.innerHTML = tempPaginationContainer.innerHTML;
}


Paginator.prototype.init = function(){
    this.generatePages();
    this.displayActivePage();
    this.displayPagination();
    this.setHandlers();
    this.initialized = true;
  
    if(this.onInit){ this.onInit(); }
};

Paginator.prototype.setActivePage = function(_pageNum){
    if(typeof _pageNum === "number"){
        var pageNum = parseInt(_pageNum);
        if(typeof this.pages[pageNum - 1] === "undefined") throw "Page #" + pageNum + " does not exist.";
        
        
        if(this.onBefore){ this.onBefore(); }
        
        this.deactivatePage();
        this.activePage = parseInt(pageNum);
        this.displayPagination();
    }

    else{
        throw "Invalid Argument Provided for _pageNum, must be a number.";
    }

    this.displayActivePage();
    return true;
};

Paginator.prototype.deactivatePage = function(){
    this.pages[this.activePage - 1].className = this.pages[this.activePage - 1].className.replace('active', 'inactive');
};

Paginator.prototype.displayActivePage = function(){
    this.pages[this.activePage - 1].className = this.pages[this.activePage - 1].className.replace('inactive', 'active');
    if(this.initialized && this.onAfter){this.onAfter();}
};


Paginator.prototype.generatePages = function(){
    //generate pages
    var articles = this.articlesContainer.children;
    var pageChunks = this.chunk(articles, this.perPage);

    for(var i = 0; i < pageChunks.length; i ++){
                var page = document.createElement('div');
                page.className = 'page inactive';
                for(var a = 0; a < pageChunks[i].length; a ++){
                        page.appendChild(pageChunks[i][a]);
                }

                this.articlesContainer.appendChild(page);
                this.pages.push(page);
        }

};


