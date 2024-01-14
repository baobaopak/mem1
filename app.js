var UrlUtils = UrlUtils || {};
UrlUtils.getURLParameters = function (url) {
    var paramsStr = url.split('?', 2);
    if (paramsStr.length < 2) return [];
    var params = [], search = /([^&=]+)=?([^&]*)/g, query = paramsStr[1];
    while (match = search.exec(query)) {
        if (match.length >= 1) {
            params.push({key: match[1], value: match[2],})
        }
    }
    return params
};
UrlUtils.generateUrlWithParams = function (url, data) {
    if (!url) return '';
    var params = [], urlObj = url.split('?', 1)[0];
    data.forEach(function (dataItem) {
        params.push(dataItem.key + '=' + dataItem.value)
    });
    return params.length ? urlObj + '?' + params.join('&') : url
};
UrlUtils.getUrlWithoutAnchors = function (url) {
    var urlAndAnchor = url.split('#', 1);
    return urlAndAnchor[0]
};
UrlUtils.getAnchorName = function (url) {
    var urlAndAnchor = url.split('#', 2);
    return urlAndAnchor.length > 1 ? '#' + urlAndAnchor[1] : ''
};
//todo simplify
UrlUtils.mergeUrlWithRequestParams = function (url) {
    var urlWithoutAnchors = UrlUtils.getUrlWithoutAnchors(url);
    var elementAnchor = UrlUtils.getAnchorName(url);
    var urlParams = UrlUtils.getURLParameters(location.search);
    var urlAnchor = location.hash;
    var localParameters = UrlUtils.getURLParameters(urlWithoutAnchors);
    localParameters = localParameters.concat(urlParams);
    var resultUrl = UrlUtils.generateUrlWithParams(urlWithoutAnchors, localParameters);
    var anchor = elementAnchor ? elementAnchor : urlAnchor;
    return resultUrl + anchor
};

document.addEventListener('DOMContentLoaded', function() {
    // Select all anchor elements with the attribute 'merge-url-params'
    var linksWithMergeParams = document.querySelectorAll('a[merge-url-params]');

    // Loop over each selected element and update the href attribute
    linksWithMergeParams.forEach(function(link) {
        link.href = UrlUtils.mergeUrlWithRequestParams(link.href);
    });
}, false);

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html-file");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("include-html-file");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}