export function ProductItem({ hit, components }) {
    return (
        <a href={hit.url} className="aa-ItemLink">
            <div className="aa-ItemContent">
                <div className="aa-ItemTitle">
                    <components.Highlight hit={hit} attribute="first_name"/>
                    <span> </span>
                    <components.Highlight hit={hit} attribute="last_name"/>
                </div>
            </div>
        </a>
    );
}
