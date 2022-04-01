sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "./model/models",
    "./controller/ErrorHandler"
], function (UIComponent, Device, models, ErrorHandler) {
    "use strict";

    return UIComponent.extend("com.swisscom.socialbee.plan.resourceplan.Component", {

        metadata : {
            manifest: "json"
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * In this function, the device models are set and the router is initialized.
         * @public
         * @override
         */
        init : function () {



            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // initialize the error handler with the component
            this._oErrorHandler = new ErrorHandler(this);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // create the views based on the url/hash
            this.getRouter().initialize();


            sap.ui.core.BusyIndicator.show(0);
            this._handleInitialLoad();
            this._readEmployee();
			this._readProject();
            this._readProjectData();
			this._readKunde();
        },

        /**
         * The component is destroyed by UI5 automatically.
         * In this method, the ErrorHandler is destroyed.
         * @public
         * @override
         */
        destroy : function () {
            this._oErrorHandler.destroy();
            // call the base component's destroy function
            UIComponent.prototype.destroy.apply(this, arguments);
        },

        _handleInitialLoad: function() {
			var that = this;
            this.oProjectDeferred = jQuery.Deferred();
            this.oEmployeeDeferred = jQuery.Deferred();
			this.oKundeDeferred = jQuery.Deferred();
			/*this.oComp.oReadQuotaDeferred = jQuery.Deferred();
			this.oComp.oReadFavoriteDeferred = jQuery.Deferred();
			this.oComp.oGetUserPropertiesDeferred = jQuery.Deferred();
			this.oComp.oReadTimeEntriesDeferred = jQuery.Deferred();
			this.oComp.oReadCalendarColorDeferred = jQuery.Deferred();
			this.oComp.oReadMarkedTimespanDeferred = jQuery.Deferred();
			this.oComp.oReadAccountingTypesDeferred = jQuery.Deferred();
			this.oComp.oReadLstarTypesDeferred = jQuery.Deferred();*/
	
			jQuery.when(
                this.oProjectDeferred,
                this.oEmployeeDeferred,
				this.oKundeDeferred
				/*this.oComp.oReadQuotaDeferred,
				this.oComp.oReadFavoriteDeferred,
				this.oComp.oGetUserPropertiesDeferred,
				this.oComp.oReadTimeEntriesDeferred,
				this.oComp.oReadCalendarColorDeferred,
				this.oComp.oReadMarkedTimespanDeferred,
				this.oComp.oReadAccountingTypesDeferred,
				this.oComp.oReadLstarTypesDeferred*/
        	).done(function() {
				sap.ui.core.BusyIndicator.hide();
				/*if (that.getAppProperties("Targetvisible")) {
					if (!sap.ui.Device.system.phone) {
						that.handleGLAZPopover(false);
					}
					else {
						that.handleGLAZPopover(true);
					}
				}*/
			});
		},

        _readProjectData: function() {
            

            var that = this;
			//this.oComp.oHelper.showBusyIndicator(null, 1);
			var ProjPlanODataModel = this.getModel("ProjPlanODataModel");
			/*var oParameter = {
				$filter: "Profile eq \'" + sProfile + "\' and UName  eq \'" + sUname + "\' and EmployeeNumber  eq \'" + sEmplNr + "\'"
			};*/
			var oParameters = {
				//urlParameters: oParameter,
				success: function(oData, response) {
					var ProjPlanJsonModel = that.getModel("ProjPlanJsonModel");
		    		//oLocalFavoriteModel.setData([]);
					//var aDataCopy = JSON.parse(JSON.stringify(oData));
                    ProjPlanJsonModel.setData(oData, false);
                    console.log(ProjPlanJsonModel.getData());
                    that.oProjectDeferred.resolve();
					/*if(oFavoriteList !== null) {
						that._bindFavoriteList(oLocalFavoriteModel, oFavoriteList, sProfile, sUname);
					}
					
					if(bIsCallerCalendar) {
						that.oComp.oEventBus.publish("favoriteLoad", "loaded");
						if(!bIsInitialCall) {
							that.oComp.oHelper.handleGLAZPopover(false);
						}
					}
					
					if(!bIsInitialCall) {
						that.oComp.oHelper.hideBusyIndicator(null);
					}
					else {
						that.oComp.oReadFavoriteDeferred.resolve();
                    }
                    */
				},
				error: function(oError) {
					/*that.oComp.oHelper.hideBusyIndicator(null);
					var oErrorResponse = JSON.parse(oError.responseText);
                    that.oComp.oNotification.error(oErrorResponse.error.message.value + that.oComp.oNotification.getHtmlFormatedServicId("FavoriteService.0001"));
                    */
				}
			};
			ProjPlanODataModel.read(
					"/ZPLAPRJBER_CDS",
	                oParameters
	        );


        },

        _readEmployee: function() {
            

            var that = this;
			//this.oComp.oHelper.showBusyIndicator(null, 1);
			var ProjPlanODataModel = this.getModel("ProjPlanODataModel");
			/*var oParameter = {
				$filter: "Profile eq \'" + sProfile + "\' and UName  eq \'" + sUname + "\' and EmployeeNumber  eq \'" + sEmplNr + "\'"
			};*/
			var oParameters = {
				//urlParameters: oParameter,
				success: function(oData, response) {
					var EmployeeJsonModel = that.getModel("EmployeeJsonModel");
		    		//oLocalFavoriteModel.setData([]);
					//var aDataCopy = JSON.parse(JSON.stringify(oData));
                    EmployeeJsonModel.setData(oData, false);
                    console.log(EmployeeJsonModel.getData());
                    that.oEmployeeDeferred.resolve();
					/*if(oFavoriteList !== null) {
						that._bindFavoriteList(oLocalFavoriteModel, oFavoriteList, sProfile, sUname);
					}
					
					if(bIsCallerCalendar) {
						that.oComp.oEventBus.publish("favoriteLoad", "loaded");
						if(!bIsInitialCall) {
							that.oComp.oHelper.handleGLAZPopover(false);
						}
					}
					
					if(!bIsInitialCall) {
						that.oComp.oHelper.hideBusyIndicator(null);
					}
					else {
						that.oComp.oReadFavoriteDeferred.resolve();
                    }
                    */
				},
				error: function(oError) {
					/*that.oComp.oHelper.hideBusyIndicator(null);
					var oErrorResponse = JSON.parse(oError.responseText);
                    that.oComp.oNotification.error(oErrorResponse.error.message.value + that.oComp.oNotification.getHtmlFormatedServicId("FavoriteService.0001"));
                    */
				}
			};
			ProjPlanODataModel.read(
					"/ZPLANMITARBEITER",
	                oParameters
                    );


        },

		_readKunde: function() {


            var that = this;
			//this.oComp.oHelper.showBusyIndicator(null, 1);
			var ProjPlanODataModel = this.getModel("ProjPlanODataModel");
			/*var oParameter = {
				$filter: "Profile eq \'" + sProfile + "\' and UName  eq \'" + sUname + "\' and EmployeeNumber  eq \'" + sEmplNr + "\'"
			};*/
			var oParameters = {
				//urlParameters: oParameter,
				success: function(oData, response) {
					var KundeJsonModel = that.getModel("KundeJsonModel");
		    		//oLocalFavoriteModel.setData([]);
					//var aDataCopy = JSON.parse(JSON.stringify(oData));
                    KundeJsonModel.setData(oData, false);
                    console.log(KundeJsonModel.getData());
                    that.oKundeDeferred.resolve();
					/*if(oFavoriteList !== null) {
						that._bindFavoriteList(oLocalFavoriteModel, oFavoriteList, sProfile, sUname);
					}
					
					if(bIsCallerCalendar) {
						that.oComp.oEventBus.publish("favoriteLoad", "loaded");
						if(!bIsInitialCall) {
							that.oComp.oHelper.handleGLAZPopover(false);
						}
					}
					
					if(!bIsInitialCall) {
						that.oComp.oHelper.hideBusyIndicator(null);
					}
					else {
						that.oComp.oReadFavoriteDeferred.resolve();
                    }
                    */
				},
				error: function(oError) {
					/*that.oComp.oHelper.hideBusyIndicator(null);
					var oErrorResponse = JSON.parse(oError.responseText);
                    that.oComp.oNotification.error(oErrorResponse.error.message.value + that.oComp.oNotification.getHtmlFormatedServicId("FavoriteService.0001"));
                    */
				}
			};
			ProjPlanODataModel.read(
					"/ZPLAKUNDE",
	                oParameters
                    );


        },

		_readProject: function() {
            

            var that = this;
			//this.oComp.oHelper.showBusyIndicator(null, 1);
			var ProjPlanODataModel = this.getModel("ProjPlanODataModel");
			/*var oParameter = {
				$filter: "Profile eq \'" + sProfile + "\' and UName  eq \'" + sUname + "\' and EmployeeNumber  eq \'" + sEmplNr + "\'"
			};*/
			var oParameters = {
				//urlParameters: oParameter,
				success: function(oData, response) {
					var ProjectJsonModel = that.getModel("ProjectJsonModel");
		    		//oLocalFavoriteModel.setData([]);
					//var aDataCopy = JSON.parse(JSON.stringify(oData));
                    ProjectJsonModel.setData(oData, false);
                    console.log(ProjectJsonModel.getData());
                    that.oProjectDeferred.resolve();
					/*if(oFavoriteList !== null) {
						that._bindFavoriteList(oLocalFavoriteModel, oFavoriteList, sProfile, sUname);
					}
					
					if(bIsCallerCalendar) {
						that.oComp.oEventBus.publish("favoriteLoad", "loaded");
						if(!bIsInitialCall) {
							that.oComp.oHelper.handleGLAZPopover(false);
						}
					}
					
					if(!bIsInitialCall) {
						that.oComp.oHelper.hideBusyIndicator(null);
					}
					else {
						that.oComp.oReadFavoriteDeferred.resolve();
                    }
                    */
				},
				error: function(oError) {
					/*that.oComp.oHelper.hideBusyIndicator(null);
					var oErrorResponse = JSON.parse(oError.responseText);
                    that.oComp.oNotification.error(oErrorResponse.error.message.value + that.oComp.oNotification.getHtmlFormatedServicId("FavoriteService.0001"));
                    */
				}
			};
			ProjPlanODataModel.read(
					"/ZPLAPRJ",
	                oParameters
                    );


        },

        /**
         * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
         * design mode class should be set, which influences the size appearance of some controls.
         * @public
         * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
         */
        getContentDensityClass : function() {
            if (this._sContentDensityClass === undefined) {
                // check whether FLP has already set the content density class; do nothing in this case
                // eslint-disable-next-line sap-no-proprietary-browser-api
                if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
                    this._sContentDensityClass = "";
                } else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    // "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
                    this._sContentDensityClass = "sapUiSizeCozy";
                }
            }
            return this._sContentDensityClass;
        }

    });

});