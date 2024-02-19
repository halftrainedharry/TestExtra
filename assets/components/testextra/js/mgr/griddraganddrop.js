/**
 * This code is copied from the extra "Collections" (https://github.com/modxcms/Collections)
 * It makes sure that the current sort order of the grid is correct and that the data in the grid isn't filtered.
*/

Ext.ux.dd.GridReorderDropTarget = function(grid, config) {
    this.target = new Ext.dd.DropTarget(grid.getEl(), {
        ddGroup: grid.ddGroup || 'GridDD',
        grid: grid,
        sortCol: 'menuindex',
        gridDropTarget: this,
        notifyDrop: function(dd, e, data){
            if (!data.grid.parseSortField) {
                data.grid.parseSortField = function (value) {return value;}
            }

            if (!data.grid.parsePermanentSort) {
                data.grid.parsePermanentSort = function (value) {return false;}
            }

            // Check if the grid is sorted correctly?
            if (data.grid.parseSortField(data.grid.config.baseParams.sort) != this.sortCol) {
                // The default sort column of the GetList processor is different than the sort column for the dragdrop
                if (data.grid.store.sortInfo == undefined || data.grid.parseSortField(data.grid.store.sortInfo.field) != this.sortCol) { // sortInfo = { field: "position", direction: "ASC" }
                    return false;
                }
            } else {
                if (data.grid.store.sortInfo != undefined && data.grid.parseSortField(data.grid.store.sortInfo.field) != this.sortCol) {
                    return false;
                }
            }

            if (data.grid.parsePermanentSort(this.sortCol)) {
                return false;
            }

            // Check if the search field and filter comboboxes are empty?
            var search = Ext.getCmp('collections-child-search');
            var filter = Ext.getCmp('collections-grid-filter-status');
            if (search != undefined && filter != undefined) {
                if (search.getValue() != '' || filter.getValue() != '') {
                    return false;
                }
            }

            // determine the row
            var t = Ext.lib.Event.getTarget(e);
            var rindex = this.grid.getView().findRowIndex(t);
            if (rindex === false) return false;
            if (rindex == data.rowIndex) return false; // Source row is equal to target row

            var menuIndexes = {};
            menuIndexes.oldIndex = this.grid.store.data.items[data.rowIndex].data[this.sortCol];
            menuIndexes.newIndex = this.grid.store.data.items[rindex].data[this.sortCol];

            // fire the before move/copy event
            if (this.gridDropTarget.fireEvent(this.copy ? 'beforerowcopy' : 'beforerowmove', this.gridDropTarget, menuIndexes.oldIndex, menuIndexes.newIndex, data.selections) === false) return false;

            // update the store
            var ds = this.grid.getStore();
            if (!this.copy) {
                for(i = 0; i < data.selections.length; i++) {
                    ds.remove(ds.getById(data.selections[i].id));
                }
            }
            ds.insert(rindex, data.selections);

            // re-select the row(s)
            var sm = this.grid.getSelectionModel();
            if (sm) sm.selectRecords(data.selections);

            // fire the after move/copy event
            this.gridDropTarget.fireEvent(this.copy ? 'afterrowcopy' : 'afterrowmove', this.gridDropTarget, menuIndexes.oldIndex, menuIndexes.newIndex, data.selections);

            return true;
        },
        notifyOver: function(dd, e, data) {
            this.grid.getView().dragZone.ddel.innerHTML = this.grid.getDragDropText();
            this.grid.getView().dragZone.proxy.update(this.grid.getView().dragZone.ddel);

            if (!data.grid.parseSortField) {
                data.grid.parseSortField = function (value) {return value;}
            }

            if (!data.grid.parsePermanentSort) {
                data.grid.parsePermanentSort = function (value) {return false;}
            }

            // Check if the grid is sorted correctly?
            if (data.grid.parseSortField(data.grid.config.baseParams.sort) != this.sortCol) {
                if (data.grid.store.sortInfo == undefined || data.grid.parseSortField(data.grid.store.sortInfo.field) != this.sortCol) {
                    return this.dropNotAllowed;
                }
            } else {
                if (data.grid.store.sortInfo != undefined && data.grid.parseSortField(data.grid.store.sortInfo.field) != this.sortCol) {
                    return this.dropNotAllowed;
                }
            }

            if (data.grid.parsePermanentSort(this.sortCol)) {
                return false;
            }

            // Check if the search field and filter comboboxes are empty?
            var search = Ext.getCmp('collections-child-search');
            var filter = Ext.getCmp('collections-grid-filter-status');
            if (search != undefined && filter != undefined) {
                if (search.getValue() != '' || filter.getValue() != '') {
                    return this.dropNotAllowed;
                }
            }

            var t = Ext.lib.Event.getTarget(e);
            var rindex = this.grid.getView().findRowIndex(t);
            if (rindex == data.rowIndex) rindex = false; // Source row is equal to target row

            return (rindex === false) ? this.dropNotAllowed : this.dropAllowed;
        }
    });
    if (config) {
        Ext.apply(this.target, config);
        if (config.listeners) Ext.apply(this, {listeners: config.listeners});
    }

    this.addEvents({
        "beforerowmove": true,
        "afterrowmove": true,
        "beforerowcopy": true,
        "afterrowcopy": true
    });

    Ext.ux.dd.GridReorderDropTarget.superclass.constructor.call(this);
};

Ext.extend(Ext.ux.dd.GridReorderDropTarget, Ext.util.Observable, {
    getTarget: function() {
        return this.target;
    },
    getGrid: function() {
        return this.target.grid;
    },
    getCopy: function() {
        return this.target.copy ? true : false;
    },
    setCopy: function(b) {
        this.target.copy = b ? true : false;
    }
});