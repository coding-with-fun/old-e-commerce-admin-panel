import { Suspense, type LazyExoticComponent } from 'react';
import PageLoader from '../components/PageLoader';

const lazyLoad = (
    LazyElement: LazyExoticComponent<() => JSX.Element>
): JSX.Element => {
    return (
        <Suspense fallback={<PageLoader />}>
            <LazyElement />
        </Suspense>
    );
};

export default lazyLoad;
