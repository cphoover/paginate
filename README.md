paginate
========

A javascript implementation of "Joomla Style" pagination.

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
