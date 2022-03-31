sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/base/util/merge",
    "sap/base/util/each"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator, Merge, Each) {
    "use strict";

    return BaseController.extend("com.swisscom.socialbee.plan.resourceplan.controller.Worklist", {

        formatter: formatter,

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        /**
         * Called when the worklist controller is instantiated.
         * @public
         */
        onInit : function () {
            var oViewModel;

            this.oListProject = this.getView().byId("projectList");
            this.oListEmployee = this.getView().byId("employeeList");
            this.oListKunde = this.getView().byId("kundeList");
            //this.oTable = this.getView().byId("table");

            /*oTable.attachUpdateFinished(function() {
                console.log("attachUpdateFinished");
            });*/   

            // keeps the search state
            this._aTableSearchState = [];

            // Model used to manipulate control states
            oViewModel = new JSONModel({
                worklistTableTitle : this.getResourceBundle().getText("worklistTableTitle"),
                shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
                shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
                tableNoDataText : this.getResourceBundle().getText("tableNoDataText")
            });
            this.setModel(oViewModel, "worklistView");
   
           var oModelEmployee = this.getOwnerComponent().getModel("EmployeeJsonModel");
           this.oListProject.setModel(oModelEmployee, "oEmployeeModel");
			var oSelectTemplate = new sap.ui.core.ListItem({
                key: "{EmployeeJsonModel>EMPLOYEE_ID}",
				text: "{EmployeeJsonModel>VORNMAME}"
			});
			this.oListProject.bindItems({
				path: "EmployeeJsonModel>/results",
				template: oSelectTemplate
			});

           /*var oModelProject = this.getOwnerComponent().getModel("ProjectJsonModel");
           //this.oSelectProject.setModel(oModelProject, "oProjectModel");
			var oSelectProjectTemplate = new sap.ui.core.ListItem({
                key: "{ProjectJsonModel>PRJID}",
				text: "{ProjectJsonModel>PRJNA}"
			});
			this.oSelectProject.bindItems({
				path: "ProjectJsonModel>/results",
				template: oSelectProjectTemplate
			});*/

        },

        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */

        /**
         * Triggered by the table's 'updateFinished' event: after new table
         * data is available, this handler method updates the table counter.
         * This should only happen if the update was successful, which is
         * why this handler is attached to 'updateFinished' and not to the
         * table's list binding's 'dataReceived' method.
         * @param {sap.ui.base.Event} oEvent the update finished event
         * @publicthis.oSelect
         */
        onUpdateFinished : function (oEvent) {
            // update the worklist's object counter after the table update
            var sTitle,
                oTable = oEvent.getSource(),
                iTotalItems = oEvent.getParameter("total");
            // only update the counter if the length is final and
            // the table is not empty
            if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
                sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
            } else {
                sTitle = this.getResourceBundle().getText("worklistTableTitle");
            }
            this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);

            /*this.getOwnerComponent().getModel("PlanningJsonModel").setData(this.getOwnerComponent().getModel());
            console.log(this.getOwnerComponent().getModel("PlanningJsonModel").getData().oData);
            //var oTempPlanning = Merge({}, this.getOwnerComponent().getModel("PlanningJsonModel").getData().oData);
            
            var oTabel = sap.ui.getCore().byId("table");
            oTabel.setModel(this.getOwnerComponent().getModel("PlanningJsonModel"));
            */
        },

        /**
         * Event handler when a table item gets pressed
         * @param {sap.ui.base.Event} oEvent the table selectionChange event
         * @public
         */
        onPress : function (oEvent) {
            // The source is the list item that got pressed
            this._showObject(oEvent.getSource());
        },

        /**
         * Event handler for navigating back.
         * Navigate back in the browser history
         * @public
         */
        onNavBack : function() {
            // eslint-disable-next-line sap-no-history-manipulation
            history.go(-1);
        },


        onSearch : function (oEvent) {
            if (oEvent.getParameters().refreshButtonPressed) {
                // Search field's 'refresh' button has been pressed.
                // This is visible if you select any main list item.
                // In this case no new search is triggered, we only
                // refresh the list binding.
                this.onRefresh();
            } else {
                var aTableSearchState = [];
                var sQuery = oEvent.getParameter("query");

                if (sQuery && sQuery.length > 0) {
                    aTableSearchState = [new Filter("Arbeitort", FilterOperator.Contains, sQuery)];
                }
                this._applySearch(aTableSearchState);
            }

        },

        /**
         * Event handler for refresh event. Keeps filter, sort
         * and group settings and refreshes the list binding.
         * @public
         */
        onRefresh : function () {
            var oTable = this.byId("table");
            oTable.getBinding("items").refresh();
        },

        /* =========================================================== */
        /* internal methods                                            */
        /* =========================================================== */

        /**
         * Shows the selected item on the object page
         * @param {sap.m.ObjectListItem} oItem selected Item
         * @private
         */
        _showObject : function (oItem) {
            var sPath = oItem.getBindingContext("ProjPlanJsonModel").getPath().split("/")[2];
            this.getRouter().navTo("object", {
                //objectId: oItem.getBindingContext().getPath().substring("/ZPLAPRJBER_CDS".length)
                objectId: sPath
            });
        },

        /**
         * Internal helper method to apply both filter and search state together on the list binding
         * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
         * @private
         */
        _applySearch: function(aTableSearchState) {
            var oTable = this.byId("table"),
                oViewModel = this.getModel("worklistView");
            oTable.getBinding("items").filter(aTableSearchState, "Application");
            // changes the noDataText of the list in case there are no filter results
            if (aTableSearchState.length !== 0) {
                oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
            }
        }

    });
});
