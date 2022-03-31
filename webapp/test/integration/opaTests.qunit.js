/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([
		"com/swisscom/socialbee/plan/resourceplan/test/integration/AllJourneys"
	], function() {
		QUnit.start();
	});
});