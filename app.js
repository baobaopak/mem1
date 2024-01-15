/*
todo URL,URLSearchParams, not supported by older browser. find replacement lib?
 */
document.addEventListener('DOMContentLoaded', function() {
    // Select all anchor elements with the attribute 'merge-url-params'
    // import(window.homePath + '/config.js')
    //     .then(configModule => {
    // Now you can use properties from the imported module
    let hopLink = window.vendorHopLink;
    console.log('vendorHopLink', hopLink);
    if (!hopLink) {
        console.error('cannot continue as no vendorHopLink specified in config.js')
        return;
    }
    let linksWithMergeParams = document.querySelectorAll('a.cta');
    // Loop over each selected element and update the href attribute
    linksWithMergeParams.forEach(function(link) {
        console.log('link.href', link.href);
        let allParams = new URLSearchParams();
        new URL(hopLink).searchParams.forEach(function (value, key) {
            // cmc_vid from vendor hoplink will be replaced later
            allParams.set(key, value);
        })
        new URL(link.href).searchParams.forEach(function(value, key) {
            //this contains cmc replaced cmc_vid
            allParams.set(key, value);
        });
        new URLSearchParams(location.search).forEach(function (value, key) {
            // params from current URL
            allParams.set(key, value);
        })
        let finalUrl = new URL(hopLink);
        finalUrl.search = allParams.toString();
        link.href = finalUrl.toString();
        console.log('final URL', finalUrl.toString())
    });
    // })
    // .catch(error => {
    //     console.error('Error loading config:', error);
    // });
}, false);

/*
//todo flickering when this runs
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /!* Loop through a collection of all HTML elements: *!/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /!*search for elements with a certain atrribute:*!/
        file = elmnt.getAttribute("include-html-file");
        if (file) {
            /!* Make an HTTP request using the attribute value as the file name: *!/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /!* Remove the attribute, and call this function once more: *!/
                    elmnt.removeAttribute("include-html-file");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /!* Exit the function: *!/
            return;
        }
    }
}*/
