/**
 * Get the previous data table data and remove the updated table
 *
 * @param DataTableData The current data table data in state.
 * @param removeTableId The id of the table that has updated.
 *
 * @returns {Object} The previous data table data, less the updated table.
 */
const getPreviousDataTableData = (DataTableData, removeTableId) => {
    if (typeof DataTableData !== 'object') return {};
    return Object.keys(DataTableData)
        .filter(table => table !== removeTableId)
        .reduce((obj, key) => {
            const prevObj = Object.assign({}, obj);
            prevObj[key] = DataTableData[key];
            return prevObj;
        }, {});
};

/**
 * Update Data Table Data
 *
 * Combine the updated table payload with the previous data table data.
 *
 * @param {Object} DataTableData The current data table data in state.
 * @param {Object} tableUpdate The table update payload.
 *
 * @return {Object} The new table data object.
 */
const updateDataTableData = (DataTableData, tableUpdate) => Object.assign(
    {},
    getPreviousDataTableData(DataTableData, tableUpdate.tableId),
    tableUpdate.tableData,
);

const updateState = (state, action) => ({
    DataTableData: updateDataTableData(state.DataTableData, action.payload),
});

export default updateState;
