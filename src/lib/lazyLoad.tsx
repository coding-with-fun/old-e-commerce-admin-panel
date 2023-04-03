import { type LazyExoticComponent, Suspense } from 'react';

const lazyLoad = (
    LazyElement: LazyExoticComponent<() => JSX.Element>
): JSX.Element => {
    return (
        <Suspense fallback="Loading...">
            <LazyElement />
        </Suspense>
    );
};

export default lazyLoad;
