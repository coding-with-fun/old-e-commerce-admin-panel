import React, { Suspense } from 'react';

const lazyLoad = (
    LazyElement: React.LazyExoticComponent<() => JSX.Element>
): JSX.Element => {
    return (
        <Suspense fallback="Loading...">
            <LazyElement />
        </Suspense>
    );
};

export default lazyLoad;
