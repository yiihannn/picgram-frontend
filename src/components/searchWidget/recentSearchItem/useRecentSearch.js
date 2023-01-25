import {createSearchParams, useNavigate} from "react-router-dom";
import {createLocalStorageRecentSearchesPlugin} from "@algolia/autocomplete-plugin-recent-searches";
import {RecentSearchItem} from "./RecentSearchItem";


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


export function useRecentSearch() {
    const navigate = useNavigate();
    return createLocalStorageRecentSearchesPlugin({
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
                onSelect(params) {
                    const searchParams = {query: params.item.label, category: 'user'};
                    navigate({
                        pathname: 'search',
                        search: `?${createSearchParams(searchParams)}`
                    })
                },
                templates: {
                    item(params) {
                        return <RecentSearchItem params={params} source={source}/>;
                    },
                },
            };
        },
    });
}