import {getAlgoliaResults} from "@algolia/autocomplete-js";
import {ProductItem} from "../productItem/ProductItem";
import algoliasearch from "algoliasearch";


const appId = '7CI3VTUHVV';
const apiKey = 'd7185cba8ed52d76b61e0a2a17deeade';
const searchClient = algoliasearch(appId, apiKey);

export const createUserPlugin = (sourceId, indexName) => {
    return {
        getSources({ query }) {
            return [
                {
                    sourceId: sourceId,
                    getItems() {
                        if (!query) return [];
                        return getAlgoliaResults({
                            searchClient,
                            queries: [
                                {
                                    indexName: indexName,
                                    query,
                                    params: {
                                        clickAnalytics: true,
                                    },
                                },
                            ],
                        });
                    },
                    templates: {
                        item({item, components}) {
                            return <ProductItem hit={item} components={components}/>;
                        },
                    },
                },
            ];
        },
    };
}
