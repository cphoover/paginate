

Paginator = function(_selector, _paginationSelector){
    this.numItems = 10;
    this.articlesContainer = document.querySelector(_selector);
    this.paginationContainer = document.querySelector(_paginationSelector);
    this.activePage = 1;
    this.perPage = 5;
    this.pages = new Array();

    this.init();
}

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
        this.addEvent(document.querySelector('#article-pagination'), 'click', function(e){
                        var linkContents = e.target.innerHTML.replace(/(<([^>]+)>)/ig,"");

                        if(linkContents == 'Start'){
                                self.setActivePage(1);
                                return true
                        }

                        if(linkContents == "End"){
                                self.setActivePage(self.pages.length);
                                return true;
                        }

                        self.setActivePage(parseInt(linkContents));
                        return true;
        })
};

Paginator.prototype.chunk = function(arr, len) {
   arr = Array.prototype.slice.call(arr);

  var chunks = [],
      i = 0,
      n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }

  return chunks;
}

Paginator.prototype.createItem = function(_contents, _class){
        var classStr = (typeof _class != "undefined" && _class != "") ? _class : false;
        var item = document.createElement('li');

        if(classStr) item.className = classStr;

        var link = document.createElement('a');
        link.innerHTML = _contents;
        item.appendChild(link);
        return item;
}

//@todo refactor the shit out of this stinky ass function.
Paginator.prototype.displayPagination = function(){
        var numPageLinks = (this.pages.length < this.numItems) ? this.pages.length : this.numItems;

        var pager = document.createElement('ul');

        var middle = Math.round(numPageLinks / 2);

        var left =  numPageLinks;

 
        var counter=0;
        var start = (this.activePage - middle);
        //beginning
        while( counter  < middle){
                var pageNum =  (this.activePage - (middle - counter));
                var tehPage = this.pages[pageNum - 1] ;
                if(typeof tehPage != "undefined"){
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
               if(typeof tehPage == "undefined") break;
               pager.appendChild(this.createItem(pageNum)); 
               left --;
               counter ++;

        }

        //leftovers...
        var counter = start -1;
        while(left > 0){
                var tehPage = this.pages[counter] ;  
                if(typeof tehPage == "undefined") break;
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
}

Paginator.prototype.setActivePage = function(_pageNum){
    if(typeof _pageNum == "number"){
        var pageNum = parseInt(_pageNum);
        if(typeof this.pages[pageNum - 1] == "undefined") throw "Page #" + pageNum + " does not exist.";
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
}


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


