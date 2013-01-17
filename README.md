paginate
========

A javascript implementation of "Joomla Style" pagination.

    new Paginator(_selector, _paginationSelector, _options);
    
Paramaters
-------------
<table border=1>
  <tbody>
    <!-- Results table headers -->
    <tr>
      <th>paramater</th>
      <th>type</th>
      <th>description</th>
      <th>example</th>
    </tr>
    <tr>
      <td>_selector</td>
      <td>string</td>
      <td>ID of the container of your articles/entities to be paginated</td>
      <td>"articles"</td>
    </tr>
    <tr>
      <td>_paginationSelector</td>
      <td>string</td>
      <td>ID of the container element for pagination. (ID of the element that page links will be displayed in)</td>
      <td>"article-pagination"</td>
    </tr>
    <tr>
      <td>_options</td>
      <td>object</td>
      <td>configurable options for pager instance (see below)</td>
      <td width="400">{ 
                <br>
                    &nbsp;&nbsp;&nbsp;&nbsp;perPage &nbsp;: 10,
                <br>
                    &nbsp;&nbsp;&nbsp;&nbsp;onInit    &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;:  function(){  alert('pagination initialized'); },
                <br>
                    &nbsp;&nbsp;&nbsp;&nbsp;onBefore : function(){  alert('page bout to change'); },
                <br>
                    &nbsp;&nbsp;&nbsp;&nbsp;onAfter  &nbsp;&nbsp; : function(){  alert('page changed'); }
                <br>
          }
      </td>
     
    </tr>
  </tbody>
</table>

Simple Usage Example
-------------
    var pagination = new Paginator('list','pagination', {onAfter: pageChanged );

Configurable Options
-------------

<table border=1>
  <tbody>
    <!-- Results table headers -->
    <tr>
      <th>option</th>
      <th>type</th>
      <th>description</th>
      <th>default</th>
    </tr>
    <tr>
      <td>pagerClass</td>
      <td>string</td>
      <td>change the class attribute of the pager list element.</td>
      <td>"paginate"</td>
    </tr>
    <tr>
      <td>numItems</td>
      <td>number</td>
      <td>change the number of links in the pager</td>
      <td>10</td>
    </tr>
    <tr>
      <td>activePage</td>
      <td>number</td>
      <td>sets the starting page of the pager</td>
      <td>1</td>
    </tr>
    <tr>
      <td>perPage</td>
      <td>number</td>
      <td>sets the maximum number of articles/children for each page</td>
      <td>5</td>
    </tr>
    <tr>
      <td>onInit</td>
      <td>function</td>
      <td>callback function which is fired after the pager is initialized and set up.</td>
      <td>false</td>
    </tr>
    <tr>
      <td>onBefore</td>
      <td>function</td>
      <td>callback function which is fired before the active page is changed after a user event is fired.</td>
      <td>false</td>
    </tr>
    <tr>
      <td>onAfter</td>
      <td>function</td>
      <td>callback function which is fired after the active page has been changed.</td>
      <td>false</td>
    </tr>
  </tbody>
</table>

Todo
-------------
* add callbacks for when page is changed to start and end
* simplify the displayPagination function
* add ability to save state with jquery bbq.
