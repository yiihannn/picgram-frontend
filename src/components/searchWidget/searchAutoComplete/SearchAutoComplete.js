import {autocomplete} from '@algolia/autocomplete-js';
import React, {createElement, Fragment, useEffect, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import Box from "@mui/material/Box";
import {createAlgoliaInsightsPlugin} from '@algolia/autocomplete-plugin-algolia-insights';
import insightsClient from 'search-insights';
import {createUserPlugin} from "../plugins/userPlugin";
import {createLocalStorageRecentSearchesPlugin} from '@algolia/autocomplete-plugin-recent-searches';
import {createSearchParams, useNavigate} from "react-router-dom";


const appId = '7CI3VTUHVV';
const apiKey = 'd7185cba8ed52d76b61e0a2a17deeade';

insightsClient('init', {appId, apiKey, useCookie: true});

const algoliaInsightsPlugin = createAlgoliaInsightsPlugin({insightsClient});

function highlight({item, query}) {
    return {
        ...item,
        _highlightResult: {
            query: {
                value: query
                    ? item.label.replace(
                        new RegExp(query, 'g'),
                        `<span class='underline'>aa-highlight</span>${query}<span class='underline'>/aa-highlight</span>`
                    )
                    : item.label,
            },
        },
    };
}

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
    key: 'navbar',
    limit: 3,
    search({query, items, limit}) {
        if (!query) {
            return items.slice(0, limit).map((item) => highlight({item, query}));
        }

        return items
            .filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
            .slice(0, limit)
            .map((item) => highlight({item, query}));
    },
    transformSource({source}) {
        return {
            ...source,
            getItemUrl({item}) {
                return `/search?query=${item.query}`;
            },
            templates: {
                item(params) {
                    const {item, html} = params;
                    // onclick()
                    return html`<a class="aa-ItemLink" href="/search?query=${item.label}&category=user">
                        ${source.templates.item(params).props.children}
                    </a>`;
                },
            },
        };
    },
});

const userPlugin = createUserPlugin('users', 'photo_sharing_user_dev');


export function SearchAutoComplete(props) {
    const containerRef = useRef(null);
    const panelRootRef = useRef(null);
    const rootRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!containerRef.current) {
            return undefined;
        }

        const search = autocomplete({
            container: containerRef.current,
            placeholder: 'Search...',
            openOnFocus: true,
            onSubmit(params) {
                const searchParams = {query: params.state.query, category: 'user'};
                navigate({
                    pathname: 'search',
                    search: `?${createSearchParams(searchParams)}`
                })
            },
            renderer: {
                createElement, Fragment, render: () => {
                }
            },
            render({children}, root) {
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
    }, [props, navigate]);

    return <Box ref={containerRef} width="100%"/>;
}
