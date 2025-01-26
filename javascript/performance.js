window.addEventListener("beforeunload", async (_event) => {
    const performance = {
        performance: {
            eventCounts: {
                size: _event.currentTarget.performance.eventCounts.size
            },
            memory: {
                jsHeapSizeLimit: _event.currentTarget.performance.memory.jsHeapSizeLimit,
                totalJSHeapSize: _event.currentTarget.performance.memory.totalJSHeapSize,
                usedJSHeapSize: _event.currentTarget.performance.memory.usedJSHeapSize
            },
            navigation: {
                redirectCount: _event.currentTarget.performance.navigation.redirectCount,
                type: _event.currentTarget.performance.navigation.type
            },
            timeOrigin: _event.currentTarget.performance.timeOrigin,
            timing: {
                connectEnd: _event.currentTarget.performance.timing.connectEnd,
                connectStart: _event.currentTarget.performance.timing.connectStart,
                domComplete: _event.currentTarget.performance.timing.domComplete,
                domContentLoadedEventEnd: _event.currentTarget.performance.timing.domContentLoadedEventEnd,
                domContentLoadedEventStart: _event.currentTarget.performance.timing.domContentLoadedEventStart,
                domInteractive: _event.currentTarget.performance.timing.domInteractive,
                domLoading: _event.currentTarget.performance.timing.domLoading,
                domainLookupEnd: _event.currentTarget.performance.timing.domainLookupEnd,
                domainLookupStart: _event.currentTarget.performance.timing.domainLookupStart,
                fetchStart: _event.currentTarget.performance.timing.fetchStart,
                loadEventEnd: _event.currentTarget.performance.timing.loadEventEnd,
                loadEventStart: _event.currentTarget.performance.timing.loadEventStart,
                navigationStart: _event.currentTarget.performance.timing.navigationStart,
                redirectEnd: _event.currentTarget.performance.timing.redirectEnd,
                redirectStart: _event.currentTarget.performance.timing.redirectStart,
                requestStart: _event.currentTarget.performance.timing.requestStart,
                responseEnd: _event.currentTarget.performance.timing.responseEnd,
                responseStart: _event.currentTarget.performance.timing.responseStart,
                secureConnectionStart: _event.currentTarget.performance.timing.secureConnectionStart,
                unloadEventEnd: _event.currentTarget.performance.timing.unloadEventEnd,
                unloadEventStart: _event.currentTarget.performance.timing.unloadEventStart
            }
        }
    };
    // await fetch("http://localhost:8000/diagnostics.php", {
    //     "method": "POST",
    //     "body": JSON.stringify(performance)
    // })
});