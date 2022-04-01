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

    return BaseController.extend("com.swisscom.socialbee.plan.resourceplan.controller.Home", {

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
        onProjPress: function() {
            this.getRouter().navTo("projectList", {});     
        },

        onMitarbeiterPress: function() {
            this.getRouter().navTo("mitarbeiterList", {});     
        },
        onKundePress: function(){
            this.getRouter().navTo("kundeList", {});
        },
        onCalendarPress: function(){
            this.getRouter().navTo("calendar", {});
        }

    });
});
