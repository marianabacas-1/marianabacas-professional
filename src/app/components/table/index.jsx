import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SearchBar from "./searchBar";
import SectionTitle from "../sectionTitle";

export default function Table({ className = "", columns, onChangePage, data, sectionTitle, noDataComponent, withoutShadow, children, ...rest }) {
    const [searchableColumns, setSearchableColumns] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [typeValue, setTypeValue] = useState(searchableColumns[0]?.name); 
    const [dataFiltered, setDataFiltered] = useState(data);

    const getCurrentFilteringColumn = () => columns.filter(column => column.name === typeValue)[0];

    useEffect(() => {
        if (searchValue !== "") {
            const currentFilteringColumn = getCurrentFilteringColumn();
            const byAllFields = currentFilteringColumn === undefined;
            
            if (byAllFields) {
                setDataFiltered(data.filter(d => {
                    const fields = searchableColumns.map(column => "selector" in column ? column.selector(d) : null);
                    // Combinar valores de campos relacionados
                    const combinedValues = fields
                        .filter(value => value != null && value !== undefined && value !== '' && typeof value === 'string')
                        .map(value => value.toLowerCase());
                    
                    // Buscar en combinaciones de campos
                    const searchLower = searchValue.toLowerCase();
                    const searchWords = searchLower.split(' ').filter(word => word.trim() !== '');
                    
                    // Buscar en cada campo individualmente
                    const individualMatch = combinedValues.some(value => 
                        value.includes(searchLower)
                    );
                    
                    // Buscar en combinaciones de campos
                    const combinedMatch = combinedValues.some(value => 
                        // Verificar si el valor contiene todas las palabras de búsqueda
                        searchWords.every(word => 
                            value.includes(word)
                        )
                    );
                    
                    // Buscar en todas las combinaciones posibles
                    const allCombinationsMatch = searchWords.length > 1 && 
                        combinedValues.some(value => 
                            // Verificar cada combinación posible
                            searchWords.every(word => 
                                value.includes(word)
                            )
                        );
                    
                    return individualMatch || combinedMatch || allCombinationsMatch;
                }));
            } else {
                const columnSelector = currentFilteringColumn.selector;
                if (typeof columnSelector !== "function")
                    throw Error(`The column ${currentFilteringColumn.name} has no selector defined`);
                setDataFiltered(data.filter(d => {
                    const dataValue = columnSelector(d);
                    if (dataValue === null)
                        return false;
                    return dataValue.toLowerCase().includes(searchValue.toLowerCase());
                }));
            }
        } else {
            setDataFiltered(data);
        }
    }, [data, searchValue, typeValue, searchableColumns]);

    useEffect(() => {
        const searchableColumns = columns.filter(column => "searchable" in column && column.searchable);
        searchableColumns.unshift({ name: "Todo", searchable: true });
        setSearchableColumns(searchableColumns);
        setTypeValue("Todo")
    }, [columns]);
    
    return(
        <div className={`${withoutShadow ? "border-l border-r" : "shadow-secondarySh"} bg-secondary rounded-lg`}>
            {/*<SectionTitle text={sectionTitle} />*/}
            <div>{children}</div>
            {searchableColumns.length > 0 && <SearchBar
                searchValue={searchValue}
                onChangeSearch={setSearchValue}
                typeValue={typeValue}
                onChangeType={setTypeValue}
                searchableColumns={searchableColumns}
            />}
              <div className="datatable-wrapper-reverse">
                <DataTable
                className={`${className}`}
                columns={columns}
                data={dataFiltered}
                noDataComponent={noDataComponent}
                onChangePage={onChangePage}
                paginationComponentOptions={{ rowsPerPageText: 'Filas por pagina:', rangeSeparatorText: 'de', noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: 'Todo' }}
                pagination paginationRowsPerPageOptions={[5, 10, 25, 50]}
                {...rest}
            />
              </div>
        </div>
    );
} 
