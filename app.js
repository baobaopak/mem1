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
        // merge hoplink params
        var allParams = new URLSearchParams();
        new URL(hopLink).searchParams.forEach(function (value, key) {
            // cmc_vid from vendor hoplink will be replaced later
            allParams.set(key, value);
        })
        new URL(linkElement.href).searchParams.forEach(function(value, key) {
            //this contains cmc replaced cmc_vid
            allParams.set(key, value);
        });
        new URLSearchParams(location.search).forEach(function (value, key) {
            // params from current URL
            allParams.set(key, value);
        })
        var finalUrl = new URL(hopLink);
        finalUrl.search = allParams.toString();
        linkElement.href = finalUrl.toString();
        console.log('final URL', finalUrl.toString());

        // show spinner
        linkElement.addEventListener('click', function() {
            var spinner = document.getElementById('loadingSpinner');
            var overlay = document.getElementById('overlay');
            spinner.classList.remove('hidden');
            overlay.style.display = 'block';

            // Simulate some asynchronous task (e.g., fetching data)
            setTimeout(function() {
                // Hide the loading spinner after the task is complete (simulate loading completion)
                spinner.classList.add('hidden');
                overlay.style.display = 'none';
            }, 2500); // Adjust the time based on your actual asynchronous task duration
        });
    });
}, false);