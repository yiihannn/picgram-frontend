import {autocomplete} from '@algolia/autocomplete-js';
import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import Box from "@mui/material/Box";
import { createAlgoliaInsightsPlugin } from '@algolia/autocomplete-plugin-algolia-insights';
import insightsClient from 'search-insights';
import {createUserPlugin} from "../plugins/userPlugin";
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';


const appId = '7CI3VTUHVV';
const apiKey = 'd7185cba8ed52d76b61e0a2a17deeade';

insightsClient('init', { appId, apiKey, useCookie: true });

const algoliaInsightsPlugin = createAlgoliaInsightsPlugin({ insightsClient });
const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
    key: 'navbar',
    limit: 3
});
const userPlugin = createUserPlugin('users', 'photo_sharing_user_dev');



export function SearchAutoComplete(props) {
    const containerRef = useRef(null);
    const panelRootRef = useRef(null);
    const rootRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) {
            return undefined;
        }

        const search = autocomplete({
            container: containerRef.current,
            placeholder: 'Search...',
            openOnFocus: true,
            renderer: { createElement, Fragment, render: () => {} },
            render({ children }, root) {
                if (!panelRootRef.current || rootRef.current !== root) {
                    rootRef.current = root;

                    panelRootRef.current?.unmount();
                    panelRootRef.current = createRoot(root);
                }

                panelRootRef.current.render(children);
            },
            plugins: [algoliaInsightsPlugin, recentSearchesPlugin, userPlugin],
            ...props,
        });


        return () => {
            search.destroy();
        };
    }, [props]);

    return <Box ref={containerRef} width="100%"/>;
}
