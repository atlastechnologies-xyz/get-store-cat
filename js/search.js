
function initSearch () {

    // console.log('initSearch Ran')

    $.getJSON('/map.json', function(data){

        console.log('got map data', data)

        window.searchData = data;

        window.searchIndex = lunr(function () {
            // console.log('initializing lunr')

            this.ref('id')
            this.field('summary')
            this.metadataWhitelist = ['title', 'summary', 'permalink']
            // this.field('title')
            
            z = 0;
            data.extensions.forEach(function (doc) {
              doc.id = 'extensions-' + z
              this.add(doc)
              z++
            }, this)

            y = 0
            data.integrations.forEach(function (doc) {
                doc.id = 'integrations-' + y
                this.add(doc)
                y++
              }, this)
  
          })

    })
    .done(function(result) {
        // console.log( "second success", result );
      })
    .fail(function(error) {
        // console.log( "error", error );
    })
    .always(function() {
        // console.log( "complete" );
    });
}

if ( typeof ( window.searchData ) === "undefined" ) {
        console.log('found window.searchData uninitialized, initializing now')
        initSearch();
    }
// function toggleDisplaySearchLightbox () {

//     if ( document.getElementById('searchLightbox').className.split('d-none').length > 1 ) {

//         if ( typeof ( window.searchData ) === "undefined" ) {
//             // console.log('found window.searchData uninitialized, initializing now')
//             initSearch();
//         }

//         closeOtherLightboxBeforeOpening () 
//         showLightboxShadow()
//         document.getElementById('searchLightbox').className = document.getElementById('searchLightbox').className.split('d-none').join('')

//     } else {
//         document.getElementById('searchLightbox').className = document.getElementById('searchLightbox').className + ' d-none'
//     }
     
// }

function displayNoResultsMessage ( searchContainer, searchTerm ) {
    
    var container = document.getElementById(searchContainer)
    deleteAllSearchResults(container)
    var span = document.createElement('span')
        span.textContent = "No results for '" + searchTerm + "' "
        span.className = "loading"

    document.getElementById(searchContainer).appendChild(span)
}

function refreshSearchResults (searchResultsContainer, searchInput) {
    
    if ( typeof (window.searchData) != "undefined") {
        var searchTerm = document.getElementById(searchInput).value;
        var searchResult = window.searchIndex.search(searchTerm)

        if ( 1 > searchResult.length ) {
            displayNoResultsMessage ( searchResultsContainer, searchTerm )
        } else {
            displaySearchResults(searchResult, searchResultsContainer);
        }
        
    } else {
        alert('Error fetching search index. Please contact support.')
    }
}

function displaySearchResults (results, container) {

    var resultsContainer = document.getElementById(container);

    deleteAllSearchResults(resultsContainer)

    for ( var i = 0; i < results.length; i++ ) {

        var record = lookupResultRecord(results[i])
        addResultToResultsContainer (resultsContainer, record)

    }

}

function deleteAllSearchResults (container) {
    var child = container.lastElementChild;  
    while (child) { 
        container.removeChild(child); 
        child = container.lastElementChild; 
    } 
    // displayNoResultsMessage(container, document.getElementById('searchInput').value)
}

function addResultToResultsContainer (container, data) {

    var cntr = document.createElement('div')
        cntr.className = 'container row integrationPreview'

    var link = document.createElement('a')
        link.className = ""
        link.target = "_blank"
        link.href = data.link

    // var imgCntr = document.createElement('div')
    //     imgCntr.className = 'col-sm-4'
        
    var img = document.createElement('img')
    
    if ( typeof(data.image) != "undefined" ) {
        img.src = "/img/" + data.image
    } else {
        img.src = "/img/logo.jpg"
    }

    // imgCntr.appendChild(img)
    link.appendChild(img)
        
    // var summary = document.createElement('span')
    //     summary.className = "summary"
    //     summary.textContent = removeHTMLEntities(data.summary)

    // var row = document.createElement('div')
    //     row.className = "row"

    // var infoContainer = document.createElement('div')
    //     infoContainer.className = "col-sm-8"

    var title = document.createElement('h1')
        title.className = "title"
        title.textContent = removeHTMLEntities(data.title)

    // var score = document.createElement('span')
    //     score.className = "score"
    //     score.textContent = data.score


    link.appendChild(title)
    // row.appendChild(imgCntr)

    // infoContainer.appendChild(title)
    // infoContainer.appendChild(summary)
    // infoContainer.appendChild(score)
    // row.appendChild(infoContainer)
    
    // link.appendChild(imgCntr)
    // cntr.appendChild(link)
    container.appendChild(link)

}

function lookupResultRecord (searchResult) {

    var sp = searchResult.ref.split('-');

    record = window.searchData[sp[0]][sp[1]]
    record.score = searchResult.score

    return record;

}

function cancelSearch () {
    // document.getElementById('searchLightbox').className = document.getElementById('searchLightbox').className + " d-none"
}

function removeHTMLEntities (string) {
    console.log('removing HTML entitites from ', string)
    return decodeURI(string.replace('&amp;','&'));
}