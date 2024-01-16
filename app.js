function showSpinner(linkElement) {
    // show spinner
    linkElement.addEventListener('click', function () {
        var spinner = document.getElementById('loadingSpinner');
        var overlay = document.getElementById('overlay');
        spinner.classList.remove('hidden');
        overlay.style.display = 'block';

        // Simulate some asynchronous task (e.g., fetching data)
        setTimeout(function () {
            // Hide the loading spinner after the task is complete (simulate loading completion)
            spinner.classList.add('hidden');
            overlay.style.display = 'none';
        }, 2500); // Adjust the time based on your actual asynchronous task duration
    });
}

// Function to parse query string parameters from a URL
function parseQueryString(url, params) {
    var queryString = url.split('?')[1];

    if (queryString) {
        var pairs = queryString.split('&');

        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1] || '');
            params[key] = value;
        }
    }

    return params;
}

// Function to serialize an object into a query string
function serializeQueryString(params) {
    var queryString = '';

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            queryString += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
        }
    }

    return queryString.slice(0, -1); // Remove the trailing '&'
}

function mergeHopLinkParams(hopLink, linkElement) {
    // old-browser compatible code
    var allParams = {}
    parseQueryString(hopLink, allParams);
    parseQueryString(linkElement.href, allParams);
    parseQueryString(location.search, allParams);

// Serialize the combined parameters into a query string
    var queryString = serializeQueryString(allParams);

// Update the href attribute of the link element with the modified URL
    linkElement.href = hopLink.split('?')[0] + '?' + queryString;
}

/*
todo URL,URLSearchParams, not supported by older browser. find replacement lib?
 */
document.addEventListener('DOMContentLoaded', function() {
    var hopLink = window.vendorHopLink;
    console.log('vendorHopLink', hopLink);
    if (!hopLink) {
        console.error('cannot continue as no vendorHopLink specified in config.js')
        return;
    }
    var linksWithMergeParams = document.querySelectorAll('a.cta');
    // Loop over each selected element and update the href attribute
    linksWithMergeParams.forEach(function(linkElement) {
        console.log('link.href', linkElement.href);
        mergeHopLinkParams(hopLink, linkElement);
        showSpinner(linkElement);
    });
}, false);