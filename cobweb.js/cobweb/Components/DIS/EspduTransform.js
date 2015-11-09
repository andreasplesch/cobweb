
define ([
	"jquery",
	"cobweb/Fields",
	"cobweb/Basic/X3DFieldDefinition",
	"cobweb/Basic/FieldDefinitionArray",
	"cobweb/Components/Grouping/X3DGroupingNode",
	"cobweb/Components/Core/X3DSensorNode",
	"cobweb/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode, 
          X3DSensorNode, 
          X3DConstants)
{
"use strict";

	function EspduTransform (executionContext)
	{
		X3DGroupingNode .call (this, executionContext .getBrowser (), executionContext);
		X3DSensorNode .call (this, executionContext .getBrowser (), executionContext);

		this .addType (X3DConstants .EspduTransform);
	}

	EspduTransform .prototype = $.extend (Object .create (X3DGroupingNode .prototype),new X3DSensorNode (),
	{
		constructor: EspduTransform,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                                   new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                                    new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",                                   new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",                                 new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",                                new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",                             new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",                                   new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",                                   new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_articulationParameterValue0",            new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_articulationParameterValue1",            new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_articulationParameterValue2",            new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_articulationParameterValue3",            new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_articulationParameterValue4",            new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_articulationParameterValue5",            new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_articulationParameterValue6",            new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_articulationParameterValue7",            new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "address",                                    new Fields .SFString ("localhost")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "applicationID",                              new Fields .SFInt32 (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "articulationParameterCount",                 new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "articulationParameterDesignatorArray",       new Fields .MFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "articulationParameterChangeIndicatorArray",  new Fields .MFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "articulationParameterIdPartAttachedToArray", new Fields .MFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "articulationParameterTypeArray",             new Fields .MFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "articulationParameterArray",                 new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "center",                                     new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "collisionType",                              new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "deadReckoning",                              new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "detonationLocation",                         new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "detonationRelativeLocation",                 new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "detonationResult",                           new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "entityCategory",                             new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "entityCountry",                              new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "entityDomain",                               new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "entityExtra",                                new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "entityID",                                   new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "entityKind",                                 new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "entitySpecific",                             new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "entitySubCategory",                          new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "eventApplicationID",                         new Fields .SFInt32 (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "eventEntityID",                              new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "eventNumber",                                new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "eventSiteID",                                new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "fired1",                                     new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "fired2",                                     new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "fireMissionIndex",                           new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "firingRange",                                new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "firingRate",                                 new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "forceID",                                    new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "fuse",                                       new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "linearVelocity",                             new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "linearAcceleration",                         new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "marking",                                    new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "multicastRelayHost",                         new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "multicastRelayPort",                         new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "munitionApplicationID",                      new Fields .SFInt32 (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "munitionEndPoint",                           new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "munitionEntityID",                           new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "munitionQuantity",                           new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "munitionSiteID",                             new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "munitionStartPoint",                         new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "networkMode",                                new Fields .SFString ("standAlone")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "port",                                       new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "readInterval",                               new Fields .SFTime (0.1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",                                   new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",                                      new Fields .SFVec3f (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation",                           new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "siteID",                                     new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",                                new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "warhead",                                    new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "writeInterval",                              new Fields .SFTime (1)),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "articulationParameterValue0_changed",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "articulationParameterValue1_changed",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "articulationParameterValue2_changed",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "articulationParameterValue3_changed",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "articulationParameterValue4_changed",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "articulationParameterValue5_changed",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "articulationParameterValue6_changed",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "articulationParameterValue7_changed",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "collideTime",                                new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "detonateTime",                               new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "firedTime",                                  new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isCollided",                                 new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isDetonated",                                new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isNetworkReader",                            new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isNetworkWriter",                            new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isRtpHeaderHeard",                           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isStandAlone",                               new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "timestamp",                                  new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "rtpHeaderExpected",                          new Fields .SFBool ()),
		]),
		getTypeName: function ()
		{
			return "EspduTransform";
		},
		getComponentName: function ()
		{
			return "DIS";
		},
		getContainerField: function ()
		{
			return "children";
		},
	});

	return EspduTransform;
});


